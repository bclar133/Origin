import { mkdir, readFile, writeFile } from "node:fs/promises";

const BASE_URL = "https://www.rugbyleagueproject.org";
const CACHE_DIR = ".rlp-cache";
const YEARS = Array.from({ length: 28 }, (_, index) => 1998 + index);
const POSITION_ORDER = ["fullback", "wing", "centre", "half", "edge", "middle", "lock", "hooker"];
const POSITION_MAP = {
  FB: "fullback",
  W: "wing",
  C: "centre",
  FE: "half",
  HB: "half",
  "5/8": "half",
  FR: "middle",
  PR: "middle",
  H: "hooker",
  HK: "hooker",
  "2R": "edge",
  SR: "edge",
  L: "lock",
  LK: "lock"
};

const TEAM_NAME_MAP = new Map([
  ["Adelaide Rams", "Adelaide"],
  ["Auckland Warriors", "Warriors"],
  ["Auckland", "Warriors"],
  ["Balmain Tigers", "Balmain"],
  ["Brisbane Broncos", "Brisbane"],
  ["Canberra Raiders", "Canberra"],
  ["Canterbury Bankstown Bulldogs", "Canterbury-Bankstown"],
  ["Canterbury Bulldogs", "Canterbury-Bankstown"],
  ["Cronulla Sutherland Sharks", "Cronulla-Sutherland"],
  ["Dolphins", "Dolphins"],
  ["Gold Coast Chargers", "Gold Coast"],
  ["Gold Coast Titans", "Gold Coast"],
  ["Illawarra Steelers", "Illawarra"],
  ["Manly Warringah Sea Eagles", "Manly Warringah"],
  ["Melbourne Storm", "Melbourne"],
  ["Newcastle Knights", "Newcastle"],
  ["New Zealand Warriors", "Warriors"],
  ["North Queensland Cowboys", "North Queensland"],
  ["North Sydney Bears", "North Sydney"],
  ["Northern Eagles", "Northern Eagles"],
  ["Parramatta Eels", "Parramatta"],
  ["Penrith Panthers", "Penrith"],
  ["South Sydney Rabbitohs", "South Sydney"],
  ["St George Dragons", "St George"],
  ["St George Illawarra Dragons", "St George Illawarra"],
  ["Sydney City Roosters", "Sydney Roosters"],
  ["Sydney Roosters", "Sydney Roosters"],
  ["Wests Tigers", "Wests Tigers"],
  ["Western Suburbs Magpies", "Western Suburbs"]
]);

const responseCache = new Map();

async function main() {
  const rows = [];
  const teamSeasonMeta = [];

  for (const year of YEARS) {
    const teams = await getSeasonTeams(year);
    console.log(`${year}: ${teams.length} teams`);

    for (const team of teams) {
      const teamRows = await getTeamPlayers(team);
      rows.push(...teamRows);
      teamSeasonMeta.push({
        season: team.year,
        club: team.club,
        players: teamRows.length,
        source: team.resultsUrl
      });
      await sleep(850);
    }
  }

  const uniqueRows = dedupeRows(rows);
  const payload = `// Generated from Rugby League Project season team pages.\n// Run: node scripts/build-player-data.mjs\nwindow.NRL_GENERATED_PLAYER_SEASONS = ${JSON.stringify(uniqueRows)};\nwindow.NRL_GENERATED_PLAYER_DATA_META = ${JSON.stringify({ generatedAt: new Date().toISOString(), seasons: YEARS, teamSeasons: teamSeasonMeta })};\n`;
  await writeFile("player-data.js", payload, "utf8");
  console.log(`Wrote ${uniqueRows.length} player-seasons to player-data.js`);
}

async function getSeasonTeams(year) {
  const summaryUrl = `${BASE_URL}/seasons/nrl-${year}/summary.html`;
  const html = await fetchText(summaryUrl);
  const links = new Map();
  const pattern = new RegExp(`href="([^"]*/seasons/nrl-${year}/[^"#?]+/summary\\.html)"[^>]*>([\\s\\S]*?)<\\/a>`, "g");

  for (const match of html.matchAll(pattern)) {
    const href = match[1];
    const rawName = cleanText(match[2]);
    if (!rawName || rawName.includes("<") || rawName.length < 3) continue;
    const existing = links.get(href);
    if (!existing || rawName.length > existing.rawName.length) {
      links.set(href, { href, rawName });
    }
  }

  return [...links.values()]
    .filter((item) => !/history|premiership/i.test(item.rawName))
    .map((item) => ({
      year,
      club: normalizeTeamName(item.rawName),
      resultsUrl: `${BASE_URL}${item.href.replace("/summary.html", "/results.html")}`,
      sourceName: item.rawName
    }))
    .filter(uniqueBy((item) => `${item.year}-${item.club}-${item.resultsUrl}`))
    .sort((a, b) => a.club.localeCompare(b.club));
}

