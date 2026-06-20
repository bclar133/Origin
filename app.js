const DATA = window.ORIGIN_INVINCIBLE_DATA;
const RATING_OVERRIDE_KEY = "origin-invincible-rating-overrides-v1";
const RATING_OVERRIDES = loadRatingOverrides();

const SLOTS = [
  { key: "fullback", label: "Fullback" },
  { key: "wing", label: "Wing 1" },
  { key: "wing", label: "Wing 2" },
  { key: "centre", label: "Centre 1" },
  { key: "centre", label: "Centre 2" },
  { key: "half", label: "Half 1" },
  { key: "half", label: "Half 2" },
  { key: "edge", label: "Edge 1" },
  { key: "edge", label: "Edge 2" },
  { key: "middle", label: "Middle 1" },
  { key: "middle", label: "Middle 2" },
  { key: "lock", label: "Lock" },
  { key: "hooker", label: "Hooker" }
];

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

const COVER_GROUPS = {
  fullback: ["wing", "centre"],
  wing: ["fullback", "centre"],
  centre: ["wing", "fullback"],
  half: [],
  edge: ["middle", "lock"],
  middle: ["edge", "lock"],
  lock: ["middle", "edge"],
  hooker: []
};

const IMMORTAL_ORIGIN_STATES = {
  "Clive Churchill": "NSW",
  "Bob Fulton": "NSW",
  "Reg Gasnier": "NSW",
  "Johnny Raper": "NSW",
  "Graeme Langlands": "NSW",
  "Wally Lewis": "QLD",
  "Arthur Beetson": "QLD",
  "Andrew Johns": "NSW",
  "Dave Brown": "NSW",
  "Frank Burge": "NSW",
  "Mal Meninga": "QLD",
  "Dally Messenger": "NSW",
  "Norm Provan": "NSW",
  "Ron Coote": "NSW"
};

const STRATEGIES = {
  balanced: {
    label: "Balanced",
    hint: "No major trade-off.",
    attack: 0,
    defence: 0,
    power: 0,
    spine: 0,
    noConcede: 0
  },
  aggressive: {
    label: "Aggressive",
    hint: "Forward punch and pressure, but more risk.",
    attack: 3,
    defence: -2,
    power: 5,
    spine: 0,
    noConcede: -0.04
  },
  controlled: {
    label: "Controlled",
    hint: "Field position, kicking and clean-sheet focus.",
    attack: -2,
    defence: 4,
    power: 1,
    spine: 3,
    noConcede: 0.04
  },
  expansive: {
    label: "Expansive",
    hint: "Backline strike, but easier to counter.",
    attack: 6,
    defence: -4,
    power: -1,
    spine: 2,
    noConcede: -0.06
  }
};

const VENUE_PATTERNS = [
  ["Suncorp Stadium", "Accor Stadium", "Suncorp Stadium"],
  ["Accor Stadium", "Suncorp Stadium", "Accor Stadium"],
  ["Suncorp Stadium", "Accor Stadium", "MCG"],
  ["Accor Stadium", "Suncorp Stadium", "MCG"],
  ["MCG", "Suncorp Stadium", "Accor Stadium"]
];

const VENUES = {
  "Suncorp Stadium": { state: "QLD", label: "Suncorp Stadium, Qld" },
  "Accor Stadium": { state: "NSW", label: "Accor Stadium, NSW" },
  MCG: { state: "NEUTRAL", label: "MCG, Victoria" }
};

const state = {
  selectedState: null,
  phase: "choose",
  drafted: Array(SLOTS.length).fill(null),
  opponents: Array(SLOTS.length).fill(null),
  currentOffer: null,
  rerollUsed: false,
  strategy: "balanced",
  goalKickerId: null,
  venues: [],
  gameIndex: 0,
  live: null,
  results: [],
  changesRemaining: 0,
  unavailableCareerIds: new Set(),
  notes: [],
  seriesStats: null,
  isAnimating: false
};

const app = document.querySelector("#app");

render();
app.addEventListener("click", handleClick);

function handleClick(event) {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  const action = button.dataset.action;
  if (!action) return;

  if (action === "choose-state") chooseState(button.dataset.state);
  if (action === "spin") spinOffer();
  if (action === "reroll") rerollOffer();
  if (action === "draft") draftPlayer(button.dataset.playerId, Number(button.dataset.slot));
  if (action === "strategy") setStrategy(button.dataset.strategy);
  if (action === "goal-kicker") setGoalKicker(button.dataset.playerId);
  if (action === "start-series") startSeries();
  if (action === "continue-series") continueSeries();
  if (action === "replace") replacePlayer(Number(button.dataset.slot));
  if (action === "new-series") resetGame();
}

function chooseState(value) {
  state.selectedState = value;
  state.phase = "draft";
  document.body.className = value.toLowerCase();
  render();
}

function resetGame() {
  Object.assign(state, {
    selectedState: null,
    phase: "choose",
    drafted: Array(SLOTS.length).fill(null),
    opponents: Array(SLOTS.length).fill(null),
    currentOffer: null,
    rerollUsed: false,
    strategy: "balanced",
    goalKickerId: null,
    venues: [],
    gameIndex: 0,
    live: null,
    results: [],
    changesRemaining: 0,
    unavailableCareerIds: new Set(),
    notes: [],
    seriesStats: null,
    isAnimating: false
  });
  document.body.className = "neutral";
  render();
}

function render() {
  if (!state.selectedState) {
    app.innerHTML = renderStateChoice();
    return;
  }

  app.innerHTML = `
    ${renderHero()}
    <div class="layout">
      ${renderLineupPanel()}
      ${renderMainPanel()}
    </div>
  `;
}

function renderStateChoice() {
  return `
    <section class="choice-screen">
      <div>
        <h1>Origin Invincible</h1>
        <p class="subtle">Pick your state, build an all-era Origin XIII, and try to win a three-game series without conceding a point.</p>
        <a class="calibration-link" href="rating-calibration.html">Rating calibration</a>
      </div>
      <div class="state-grid">
        <button class="state-card qld-card" data-action="choose-state" data-state="QLD">
          <span class="pill">Queensland</span>
          <strong>QLD</strong>
          <p>Maroon pressure, Suncorp energy, and Origin chaos.</p>
        </button>
        <button class="state-card nsw-card" data-action="choose-state" data-state="NSW">
          <span class="pill">New South Wales</span>
          <strong>NSW</strong>
          <p>Sky blue speed, Accor control, and series redemption.</p>
        </button>
      </div>
    </section>
  `;
}

