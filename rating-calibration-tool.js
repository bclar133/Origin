(() => {
  const DATA = window.ORIGIN_INVINCIBLE_DATA;
  const STORAGE_KEY = "origin-invincible-rating-overrides-v1";
  const BATCH_KEY = "origin-invincible-rating-batch-v1";
  const RATING_KEYS = ["overall", "attack", "defence", "workrate", "kicking", "goalKicking", "bigGame"];
  const POSITION_KEYS = ["fullback", "wing", "centre", "half", "edge", "middle", "lock", "hooker"];
  const POSITION_LABELS = {
    fullback: "FB",
    wing: "Wing",
    centre: "Centre",
    half: "Half",
    edge: "Edge",
    middle: "Middle",
    lock: "Lock",
    hooker: "Hooker"
  };
  const KEY_LABELS = {
    overall: "Overall",
    attack: "Attack",
    defence: "Defence",
    workrate: "Work",
    kicking: "Kick",
    goalKicking: "Goal %",
    bigGame: "Big Game"
  };
  const BUCKETS = [
    { min: 95, max: 100, weight: .14 },
    { min: 90, max: 94, weight: .18 },
    { min: 85, max: 89, weight: .2 },
    { min: 80, max: 84, weight: .2 },
    { min: 70, max: 79, weight: .2 },
    { min: 0, max: 69, weight: .08 }
  ];

  const elements = {
    summary: document.querySelector("#summary"),
    grid: document.querySelector("#playerGrid"),
    batchSize: document.querySelector("#batchSize"),
    viewMode: document.querySelector("#viewMode"),
    stateFilter: document.querySelector("#stateFilter"),
    yearFilter: document.querySelector("#yearFilter"),
    searchBox: document.querySelector("#searchBox"),
    newBatch: document.querySelector("#newBatch"),
    clearOverrides: document.querySelector("#clearOverrides"),
    copyJson: document.querySelector("#copyJson"),
    downloadCsv: document.querySelector("#downloadCsv"),
    exportPanel: document.querySelector("#exportPanel"),
    exportTitle: document.querySelector("#exportTitle"),
    exportStatus: document.querySelector("#exportStatus"),
    exportText: document.querySelector("#exportText"),
    selectExportText: document.querySelector("#selectExportText")
  };

  const profiles = buildProfiles();
  const profileMap = new Map(profiles.map((profile) => [profile.seasonKey, profile]));
  const profilesByCareer = groupProfilesByCareer(profiles);
  const storedOverrides = normaliseStore(loadJson(STORAGE_KEY, { seasons: {}, careers: {} }));
  const state = {
    overrides: storedOverrides.store,
    batchIds: loadJson(BATCH_KEY, []),
    search: "",
    viewMode: "batch",
    stateFilter: "all",
    yearFilter: "all"
  };

  if (storedOverrides.changed) saveOverrides();

  if (!state.batchIds.length) {
    state.batchIds = createSpreadBatch(Number(elements.batchSize.value));
    saveBatch();
  }

  populateYears();
  bindEvents();
  render();

  function buildProfiles() {
    const rows = [];
    for (const team of DATA.teams || []) {
      for (const p of team.players || []) {
        const careerId = slug(p.name);
        rows.push({
          seasonKey: `${team.state}-${team.year}-${careerId}`,
          careerId,
          name: p.name,
          state: team.state,
          year: team.year,
          positions: p.positions || [],
          coverPositions: Array.isArray(p.coverPositions) ? p.coverPositions : deriveCoverPositions(p.positions || []),
          role: p.role || "Origin player",
          ratings: { ...p.ratings },
          searchText: `${p.name} ${team.state} ${team.year} ${(p.positions || []).join(" ")} ${p.role || ""}`.toLowerCase()
        });
      }
    }
    return rows.sort((a, b) => b.ratings.overall - a.ratings.overall || b.year - a.year || a.name.localeCompare(b.name));
  }

  function groupProfilesByCareer(rows) {
    const grouped = new Map();
    for (const profile of rows) {
      if (!grouped.has(profile.careerId)) grouped.set(profile.careerId, []);
      grouped.get(profile.careerId).push(profile);
    }
    return grouped;
  }

  function populateYears() {
    const years = [...new Set(profiles.map((profile) => profile.year))].sort((a, b) => b - a);
    elements.yearFilter.insertAdjacentHTML("beforeend", years.map((year) => `<option value="${year}">${year}</option>`).join(""));
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

    elements.stateFilter.addEventListener("change", () => {
      state.stateFilter = elements.stateFilter.value;
      render();
    });

    elements.yearFilter.addEventListener("change", () => {
      state.yearFilter = elements.yearFilter.value;
      render();
    });

    elements.searchBox.addEventListener("input", () => {
      state.search = elements.searchBox.value.trim().toLowerCase();
      render();
    });

    elements.clearOverrides.addEventListener("click", () => {
      if (!window.confirm("Clear all Origin rating and position changes saved in this browser?")) return;
      state.overrides = { seasons: {}, careers: {} };
      saveOverrides();
      render();
    });

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
      addCandidates(selected, selectedIds, shuffle(profiles.filter((profile) => profile.ratings.overall >= bucket.min && profile.ratings.overall <= bucket.max)), target);
    }
    addCandidates(selected, selectedIds, shuffle(profiles), size - selected.length);
    return selected.slice(0, size).map((profile) => profile.seasonKey);
  }

  function addCandidates(selected, selectedIds, candidates, target) {
    let added = 0;
    for (const profile of candidates) {
      if (added >= target) return;
      if (selectedIds.has(profile.seasonKey)) continue;
      selected.push(profile);
      selectedIds.add(profile.seasonKey);
      added += 1;
    }
  }

  function render() {
    renderSummary();
    renderCards();
  }

  function renderSummary() {
    const edited = exportRows();
    const visible = visibleProfiles();
    const ratingRows = edited.filter((row) => Number.isFinite(Number(row.delta)));
    const avgDelta = ratingRows.length
      ? Math.round(ratingRows.reduce((sum, row) => sum + Number(row.delta), 0) / ratingRows.length * 10) / 10
      : 0;

    elements.summary.innerHTML = [
      summaryMetric("Database", `${profiles.length} rows`),
      summaryMetric("Visible", visible.length),
      summaryMetric("Changed", edited.length),
      summaryMetric("Avg overall delta", signed(avgDelta)),
      summaryMetric("Saved", "Browser")
    ].join("");
  }

  function summaryMetric(label, value) {
    return `<div class="summary-metric"><span>${escapeHtml(label)}</span><b>${escapeHtml(String(value))}</b></div>`;
  }

  function renderCards() {
    const rows = visibleProfiles();
    if (!rows.length) {
      elements.grid.innerHTML = `<div class="empty">No players match this view.</div>`;
      return;
    }

    elements.grid.innerHTML = rows.map(renderCard).join("");
    elements.grid.querySelectorAll("[data-rating-key]").forEach((input) => input.addEventListener("input", handleRatingInput));
    elements.grid.querySelectorAll("[data-notes-input]").forEach((input) => input.addEventListener("input", handleNotesInput));
    elements.grid.querySelectorAll("[data-quick]").forEach((button) => button.addEventListener("click", handleQuickButton));
    elements.grid.querySelectorAll("[data-position-toggle]").forEach((button) => button.addEventListener("click", handlePositionToggle));
  }

  function renderCard(profile) {
    const override = state.overrides.seasons[profile.seasonKey];
    const careerOverride = getCareerOverride(profile);
    const values = currentValues(profile);
    const positions = currentPrimaryPositions(profile);
    const coverPositions = currentCoverPositions(profile);
    const delta = values.overall - profile.ratings.overall;
    const edited = Boolean(override || careerOverride);

    return `
      <article class="rating-card ${edited ? "edited" : ""}" data-season-key="${escapeHtml(profile.seasonKey)}">
        <div class="card-top">
          <div>
            <div class="player-name">${escapeHtml(profile.name)}</div>
            <div class="player-meta">${escapeHtml(profile.year)} ${escapeHtml(profile.state)} | Primary: ${escapeHtml(positions.map(positionLabel).join(", ") || "No position")} | Cover: ${escapeHtml(coverPositions.map(positionLabel).join(", ") || "None")}</div>
            <div class="player-detail">Original this year: ${escapeHtml(profile.positions.map(positionLabel).join(", ") || "None")}. ${edited ? "Saved override active." : "No override yet."}</div>
          </div>
          <div class="badge ${ratingClass(values.overall)}">${values.overall}</div>
        </div>
        <div class="position-editor">
          <div class="position-group">
            <div class="position-title">Primary positions <span>career-wide</span></div>
            <div class="position-options">
              ${POSITION_KEYS.map((position) => `
                <button class="${positions.includes(position) ? "active primary" : ""}" data-position-kind="primary" data-position-toggle="${position}" data-season-key="${escapeHtml(profile.seasonKey)}">${POSITION_LABELS[position]}</button>
              `).join("")}
            </div>
          </div>
          <div class="position-group">
            <div class="position-title">Cover positions <span>career-wide</span></div>
            <div class="position-options cover-options">
              ${POSITION_KEYS.map((position) => `
                <button class="${coverPositions.includes(position) ? "active cover" : ""}" data-position-kind="cover" data-position-toggle="${position}" data-season-key="${escapeHtml(profile.seasonKey)}">${POSITION_LABELS[position]}</button>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="rating-fields">
          ${RATING_KEYS.map((key) => `
            <label>
              <span>${KEY_LABELS[key]}</span>
              <input data-season-key="${escapeHtml(profile.seasonKey)}" data-rating-key="${key}" type="number" inputmode="numeric" min="1" max="100" step="1" value="${values[key]}" />
            </label>
          `).join("")}
        </div>
        <div class="quick-row">
          <button data-quick="reset" data-season-key="${escapeHtml(profile.seasonKey)}">Same</button>
          <button data-quick="-2" data-season-key="${escapeHtml(profile.seasonKey)}">-2</button>
          <button data-quick="-1" data-season-key="${escapeHtml(profile.seasonKey)}">-1</button>
          <button data-quick="1" data-season-key="${escapeHtml(profile.seasonKey)}">+1</button>
          <button data-quick="2" data-season-key="${escapeHtml(profile.seasonKey)}">+2</button>
          <span class="delta ${deltaClass(delta)}">Overall delta ${signed(delta)}</span>
        </div>
        <textarea data-notes-input="${escapeHtml(profile.seasonKey)}" placeholder="Optional note">${escapeHtml(override?.notes || "")}</textarea>
      </article>
    `;
  }

  function visibleProfiles() {
    let rows = state.viewMode === "all" ? profiles : state.batchIds.map((id) => profileMap.get(id)).filter(Boolean);

    if (state.viewMode === "edited") {
      const edited = new Map();
      Object.keys(state.overrides.seasons).forEach((id) => {
        const profile = profileMap.get(id);
        if (profile) edited.set(profile.seasonKey, profile);
      });
      Object.keys(state.overrides.careers).forEach((careerId) => {
        (profilesByCareer.get(careerId) || []).forEach((profile) => edited.set(profile.seasonKey, profile));
      });
      rows = [...edited.values()];
    }

    if (state.stateFilter !== "all") rows = rows.filter((profile) => profile.state === state.stateFilter);
    if (state.yearFilter !== "all") rows = rows.filter((profile) => String(profile.year) === state.yearFilter);
    if (state.search) rows = profiles.filter((profile) => profile.searchText.includes(state.search));

    return rows;
  }

  function handleRatingInput(event) {
    const profile = profileMap.get(event.currentTarget.dataset.seasonKey);
    if (!profile) return;
    const ratings = currentValues(profile);
    const key = event.currentTarget.dataset.ratingKey;
    ratings[key] = clamp(Math.round(Number(event.currentTarget.value) || profile.ratings[key]), 1, 100);
    updateSeasonOverride(profile, ratings, state.overrides.seasons[profile.seasonKey]?.notes || "");
  }

  function handleNotesInput(event) {
    const profile = profileMap.get(event.currentTarget.dataset.notesInput);
    if (!profile) return;
    const ratings = currentValues(profile);
    updateSeasonOverride(profile, ratings, event.currentTarget.value);
  }

  function handlePositionToggle(event) {
    const profile = profileMap.get(event.currentTarget.dataset.seasonKey);
    if (!profile) return;
    const position = event.currentTarget.dataset.positionToggle;
    const kind = event.currentTarget.dataset.positionKind;
    const primary = currentPrimaryPositions(profile);
    const cover = currentCoverPositions(profile);
    let nextPrimary = [...primary];
    let nextCover = [...cover];

    if (kind === "primary") {
      if (nextPrimary.includes(position)) {
        if (nextPrimary.length === 1) return;
        nextPrimary = nextPrimary.filter((item) => item !== position);
      } else {
        nextPrimary.push(position);
        nextCover = nextCover.filter((item) => item !== position);
      }
    } else {
      if (nextCover.includes(position)) {
        nextCover = nextCover.filter((item) => item !== position);
      } else {
        if (nextPrimary.includes(position)) {
          if (nextPrimary.length === 1) return;
          nextPrimary = nextPrimary.filter((item) => item !== position);
        }
        nextCover.push(position);
      }
    }

    updateCareerPositionOverride(profile, sortPositions(nextPrimary), sortPositions(nextCover));
    render();
  }

  function handleQuickButton(event) {
    const profile = profileMap.get(event.currentTarget.dataset.seasonKey);
    if (!profile) return;
    const action = event.currentTarget.dataset.quick;

    if (action === "reset") {
      delete state.overrides.seasons[profile.seasonKey];
      delete state.overrides.careers[profile.careerId];
      saveOverrides();
      render();
      return;
    }

    const delta = Number(action);
    const ratings = currentValues(profile);
    for (const key of RATING_KEYS) {
      if (key === "goalKicking") continue;
      ratings[key] = clamp(ratings[key] + delta, 1, 100);
    }
    updateSeasonOverride(profile, ratings, state.overrides.seasons[profile.seasonKey]?.notes || "");
    render();
  }

  function updateSeasonOverride(profile, ratings, notes = state.overrides.seasons[profile.seasonKey]?.notes || "") {
    const changed = RATING_KEYS.some((key) => Number(ratings[key]) !== Number(profile.ratings[key]));
    if (!changed && !notes.trim()) {
      delete state.overrides.seasons[profile.seasonKey];
    } else {
      state.overrides.seasons[profile.seasonKey] = {
        seasonKey: profile.seasonKey,
        careerId: profile.careerId,
        name: profile.name,
        state: profile.state,
        year: profile.year,
        baseRatings: profile.ratings,
        ratings: Object.fromEntries(RATING_KEYS.map((key) => [key, clamp(Math.round(Number(ratings[key])), 1, 100)])),
        notes,
        updatedAt: new Date().toISOString()
      };
    }
    saveOverrides();
    renderSummary();
    refreshCard(profile);
  }

  function updateCareerPositionOverride(profile, positions, coverPositions) {
    const baseCover = profile.coverPositions || deriveCoverPositions(profile.positions);
    const positionChanged = !samePositions(positions, profile.positions) || !samePositions(coverPositions, baseCover);

    if (!positionChanged) {
      delete state.overrides.careers[profile.careerId];
    } else {
      state.overrides.careers[profile.careerId] = {
        careerId: profile.careerId,
        name: profile.name,
        basePositions: profile.positions,
        baseCoverPositions: baseCover,
        positions: sortPositions(positions),
        coverPositions: sortPositions(coverPositions).filter((position) => !positions.includes(position)),
        updatedAt: new Date().toISOString()
      };
    }

    saveOverrides();
    renderSummary();
  }

  function refreshCard(profile) {
    const card = elements.grid.querySelector(`[data-season-key="${cssEscape(profile.seasonKey)}"]`);
    if (!card) return;
    const values = currentValues(profile);
    const positions = currentPrimaryPositions(profile);
    const coverPositions = currentCoverPositions(profile);
    const delta = values.overall - profile.ratings.overall;
    card.classList.toggle("edited", Boolean(state.overrides.seasons[profile.seasonKey] || getCareerOverride(profile)));
    const badge = card.querySelector(".badge");
    if (badge) {
      badge.className = `badge ${ratingClass(values.overall)}`;
      badge.textContent = values.overall;
    }
    const deltaNode = card.querySelector(".delta");
    if (deltaNode) {
      deltaNode.className = `delta ${deltaClass(delta)}`;
      deltaNode.textContent = `Overall delta ${signed(delta)}`;
    }
    const detail = card.querySelector(".player-detail");
    if (detail) detail.textContent = `Original this year: ${profile.positions.map(positionLabel).join(", ") || "None"}. ${state.overrides.seasons[profile.seasonKey] || getCareerOverride(profile) ? "Saved override active." : "No override yet."}`;
    const meta = card.querySelector(".player-meta");
    if (meta) meta.textContent = `${profile.year} ${profile.state} | Primary: ${positions.map(positionLabel).join(", ") || "No position"} | Cover: ${coverPositions.map(positionLabel).join(", ") || "None"}`;
    card.querySelectorAll("[data-position-toggle]").forEach((button) => {
      const list = button.dataset.positionKind === "cover" ? coverPositions : positions;
      button.classList.toggle("active", list.includes(button.dataset.positionToggle));
      button.classList.toggle("primary", button.dataset.positionKind === "primary" && list.includes(button.dataset.positionToggle));
      button.classList.toggle("cover", button.dataset.positionKind === "cover" && list.includes(button.dataset.positionToggle));
    });
  }

  function currentValues(profile) {
    return {
      ...profile.ratings,
      ...(state.overrides.seasons[profile.seasonKey]?.ratings || {})
    };
  }

  function currentPrimaryPositions(profile) {
    const positions = getCareerOverride(profile)?.positions || profile.positions || [];
    return sortPositions(positions.filter((position) => POSITION_KEYS.includes(position)));
  }

  function currentCoverPositions(profile) {
    const override = getCareerOverride(profile);
    const coverPositions = Array.isArray(override?.coverPositions)
      ? override.coverPositions
      : profile.coverPositions || deriveCoverPositions(currentPrimaryPositions(profile));
    return sortPositions(coverPositions.filter((position) => POSITION_KEYS.includes(position) && !currentPrimaryPositions(profile).includes(position)));
  }

  function getCareerOverride(profile) {
    return state.overrides.careers[profile.careerId] || null;
  }

  async function copyJson() {
    const payload = JSON.stringify(buildExportPayload(), null, 2);
    showExport("JSON Export", payload, "JSON is shown below. Trying to copy it now.");
    if (await copyText(payload)) {
      flashButton(elements.copyJson, "Copied");
      elements.exportStatus.textContent = "Copied to clipboard. You can also copy it manually below.";
      return;
    }
    selectExportText();
    flashButton(elements.copyJson, "Select Below");
    elements.exportStatus.textContent = "Clipboard was blocked, so the JSON is selected below. Press Ctrl+C.";
  }

  function downloadCsv() {
    const rows = exportRows();
    const headers = ["type", "seasonKey", "careerId", "name", "state", "year", "basePositions", "positions", "baseCoverPositions", "coverPositions", "baseOverall", "overall", "delta", "attack", "defence", "workrate", "kicking", "goalKicking", "bigGame", "notes"];
    const csv = [
      headers.join(","),
      ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(","))
    ].join("\n");
    showExport("CSV Export", csv, "CSV is shown below. Starting download now.");
    if (downloadText(csv, "origin-rating-overrides.csv", "text/csv")) {
      flashButton(elements.downloadCsv, "Downloaded");
      elements.exportStatus.textContent = "Download started. If no file appears, copy the CSV below.";
      return;
    }
    selectExportText();
    flashButton(elements.downloadCsv, "Select Below");
    elements.exportStatus.textContent = "Download was blocked, so the CSV is selected below. Press Ctrl+C.";
  }

  function buildExportPayload() {
    return {
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      count: exportRows().length,
      seasons: state.overrides.seasons,
      careers: state.overrides.careers,
      rows: exportRows()
    };
  }

  function exportRows() {
    const seasonRows = Object.values(state.overrides.seasons)
      .map((override) => {
        const profile = profileMap.get(override.seasonKey);
        const ratings = override.ratings || {};
        return {
          type: "rating",
          seasonKey: override.seasonKey,
          careerId: override.careerId,
          name: override.name,
          state: override.state,
          year: override.year,
          basePositions: (profile?.positions || []).join("/"),
          positions: currentPrimaryPositions(profile || override).join("/"),
          baseCoverPositions: profile ? (profile.coverPositions || deriveCoverPositions(profile.positions)).join("/") : "",
          coverPositions: profile ? currentCoverPositions(profile).join("/") : "",
          baseOverall: profile?.ratings.overall ?? override.baseRatings?.overall ?? "",
          overall: ratings.overall,
          delta: Number(ratings.overall) - Number(profile?.ratings.overall ?? override.baseRatings?.overall ?? ratings.overall),
          attack: ratings.attack,
          defence: ratings.defence,
          workrate: ratings.workrate,
          kicking: ratings.kicking,
          goalKicking: ratings.goalKicking,
          bigGame: ratings.bigGame,
          notes: override.notes || ""
        };
      })
      .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) || b.year - a.year || a.name.localeCompare(b.name));

    const careerRows = Object.values(state.overrides.careers)
      .map((override) => ({
        type: "positions",
        seasonKey: "",
        careerId: override.careerId,
        name: override.name,
        state: "All",
        year: "All",
        basePositions: (override.basePositions || []).join("/"),
        positions: (override.positions || []).join("/"),
        baseCoverPositions: (override.baseCoverPositions || []).join("/"),
        coverPositions: (override.coverPositions || []).join("/"),
        baseOverall: "",
        overall: "",
        delta: "",
        attack: "",
        defence: "",
        workrate: "",
        kicking: "",
        goalKicking: "",
        bigGame: "",
        notes: ""
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return [...careerRows, ...seasonRows];
  }

  function saveOverrides() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.overrides));
  }

  function saveBatch() {
    localStorage.setItem(BATCH_KEY, JSON.stringify(state.batchIds));
  }

  function normaliseStore(store) {
    const seasons = store.seasons || {};
    const careers = store.careers || {};
    let changed = false;

    Object.values(seasons).forEach((override) => {
      if (!override?.careerId || !Array.isArray(override.positions) || careers[override.careerId]) return;
      const basePositions = override.basePositions || [];
      careers[override.careerId] = {
        careerId: override.careerId,
        name: override.name,
        basePositions,
        baseCoverPositions: override.baseCoverPositions || deriveCoverPositions(basePositions),
        positions: sortPositions(override.positions),
        coverPositions: sortPositions(override.coverPositions || deriveCoverPositions(override.positions)),
        updatedAt: override.updatedAt || new Date().toISOString()
      };
      delete override.positions;
      delete override.coverPositions;
      delete override.basePositions;
      changed = true;
    });

    for (const [seasonKey, override] of Object.entries(seasons)) {
      const profile = profileMap.get(seasonKey);
      if (!profile || !override?.ratings) {
        delete seasons[seasonKey];
        changed = true;
        continue;
      }

      const hasRatingChange = RATING_KEYS.some((key) => Number(override.ratings[key]) !== Number(profile.ratings[key]));
      if (!hasRatingChange && !String(override.notes || "").trim()) {
        delete seasons[seasonKey];
        changed = true;
      }
    }

    for (const [careerId, override] of Object.entries(careers)) {
      const rows = profilesByCareer.get(careerId) || [];
      if (!rows.length) {
        delete careers[careerId];
        changed = true;
        continue;
      }

      const positions = sortPositions(override.positions || []);
      const coverPositions = sortPositions(override.coverPositions || []).filter((position) => !positions.includes(position));
      const alreadyInDatabase = rows.every((profile) =>
        samePositions(positions, profile.positions) &&
        samePositions(coverPositions, profile.coverPositions || deriveCoverPositions(profile.positions || []))
      );

      if (alreadyInDatabase) {
        delete careers[careerId];
        changed = true;
      }
    }

    return { store: { seasons, careers }, changed };
  }

  function loadJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  async function copyText(text) {
    if (navigator.clipboard?.writeText) {
      try {
        await Promise.race([
          navigator.clipboard.writeText(text),
          new Promise((_, reject) => window.setTimeout(() => reject(new Error("Clipboard timed out")), 1000))
        ]);
        return true;
      } catch {
        // Fall through to selected-text fallback.
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

  function showExport(title, text, status) {
    elements.exportPanel.hidden = false;
    elements.exportTitle.textContent = title;
    elements.exportStatus.textContent = status;
    elements.exportText.value = text;
    elements.exportPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function flashButton(button, text) {
    const original = button.textContent;
    button.textContent = text;
    window.setTimeout(() => {
      button.textContent = original;
    }, 1200);
  }

  function positionLabel(position) {
    return POSITION_LABELS[position] || position;
  }

  function sortPositions(positions) {
    const unique = [...new Set(positions.filter((position) => POSITION_KEYS.includes(position)))];
    return unique.sort((a, b) => POSITION_KEYS.indexOf(a) - POSITION_KEYS.indexOf(b));
  }

  function deriveCoverPositions(primaryPositions) {
    const coverMap = {
      fullback: ["wing", "centre"],
      wing: ["fullback", "centre"],
      centre: ["wing", "fullback"],
      edge: ["middle", "lock"],
      middle: ["edge", "lock"],
      lock: ["middle", "edge"]
    };
    return sortPositions(POSITION_KEYS.filter((slotKey) =>
      !primaryPositions.includes(slotKey) &&
      (coverMap[slotKey] || []).some((position) => primaryPositions.includes(position))
    ));
  }

  function samePositions(left, right) {
    const a = sortPositions(left || []);
    const b = sortPositions(right || []);
    return a.length === b.length && a.every((position, index) => position === b[index]);
  }

  function ratingClass(value) {
    if (value >= 90) return "r90";
    if (value >= 85) return "r85";
    if (value >= 80) return "r80";
    if (value >= 75) return "r75";
    if (value >= 70) return "r70";
    return "rLow";
  }

  function deltaClass(delta) {
    if (delta > 0) return "positive";
    if (delta < 0) return "negative";
    return "";
  }

  function signed(value) {
    return Number(value) > 0 ? `+${value}` : String(value);
  }

  function csvCell(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
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

  function slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function cssEscape(value) {
    if (window.CSS?.escape) return window.CSS.escape(value);
    return String(value).replace(/["\\]/g, "\\$&");
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