async function getTeamPlayers(team) {
  const html = await fetchText(team.resultsUrl);
  const strength = getTeamStrength(html);
  const summaryTable = getSectionTable(html, "Season Player Summary");
  const rows = [...summaryTable.matchAll(/<tr>[\s\S]*?<\/tr>/g)]
    .map((match) => match[0])
    .filter((row) => /\/players\//.test(row));

  return rows.map((row) => parsePlayerRow(row, team, strength)).filter(Boolean);
}

function parsePlayerRow(row, team, strength) {
  const nameMatch = row.match(/<a href="\/players\/(\d+)">([\s\S]*?)<\/a>/);
  if (!nameMatch) return null;

  const playerId = nameMatch[1];
  const name = formatPlayerName(cleanText(nameMatch[2]));
  const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].slice(1);
  const counts = new Map();
  let apps = 0;
  let starts = 0;
  let finals = 0;

  for (let index = 0; index < cells.length; index += 1) {
    const raw = cleanText(cells[index][1]).replace(/[^\dA-Z/]/gi, "").toUpperCase();
    if (!raw) continue;
    apps += 1;
    if (index >= Math.max(0, cells.length - 5)) finals += 1;

    if (raw === "B") continue;

    const position = POSITION_MAP[raw];
    if (!position) continue;
    starts += 1;
    counts.set(position, (counts.get(position) || 0) + 1);
  }

  const positions = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || POSITION_ORDER.indexOf(a[0]) - POSITION_ORDER.indexOf(b[0]))
    .map(([position]) => position);

  const ratings = buildRatings({ name, positions, counts, apps, starts, finals, strength });
  const careerId = `${slugify(name)}-${playerId}`;
  const clubSlug = slugify(team.club);
  const id = `${careerId}-${team.year}-${clubSlug}`;

  return {
    id,
    careerId,
    name,
    season: team.year,
    club: team.club,
    positions,
    role: buildRole(positions, apps, starts),
    ratings,
    source: "RLP",
    apps,
    starts
  };
}

function buildRatings({ name, positions, counts, apps, starts, finals, strength }) {
  const primary = positions[0] || "bench";
  const startRate = apps ? starts / apps : 0;
  const appScore = Math.min(11, Math.sqrt(apps) * 2.15);
  const startScore = Math.min(8, startRate * 8);
  const finalsScore = Math.min(3.5, finals * 0.7);
  const versatility = Math.min(3, Math.max(0, positions.length - 1) * 0.9);
  const teamScore = clamp((strength.winRate - 0.45) * 12 + strength.diffPerGame * 0.12, -4, 7);
  const positionPremium = {
    fullback: 1.5,
    half: 2.2,
    hooker: 1.3,
    lock: 1.1,
    edge: 0.7,
    middle: 0.8,
    centre: 0.4,
    wing: 0.2,
    bench: -1.5
  }[primary] || 0;
  const base = clamp(Math.round(58 + appScore + startScore + finalsScore + versatility + teamScore + positionPremium), 52, 91);
  const spread = Math.round(clamp((apps - 12) * 0.12 + (startRate - 0.55) * 4 + teamScore * 0.18, -5, 6));
  const overall = clamp(base + spread, 50, 94);
  const forward = ["edge", "middle", "lock", "hooker"].includes(primary);
  const spine = ["fullback", "half", "hooker"].includes(primary);
  const outside = ["fullback", "wing", "centre"].includes(primary);
  const hasHalf = positions.includes("half");
  const hasHooker = positions.includes("hooker");
  const hasLock = positions.includes("lock");
  const hasGoalKickerHint = hasHalf || primary === "fullback" || primary === "centre" || /cleary|reynolds|thurston|soward|el masri|girdler|croker|moses|johnson|gutherson|mitchell|hynes|burton|valentine holmes/i.test(name);

  return [
    overall,
    clamp(overall + (outside ? 3 : 0) + (spine ? 2 : 0) - (primary === "middle" ? 5 : 0), 42, 96),
    clamp(overall + (forward ? 4 : 0) + (primary === "centre" ? 1 : 0) - (primary === "wing" ? 4 : 0), 42, 96),
    clamp(overall + (forward ? 5 : 1) + Math.round(startRate * 2), 42, 97),
    clamp(44 + (hasHalf ? 36 : 0) + (hasHooker ? 19 : 0) + (hasLock ? 7 : 0) + Math.min(8, apps / 4), 18, 94),
    clamp(18 + (hasGoalKickerHint ? 30 : 0) + (hasHalf ? 18 : 0) + (primary === "fullback" ? 13 : 0), 10, 92),
    clamp(overall + finalsScore + teamScore * 0.25, 46, 97)
  ].map((value) => Math.round(value));
}