function renderHero() {
  const record = state.results.reduce((acc, game) => {
    if (game.userScore > game.oppScore) acc.wins += 1;
    if (game.userScore < game.oppScore) acc.losses += 1;
    if (game.userScore === game.oppScore) acc.draws += 1;
    acc.against += game.oppScore;
    return acc;
  }, { wins: 0, losses: 0, draws: 0, against: 0 });

  return `
    <section class="hero">
      <div class="brand">
        ${renderOriginMark()}
        <div>
          <h1>Origin Invincible</h1>
          <p>${state.selectedState} campaign. Win the series and keep the other state scoreless.</p>
        </div>
      </div>
      <div class="hero-meta">
        <span class="pill">${record.wins}-${record.losses}${record.draws ? `-${record.draws}` : ""} series games</span>
        <span class="pill">${record.against} points conceded</span>
        <span class="pill">${countFilledSlots()}/13 selected</span>
      </div>
    </section>
  `;
}

function renderOriginMark() {
  return `
    <svg class="mark" viewBox="0 0 64 64" role="img" aria-label="Origin Invincible icon">
      <rect width="64" height="64" rx="14" fill="#07100c"></rect>
      <path d="M32 7 53 17v16c0 13.6-8 21.6-21 25C19 54.6 11 46.6 11 33V17L32 7Z" fill="#7b2334"></path>
      <path d="M32 7 53 17v16c0 13.6-8 21.6-21 25V7Z" fill="#70c8f2"></path>
      <path d="M17 31h30M20 21h24M22 41h20" stroke="#ffffff" stroke-opacity=".42" stroke-width="2"></path>
      <ellipse cx="32" cy="34" rx="10" ry="6" fill="#f4fff7" transform="rotate(-18 32 34)"></ellipse>
      <path d="M27 34h10M32 29v10" stroke="#122018" stroke-width="1.6" stroke-linecap="round"></path>
      <path d="M32 7 53 17v16c0 13.6-8 21.6-21 25C19 54.6 11 46.6 11 33V17L32 7Z" fill="none" stroke="#ffd45d" stroke-width="2"></path>
    </svg>
  `;
}

