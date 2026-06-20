import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.NRL_RATING_SAVE_PORT || 5174);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = path.join(ROOT, "outputs", "rating-calibration");

const server = http.createServer(async (request, response) => {
  setCors(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { ok: true, service: "nrl-rating-calibration-save", port: PORT });
    return;
  }

  if (request.method === "POST" && request.url === "/save-ratings") {
    try {
      const payload = JSON.parse(await readBody(request));
      const rows = normalizeRows(payload.rows);
      const calibration = Object.fromEntries(rows.map((row) => [row.careerId, row.yourRating]));
      const savedAt = new Date().toISOString();
      const stamp = savedAt.replace(/[:.]/g, "-");
      const body = {
        ok: true,
        savedAt,
        count: rows.length,
        source: payload.source || "rating-calibration.html",
        rows,
        calibration
      };

      await fs.mkdir(OUTPUT_DIR, { recursive: true });

      const latest = path.join(OUTPUT_DIR, "browser-rating-calibration-latest.json");
      const dated = path.join(OUTPUT_DIR, `browser-rating-calibration-${stamp}.json`);
      const overrides = path.join(OUTPUT_DIR, "browser-career-rating-overrides-latest.js");

      await fs.writeFile(latest, `${JSON.stringify(body, null, 2)}\n`);
      await fs.writeFile(dated, `${JSON.stringify(body, null, 2)}\n`);
      await fs.writeFile(
        overrides,
        `const CAREER_RATING_CALIBRATION_UPDATE = ${JSON.stringify(calibration, null, 2)};\n`
      );

      sendJson(response, 200, {
        ok: true,
        count: rows.length,
        files: {
          latest: relativePath(latest),
          dated: relativePath(dated),
          overrides: relativePath(overrides)
        }
      });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message || "Save failed" });
    }
    return;
  }

  sendJson(response, 404, { ok: false, error: "Not found" });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`NRL rating calibration save helper listening on http://127.0.0.1:${PORT}`);
});

function setCors(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, status, body) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let data = "";
    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      data += chunk;
      if (data.length > 5_000_000) {
        reject(new Error("Payload too large"));
        request.destroy();
      }
    });
    request.on("end", () => resolve(data));
    request.on("error", reject);
  });
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) throw new Error("Expected rows array");

  return rows.map((row) => {
    const careerId = String(row.careerId || "").trim();
    const name = String(row.name || "").trim();
    const yourRating = Number(row.yourRating);
    const currentRating = Number(row.currentRating);

    if (!careerId || !name) throw new Error("Each row needs careerId and name");
    if (!Number.isFinite(yourRating) || yourRating < 40 || yourRating > 100) {
      throw new Error(`Invalid rating for ${name}`);
    }

    return {
      careerId,
      name,
      currentRating: Number.isFinite(currentRating) ? currentRating : null,
      yourRating,
      delta: Number.isFinite(currentRating) ? yourRating - currentRating : null,
      tier: row.tier || "",
      positions: row.positions || "",
      clubs: row.clubs || "",
      peakSeason: row.peakSeason || "",
      peakClub: row.peakClub || "",
      totalApps: row.totalApps || "",
      notes: row.notes || ""
    };
  });
}

function relativePath(filePath) {
  return path.relative(ROOT, filePath).replaceAll(path.sep, "/");
}