function buildRole(positions, apps, starts) {
  if (!positions.length) return apps > 8 ? "bench utility" : "squad player";
  const primary = positions[0];
  const prefix = starts >= 18 ? "regular" : starts >= 8 ? "rotation" : "depth";
  return `${prefix} ${{
    fullback: "fullback",
    wing: "winger",
    centre: "centre",
    half: "playmaker",
    edge: "edge forward",
    middle: "middle forward",
    lock: "lock forward",
    hooker: "hooker"
  }[primary]}`;
}

function getTeamStrength(html) {
  const table = getSectionTable(html, "List of Matches");
  const rows = [...table.matchAll(/<tr>[\s\S]*?<\/tr>/g)].map((match) => match[0]);
  let wins = 0;
  let losses = 0;
  let draws = 0;
  let forPoints = 0;
  let againstPoints = 0;

  for (const row of rows) {
    const result = cleanText(row.match(/<span class='[wdl]'>[\s\S]*?<\/span>/i)?.[0] || "");
    const scoreCells = [...row.matchAll(/<td[^>]*class=['"][^'"]*tight[^'"]*['"][^>]*>([\s\S]*?)<\/td>/g)].map((match) => cleanText(match[1]));
    const scored = Number(scoreCells[0]);
    const conceded = Number(scoreCells[2]);
    if (!["W", "L", "D"].includes(result) || Number.isNaN(scored) || Number.isNaN(conceded)) continue;
    if (result === "W") wins += 1;
    if (result === "L") losses += 1;
    if (result === "D") draws += 1;
    forPoints += scored;
    againstPoints += conceded;
  }

  const played = wins + losses + draws;
  return {
    played,
    winRate: played ? (wins + draws * 0.5) / played : 0.5,
    diffPerGame: played ? (forPoints - againstPoints) / played : 0
  };
}

function getSectionTable(html, heading) {
  const start = html.indexOf(heading);
  if (start < 0) return "";
  const tableStart = html.indexOf("<table", start);
  const tableEnd = html.indexOf("</table>", tableStart);
  return tableStart >= 0 && tableEnd >= 0 ? html.slice(tableStart, tableEnd + 8) : "";
}

async function fetchText(url) {
  if (responseCache.has(url)) return responseCache.get(url);

  const cachePath = `${CACHE_DIR}/${slugify(url)}.html`;
  try {
    const cached = await readFile(cachePath, "utf8");
    responseCache.set(url, cached);
    return cached;
  } catch {
    // Cache miss.
  }

  let response;
  for (let attempt = 0; attempt < 7; attempt += 1) {
    response = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (NRL Invincible data builder)" } });
    if (response.ok) break;
    if (![429, 500, 502, 503, 504].includes(response.status) || attempt === 6) {
      throw new Error(`Failed ${response.status} ${url}`);
    }
    await sleep(3500 + attempt * 2500);
  }

  const text = await response.text();
  responseCache.set(url, text);
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, text, "utf8");
  return text;
}

function dedupeRows(rows) {
  const seen = new Map();
  for (const row of rows) {
    const key = `${row.season}-${row.club}-${row.careerId}`;
    if (!seen.has(key)) {
      seen.set(key, row);
    }
  }
  return [...seen.values()].sort((a, b) => a.season - b.season || a.club.localeCompare(b.club) || a.name.localeCompare(b.name));
}

function normalizeTeamName(value) {
  const clean = value.replace(/\s+/g, " ").trim();
  return TEAM_NAME_MAP.get(clean) || clean;
}

function formatPlayerName(value) {
  const lower = value.replace(/\s+/g, " ").trim().toLowerCase();
  return lower.replace(/\b[a-z]/g, (char) => char.toUpperCase()).replace(/(['-])[a-z]/g, (match) => match.toUpperCase());
}

function cleanText(value) {
  return decodeHtml(String(value || "").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function decodeHtml(value) {
  return value
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#039;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueBy(keyFn) {
  const seen = new Set();
  return (item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
