(() => {
  const STORAGE_KEY = "nrl-invincible-rating-calibration-v2";
  const BATCH_KEY = "nrl-invincible-rating-calibration-batch-v2";
  const ATTRIBUTE_KEYS = ["overall", "attack", "defence", "workrate", "kicking", "goalKicking", "bigGame"];
  const BUCKETS = [
    { label: "96-100", min: 96, max: 100, weight: 0.1 },
    { label: "90-95", min: 90, max: 95, weight: 0.18 },
    { label: "85-89", min: 85, max: 89, weight: 0.2 },
    { label: "80-84", min: 80, max: 84, weight: 0.2 },
    { label: "70-79", min: 70, max: 79, weight: 0.2 },
    { label: "Under 70", min: 0, max: 69, weight: 0.12 }
  ];

  const elements = {
    summary: document.querySelector("#summary"),
    grid: document.querySelector("#playerGrid"),
    batchSize: document.querySelector("#batchSize"),
    viewMode: document.querySelector("#viewMode"),
    searchBox: document.querySelector("#searchBox"),
    newBatch: document.querySelector("#newBatch"),
    clearAnswers: document.querySelector("#clearAnswers"),
    saveWorkspace: document.querySelector("#saveWorkspace"),
    copyJson: document.querySelector("#copyJson"),
    downloadCsv: document.querySelector("#downloadCsv"),
    exportPanel: document.querySelector("#exportPanel"),
    exportTitle: document.querySelector("#exportTitle"),
    exportStatus: document.querySelector("#exportStatus"),
    exportText: document.querySelector("#exportText"),
    selectExportText: document.querySelector("#selectExportText")
  };

  const profiles = buildCalibrationProfiles();
  const state = {
    answers: loadJson(STORAGE_KEY, {}),
    batchIds: loadJson(BATCH_KEY, null) || [],
    search: "",
    viewMode: "batch"
  };

  if (!state.batchIds.length) {
    state.batchIds = createSpreadBatch(Number(elements.batchSize.value));
    saveBatch();
  }

  bindEvents();
  render();

  function buildCalibrationProfiles() {
    const rowsByCareer = new Map();

    for (const row of PLAYER_SEASONS) {
      if (!rowsByCareer.has(row.careerId)) rowsByCareer.set(row.careerId, []);
      rowsByCareer.get(row.careerId).push(row);
    }

    return [...careerProfiles.values()]
      .map((profile) => {
        const rows = rowsByCareer.get(profile.id) || [];
        const peakRow = [...rows].sort((a, b) => b.ratings.overall - a.ratings.overall || (b.starts || 0) - (a.starts || 0) || (b.apps || 0) - (a.apps || 0))[0];
        const totalApps = rows.reduce((sum, row) => sum + (row.apps || 0), 0);
        const seasons = [...new Set(rows.map((row) => row.season))].sort((a, b) => a - b);
        const clubs = [...new Set(rows.map((row) => row.club))].sort();
        const positions = [...new Set(rows.flatMap((row) => row.positions || []))].sort();
        const currentRating = getCurrentCareerRating(profile);

        return {
          careerId: profile.id,
          name: profile.name,
          currentRating,
          rawPeak: profile.peakOverall,
          tier: ratingTier(currentRating),
          positions,
          clubs,
          seasons,
          totalApps,
          peakSeason: peakRow?.season || seasons.at(-1) || "",
          peakClub: peakRow?.club || clubs[0] || "",
          peakRole: peakRow?.role || "",
          peakRatings: profile.peakRatings
        };
      })
      .filter((profile) => profile.name && Number.isFinite(profile.currentRating))
      .sort((a, b) => b.currentRating - a.currentRating || b.totalApps - a.totalApps || a.name.localeCompare(b.name));
  }

  function getCurrentCareerRating(profile) {
    const calibration = typeof CAREER_RATING_CALIBRATION !== "undefined" ? CAREER_RATING_CALIBRATION : {};
    if (calibration[profile.id]) return calibration[profile.id];
    return spreadRatings(profile.peakRatings).overall;
  }

  function bindEvents() {
    elements.newBatch.addEventListener("click", () => {
      state.batchIds = createSpreadBatch(Number(elements.batchSize.value));
      saveBatch();
      render();
    });

    elements.batchSize.addEventListener("change", () => {
      state.batchIds = createSpreadBatch(Number(elements.batchSize.value));
      saveBatch();
      render();
    });

    elements.viewMode.addEventListener("change", () => {
      state.viewMode = elements.viewMode.value;
      render();
    });

    elements.searchBox.addEventListener("input", () => {
      state.search = elements.searchBox.value.trim().toLowerCase();
      render();
    });

    elements.clearAnswers.addEventListener("click", () => {
      if (!window.confirm("Clear all saved rating answers in this browser?")) return;
      state.answers = {};
      saveAnswers();
      render();
    });

    elements.saveWorkspace.addEventListener("click", saveWorkspace);
    elements.copyJson.addEventListener("click", copyJson);
    elements.downloadCsv.addEventListener("click", downloadCsv);
    elements.selectExportText.addEventListener("click", () => {
      selectExportText();
      flashButton(elements.selectExportText, "Selected");
    });
  }

  function createSpreadBatch(size) {
    const selected = [];
    const selectedIds = new Set();

    for (const bucket of BUCKETS) {
      const target = Math.max(2, Math.round(size * bucket.weight));
      const candidates = shuffle(profiles.filter((profile) => profile.currentRating >= bucket.min && profile.currentRating <= bucket.max));
      addCandidates(selected, selectedIds, candidates, target);
    }

    addCandidates(selected, selectedIds, shuffle(profiles), size - selected.length);

    return selected
      .slice(0, size)
      .sort((a, b) => b.currentRating - a.currentRating || a.name.localeCompare(b.name))
      .map((profile) => profile.careerId);
  }

  function addCandidates(selected, selectedIds, candidates, target) {
    const positionCounts = new Map();
    let added = 0;

    for (const profile of selected) {
      const key = primaryPosition(profile);
      positionCounts.set(key, (positionCounts.get(key) || 0) + 1);
    }

    candidates
      .map((profile) => ({
        profile,
        score: Math.random() + Math.min(240, profile.totalApps) / 820 - (positionCounts.get(primaryPosition(profile)) || 0) * 0.08
      }))
      .sort((a, b) => b.score - a.score)
      .forEach(({ profile }) => {
        if (added >= target) return;
        if (selectedIds.has(profile.careerId)) return;
        selected.push(profile);
        selectedIds.add(profile.careerId);
        added += 1;
      });
  }

  function render() {
    renderSummary();
    renderCards();
  }

  function renderSummary() {
    const answered = getAnsweredProfiles();
    const visible = getVisibleProfiles();
    const averageDelta = answered.length ? Math.round(answered.reduce((sum, item) => sum + answerDelta(item), 0) / answered.length * 10) / 10 : 0;

    elements.summary.innerHTML = [
      summaryMetric("Batch", `${state.batchIds.length} players`),
      summaryMetric("Visible", visible.length),
      summaryMetric("Answered", answered.length),
      summaryMetric("Avg delta", signed(averageDelta)),
      summaryMetric("Export rows", getExportRows().length)
    ].join("");
  }

  function summaryMetric(label, value) {
    return `<div class="summary-metric"><span>${escapeHtml(label)}</span><b>${escapeHtml(String(value))}</b></div>`;
  }

  function renderCards() {
    const rows = getVisibleProfiles();

    if (!rows.length) {
      elements.grid.innerHTML = `<div class="empty">No players match this view.</div>`;
      return;
    }

    elements.grid.innerHTML = rows.map(renderCard).join("");
    elements.grid.querySelectorAll("[data-rating-input]").forEach((input) => {
      input.addEventListener("input", handleRatingInput);
    });
    elements.grid.querySelectorAll("[data-notes-input]").forEach((input) => {
      input.addEventListener("input", handleNotesInput);
    });
    elements.grid.querySelectorAll("[data-quick]").forEach((button) => {
      button.addEventListener("click", handleQuickButton);
    });
  }

  function renderCard(profile) {
    const answer = state.answers[profile.careerId] || {};
    const ratingValue = answer.rating ?? "";
    const delta = ratingValue === "" ? "" : Number(ratingValue) - profile.currentRating;
    const answeredClass = ratingValue === "" ? "" : "answered";

    return `
      <article class="rating-card ${answeredClass}" data-career-id="${escapeHtml(profile.careerId)}">
        <div class="card-top">
          <div>
            <div class="player-name">${escapeHtml(profile.name)}</div>
            <div class="player-meta">${escapeHtml(profile.positions.join(", ") || "No regular position")} | ${escapeHtml(profile.clubs.slice(0, 4).join(", "))}</div>
            <div class="player-detail">Peak: ${escapeHtml(String(profile.peakSeason))} ${escapeHtml(profile.peakClub)} | Apps in data: ${profile.totalApps}</div>
          </div>
          <div class="rating-badge ${ratingClass(profile.currentRating)}">${profile.currentRating}</div>
        </div>
        <div class="entry-row">
          <div>
            <input class="rating-input" data-rating-input="${escapeHtml(profile.careerId)}" type="number" inputmode="numeric" min="40" max="100" step="1" value="${escapeHtml(String(ratingValue))}" placeholder="--" />
            <div class="quick-buttons">
              <button data-quick="same" data-career-id="${escapeHtml(profile.careerId)}">Same</button>
              <button data-quick="-2" data-career-id="${escapeHtml(profile.careerId)}">-2</button>
              <button data-quick="-1" data-career-id="${escapeHtml(profile.careerId)}">-1</button>
              <button data-quick="1" data-career-id="${escapeHtml(profile.careerId)}">+1</button>
              <button data-quick="2" data-career-id="${escapeHtml(profile.careerId)}">+2</button>
            </div>
          </div>
          <div>
            <div class="delta ${deltaClass(delta)}">${delta === "" ? "No answer yet" : `Your delta ${signed(delta)}`}</div>
            <textarea data-notes-input="${escapeHtml(profile.careerId)}" placeholder="Optional note">${escapeHtml(answer.notes || "")}</textarea>
          </div>
        </div>
      </article>
    `;
  }

  function getVisibleProfiles() {
    const batchProfiles = state.batchIds.map((id) => profileById(id)).filter(Boolean);
    let rows = state.viewMode === "all" ? getAnsweredProfiles() : batchProfiles;

    if (state.viewMode === "unanswered") {
      rows = rows.filter((profile) => !hasAnswer(profile.careerId));
    } else if (state.viewMode === "answered") {
      rows = batchProfiles.filter((profile) => hasAnswer(profile.careerId));
    }

    if (state.search) {
      rows = profiles.filter((profile) => searchableText(profile).includes(state.search));
    }

    return rows;
  }

  function handleRatingInput(event) {
    const careerId = event.currentTarget.dataset.ratingInput;
    const value = event.currentTarget.value === "" ? "" : clamp(Number(event.currentTarget.value), 40, 100);
    updateAnswer(careerId, { rating: value });
    refreshCardState(event.currentTarget.closest(".rating-card"), careerId);
  }

  function handleNotesInput(event) {
    updateAnswer(event.currentTarget.dataset.notesInput, { notes: event.currentTarget.value });
  }

  function handleQuickButton(event) {
    const careerId = event.currentTarget.dataset.careerId;
    const profile = profileById(careerId);
    if (!profile) return;
    const action = event.currentTarget.dataset.quick;
    const currentAnswer = state.answers[careerId]?.rating;
    const base = Number.isFinite(Number(currentAnswer)) ? Number(currentAnswer) : profile.currentRating;
    const rating = action === "same" ? profile.currentRating : clamp(base + Number(action), 40, 100);
    updateAnswer(careerId, { rating });
    render();
  }

  function updateAnswer(careerId, patch) {
    const profile = profileById(careerId);
    if (!profile) return;
    const existing = state.answers[careerId] || {};
    state.answers[careerId] = {
      ...existing,
      careerId,
      name: profile.name,
      currentRating: profile.currentRating,
      tier: profile.tier,
      ...patch,
      updatedAt: new Date().toISOString()
    };

    if (state.answers[careerId].rating === "" && !state.answers[careerId].notes) {
      delete state.answers[careerId];
    }

    saveAnswers();
    renderSummary();
  }

  function refreshCardState(card, careerId) {
    const profile = profileById(careerId);
    if (!card || !profile) return;
    const answer = state.answers[careerId];
    const value = answer?.rating ?? "";
    const delta = value === "" ? "" : Number(value) - profile.currentRating;
    const deltaNode = card.querySelector(".delta");
    card.classList.toggle("answered", value !== "");
    if (!deltaNode) return;
    deltaNode.className = `delta ${deltaClass(delta)}`.trim();
    deltaNode.textContent = delta === "" ? "No answer yet" : `Your delta ${signed(delta)}`;
  }

  async function copyJson() {
    const payload = JSON.stringify(getExportRows(), null, 2);
    showExport("JSON Export", payload, "JSON is shown below. Trying to copy it to the clipboard now.");

    if (await copyText(payload)) {
      flashButton(elements.copyJson, "Copied");
      elements.exportStatus.textContent = "Copied to clipboard. You can also copy it manually from the box below.";
      return;
    }

    selectExportText();
    flashButton(elements.copyJson, "Select Below");
    elements.exportStatus.textContent = "Clipboard was blocked, so the JSON is selected below. Press Ctrl+C to copy it.";
  }

  async function saveWorkspace() {
    const payload = buildExportPayload();
    showExport("Workspace Save", JSON.stringify(payload.rows, null, 2), "Saving ratings to the local workspace helper.");

    if (!payload.rows.length) {
      elements.exportStatus.textContent = "No answered ratings to save yet.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5174/save-ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || "Save failed");

      flashButton(elements.saveWorkspace, "Saved");
      elements.exportStatus.textContent = `Saved ${result.count} ratings to ${result.files.latest}.`;
    } catch (error) {
      flashButton(elements.saveWorkspace, "Not Saved");
      elements.exportStatus.textContent = `Could not reach the local save helper. Ask Codex to start it, or use the selected text below. ${error.message || ""}`.trim();
      selectExportText();
    }
  }

  function downloadCsv() {
    const rows = getExportRows();
    const headers = ["careerId", "name", "currentRating", "yourRating", "delta", "tier", "positions", "clubs", "peakSeason", "peakClub", "totalApps", "notes"];
    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))
    ].join("\n");
    showExport("CSV Export", csv, "CSV is shown below. Starting the download now.");

    if (downloadText(csv, "nrl-rating-calibration.csv", "text/csv")) {
      flashButton(elements.downloadCsv, "Downloaded");
      elements.exportStatus.textContent = "Download started. If no file appears, copy the CSV from the box below.";
      return;
    }

    selectExportText();
    flashButton(elements.downloadCsv, "Select Below");
    elements.exportStatus.textContent = "Download was blocked, so the CSV is selected below. Press Ctrl+C to copy it.";
  }

  function getExportRows() {
    return Object.values(state.answers)
      .filter((answer) => Number(answer.rating) > 0)
      .map((answer) => {
        const profile = profileById(answer.careerId);
        return {
          careerId: answer.careerId,
          name: answer.name,
          currentRating: answer.currentRating,
          yourRating: Number(answer.rating),
          delta: Number(answer.rating) - answer.currentRating,
          tier: answer.tier,
          positions: profile?.positions.join("/") || "",
          clubs: profile?.clubs.join("/") || "",
          peakSeason: profile?.peakSeason || "",
          peakClub: profile?.peakClub || "",
          totalApps: profile?.totalApps || "",
          notes: answer.notes || ""
        };
      })
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || b.currentRating - a.currentRating || a.name.localeCompare(b.name));
  }

  function buildExportPayload() {
    const rows = getExportRows();
    return {
      exportedAt: new Date().toISOString(),
      source: "rating-calibration.html",
      count: rows.length,
      rows,
      calibration: Object.fromEntries(rows.map((row) => [row.careerId, row.yourRating]))
    };
  }

  function getAnsweredProfiles() {
    return getExportRows().map((row) => profileById(row.careerId)).filter(Boolean);
  }

  function hasAnswer(careerId) {
    return Number(state.answers[careerId]?.rating) > 0;
  }

  function answerDelta(profile) {
    return Number(state.answers[profile.careerId]?.rating || profile.currentRating) - profile.currentRating;
  }

  function profileById(careerId) {
    return profiles.find((profile) => profile.careerId === careerId);
  }

  function primaryPosition(profile) {
    return profile.positions[0] || "unknown";
  }

  function searchableText(profile) {
    return `${profile.name} ${profile.positions.join(" ")} ${profile.clubs.join(" ")} ${profile.currentRating}`.toLowerCase();
  }

  function ratingTier(value) {
    return BUCKETS.find((bucket) => value >= bucket.min && value <= bucket.max)?.label || "Unknown";
  }

  function ratingClass(value) {
    if (value >= 100) return "rating-immortal";
    if (value >= 90) return "rating-red";
    if (value >= 85) return "rating-orange";
    if (value >= 80) return "rating-yellow";
    if (value >= 75) return "rating-green";
    if (value >= 70) return "rating-blue";
    return "rating-grey";
  }

  function deltaClass(delta) {
    if (delta === "") return "";
    if (delta > 0) return "positive";
    if (delta < 0) return "negative";
    return "";
  }

  function signed(value) {
    return Number(value) > 0 ? `+${value}` : String(value);
  }

  function saveAnswers() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.answers));
  }

  function saveBatch() {
    localStorage.setItem(BATCH_KEY, JSON.stringify(state.batchIds));
  }

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  }

  function showExport(title, text, status) {
    elements.exportPanel.hidden = false;
    elements.exportTitle.textContent = title;
    elements.exportStatus.textContent = status;
    elements.exportText.value = text;
    elements.exportPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timed out")), 900))
        ]);
        return true;
      } catch {
        // Fall through to the selected-text fallback.
      }
    }

    selectExportText();
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    }
  }

  function selectExportText() {
    elements.exportText.focus();
    elements.exportText.select();
  }

  function downloadText(text, filename, type) {
    const link = document.createElement("a");
    link.download = filename;

    try {
      const blob = new Blob([text], { type });
      const url = URL.createObjectURL(blob);
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      return true;
    } catch {
      try {
        link.href = `data:${type};charset=utf-8,${encodeURIComponent(text)}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        return true;
      } catch {
        return false;
      }
    }
  }

  function flashButton(button, text) {
    const original = button.textContent;
    button.textContent = text;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }
})();