function renderLineupPanel() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Selected XIII</h2>
        <span class="pill">${state.phase === "selection" ? `${state.changesRemaining} changes` : state.phase}</span>
      </div>
      <div class="panel-body">
        ${state.notes.length ? `<div class="subtle">${state.notes.map(escapeHTML).join("<br>")}</div><br>` : ""}
        <div class="slot-list">
          ${SLOTS.map((slot, index) => renderSlot(slot, index)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSlot(slot, index) {
  const pick = state.drafted[index];
  const open = !pick;
  const canReplace = state.phase === "selection" && pick && state.changesRemaining > 0;
  return `
    <div class="slot ${open ? "open" : ""}">
      <div class="slot-label">${slot.label}</div>
      <div>
        <div class="slot-name">${pick ? escapeHTML(pick.name) : "Open"}</div>
        <div class="slot-meta">
          ${pick ? `${pick.fit.label} fit | ${pick.effectiveRatings.overall} rating${pick.isImmortal ? " | Immortal" : ""}` : `Needs ${POSITION_LABELS[slot.key]}`}
        </div>
      </div>
      ${canReplace ? `<button class="slot-action" data-action="replace" data-slot="${index}">Change</button>` : ""}
    </div>
  `;
}

function renderMainPanel() {
  if (state.phase === "setup") return renderSetupPanel();
  if (state.phase === "live") return renderLivePanel();
  if (state.phase === "selection") return renderSelectionPanel();
  if (state.phase === "complete") return renderResultsPanel();
  return renderDraftPanel();
}

function renderDraftPanel() {
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>${state.phase === "selection" ? "Replacement Spin" : "Spin A State Team"}</h2>
        <span class="pill">${isDraftComplete() ? "XIII complete" : `${13 - countFilledSlots()} slots open`}</span>
      </div>
      <div class="panel-body">
        ${renderDraftBody()}
      </div>
    </section>
  `;
}

function renderDraftBody() {
  const complete = isDraftComplete();
  return `
    ${complete ? `
      <p class="subtle">Your XIII is complete. Choose the series strategy and goal kicker before Game 1.</p>
      <button class="primary-button" data-action="start-series">Choose Strategy</button>
    ` : `
      <button class="primary-button spin-button" data-action="spin">Spin</button>
      <div class="draft-actions">
        <button class="secondary-button" data-action="reroll" ${state.currentOffer && !state.rerollUsed ? "" : "disabled"}>
          Re-roll ${state.rerollUsed ? "used" : "available"}
        </button>
        <span class="mini">One re-roll per series.</span>
      </div>
      <p class="subtle">Spin a random ${state.selectedState} Origin year, then choose one player for an available position. The opposition quietly selects a matching player.</p>
      ${state.currentOffer ? renderOffer() : ""}
    `}
  `;
}

function renderOffer() {
  const offer = state.currentOffer;
  return `
    <div class="offer-head">
      <div>
        <h3>${escapeHTML(offer.title)}</h3>
        <div class="subtle">${offer.subtitle}</div>
      </div>
      ${offer.hasImmortal ? `<span class="tag immortal">Immortal appeared</span>` : ""}
    </div>
    <div class="candidate-grid">
      ${offer.players.map(renderCandidate).join("")}
    </div>
  `;
}

function renderCandidate(player) {
  const slots = getAvailableSlotsForPlayer(player);
  const unavailable = !slots.length || isCareerUnavailable(player.careerId);
  return `
    <article class="candidate ${unavailable ? "unavailable" : ""}">
      <div class="candidate-top">
        <div>
          <div class="candidate-name">${escapeHTML(player.name)}</div>
          <div class="candidate-role">${escapeHTML(player.role || "Origin player")}</div>
        </div>
        <div class="rating ${ratingClass(player.ratings.overall)}">${player.ratings.overall}</div>
      </div>
      <div class="position-tags">
        ${player.positions.map((position) => `<span class="tag">${POSITION_LABELS[position]}</span>`).join("")}
        ${getPlayerCoverPositions(player).map((position) => `<span class="tag cover">${POSITION_LABELS[position]} cover</span>`).join("")}
        ${player.isImmortal ? `<span class="tag immortal">Immortal</span>` : ""}
      </div>
      <div class="slot-buttons">
        ${slots.map(({ index, fit }) => `
          <button data-action="draft" data-player-id="${player.id}" data-slot="${index}">
            ${escapeHTML(SLOTS[index].label)}${fit.level === "cover" ? " cover" : ""}
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderSetupPanel() {
  const strategy = STRATEGIES[state.strategy];
  const kicker = getGoalKicker();
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Series Setup</h2>
        <span class="pill">${strategy.label}</span>
      </div>
      <div class="panel-body">
        <h3>Strategy</h3>
        ${renderStrategyPicker()}
        <br>
        <h3>Goal Kicker</h3>
        ${renderGoalKickerPicker()}
        <br>
        <div class="status-strip">
          ${renderMetric("Attack", calculateTeamRatings().attack)}
          ${renderMetric("Defence", calculateTeamRatings().defence)}
          ${renderMetric("Spine", calculateTeamRatings().spine)}
          ${renderMetric("Goal kicker", kicker ? kicker.name : "None")}
        </div>
        <br>
        <button class="primary-button" data-action="start-series" ${!kicker ? "disabled" : ""}>Start Game 1</button>
      </div>
    </section>
  `;
}

function renderStrategyPicker() {
  return `
    <div class="strategy-grid">
      ${Object.entries(STRATEGIES).map(([key, item]) => `
        <button class="strategy-card ${state.strategy === key ? "active" : ""}" data-action="strategy" data-strategy="${key}">
          <strong>${item.label}</strong>
          <span class="mini">${item.hint}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderGoalKickerPicker() {
  const activeKicker = getGoalKicker();
  return `
    <div class="kicker-grid">
      ${getGoalKickerCandidates().map((pick) => `
        <button class="kicker-card ${activeKicker?.id === pick.id ? "active" : ""}" data-action="goal-kicker" data-player-id="${pick.id}">
          <strong>${escapeHTML(pick.name)}</strong>
          <span class="mini">${pick.effectiveRatings.goalKicking}% goal kicking | ${pick.effectiveRatings.kicking} kicking</span>
        </button>
      `).join("")}
    </div>
  `;
}

function renderMetric(label, value) {
  return `<div class="metric"><span class="mini-label">${label}</span><strong>${escapeHTML(value)}</strong></div>`;
}

function renderLivePanel() {
  const live = state.live;
  const liveScore = live ? calculateRevealedScore(live) : { user: 0, opponent: 0 };
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Game ${state.gameIndex + 1} Live</h2>
        <span class="pill">${escapeHTML(live?.venue?.label || "")}</span>
      </div>
      <div class="panel-body">
        ${live ? `
          <div class="game-card">
            <div class="scoreline">
              <div>
                <div class="mini-label">${state.selectedState}</div>
                <div class="score">${liveScore.user}</div>
              </div>
              <div class="score-versus">v</div>
              <div>
                <div class="mini-label">${opponentState()}</div>
                <div class="score opponent-score ${liveScore.opponent > 0 ? "conceded" : ""}">${liveScore.opponent}</div>
              </div>
            </div>
            <div class="event-feed">
              ${live.revealed.map(renderEvent).join("")}
            </div>
          </div>
        ` : `<p class="subtle">Preparing Origin theatre...</p>`}
      </div>
    </section>
  `;
}

function renderEvent(event) {
  return `
    <div class="event ${event.type} ${event.against ? "against" : ""}">
      <div class="minute">${event.minute}</div>
      <div>${escapeHTML(event.text)}</div>
    </div>
  `;
}

function calculateRevealedScore(live) {
  return live.revealed.reduce((score, event) => {
    if (typeof event.points !== "number") return score;
    if (event.isUser) score.user += event.points;
    else score.opponent += event.points;
    return score;
  }, { user: 0, opponent: 0 });
}

function renderSelectionPanel() {
  const last = state.results[state.results.length - 1];
  const lineupFull = isDraftComplete();
  const nextGame = state.gameIndex + 1;
  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Selection Window</h2>
        <span class="pill">After Game ${state.gameIndex}</span>
      </div>
      <div class="panel-body">
        <div class="scoreline">
          <div>
            <div class="mini-label">${state.selectedState}</div>
            <div class="score">${last.userScore}</div>
          </div>
          <div class="score-versus">v</div>
          <div>
            <div class="mini-label">${opponentState()}</div>
            <div class="score">${last.oppScore}</div>
          </div>
        </div>
        <p class="subtle">Review the Game ${state.gameIndex} player ratings, then make up to two optional changes before Game ${nextGame}. Injured players have already been removed and must be replaced separately.</p>
        <div class="two-col">
          <div>
            <h3>Game ${state.gameIndex} player ratings</h3>
            ${renderGameRatings(last)}
          </div>
          <div>
            <h3>Replacement controls</h3>
            ${lineupFull ? `
              <p class="subtle">${state.changesRemaining} optional change${state.changesRemaining === 1 ? "" : "s"} remaining. Use the Change buttons in the ratings table or selected XIII.</p>
              <button class="primary-button" data-action="continue-series">Continue To Game ${nextGame}</button>
            ` : `
              <p class="subtle">Fill every open slot before the next game.</p>
              ${renderDraftBody()}
            `}
          </div>
        </div>
        <br>
        <div class="panel-section">
          <h3>Mid-series tactics</h3>
          <p class="subtle">You can change strategy and goal kicker before Game ${nextGame}. These do not count as player changes.</p>
          <h3>Strategy</h3>
          ${renderStrategyPicker()}
          <br>
          <h3>Goal Kicker</h3>
          ${renderGoalKickerPicker()}
        </div>
        <br>
        <h3>Series so far</h3>
        ${renderSeriesSummary()}
        <br>
        <h3>Series player stats so far</h3>
        ${renderSeriesStatsTable(sortedUserStats())}
      </div>
    </section>
  `;
}

function renderGameRatings(result) {
  const rows = [...result.userPerformances].sort((a, b) => b.gameRating - a.gameRating);
  return `
    <table>
      <thead><tr><th>Player</th><th>Slot</th><th>Rating</th><th>Change</th></tr></thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${escapeHTML(row.name)}</td>
            <td>${escapeHTML(row.slot)}</td>
            <td>${row.gameRating}</td>
            <td>
              ${state.phase === "selection" && state.changesRemaining > 0 && state.drafted[row.slotIndex] ? `
                <button class="mini-change-button" data-action="replace" data-slot="${row.slotIndex}">Change</button>
              ` : `<span class="mini">-</span>`}
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderResultsPanel() {
  const wins = state.results.filter((game) => game.userScore > game.oppScore).length;
  const losses = state.results.filter((game) => game.userScore < game.oppScore).length;
  const conceded = state.results.reduce((sum, game) => sum + game.oppScore, 0);
  const totals = getSeriesTotals();
  const perfect = wins >= 2 && conceded === 0;
  const medal = calculateWallyLewisMedal();
  const playerStats = sortedUserStats();

  return `
    <section class="panel">
      <div class="panel-header">
        <h2>Series Review</h2>
        <button class="primary-button new-series-button" data-action="new-series">Start New Series</button>
      </div>
      <div class="panel-body">
        <div class="result-banner ${perfect ? "perfect" : ""}">
          <h2>${perfect ? "Origin Invincible" : wins >= 2 ? "Series Won" : "Series Lost"}</h2>
          <p>${state.selectedState} ${wins}-${losses}. ${totals.user}-${totals.opponent} aggregate score. ${totals.combined} combined points across the series.</p>
        </div>
        <div class="status-strip">
          ${renderMetric("Series points", `${totals.user}-${totals.opponent}`)}
          ${renderMetric("Combined points", totals.combined)}
          ${renderMetric("Wally Lewis Medal", `${medal.name} (${medal.total})`)}
          ${renderMetric("Top try-scorer", leaderText(playerStats, "tries"))}
        </div>
        <br>
        <h3>Series summary</h3>
        ${renderSeriesSummary()}
        <br>
        <div class="two-col">
          <div>
            <h3>Games</h3>
            ${renderSeriesTable()}
          </div>
          <div>
            <h3>Opposition revealed</h3>
            ${renderOppositionTable()}
          </div>
        </div>
        <br>
        <h3>Player stats</h3>
        ${renderSeriesStatsTable(playerStats)}
      </div>
    </section>
  `;
}

function renderSeriesSummary() {
  const totals = getSeriesTotals();
  return `
    <div class="series-summary">
      <div class="summary-score">
        <span>${state.selectedState}</span>
        <strong>${totals.user}</strong>
      </div>
      <div class="summary-score against-total">
        <span>${opponentState()}</span>
        <strong>${totals.opponent}</strong>
      </div>
      <div class="summary-score">
        <span>Combined points</span>
        <strong>${totals.combined}</strong>
      </div>
      <div class="summary-games">
        ${state.results.map((game, index) => `
          <div class="summary-game">
            <span>Game ${index + 1}</span>
            <strong>${state.selectedState} ${game.userScore}-${game.oppScore}</strong>
            <em>${escapeHTML(game.venue.label)}</em>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function getSeriesTotals() {
  const user = state.results.reduce((sum, game) => sum + game.userScore, 0);
  const opponent = state.results.reduce((sum, game) => sum + game.oppScore, 0);
  return { user, opponent, combined: user + opponent };
}

function renderSeriesTable() {
  return `
    <table>
      <thead><tr><th>Game</th><th>Venue</th><th>Score</th><th>MOM</th></tr></thead>
      <tbody>
        ${state.results.map((game, index) => `
          <tr>
            <td>Game ${index + 1}</td>
            <td>${escapeHTML(game.venue.label)}</td>
            <td>${state.selectedState} ${game.userScore}-${game.oppScore}</td>
            <td>${escapeHTML(game.manOfMatch.name)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderOppositionTable() {
  return `
    <table>
      <thead><tr><th>Slot</th><th>${opponentState()}</th><th>Rating</th></tr></thead>
      <tbody>
        ${SLOTS.map((slot, index) => {
          const pick = state.opponents[index];
          return `
            <tr>
              <td>${escapeHTML(slot.label)}</td>
              <td>${pick ? escapeHTML(pick.name) : "-"}</td>
              <td>${pick ? pick.effectiveRatings.overall : "-"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function renderSeriesStatsTable(rows) {
  return `
    <table>
      <thead>
        <tr><th>Player</th><th>Tries</th><th>Goals</th><th>Pts</th><th>Tackles</th><th>Metres</th><th>Avg rating</th></tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${escapeHTML(row.name)}</td>
            <td>${row.tries}</td>
            <td>${row.goals}/${row.goalAttempts}</td>
            <td>${row.points}</td>
            <td>${row.tackles}</td>
            <td>${row.metres}</td>
            <td>${row.games ? Math.round(row.ratingTotal / row.games) : "-"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function spinOffer() {
  const team = randomItem(DATA.teams.filter((item) => item.state === state.selectedState));
  const players = team.players.map((player) => createPlayer(player, team));
  let hasImmortal = false;

  const immortalPool = getImmortalWildcardsForState(state.selectedState);
  if (immortalPool.length && Math.random() < 0.012) {
    const immortal = createPlayer(randomItem(immortalPool), { state: state.selectedState, year: team.year, immortal: true });
    immortal.isImmortal = true;
    immortal.source = "Immortal wildcard";
    players.push(immortal);
    hasImmortal = true;
  }

  state.currentOffer = {
    title: `${team.year} ${team.state}`,
    subtitle: "Only players from this Origin year are available on this spin.",
    hasImmortal,
    players: players
      .filter((player) => !isCareerUnavailable(player.careerId))
      .sort((a, b) => b.ratings.overall - a.ratings.overall || a.name.localeCompare(b.name))
  };
  render();
  scrollToTop();
}

function rerollOffer() {
  if (!state.currentOffer || state.rerollUsed) return;
  state.rerollUsed = true;
  spinOffer();
}

function createPlayer(player, team) {
  const careerId = slug(player.name);
  const override = applyStoredPlayerOverride(player, team, careerId);
  return {
    ...player,
    positions: override.positions,
    coverPositions: override.coverPositions,
    ratings: override.ratings,
    id: `${team.state}-${team.year}-${careerId}-${team.immortal ? "immortal" : "origin"}`,
    careerId,
    state: team.state,
    year: team.year,
    isImmortal: Boolean(team.immortal || player.isImmortal),
    originState: player.originState || IMMORTAL_ORIGIN_STATES[player.name],
    source: team.immortal ? "Immortal wildcard" : `${team.year} ${team.state}`
  };
}

function draftPlayer(playerId, slotIndex) {
  const player = state.currentOffer?.players.find((item) => item.id === playerId);
  if (!player || state.drafted[slotIndex]) return;
  const fit = getPositionFit(player, SLOTS[slotIndex].key);
  if (!fit.canPick) return;

  const pick = createPick(player, slotIndex, fit);
  state.drafted[slotIndex] = pick;
  state.opponents[slotIndex] = selectOpponent(slotIndex);
  state.currentOffer = null;

  if (isDraftComplete()) {
    if (state.phase === "selection") {
      state.goalKickerId = getGoalKicker()?.id || getGoalKickerCandidates()[0]?.id || null;
    } else {
      state.phase = "setup";
      state.goalKickerId = getGoalKickerCandidates()[0]?.id || null;
    }
  }

  render();
}

function createPick(player, slotIndex, fit) {
  return {
    ...player,
    slotIndex,
    slotKey: SLOTS[slotIndex].key,
    fit,
    effectiveRatings: applyPositionFit(player.ratings, fit),
    gamesPlayed: 0
  };
}

function selectOpponent(slotIndex) {
  const slot = SLOTS[slotIndex];
  const oppState = opponentState();
  const pool = DATA.teams
    .filter((team) => team.state === oppState)
    .flatMap((team) => team.players.map((player) => createPlayer(player, team)))
    .filter((player) => !state.opponents.some((pick) => pick?.careerId === player.careerId))
    .map((player) => ({ player, fit: getPositionFit(player, slot.key) }))
    .filter((item) => item.fit.canPick);

  if (Math.random() < 0.006) {
    const immortals = getImmortalWildcardsForState(oppState)
      .map((player) => createPlayer(player, { state: oppState, year: "Any", immortal: true }))
      .map((player) => ({ player: { ...player, isImmortal: true }, fit: getPositionFit(player, slot.key) }))
      .filter((item) => item.fit.canPick);
    if (immortals.length) pool.push(randomItem(immortals));
  }

  const choice = weightedPick(pool, (item) => Math.pow(item.player.ratings.overall, 2.4));
  return createPick(choice.player, slotIndex, choice.fit);
}

function getImmortalWildcardsForState(stateValue) {
  return (DATA.immortalWildcards || []).filter((player) =>
    (player.originState || IMMORTAL_ORIGIN_STATES[player.name]) === stateValue
  );
}

function replacePlayer(slotIndex) {
  const pick = state.drafted[slotIndex];
  if (!pick || state.phase !== "selection" || state.changesRemaining <= 0) return;
  state.unavailableCareerIds.add(pick.careerId);
  state.drafted[slotIndex] = null;
  state.opponents[slotIndex] = null;
  state.changesRemaining -= 1;
  state.currentOffer = null;
  render();
}

function setStrategy(strategy) {
  state.strategy = strategy;
  render();
}

function setGoalKicker(playerId) {
  state.goalKickerId = playerId;
  render();
}

function startSeries() {
  if (!isDraftComplete()) return;
  if (state.phase === "draft") {
    state.phase = "setup";
    render();
    return;
  }
  if (!getGoalKicker()) return;
  state.venues = randomItem(VENUE_PATTERNS).map((name) => VENUES[name]);
  state.results = [];
  state.gameIndex = 0;
  state.seriesStats = createSeriesStats();
  runGame();
}

function continueSeries() {
  if (!isDraftComplete()) return;
  state.currentOffer = null;
  runGame();
}

async function runGame() {
  state.phase = "live";
  state.isAnimating = true;
  const result = simulateGame(state.gameIndex);
  state.live = { ...result, revealed: [] };
  render();

  for (const event of result.events) {
    await delay(revealDelay(event));
    state.live.revealed.push(event);
    render();
  }

  state.results.push(result);
  recordSeriesStats(result);
  applyGameInjuries(result);
  state.gameIndex += 1;
  state.isAnimating = false;

  if (state.gameIndex >= 3) {
    state.phase = "complete";
  } else {
    state.phase = "selection";
    state.changesRemaining = 2;
  }
  render();
}

function simulateGame(gameIndex) {
  const venue = state.venues[gameIndex] || VENUES.MCG;
  const userRatings = calculateTeamRatings();
  const oppRatings = calculateOpponentRatings();
  const strategy = STRATEGIES[state.strategy];
  const matchup = calculateMatchups();
  const home = venue.state === state.selectedState ? 1 : venue.state === opponentState() ? -1 : 0;
  const noConcedeChance = calculateNoConcedeChance(matchup, home, strategy);
  const didKeepScoreless = Math.random() < noConcedeChance;
  const diff = (userRatings.overall + strategy.attack + home * 1.5) - oppRatings.overall;
  const userExpected = clamp(16 + diff * 0.45 + (userRatings.spine - oppRatings.spine) * 0.15 + strategy.attack * 0.4 + home * 1.2, 4, 42);
  const oppExpected = clamp(12 - diff * 0.28 - strategy.defence * 0.35 - noConcedeChance * 3 - home * 0.8, 2, 34);
  const userScoreDetails = makeScore(userExpected, getGoalKicker()?.effectiveRatings.goalKicking || userRatings.goalSkill);
  let oppScoreDetails = didKeepScoreless ? zeroScore() : makeScore(oppExpected, oppRatings.goalSkill);
  if (!didKeepScoreless && oppScoreDetails.score === 0) {
    oppScoreDetails = forceScoringPlay(oppExpected, oppRatings.goalSkill);
  }

  const events = createGameEvents(gameIndex, venue, userScoreDetails, oppScoreDetails, noConcedeChance);
  const userPerformances = createGamePerformances(userScoreDetails, true);
  const opponentPerformances = createGamePerformances(oppScoreDetails, false);
  const manOfMatch = [...userPerformances, ...opponentPerformances].sort((a, b) => b.gameRating - a.gameRating)[0];

  return {
    venue,
    userScore: userScoreDetails.score,
    oppScore: oppScoreDetails.score,
    userScoreDetails,
    oppScoreDetails,
    noConcedeChance,
    matchup,
    events,
    userPerformances,
    opponentPerformances,
    manOfMatch,
    injuries: events.filter((event) => event.injurySlot !== undefined)
  };
}

function createGameEvents(gameIndex, venue, userDetails, oppDetails, noConcedeChance) {
  const events = [
    { minute: "0'", type: "commentary", text: `Game ${gameIndex + 1} kicks off at ${venue.label}. The clean-sheet forecast is ${Math.round(noConcedeChance * 100)}%.` }
  ];

  const scoringEvents = [];
  addScoringEvents(scoringEvents, state.selectedState, userDetails, true);
  addScoringEvents(scoringEvents, opponentState(), oppDetails, false);
  scoringEvents.sort((a, b) => a.rawMinute - b.rawMinute);

  let userAtHalf = 0;
  let oppAtHalf = 0;
  for (const item of scoringEvents) {
    if (item.rawMinute <= 40) {
      if (item.isUser) userAtHalf += item.points;
      else oppAtHalf += item.points;
    }
  }

  events.push(...scoringEvents.filter((item) => item.rawMinute <= 40));
  events.push({ minute: "HT", type: "commentary", text: `Half time: ${state.selectedState} ${userAtHalf}, ${opponentState()} ${oppAtHalf}. ${halfTimeLine(userAtHalf, oppAtHalf)}` });
  events.push(...scoringEvents.filter((item) => item.rawMinute > 40));

  const injuries = rollInjuries();
  events.push(...injuries);
  events.sort((a, b) => minuteValue(a) - minuteValue(b));
  events.push({ minute: "FT", type: "fulltime", text: `Full time: ${state.selectedState} ${userDetails.score}, ${opponentState()} ${oppDetails.score}. ${fullTimeLine(userDetails.score, oppDetails.score)}` });
  return events;
}

function addScoringEvents(events, teamLabel, details, isUser) {
  const lineup = isUser ? state.drafted : state.opponents;
  const kicker = isUser ? getGoalKicker() : bestKicker(lineup);
  const tryScorers = chooseTryScorers(lineup, details.tries);
  for (let i = 0; i < details.tries; i += 1) {
    const scorer = tryScorers[i] || randomItem(lineup.filter(Boolean));
    const minute = randomInt(4, 77);
    const converted = i < details.goals;
    events.push({
      rawMinute: minute,
      minute: `${minute}'`,
      type: "try",
      points: converted ? 6 : 4,
      isUser,
      against: !isUser,
      text: `Try ${teamLabel}: ${scorer.name} scores. ${kicker.name} ${converted ? "converts the try" : "misses the conversion"}.`
    });
  }
  for (let i = 0; i < details.penaltyGoals; i += 1) {
    const minute = randomInt(12, 74);
    const kicker = isUser ? getGoalKicker() : bestKicker(lineup);
    events.push({
      rawMinute: minute,
      minute: `${minute}'`,
      type: "try",
      points: 2,
      isUser,
      against: !isUser,
      text: `Penalty goal ${teamLabel}: ${kicker.name} takes the two.`
    });
  }
  for (let i = 0; i < details.fieldGoals; i += 1) {
    const minute = randomInt(68, 79);
    const kicker = bestKicker(lineup);
    events.push({
      rawMinute: minute,
      minute: `${minute}'`,
      type: "try",
      points: 1,
      isUser,
      against: !isUser,
      text: `Field goal ${teamLabel}: ${kicker.name} nudges the margin.`
    });
  }
}

function rollInjuries() {
  if (state.gameIndex >= 2) return [];
  const injuries = [];
  const chance = 0.1 + (state.strategy === "aggressive" ? 0.035 : 0);
  if (Math.random() < chance) {
    const available = state.drafted.map((pick, index) => ({ pick, index })).filter((item) => item.pick);
    const injured = randomItem(available);
    const minute = randomInt(15, 72);
    injuries.push({
      rawMinute: minute,
      minute: `${minute}'`,
      type: "injury",
      injurySlot: injured.index,
      text: `Injury: ${injured.pick.name} is ruled out for the rest of the series. A replacement will be needed.`
    });
    if (Math.random() < 0.12 && available.length > 1) {
      const second = randomItem(available.filter((item) => item.index !== injured.index));
      const secondMinute = randomInt(minute + 1, 78);
      injuries.push({
        rawMinute: secondMinute,
        minute: `${secondMinute}'`,
        type: "injury",
        injurySlot: second.index,
        text: `Injury: ${second.pick.name} also fails to finish. Selection pressure is coming.`
      });
    }
  }
  return injuries;
}

function applyGameInjuries(result) {
  const slots = new Set(result.injuries.map((event) => event.injurySlot));
  state.notes = [];
  for (const slotIndex of slots) {
    const pick = state.drafted[slotIndex];
    if (!pick) continue;
    state.unavailableCareerIds.add(pick.careerId);
    state.notes.push(`${pick.name} is injured and unavailable for the rest of the series.`);
    state.drafted[slotIndex] = null;
    state.opponents[slotIndex] = null;
  }
}

function createGamePerformances(details, isUser) {
  const lineup = isUser ? state.drafted : state.opponents;
  const won = isUser ? details.score > (state.live?.oppScore || -1) : false;
  const tryScorers = chooseTryScorers(lineup, details.tries);
  const rows = lineup.filter(Boolean).map((pick) => {
    const base = pick.effectiveRatings;
    const slot = SLOTS[pick.slotIndex];
    const tries = tryScorers.filter((scorer) => scorer.id === pick.id).length;
    const tackles = Math.round(baseTackles(slot.key) + (base.defence - 80) * 0.45 + (base.workrate - 82) * 0.5 + randomBetween(-5, 7));
    const metres = Math.round(baseMetres(slot.key) * (0.82 + base.attack / 420 + base.workrate / 620) * randomBetween(0.78, 1.22));
    const ratingLift = tries * 4 + (details.score > 0 ? 1.5 : 0) + randomBetween(-6, 7);
    return {
      id: pick.id,
      careerId: pick.careerId,
      name: pick.name,
      slot: slot.label,
      slotIndex: pick.slotIndex,
      slotKey: slot.key,
      tries,
      tackles: Math.max(0, tackles),
      metres: Math.max(0, metres),
      points: tries * 4,
      goals: 0,
      goalAttempts: 0,
      gameRating: clamp(Math.round(base.overall + ratingLift), 35, 100),
      isUser
    };
  });

  const kicker = isUser ? getGoalKicker() : bestKicker(lineup);
  const kickerRow = rows.find((row) => row.id === kicker?.id);
  if (kickerRow) {
    kickerRow.goals = details.goals + details.penaltyGoals;
    kickerRow.goalAttempts = details.tries + details.penaltyGoals;
    kickerRow.points += kickerRow.goals * 2;
    kickerRow.gameRating = clamp(kickerRow.gameRating + Math.round(kickerRow.goals * 0.6), 35, 100);
  }

  const fieldKicker = bestKicker(lineup);
  const fieldRow = rows.find((row) => row.id === fieldKicker?.id);
  if (fieldRow) {
    fieldRow.points += details.fieldGoals;
    fieldRow.gameRating = clamp(fieldRow.gameRating + details.fieldGoals * 2, 35, 100);
  }

  return rows.sort((a, b) => b.gameRating - a.gameRating);
}

function createSeriesStats() {
  const rows = new Map();
  for (const pick of state.drafted.filter(Boolean)) {
    rows.set(pick.id, {
      id: pick.id,
      careerId: pick.careerId,
      name: pick.name,
      tries: 0,
      goals: 0,
      goalAttempts: 0,
      points: 0,
      tackles: 0,
      metres: 0,
      ratingTotal: 0,
      games: 0
    });
  }
  return rows;
}

function recordSeriesStats(result) {
  for (const row of result.userPerformances) {
    if (!state.seriesStats.has(row.id)) {
      state.seriesStats.set(row.id, {
        id: row.id,
        careerId: row.careerId,
        name: row.name,
        tries: 0,
        goals: 0,
        goalAttempts: 0,
        points: 0,
        tackles: 0,
        metres: 0,
        ratingTotal: 0,
        games: 0
      });
    }
    const stat = state.seriesStats.get(row.id);
    stat.tries += row.tries;
    stat.goals += row.goals;
    stat.goalAttempts += row.goalAttempts;
    stat.points += row.points;
    stat.tackles += row.tackles;
    stat.metres += row.metres;
    stat.ratingTotal += row.gameRating;
    stat.games += 1;
  }
}

function sortedUserStats() {
  return [...(state.seriesStats?.values() || [])].sort((a, b) => b.ratingTotal - a.ratingTotal);
}

function calculateWallyLewisMedal() {
  const candidates = [
    ...state.results.flatMap((game) => game.userPerformances),
    ...state.results.flatMap((game) => game.opponentPerformances)
  ];
  const totals = new Map();
  for (const row of candidates) {
    const current = totals.get(row.name) || { name: row.name, total: 0 };
    current.total += row.gameRating;
    totals.set(row.name, current);
  }
  return [...totals.values()].sort((a, b) => b.total - a.total)[0] || { name: "-", total: 0 };
}

function calculateTeamRatings() {
  const picks = state.drafted.filter(Boolean);
  if (!picks.length) return { overall: 0, attack: 0, defence: 0, power: 0, spine: 0, goalSkill: 0 };
  const average = (key) => Math.round(picks.reduce((sum, pick) => sum + pick.effectiveRatings[key], 0) / picks.length);
  const spine = picks.filter((pick) => ["fullback", "half", "hooker"].includes(pick.slotKey));
  const forwards = picks.filter((pick) => ["edge", "middle", "lock"].includes(pick.slotKey));
  return {
    overall: average("overall"),
    attack: average("attack"),
    defence: average("defence"),
    workrate: average("workrate"),
    power: forwards.length ? Math.round(forwards.reduce((sum, pick) => sum + pick.effectiveRatings.overall, 0) / forwards.length) : 0,
    spine: spine.length ? Math.round(spine.reduce((sum, pick) => sum + pick.effectiveRatings.overall + pick.effectiveRatings.kicking * 0.25, 0) / spine.length) : 0,
    goalSkill: getGoalKicker()?.effectiveRatings.goalKicking || Math.max(...picks.map((pick) => pick.effectiveRatings.goalKicking))
  };
}

function calculateOpponentRatings() {
  const picks = state.opponents.filter(Boolean);
  if (!picks.length) return { overall: 82, attack: 82, defence: 82, power: 82, spine: 82, goalSkill: 78 };
  const average = (key) => Math.round(picks.reduce((sum, pick) => sum + pick.effectiveRatings[key], 0) / picks.length);
  const spine = picks.filter((pick) => ["fullback", "half", "hooker"].includes(pick.slotKey));
  const forwards = picks.filter((pick) => ["edge", "middle", "lock"].includes(pick.slotKey));
  return {
    overall: average("overall"),
    attack: average("attack"),
    defence: average("defence"),
    workrate: average("workrate"),
    power: forwards.length ? Math.round(forwards.reduce((sum, pick) => sum + pick.effectiveRatings.overall, 0) / forwards.length) : 82,
    spine: spine.length ? Math.round(spine.reduce((sum, pick) => sum + pick.effectiveRatings.overall + pick.effectiveRatings.kicking * 0.25, 0) / spine.length) : 82,
    goalSkill: bestKicker(picks)?.effectiveRatings.goalKicking || 78
  };
}

function calculateMatchups() {
  const rows = SLOTS.map((slot, index) => {
    const user = state.drafted[index];
    const opponent = state.opponents[index];
    const userRating = user?.effectiveRatings.overall || 0;
    const oppRating = opponent?.effectiveRatings.overall || 0;
    return {
      slot: slot.label,
      user,
      opponent,
      diff: userRating - oppRating,
      won: userRating > oppRating
    };
  });
  const wins = rows.filter((row) => row.won).length;
  const avgDiff = rows.reduce((sum, row) => sum + row.diff, 0) / rows.length;
  return { rows, wins, outRated: rows.length - wins, avgDiff };
}

function calculateNoConcedeChance(matchup, home, strategy) {
  const winRatio = matchup.wins / SLOTS.length;
  let chance = 0.015 + Math.pow(winRatio, 3.2) * 0.22 + clamp(matchup.avgDiff, -8, 18) * 0.007 + strategy.noConcede + home * 0.025;
  if (matchup.wins === SLOTS.length) chance += 0.12;
  if (matchup.outRated <= 2 && matchup.avgDiff > 3) chance += 0.045;
  if (state.strategy === "controlled" && calculateTeamRatings().spine >= calculateOpponentRatings().spine) chance += 0.025;
  if (matchup.outRated >= 5) chance -= 0.055;
  return clamp(chance, 0.005, 0.48);
}

function makeScore(expected, goalSkill) {
  const tries = clamp(Math.round(expected / 5.8 + randomBetween(-1.1, 1.3)), 0, 7);
  const goalRate = clamp(0.5 + goalSkill / 260 + randomBetween(-0.08, 0.08), 0.38, 0.92);
  const goals = clamp(Math.round(tries * goalRate), 0, tries);
  const penaltyGoals = Math.random() < 0.2 ? 1 : 0;
  const fieldGoals = expected > 10 && Math.random() < 0.08 ? 1 : 0;
  let score = tries * 4 + goals * 2 + penaltyGoals * 2 + fieldGoals;
  if (score === 1) score = 2;
  return { tries, goals, penaltyGoals, fieldGoals, score };
}

function zeroScore() {
  return { tries: 0, goals: 0, penaltyGoals: 0, fieldGoals: 0, score: 0 };
}

function forceScoringPlay(expected, goalSkill) {
  if (expected > 13 && Math.random() < 0.58) {
    const converted = Math.random() < clamp(0.5 + goalSkill / 280, 0.42, 0.86);
    return { tries: 1, goals: converted ? 1 : 0, penaltyGoals: 0, fieldGoals: 0, score: converted ? 6 : 4 };
  }
  return { tries: 0, goals: 0, penaltyGoals: 1, fieldGoals: 0, score: 2 };
}

function getAvailableSlotsForPlayer(player) {
  return SLOTS
    .map((slot, index) => ({ slot, index, fit: getPositionFit(player, slot.key) }))
    .filter((item) => !state.drafted[item.index] && item.fit.canPick)
    .sort((a, b) => (a.fit.level === "cover") - (b.fit.level === "cover") || a.index - b.index);
}

function getPositionFit(player, slotKey) {
  if (player.positions.includes(slotKey)) return { canPick: true, level: "primary", penalty: 0, label: "Primary" };
  if (getPlayerCoverPositions(player).includes(slotKey)) {
    return { canPick: true, level: "cover", penalty: player.isImmortal ? 0 : 7, label: "Cover" };
  }
  return { canPick: false, level: "none", penalty: 99, label: "Unavailable" };
}

function applyPositionFit(ratings, fit) {
  const penalty = fit.penalty || 0;
  const reduce = (value, extra = 0) => clamp(Math.round(value - penalty - extra), 35, value >= 100 ? 100 : 99);
  return {
    overall: reduce(ratings.overall),
    attack: reduce(ratings.attack, fit.level === "cover" ? 1 : 0),
    defence: reduce(ratings.defence),
    workrate: reduce(ratings.workrate, fit.level === "cover" ? 1 : 0),
    kicking: reduce(ratings.kicking, fit.level === "cover" ? -2 : 0),
    goalKicking: ratings.goalKicking,
    bigGame: reduce(ratings.bigGame, fit.level === "cover" ? 2 : 0)
  };
}

function isCareerUnavailable(careerId) {
  return state.unavailableCareerIds.has(careerId) ||
    state.drafted.some((pick) => pick?.careerId === careerId);
}

function isDraftComplete() {
  return state.drafted.every(Boolean);
}

function countFilledSlots() {
  return state.drafted.filter(Boolean).length;
}

function opponentState() {
  return state.selectedState === "QLD" ? "NSW" : "QLD";
}

function getGoalKickerCandidates() {
  return state.drafted
    .filter(Boolean)
    .sort((a, b) => goalKickerScore(b) - goalKickerScore(a))
    .slice(0, 5);
}

function goalKickerScore(pick) {
  return pick.effectiveRatings.goalKicking * 0.76 + pick.effectiveRatings.kicking * 0.24;
}

function getGoalKicker() {
  return state.drafted.find((pick) => pick?.id === state.goalKickerId) || getGoalKickerCandidates()[0] || null;
}

function bestKicker(lineup) {
  return [...lineup].filter(Boolean).sort((a, b) =>
    b.effectiveRatings.goalKicking - a.effectiveRatings.goalKicking ||
    b.effectiveRatings.kicking - a.effectiveRatings.kicking
  )[0];
}

function chooseTryScorers(lineup, tries) {
  const rows = [...lineup].filter(Boolean);
  const scorers = [];
  for (let i = 0; i < tries; i += 1) {
    scorers.push(weightedPick(rows, tryWeight));
  }
  return scorers;
}

function tryWeight(pick) {
  const slotBoost = {
    wing: 1.45,
    centre: 1.2,
    fullback: 1.15,
    half: 0.75,
    hooker: 0.55,
    edge: 0.72,
    middle: 0.38,
    lock: 0.45
  }[pick.slotKey] || 0.7;
  return Math.max(1, slotBoost * (pick.effectiveRatings.attack + pick.effectiveRatings.bigGame * 0.25));
}

function baseTackles(slotKey) {
  return {
    fullback: 5,
    wing: 7,
    centre: 12,
    half: 18,
    edge: 29,
    middle: 28,
    lock: 36,
    hooker: 42
  }[slotKey] || 18;
}

function baseMetres(slotKey) {
  return {
    fullback: 155,
    wing: 175,
    centre: 115,
    half: 75,
    edge: 98,
    middle: 122,
    lock: 106,
    hooker: 65
  }[slotKey] || 90;
}

function leaderText(rows, key) {
  const row = [...rows].sort((a, b) => b[key] - a[key])[0];
  return row ? `${row.name} (${row[key]})` : "-";
}

function halfTimeLine(userScore, oppScore) {
  if (oppScore === 0 && userScore > 0) return "The clean sheet is alive.";
  if (oppScore === 0) return "Defence is winning the arm wrestle.";
  if (userScore >= oppScore) return "Still in control, but the wall has been cracked.";
  return "The hidden opposition picks are causing damage.";
}

function fullTimeLine(userScore, oppScore) {
  if (oppScore === 0 && userScore > 0) return "A scoreless defensive statement.";
  if (userScore > oppScore) return "Series momentum banked.";
  if (userScore === oppScore) return "Origin refuses to split them.";
  return "Selection questions are waiting.";
}

function ratingClass(value) {
  if (value >= 100) return "immortal";
  if (value >= 92) return "elite";
  if (value >= 87) return "strong";
  if (value >= 82) return "good";
  return "solid";
}

function applyStoredPlayerOverride(player, team, careerId) {
  const seasonKey = ratingSeasonKey(team.state, team.year, careerId);
  const seasonOverride = RATING_OVERRIDES.seasons?.[seasonKey] || RATING_OVERRIDES[seasonKey];
  const careerOverride = RATING_OVERRIDES.careers?.[careerId];
  const next = { ...player.ratings };

  if (seasonOverride) {
    const source = seasonOverride.ratings || seasonOverride;
    for (const key of ["overall", "attack", "defence", "workrate", "kicking", "goalKicking", "bigGame"]) {
      if (Number.isFinite(Number(source[key]))) {
        next[key] = clamp(Math.round(Number(source[key])), 1, 100);
      }
    }

    if (Number.isFinite(Number(source.rating)) && !Number.isFinite(Number(source.overall))) {
      next.overall = clamp(Math.round(Number(source.rating)), 1, 100);
    }
  }

  const primaryOverride = Array.isArray(careerOverride?.positions)
    ? careerOverride.positions.filter((position) => POSITION_LABELS[position])
    : Array.isArray(seasonOverride?.positions)
      ? seasonOverride.positions.filter((position) => POSITION_LABELS[position])
      : [];
  const positions = primaryOverride.length ? primaryOverride : player.positions || [];
  const hasCoverPositions = Array.isArray(careerOverride?.coverPositions) || Array.isArray(player.coverPositions);
  const coverOverride = Array.isArray(careerOverride?.coverPositions)
    ? careerOverride.coverPositions.filter((position) => POSITION_LABELS[position] && !positions.includes(position))
    : Array.isArray(player.coverPositions)
      ? player.coverPositions.filter((position) => POSITION_LABELS[position] && !positions.includes(position))
      : [];

  return {
    positions: [...new Set(positions)],
    coverPositions: hasCoverPositions ? [...new Set(coverOverride)] : undefined,
    ratings: next
  };
}

function getPlayerCoverPositions(player) {
  if (Array.isArray(player.coverPositions)) return player.coverPositions;
  return deriveCoverPositions(player.positions || []);
}

function deriveCoverPositions(primaryPositions) {
  return Object.keys(POSITION_LABELS).filter((slotKey) =>
    !primaryPositions.includes(slotKey) &&
    (COVER_GROUPS[slotKey] || []).some((position) => primaryPositions.includes(position))
  );
}

function ratingSeasonKey(stateValue, year, careerId) {
  return `${stateValue}-${year}-${careerId}`;
}

function loadRatingOverrides() {
  try {
    return JSON.parse(localStorage.getItem(RATING_OVERRIDE_KEY)) || {};
  } catch {
    return {};
  }
}

function scrollToTop() {
  window.requestAnimationFrame(() => {
    document.querySelector(".candidate-grid")?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function minuteValue(event) {
  if (event.minute === "HT") return 40;
  if (event.minute === "FT") return 80;
  return Number.parseInt(event.minute, 10) || 0;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function revealDelay(event) {
  if (event.type === "fulltime") return 1300;
  if (event.minute === "HT") return 1150;
  if (event.type === "try") return event.against ? 1450 : 1250;
  if (event.type === "injury") return 1350;
  return 1050;
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function weightedPick(items, weightFn) {
  const weighted = items.map((item) => Math.max(0.01, weightFn(item)));
  const total = weighted.reduce((sum, value) => sum + value, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < items.length; i += 1) {
    roll -= weighted[i];
    if (roll <= 0) return items[i];
  }
  return items[items.length - 1];
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
