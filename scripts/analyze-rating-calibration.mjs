import fs from "node:fs/promises";
import vm from "node:vm";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const workbookPath = "outputs/rating-calibration/nrl-invincible-rating-calibration-batch-1.xlsx";
const appPath = "app.js";
const playerDataPath = "player-data.js";

const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("Batch 1");
const values = sheet.getRange("A4:R44").values;
const headers = values[0];
const rows = values.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]])));

const context = {
  console,
  window: {
    NRL_PLAYER_POSITION_AUDIT: null,
    matchMedia: () => ({ matches: false }),
    setTimeout: () => 1,
    addEventListener: () => {}
  },
  document: {
    querySelector: () => ({ innerHTML: "", querySelectorAll: () => [] }),
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, setAttribute: () => {}, appendChild: () => {}, remove: () => {}, getContext: () => null }),
    body: { appendChild: () => {} },
    execCommand: () => false
  },
  navigator: {},
  Intl,
  Math,
  Set,
  Map,
  Promise,
  Array,
  Object,
  String,
  Number,
  Boolean,
  Date,
  RegExp,
  JSON,
  Error,
  URLSearchParams
};
context.globalThis = context;
vm.createContext(context);
vm.runInContext(await fs.readFile(playerDataPath, "utf8"), context, { timeout: 10000 });
vm.runInContext(
  `${await fs.readFile(appPath, "utf8")}\nthis.__api = { PLAYER_SEASONS, careerProfiles, getCareerOverall, getEffectiveRatings, state };`,
  context,
  { timeout: 10000 }
);

const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

const appRows = context.__api.PLAYER_SEASONS;
const careerProfiles = context.__api.careerProfiles;

function findSeasonRow(player, season, club) {
  const key = normalize(player);
  const clubKey = normalize(club);
  return appRows
    .filter((row) => normalize(row.name) === key && Number(row.season) === Number(season))
    .sort((a, b) => Number(normalize(b.club) === clubKey) - Number(normalize(a.club) === clubKey) || (b.apps || 0) - (a.apps || 0))[0];
}

function findCareerPeak(player) {
  const key = normalize(player);
  const candidates = [...careerProfiles.values()].filter((profile) => normalize(profile.name) === key);
  return candidates.sort((a, b) => b.peakOverall - a.peakOverall)[0];
}

const completed = rows
  .filter((row) => Number(row["Your Overall"]) > 0)
  .map((row) => {
    const seasonRow = findSeasonRow(row.Player, row.Season, row.Club);
    const career = findCareerPeak(row.Player);
    const userOverall = Number(row["Your Overall"]);
    const currentOverall = Number(row["Current Overall"]);
    const careerPeak = career?.peakOverall || currentOverall;
    const calibratedCareerOverall = seasonRow && career ? context.__api.getCareerOverall(seasonRow, career) : careerPeak;
    context.__api.state.ratingMode = "career";
    const effectiveCareerOverall = seasonRow ? context.__api.getEffectiveRatings(seasonRow).overall : calibratedCareerOverall;
    return {
      index: row["#"],
      player: row.Player,
      season: row.Season,
      club: row.Club,
      positions: row.Positions,
      role: row.Role,
      currentOverall,
      appSeasonOverall: seasonRow?.ratings?.overall ?? currentOverall,
      appCareerPeak: careerPeak,
      calibratedCareerOverall,
      effectiveCareerOverall,
      userOverall,
      tier: row["Your Tier"] || "",
      notes: row.Notes || "",
      seasonDelta: userOverall - currentOverall,
      careerDelta: userOverall - careerPeak,
      calibratedDelta: userOverall - calibratedCareerOverall,
      careerId: seasonRow?.careerId || career?.id || ""
    };
  });

const summary = {
  count: completed.length,
  averageCurrent: round(avg(completed.map((row) => row.currentOverall))),
  averageCareerPeak: round(avg(completed.map((row) => row.appCareerPeak))),
  averageCalibratedCareer: round(avg(completed.map((row) => row.calibratedCareerOverall))),
  averageUser: round(avg(completed.map((row) => row.userOverall))),
  averageCareerDelta: round(avg(completed.map((row) => row.careerDelta))),
  averageCalibratedDelta: round(avg(completed.map((row) => row.calibratedDelta))),
  tooHighVsCareer: completed.filter((row) => row.careerDelta <= -4).length,
  tooLowVsCareer: completed.filter((row) => row.careerDelta >= 4).length,
  stillDifferentAfterCalibration: completed.filter((row) => row.calibratedDelta !== 0).length
};

const biggestRaises = [...completed].sort((a, b) => b.careerDelta - a.careerDelta).slice(0, 12);
const biggestCuts = [...completed].sort((a, b) => a.careerDelta - b.careerDelta).slice(0, 12);

function avg(numbers) {
  return numbers.reduce((sum, value) => sum + value, 0) / Math.max(1, numbers.length);
}

function round(value) {
  return Math.round(value * 10) / 10;
}

await fs.mkdir("outputs/rating-calibration", { recursive: true });
await fs.writeFile(
  "outputs/rating-calibration/rating-calibration-analysis.json",
  JSON.stringify({ summary, biggestRaises, biggestCuts, rows: completed }, null, 2)
);

console.log(JSON.stringify({ summary, biggestRaises, biggestCuts }, null, 2));
