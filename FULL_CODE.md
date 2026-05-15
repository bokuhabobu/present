# index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>English-German Vocabulary Book</title>

  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <div class="app-shell">
    <header class="app-header">
      <div class="header-title">
        <h1>Vocabulary(EN/DE)</h1>
        <div class="header-meta">
          <div id="wordSummary" class="summary-pill">0 words</div>
          <div id="currentUserBadge" class="user-pill">QR User: default</div>
        </div>
      </div>
    </header>

    <nav class="tab-nav" aria-label="Main navigation">
      <button type="button" class="nav-btn active" data-tab="words">Words</button>
      <button type="button" class="nav-btn" data-tab="cards">Cards</button>
      <button type="button" class="nav-btn" data-tab="quiz">Quiz</button>
      <button type="button" class="nav-btn" data-tab="add">Add</button>
    </nav>

    <main class="main-content">
      <section id="wordsPanel" class="tab-panel active">
        <div class="toolbar card">
          <input
            id="searchInput"
            class="input"
            type="search"
            placeholder="Search English / German"
          />

          <select id="visibilitySelect" class="select" aria-label="Word visibility">
            <option value="show-all">Show all</option>
            <option value="hide-english">Hide all English</option>
            <option value="hide-german">Hide all German</option>
            <option value="hide-both">Hide both</option>
          </select>

          <select id="sortSelect" class="select" aria-label="Sort words">
            <option value="created-asc">Created order</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
            <option value="random">Random</option>
            <option value="rate-asc">Lowest accuracy</option>
          </select>

          <select id="filterType" class="select" aria-label="Filter type">
            <option value="all">All</option>
            <option value="level">CEFR Level</option>
            <option value="pos">Part of Speech</option>
            <option value="weak">Weak</option>
            <option value="review">Review</option>
            <option value="favorite">Favorite</option>
            <option value="mistakes">Mistakes</option>
          </select>

          <select
            id="filterValue"
            class="select is-hidden"
            aria-label="Filter value"
          ></select>

          <button id="resetAllScoresBtn" type="button" class="btn btn-soft toolbar-action">
            Reset Counts
          </button>
        </div>

        <div id="wordsGrid" class="words-grid"></div>

        <p id="emptyWords" class="empty-state" hidden>
          No words yet. Add your first word from the Add tab.
        </p>
      </section>

      <section id="cardsPanel" class="tab-panel">
        <div class="mode-card card">
          <h2>Flashcards</h2>
          <p class="muted-text">
            Practice words in both directions: English to German or German to English.
          </p>

          <div class="study-control-grid">
            <select id="cardDirection" class="select" aria-label="Flashcard direction">
              <option value="en-de">English → German</option>
              <option value="de-en">German → English</option>
            </select>

            <select id="cardSortSelect" class="select" aria-label="Flashcard sort">
              <option value="created-asc">Created order</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="random">Random</option>
              <option value="rate-asc">Lowest accuracy</option>
            </select>

            <select id="cardFilterType" class="select" aria-label="Flashcard filter type">
              <option value="all">All</option>
              <option value="level">CEFR Level</option>
              <option value="pos">Part of Speech</option>
              <option value="weak">Weak</option>
              <option value="review">Review</option>
              <option value="favorite">Favorite</option>
              <option value="mistakes">Mistakes</option>
            </select>

            <select
              id="cardFilterValue"
              class="select is-hidden"
              aria-label="Flashcard filter value"
            ></select>

            <button id="startCardsBtn" type="button" class="btn btn-primary">
              Start Cards
            </button>
          </div>
        </div>

        <div id="flashcardBox" class="flashcard card">
          <p class="empty-state inside-card">
            Add some words to start flashcard practice.
          </p>
        </div>
      </section>

      <section id="quizPanel" class="tab-panel">
        <div class="mode-card card">
          <h2>4-Choice Quiz</h2>
          <p class="muted-text">
            Create four-choice questions from your saved words. Similar part of speech and CEFR level are prioritized.
          </p>

          <div class="study-control-grid">
            <select id="quizDirection" class="select" aria-label="Quiz direction">
              <option value="en-de">English → German</option>
              <option value="de-en">German → English</option>
            </select>

            <select id="quizSortSelect" class="select" aria-label="Quiz sort">
              <option value="created-asc">Created order</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
              <option value="random">Random</option>
              <option value="rate-asc">Lowest accuracy</option>
            </select>

            <select id="quizFilterType" class="select" aria-label="Quiz filter type">
              <option value="all">All</option>
              <option value="level">CEFR Level</option>
              <option value="pos">Part of Speech</option>
              <option value="weak">Weak</option>
              <option value="review">Review</option>
              <option value="favorite">Favorite</option>
              <option value="mistakes">Mistakes</option>
            </select>

            <select
              id="quizFilterValue"
              class="select is-hidden"
              aria-label="Quiz filter value"
            ></select>

            <button id="startQuizBtn" type="button" class="btn btn-primary">
              Start Quiz
            </button>

            <button id="resetQuizBtn" type="button" class="btn btn-soft">
              Reset Score
            </button>
          </div>
        </div>

        <div id="quizScore" class="score-card card"></div>

        <div id="quizBox" class="quiz-question-card card">
          <p class="empty-state inside-card">
            Press Start Quiz to begin.
          </p>
        </div>

        <div id="quizOptions" class="quiz-options"></div>

      </section>

      <section id="addPanel" class="tab-panel">
        <form id="wordForm" class="form-card card">
          <h2 id="formTitle">Add new word</h2>

          <p>
            Enter English and German words. The app will suggest a part of speech automatically, but you can edit it manually.
          </p>

          <div class="form-grid">
            <div class="field">
              <label for="englishInput">English</label>
              <input
                id="englishInput"
                class="input"
                type="text"
                placeholder="apple"
                autocomplete="off"
                required
              />
            </div>

            <div class="field">
              <label for="germanInput">German</label>
              <input
                id="germanInput"
                class="input"
                type="text"
                placeholder="der Apfel"
                autocomplete="off"
                required
              />
            </div>

            <div class="field">
              <label for="posInput">Part of Speech</label>

              <select id="posInput" class="select">
                <option value="noun">noun</option>
                <option value="verb">verb</option>
                <option value="adjective">adjective</option>
                <option value="adverb">adverb</option>
                <option value="preposition">preposition</option>
                <option value="conjunction">conjunction</option>
                <option value="pronoun">pronoun</option>
                <option value="phrase">phrase</option>
                <option value="unknown" selected>unknown</option>
              </select>

              <div class="pos-tools">
                <button id="autoDetectBtn" type="button" class="btn btn-soft">
                  Auto Detect POS
                </button>

                <span id="posHint" class="hint-text">
                  Auto suggestion: unknown
                </span>
              </div>
            </div>

            <div class="field">
              <label for="levelInput">CEFR Level</label>

              <select id="levelInput" class="select">
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
                <option value="C2">C2</option>
                <option value="unknown" selected>unknown</option>
              </select>
            </div>

            <div class="field">
              <label for="correctCountInput">Correct Count</label>
              <input
                id="correctCountInput"
                class="input"
                type="number"
                min="0"
                value="0"
              />
            </div>

            <div class="field">
              <label for="wrongCountInput">Wrong Count</label>
              <input
                id="wrongCountInput"
                class="input"
                type="number"
                min="0"
                value="0"
              />
            </div>

            <div class="field field-full">
              <span class="field-title">Checklist</span>

              <div class="checklist-form-grid">
                <label class="check-item">
                  <input id="check-learned" type="checkbox" />
                  learned
                </label>

                <label class="check-item">
                  <input id="check-weak" type="checkbox" />
                  weak
                </label>

                <label class="check-item">
                  <input id="check-review" type="checkbox" />
                  review
                </label>

                <label class="check-item">
                  <input id="check-favorite" type="checkbox" />
                  favorite
                </label>

                <label class="check-item">
                  <input id="check-test" type="checkbox" />
                  test
                </label>
              </div>
            </div>

            <div class="field field-full">
              <label for="memoInput">Memo</label>

              <textarea
                id="memoInput"
                class="textarea"
                placeholder="Masculine noun. Plural: die Äpfel."
              ></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button id="saveWordBtn" type="submit" class="btn btn-primary">
              Save word
            </button>

            <button id="resetFormBtn" type="button" class="btn btn-soft">
              Reset form
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>

  <div id="memoModal" class="modal is-hidden" aria-hidden="true">
    <div id="modalBackdrop" class="modal-backdrop"></div>

    <div
      class="modal-content"
      role="dialog"
      aria-modal="true"
      aria-labelledby="memoModalTitle"
    >
      <h2 id="memoModalTitle">Memo</h2>

      <textarea
        id="memoTextarea"
        class="textarea"
        placeholder="Write your memo here."
      ></textarea>

      <div class="modal-actions">
        <button id="saveMemoBtn" type="button" class="btn btn-primary">
          Save memo
        </button>

        <button id="closeMemoBtn" type="button" class="btn btn-soft">
          Close
        </button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

# style.css

```css
:root {
  --bg: #f6f3ea;
  --panel: #ffffff;
  --text: #1f2937;
  --muted: #6b7280;
  --line: #e5e7eb;

  --primary: #7c5c2e;
  --primary-soft: #f5ead7;

  --correct: #16a34a;
  --correct-soft: #dcfce7;

  --wrong: #dc2626;
  --wrong-soft: #fee2e2;

  --warning: #f59e0b;

  --shadow: 0 16px 40px rgba(31, 41, 55, 0.08);
  --radius: 20px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  color: var(--text);
  background:
    radial-gradient(circle at top left, #fff6dc 0, transparent 24rem),
    var(--bg);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.app-shell {
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 18px 14px 96px;
}

.app-header {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 16px;
}

.header-title {
  display: grid;
  gap: 8px;
}

.header-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.app-header h1 {
  margin: 0;
  font-size: clamp(1.45rem, 4vw, 2.35rem);
  line-height: 1.15;
}

.app-header p {
  margin: 6px 0 0;
  color: var(--muted);
}

.summary-pill,
.user-pill {
  display: inline-flex;
  width: fit-content;
  padding: 8px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 22px rgba(31, 41, 55, 0.06);
  font-weight: 700;
  color: var(--primary);
}

.user-pill {
  background: #f5efe3;
  color: #7c5c2e;
  font-size: 0.82rem;
}

.tab-nav {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 10;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  padding: 8px;
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow);
}

.nav-btn {
  min-height: 48px;
  padding: 8px 6px;
  border: 0;
  border-radius: 16px;

  background: transparent;
  color: var(--muted);

  font-weight: 800;
}

.nav-btn.active {
  color: var(--primary);
  background: var(--primary-soft);
}

.tab-panel {
  display: none;
}

.tab-panel.active {
  display: block;
}

.card {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  box-shadow: var(--shadow);
}

.toolbar,
.mode-card,
.form-card,
.score-card,
.mistake-header {
  padding: 16px;
  margin-bottom: 16px;
}

.toolbar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.input,
.select,
.textarea {
  width: 100%;
  min-height: 46px;
  padding: 10px 12px;

  border: 1px solid var(--line);
  border-radius: 14px;

  background: #fff;
  color: var(--text);

  outline: none;
}

.textarea {
  min-height: 110px;
  resize: vertical;
}

.input:focus,
.select:focus,
.textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(124, 92, 46, 0.16);
}

.is-hidden {
  display: none !important;
}

.words-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.word-card {
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;
  padding: 14px;

  border: 1px solid var(--line);
  border-radius: var(--radius);

  background: var(--panel);
  box-shadow: 0 10px 26px rgba(31, 41, 55, 0.06);
}

.word-card.is-compact {
  gap: 8px;
  padding: 11px 12px;
  border-radius: 16px;
}

.word-card-basic,
.word-card-details {
  display: grid;
  gap: 10px;
}

.word-card.is-compact .word-card-basic {
  gap: 7px;
}

.word-card-details.is-collapsed {
  display: none;
}

.compact-card-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
}

.word-title-block {
  min-width: 0;
}

.details-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 46px;
  height: 28px;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: #f3f4f6;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.details-switch:hover {
  box-shadow: 0 8px 18px rgba(31, 41, 55, 0.1);
}

.details-switch.is-on {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.details-switch-dot {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 7px rgba(31, 41, 55, 0.18);
  transition:
    transform 0.18s ease,
    background 0.18s ease;
}

.details-switch.is-on .details-switch-dot {
  transform: translateX(18px);
  background: var(--primary);
}

.compact-left {
  justify-content: flex-start;
}

.word-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.word-card h3 {
  margin: 0;
  font-size: 1.35rem;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.german-word {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 1.05rem;
  overflow-wrap: anywhere;
}

.word-card.is-compact h3 {
  font-size: 1.12rem;
}

.word-card.is-compact .german-word {
  margin-top: 2px;
  font-size: 0.94rem;
}

.masked-word {
  color: var(--muted);
  letter-spacing: 0.18em;
  user-select: none;
}

.word-visibility-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.compact-visibility {
  justify-content: flex-start;
}

.btn-mini-toggle {
  min-height: 32px;
  padding: 6px 9px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--muted);
  font-size: 0.78rem;
}

.visibility-pill {
  border-radius: 999px;
  white-space: nowrap;
}

.btn-mini-toggle.is-active {
  border-color: var(--primary);
  background: var(--primary-soft);
  color: var(--primary);
}

.badge-stack,
.mini-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 25px;
  padding: 4px 9px;

  border-radius: 999px;

  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1;

  white-space: nowrap;
}

.level-badge {
  color: #92400e;
  background: #fef3c7;
}

.pos-badge {
  color: #57534e;
  background: #f1ede4;
}

.checklist-badge {
  color: #065f46;
  background: #d1fae5;
}

.badge-muted {
  color: var(--muted);
  background: #f3f4f6;
}

.checklist-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.stats-row span {
  padding: 8px;
  border-radius: 13px;
  background: #f9fafb;

  text-align: center;
  font-size: 0.9rem;
  font-weight: 800;
}

.card-actions,
.study-actions,
.form-actions,
.modal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.study-control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  align-items: center;
}

.study-control-grid .btn {
  width: 100%;
}

.btn {
  min-height: 44px;
  padding: 10px 13px;

  border: 0;
  border-radius: 14px;

  font-weight: 850;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(31, 41, 55, 0.1);
}

.btn-primary {
  color: #fff;
  background: var(--primary);
}

.btn-soft {
  color: var(--text);
  background: #f3f4f6;
}

.btn-danger-soft {
  color: var(--wrong);
  background: var(--wrong-soft);
}

.btn-correct {
  color: #fff;
  background: var(--correct);
}

.btn-wrong {
  color: #fff;
  background: var(--wrong);
}

.wide-btn {
  width: 100%;
  margin-top: 8px;
}

.toolbar-action {
  white-space: nowrap;
}

.empty-state {
  padding: 28px 18px;

  border: 1px dashed #d1d5db;
  border-radius: var(--radius);

  color: var(--muted);
  background: rgba(255, 255, 255, 0.6);

  text-align: center;
  font-weight: 700;
}

.inside-card {
  width: 100%;
  border: 0;
  background: #f9fafb;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.field {
  display: grid;
  gap: 7px;
}

.field label,
.field-title {
  color: #374151;
  font-size: 0.92rem;
  font-weight: 850;
}

.pos-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.hint-text,
.muted-text {
  color: var(--muted);
  font-size: 0.9rem;
}

.checklist-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 14px;

  background: #fff;

  font-weight: 750;
}

.check-item input {
  width: 18px;
  height: 18px;
}

.flashcard,
.quiz-question-card {
  padding: 18px;
  min-height: 270px;
}

.flashcard-face,
.flashcard-answer,
.quiz-question-card {
  display: grid;
  place-items: center;
  gap: 10px;

  min-height: 120px;
  margin-bottom: 14px;
  padding: 18px;

  border-radius: 18px;
  background: #f9fafb;

  text-align: center;
}

.flashcard-label {
  margin: 0;

  color: var(--muted);

  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.flashcard h2,
.quiz-question-card h2 {
  margin: 0;
  font-size: clamp(1.7rem, 7vw, 3rem);
  overflow-wrap: anywhere;
}

.flashcard h3 {
  margin: 0;
  font-size: clamp(1.4rem, 5vw, 2.15rem);
  overflow-wrap: anywhere;
}

.flashcard-answer.is-blurred {
  color: var(--muted);
}

.score-card {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.score-card div {
  display: grid;
  gap: 3px;

  padding: 12px;
  border-radius: 16px;

  background: #f9fafb;

  text-align: center;
}

.score-card strong {
  color: var(--primary);
  font-size: 1.45rem;
}

.score-card span {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  margin-top: 14px;
}

.quiz-option {
  min-height: 52px;
  padding: 12px;

  border: 1px solid var(--line);
  border-radius: 16px;

  background: #fff;
  color: var(--text);

  font-weight: 850;
  text-align: left;
}

.quiz-option:hover:not(:disabled) {
  border-color: var(--primary);
  background: var(--primary-soft);
}

.quiz-option.is-correct {
  border-color: var(--correct);
  background: var(--correct-soft);
  color: #14532d;
}

.quiz-option.is-wrong {
  border-color: var(--wrong);
  background: var(--wrong-soft);
  color: #7f1d1d;
}

.quiz-mistakes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 12px;
}

.mistake-chip {
  padding: 8px 10px;

  border-radius: 999px;

  background: var(--wrong-soft);
  color: #7f1d1d;

  font-size: 0.9rem;
  font-weight: 850;
}

.mistake-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.mistake-header h2,
.form-card h2 {
  margin: 0 0 6px;
}

.mistake-header p,
.form-card p {
  margin: 0;
  color: var(--muted);
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 20;

  display: grid;
  place-items: center;

  padding: 16px;
}

.modal-backdrop {
  position: absolute;
  inset: 0;

  background: rgba(17, 24, 39, 0.48);
  backdrop-filter: blur(4px);
}

.modal-content {
  position: relative;
  z-index: 1;

  width: min(560px, 100%);
  padding: 18px;

  border-radius: var(--radius);

  background: #fff;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
}

.modal-content h2 {
  margin: 0 0 12px;
}


@media (max-width: 430px) {
  .app-shell {
    padding: 12px 10px 88px;
  }

  .app-header {
    margin-bottom: 12px;
  }

  .summary-pill {
    font-size: 0.88rem;
  }

  .toolbar,
  .mode-card,
  .form-card,
  .score-card,
  .mistake-header {
    padding: 12px;
    margin-bottom: 12px;
  }

  .word-card {
    gap: 9px;
    padding: 10px;
  }

  .word-card.is-compact {
    padding: 9px 10px;
  }

  .word-card-basic,
  .word-card-details {
    gap: 8px;
  }

  .study-control-grid {
    grid-template-columns: 1fr;
  }

  .compact-card-row {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px;
  }

  .details-switch {
    width: 42px;
    height: 26px;
  }

  .details-switch-dot {
    width: 20px;
    height: 20px;
  }

  .details-switch.is-on .details-switch-dot {
    transform: translateX(16px);
  }

  .badge-stack,
  .mini-meta {
    justify-content: flex-start;
  }

  .word-card h3 {
    font-size: 1.08rem;
  }

  .word-card.is-compact h3 {
    font-size: 1.02rem;
  }

  .german-word {
    font-size: 0.92rem;
  }

  .word-card.is-compact .german-word {
    font-size: 0.88rem;
  }

  .stats-row {
    gap: 6px;
  }

  .stats-row span {
    padding: 7px 5px;
    font-size: 0.78rem;
  }

  .card-actions,
  .study-actions,
  .form-actions,
  .modal-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .card-actions .btn,
  .study-actions .btn,
  .form-actions .btn,
  .modal-actions .btn {
    width: 100%;
  }

  .btn {
    min-height: 40px;
    padding: 9px 10px;
    border-radius: 12px;
    font-size: 0.88rem;
  }

  .tab-nav {
    left: 8px;
    right: 8px;
    bottom: 8px;
    gap: 5px;
    padding: 6px;
    border-radius: 20px;
  }

  .nav-btn {
    min-height: 42px;
    padding: 7px 4px;
    border-radius: 13px;
    font-size: 0.78rem;
  }

  .flashcard,
  .quiz-question-card {
    min-height: 220px;
    padding: 12px;
  }

  .flashcard-face,
  .flashcard-answer,
  .quiz-question-card {
    min-height: 100px;
    padding: 14px;
  }
}

@media (max-width: 360px) {
  .app-shell {
    padding-inline: 8px;
  }

  .summary-pill {
    font-size: 0.8rem;
  }

  .nav-btn {
    font-size: 0.72rem;
  }

  .word-visibility-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .btn-mini-toggle {
    min-height: 30px;
    padding: 5px 7px;
    font-size: 0.72rem;
  }

  .details-switch {
    width: 40px;
    height: 24px;
  }

  .details-switch-dot {
    width: 18px;
    height: 18px;
  }

  .details-switch.is-on .details-switch-dot {
    transform: translateX(16px);
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .card-actions,
  .study-actions,
  .form-actions,
  .modal-actions {
    grid-template-columns: 1fr;
  }
}

@media (orientation: landscape) and (max-width: 767px) {
  .words-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 700px) {
  .app-shell {
    padding-inline: 22px;
  }

  .toolbar {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }

  .toolbar .input[type="search"] {
    grid-column: 1 / -1;
  }

  .words-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .form-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .field-full {
    grid-column: 1 / -1;
  }

  .checklist-form-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .score-card {
    grid-template-columns: repeat(4, 1fr);
  }

  .quiz-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) and (orientation: landscape) {
  .app-shell {
    display: grid;
    grid-template-columns: 230px minmax(0, 1fr);
    grid-template-rows: auto 1fr;
    gap: 18px;

    min-height: 100vh;
    padding: 24px;
  }

  .app-header {
    grid-column: 1 / -1;
    margin-bottom: 0;
  }

  .tab-nav {
    position: sticky;
    top: 24px;
    left: auto;
    right: auto;
    bottom: auto;

    display: flex;
    flex-direction: column;
    align-self: start;

    padding: 12px;
  }

  .nav-btn {
    justify-content: flex-start;
    text-align: left;
    padding-inline: 16px;
  }

  .main-content {
    min-width: 0;
  }

  .toolbar {
    grid-template-columns: 1.4fr 1fr 1fr 1fr 1fr auto;
  }

  .study-control-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .toolbar .input[type="search"] {
    grid-column: auto;
  }
}

@media (min-width: 1180px) {
  .words-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
```

# script.js

```javascript
"use strict";

/*
  English-German Vocabulary Book

  Features:
  - Save words to localStorage
  - Add / edit / delete words
  - Auto-detect part of speech with simple JavaScript rules
  - Search / sort / filter
  - Hide all English / German
  - Hide English / German individually for each card
  - Flashcards
  - 4-choice quiz
  - Mistake review
  - Memo popup

  localStorage key:
  vocabularyWords_${USER_ID}

  QR / URL parameter mode:
  - Open the app with ?uid=user001
  - Each uid gets a different localStorage key
*/

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const rawUserId = params.get("uid") || "default";

  const safeUserId = rawUserId
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .slice(0, 40);

  return safeUserId || "default";
}

const USER_ID = getUserIdFromUrl();
const STORAGE_KEY = `vocabularyWords_${USER_ID}`;

const POS_OPTIONS = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "preposition",
  "conjunction",
  "pronoun",
  "phrase",
  "unknown"
];

const LEVEL_OPTIONS = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "unknown"
];

const CHECKLIST_KEYS = [
  "learned",
  "weak",
  "review",
  "favorite",
  "test"
];

let words = [];

let currentEditId = null;
let currentMemoId = null;
let posManuallyChanged = false;

/*
  This stores temporary hide/show state for each card.
  It is not saved to localStorage because it is only a display mode.
*/
const individualHiddenState = {};
const expandedCardState = {};

const cardState = {
  direction: "en-de",
  pool: [],
  currentWord: null,
  answerShown: false,
  currentIndex: -1,
  hasStarted: false
};

const quizState = {
  direction: "en-de",
  pool: [],
  currentIndex: -1,
  currentWord: null,
  options: [],
  answered: false,
  total: 0,
  correct: 0,
  wrong: 0,
  missedWordIds: []
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  navButtons: $$(".nav-btn"),
  panels: $$(".tab-panel"),
  wordSummary: $("#wordSummary"),
  currentUserBadge: $("#currentUserBadge"),

  searchInput: $("#searchInput"),
  visibilitySelect: $("#visibilitySelect"),
  sortSelect: $("#sortSelect"),
  filterType: $("#filterType"),
  filterValue: $("#filterValue"),
  resetAllScoresBtn: $("#resetAllScoresBtn"),
  wordsGrid: $("#wordsGrid"),
  emptyWords: $("#emptyWords"),

  form: $("#wordForm"),
  formTitle: $("#formTitle"),
  englishInput: $("#englishInput"),
  germanInput: $("#germanInput"),
  posInput: $("#posInput"),
  levelInput: $("#levelInput"),
  memoInput: $("#memoInput"),
  correctCountInput: $("#correctCountInput"),
  wrongCountInput: $("#wrongCountInput"),
  saveWordBtn: $("#saveWordBtn"),
  resetFormBtn: $("#resetFormBtn"),
  autoDetectBtn: $("#autoDetectBtn"),
  posHint: $("#posHint"),

  cardDirection: $("#cardDirection"),
  cardSortSelect: $("#cardSortSelect"),
  cardFilterType: $("#cardFilterType"),
  cardFilterValue: $("#cardFilterValue"),
  startCardsBtn: $("#startCardsBtn"),
  flashcardBox: $("#flashcardBox"),

  quizDirection: $("#quizDirection"),
  quizSortSelect: $("#quizSortSelect"),
  quizFilterType: $("#quizFilterType"),
  quizFilterValue: $("#quizFilterValue"),
  startQuizBtn: $("#startQuizBtn"),
  resetQuizBtn: $("#resetQuizBtn"),
  quizBox: $("#quizBox"),
  quizOptions: $("#quizOptions"),
  quizScore: $("#quizScore"),
  quizMistakes: $("#quizMistakes"),

  mistakesGrid: $("#mistakesGrid"),
  emptyMistakes: $("#emptyMistakes"),
  practiceMistakesBtn: $("#practiceMistakesBtn"),

  memoModal: $("#memoModal"),
  memoTextarea: $("#memoTextarea"),
  saveMemoBtn: $("#saveMemoBtn"),
  closeMemoBtn: $("#closeMemoBtn"),
  modalBackdrop: $("#modalBackdrop")
};

/* --------------------------------------------------
   Basic helper functions
-------------------------------------------------- */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function shuffleArray(array) {
  const copied = [...array];

  for (let i = copied.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied;
}

function makeId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function defaultChecklist() {
  return {
    learned: false,
    weak: false,
    review: false,
    favorite: false,
    test: false
  };
}

function getAccuracy(word) {
  const correct = Number(word.correctCount || 0);
  const wrong = Number(word.wrongCount || 0);
  const total = correct + wrong;

  if (total === 0) {
    return 1;
  }

  return correct / total;
}

function formatRate(word) {
  const correct = Number(word.correctCount || 0);
  const wrong = Number(word.wrongCount || 0);
  const total = correct + wrong;

  if (total === 0) {
    return "0%";
  }

  return `${Math.round(getAccuracy(word) * 100)}%`;
}

function normalizeWord(word) {
  return {
    id: Number(word.id || makeId()),
    english: String(word.english || ""),
    german: String(word.german || ""),
    pos: POS_OPTIONS.includes(word.pos) ? word.pos : "unknown",
    level: LEVEL_OPTIONS.includes(word.level) ? word.level : "unknown",
    memo: String(word.memo || ""),
    checklist: {
      ...defaultChecklist(),
      ...(word.checklist || {})
    },
    correctCount: Number(word.correctCount || 0),
    wrongCount: Number(word.wrongCount || 0),
    createdAt: word.createdAt || new Date().toISOString()
  };
}

/* --------------------------------------------------
   localStorage
-------------------------------------------------- */

function loadWords() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
      words = [];
      return;
    }

    const parsedData = JSON.parse(rawData);
    words = parsedData.map(normalizeWord);
  } catch (error) {
    console.error("Failed to load localStorage data:", error);
    words = [];
  }
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

/* --------------------------------------------------
   Part of speech auto detection
-------------------------------------------------- */

function detectGermanPartOfSpeech(text) {
  const original = text.trim();
  const lower = original.toLowerCase();

  if (!lower) {
    return "unknown";
  }

  if (lower.split(/\s+/).length >= 3) {
    return "phrase";
  }

  const germanPrepositions = [
    "mit",
    "für",
    "von",
    "zu",
    "nach",
    "bei",
    "aus",
    "gegen",
    "ohne",
    "um",
    "durch",
    "über",
    "unter",
    "vor",
    "hinter",
    "neben",
    "zwischen",
    "seit",
    "während",
    "wegen"
  ];

  const germanConjunctions = [
    "und",
    "aber",
    "oder",
    "weil",
    "dass",
    "wenn",
    "obwohl",
    "denn",
    "doch",
    "sondern",
    "als",
    "bevor",
    "nachdem"
  ];

  const germanPronouns = [
    "ich",
    "du",
    "er",
    "sie",
    "es",
    "wir",
    "ihr",
    "mich",
    "dich",
    "mir",
    "dir",
    "mein",
    "dein",
    "sein",
    "unser"
  ];

  if (germanPrepositions.includes(lower)) {
    return "preposition";
  }

  if (germanConjunctions.includes(lower)) {
    return "conjunction";
  }

  if (germanPronouns.includes(lower)) {
    return "pronoun";
  }

  if (/^(der|die|das|ein|eine|einen|einem|einer)\s+/.test(lower)) {
    return "noun";
  }

  if (/(ung|heit|keit|schaft|tion|tät|nis|tum)$/.test(lower)) {
    return "noun";
  }

  if (/(lich|ig|isch|bar|los|sam|voll)$/.test(lower)) {
    return "adjective";
  }

  if (/en$/.test(lower)) {
    return "verb";
  }

  if (/^[A-ZÄÖÜ]/.test(original)) {
    return "noun";
  }

  return "unknown";
}

function detectEnglishPartOfSpeech(text) {
  const original = text.trim();
  const lower = original.toLowerCase();

  if (!original) {
    return "unknown";
  }

  if (lower.split(/\s+/).length >= 3) {
    return "phrase";
  }

  const englishPrepositions = [
    "in",
    "on",
    "at",
    "with",
    "from",
    "for",
    "by",
    "to",
    "into",
    "over",
    "under",
    "between",
    "through",
    "about",
    "without"
  ];

  const englishConjunctions = [
    "and",
    "but",
    "because",
    "although",
    "if",
    "when",
    "or",
    "so",
    "yet",
    "while",
    "since",
    "unless"
  ];

  const englishPronouns = [
    "i",
    "you",
    "he",
    "she",
    "it",
    "we",
    "they",
    "me",
    "him",
    "her",
    "us",
    "them",
    "my",
    "your",
    "our",
    "their"
  ];

  if (englishConjunctions.includes(lower)) {
    return "conjunction";
  }

  if (englishPrepositions.includes(lower)) {
    return "preposition";
  }

  if (englishPronouns.includes(lower)) {
    return "pronoun";
  }

  if (/^to\s+[a-z]+/.test(lower)) {
    return "verb";
  }

  if (/ly$/.test(lower)) {
    return "adverb";
  }

  if (/(tion|ment|ness|ity|ship|ism|ance|ence)$/.test(lower)) {
    return "noun";
  }

  if (/(ful|less|able|ible|ive|ous|al|ic)$/.test(lower)) {
    return "adjective";
  }

  if (/(ate|ize|ise|fy)$/.test(lower)) {
    return "verb";
  }

  return "unknown";
}

function detectPartOfSpeech(english, german) {
  const germanResult = detectGermanPartOfSpeech(german);

  if (germanResult !== "unknown") {
    return germanResult;
  }

  const englishResult = detectEnglishPartOfSpeech(english);

  if (englishResult !== "unknown") {
    return englishResult;
  }

  const combinedText = `${english} ${german}`.trim();

  if (combinedText && combinedText.split(/\s+/).length >= 3) {
    return "phrase";
  }

  return "unknown";
}

function updatePosHint() {
  const detected = detectPartOfSpeech(
    elements.englishInput.value,
    elements.germanInput.value
  );

  elements.posHint.textContent = `Auto suggestion: ${detected}`;
}

function autoDetectFormPOS(force = false) {
  const detected = detectPartOfSpeech(
    elements.englishInput.value,
    elements.germanInput.value
  );

  if (force || !posManuallyChanged || elements.posInput.value === "unknown") {
    elements.posInput.value = detected;
  }

  updatePosHint();
}

/* --------------------------------------------------
   English / German visibility
-------------------------------------------------- */

function getIndividualHiddenState(wordId) {
  if (!individualHiddenState[wordId]) {
    individualHiddenState[wordId] = {
      english: null,
      german: null
    };
  }

  return individualHiddenState[wordId];
}

function getExpandedCardState(wordId) {
  return Boolean(expandedCardState[wordId]);
}

function resetIndividualVisibilityOverrides() {
  Object.keys(individualHiddenState).forEach((wordId) => {
    individualHiddenState[wordId] = {
      english: null,
      german: null
    };
  });
}

function isHiddenByGlobalMode(language) {
  const mode = elements.visibilitySelect?.value || "show-all";

  if (mode === "hide-both") {
    return true;
  }

  if (mode === "hide-english" && language === "english") {
    return true;
  }

  if (mode === "hide-german" && language === "german") {
    return true;
  }

  return false;
}

function shouldHideWordPart(word, language) {
  const state = getIndividualHiddenState(word.id);
  const override = state[language];

  // true means "force show this part", even when a global hide mode is active.
  if (override === true) {
    return false;
  }

  // false means "force hide this part", even when the global mode is Show all.
  if (override === false) {
    return true;
  }

  return isHiddenByGlobalMode(language);
}

function getVisibleWordText(word, language) {
  const text = language === "english" ? word.english : word.german;

  if (shouldHideWordPart(word, language)) {
    return "••••••";
  }

  return text;
}

function getVisibleWordClass(word, language) {
  if (shouldHideWordPart(word, language)) {
    return "masked-word";
  }

  return "";
}

function toggleIndividualVisibility(wordId, language) {
  const word = findWordById(wordId);

  if (!word) {
    return;
  }

  const state = getIndividualHiddenState(wordId);
  const currentlyHidden = shouldHideWordPart(word, language);

  state[language] = currentlyHidden ? true : false;

  renderWords();
  renderMistakes();
}

function toggleCardDetails(wordId) {
  expandedCardState[wordId] = !getExpandedCardState(wordId);
  renderWords();
  renderMistakes();
}

/* --------------------------------------------------
   Rendering
-------------------------------------------------- */

function updateCurrentUserBadge() {
  if (!elements.currentUserBadge) {
    return;
  }

  elements.currentUserBadge.textContent = `QR User: ${USER_ID}`;
  elements.currentUserBadge.title = `localStorage key: ${STORAGE_KEY}`;
}

function updateSummary() {
  const total = words.length;

  elements.wordSummary.textContent = `${total} words`;
}

function getChecklistBadges(word) {
  const activeKeys = CHECKLIST_KEYS.filter((key) => word.checklist?.[key]);

  if (activeKeys.length === 0) {
    return `<span class="badge badge-muted">no checklist</span>`;
  }

  return activeKeys
    .map((key) => `<span class="badge checklist-badge">${escapeHtml(key)}</span>`)
    .join("");
}

function createWordCard(word) {
  const visibleEnglish = getVisibleWordText(word, "english");
  const visibleGerman = getVisibleWordText(word, "german");

  const englishClass = getVisibleWordClass(word, "english");
  const germanClass = getVisibleWordClass(word, "german");

  const isEnglishHidden = shouldHideWordPart(word, "english");
  const isGermanHidden = shouldHideWordPart(word, "german");
  const isExpanded = getExpandedCardState(word.id);

  const englishButtonText = isEnglishHidden ? "Show EN" : "Hide EN";
  const germanButtonText = isGermanHidden ? "Show DE" : "Hide DE";

  const englishButtonActive = isEnglishHidden ? "is-active" : "";
  const germanButtonActive = isGermanHidden ? "is-active" : "";

  return `
    <article class="word-card ${isExpanded ? "is-expanded" : "is-compact"}" data-id="${word.id}">
      <div class="word-card-basic">
        <div class="compact-card-row">
          <div class="word-title-block">
            <h3 class="${englishClass}">
              ${escapeHtml(visibleEnglish)}
            </h3>

            <p class="german-word ${germanClass}">
              ${escapeHtml(visibleGerman)}
            </p>
          </div>

          <button
            type="button"
            class="details-switch ${isExpanded ? "is-on" : ""}"
            data-action="toggle-card"
            aria-expanded="${isExpanded}"
            aria-label="${isExpanded ? "Close word details" : "Open word details"}"
            title="${isExpanded ? "Close details" : "Open details"}"
          >
            <span class="details-switch-dot" aria-hidden="true"></span>
          </button>
        </div>

        <div class="word-visibility-actions compact-visibility">
          <button
            type="button"
            class="btn btn-mini-toggle visibility-pill ${englishButtonActive}"
            data-action="toggle-english"
          >
            ${englishButtonText}
          </button>

          <button
            type="button"
            class="btn btn-mini-toggle visibility-pill ${germanButtonActive}"
            data-action="toggle-german"
          >
            ${germanButtonText}
          </button>
        </div>
      </div>

      <div class="word-card-details ${isExpanded ? "" : "is-collapsed"}">
        <div class="badge-stack compact-left">
          <span class="badge level-badge">${escapeHtml(word.level)}</span>
          <span class="badge pos-badge">${escapeHtml(word.pos)}</span>
        </div>

        <div class="checklist-row">
          ${getChecklistBadges(word)}
        </div>

        <div class="stats-row" aria-label="study statistics">
          <span>✅ ${word.correctCount}</span>
          <span>❌ ${word.wrongCount}</span>
          <span>Rate ${formatRate(word)}</span>
        </div>

        <div class="card-actions">
          <button type="button" class="btn btn-soft" data-action="memo">
            Memo
          </button>

          <button type="button" class="btn btn-soft" data-action="edit">
            Edit
          </button>

          <button type="button" class="btn btn-danger-soft" data-action="delete">
            Delete
          </button>

          <button type="button" class="btn btn-correct" data-action="correct">
            Correct
          </button>

          <button type="button" class="btn btn-wrong" data-action="wrong">
            Wrong
          </button>
        </div>
      </div>
    </article>
  `;
}

function populateFilterValuesFor(filterTypeElement, filterValueElement) {
  if (!filterTypeElement || !filterValueElement) {
    return;
  }

  const type = filterTypeElement.value;
  const currentValue = filterValueElement.value;

  filterValueElement.innerHTML = "";

  if (type === "level") {
    filterValueElement.classList.remove("is-hidden");

    filterValueElement.innerHTML = LEVEL_OPTIONS
      .map((level) => `<option value="${level}">${level}</option>`)
      .join("");

    if (LEVEL_OPTIONS.includes(currentValue)) {
      filterValueElement.value = currentValue;
    }

    return;
  }

  if (type === "pos") {
    filterValueElement.classList.remove("is-hidden");

    filterValueElement.innerHTML = POS_OPTIONS
      .map((pos) => `<option value="${pos}">${pos}</option>`)
      .join("");

    if (POS_OPTIONS.includes(currentValue)) {
      filterValueElement.value = currentValue;
    }

    return;
  }

  filterValueElement.classList.add("is-hidden");
}

function populateFilterValues() {
  populateFilterValuesFor(elements.filterType, elements.filterValue);
}

function populateCardFilterValues() {
  populateFilterValuesFor(elements.cardFilterType, elements.cardFilterValue);
}

function populateQuizFilterValues() {
  populateFilterValuesFor(elements.quizFilterType, elements.quizFilterValue);
}

function applyFilterPool(sourceWords, filterType, filterValue) {
  return sourceWords.filter((word) => {
    if (filterType === "level") {
      return word.level === filterValue;
    }

    if (filterType === "pos") {
      return word.pos === filterValue;
    }

    if (filterType === "weak") {
      return Boolean(word.checklist.weak);
    }

    if (filterType === "review") {
      return Boolean(word.checklist.review);
    }

    if (filterType === "favorite") {
      return Boolean(word.checklist.favorite);
    }

    if (filterType === "mistakes") {
      return word.wrongCount > 0;
    }

    return true;
  });
}

function applySortPool(sourceWords, sortValue) {
  let result = [...sourceWords];

  if (sortValue === "az") {
    result.sort((a, b) => a.english.localeCompare(b.english));
  } else if (sortValue === "za") {
    result.sort((a, b) => b.english.localeCompare(a.english));
  } else if (sortValue === "created-asc") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortValue === "random") {
    result = shuffleArray(result);
  } else if (sortValue === "rate-asc") {
    result.sort((a, b) => {
      const rateDifference = getAccuracy(a) - getAccuracy(b);

      if (rateDifference !== 0) {
        return rateDifference;
      }

      return b.wrongCount - a.wrongCount;
    });
  }

  return result;
}

function getFilteredSortedWords() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const filterType = elements.filterType.value;
  const filterValue = elements.filterValue.value;
  const sortValue = elements.sortSelect.value;

  const searchedWords = words.filter((word) => {
    return (
      word.english.toLowerCase().includes(query) ||
      word.german.toLowerCase().includes(query)
    );
  });

  return applySortPool(
    applyFilterPool(searchedWords, filterType, filterValue),
    sortValue
  );
}

function getStudyPool(mode) {
  const sortElement = mode === "cards"
    ? elements.cardSortSelect
    : elements.quizSortSelect;

  const filterTypeElement = mode === "cards"
    ? elements.cardFilterType
    : elements.quizFilterType;

  const filterValueElement = mode === "cards"
    ? elements.cardFilterValue
    : elements.quizFilterValue;

  const filterType = filterTypeElement?.value || "all";
  const filterValue = filterValueElement?.value || "";
  const sortValue = sortElement?.value || "created-asc";

  return applySortPool(
    applyFilterPool(words, filterType, filterValue),
    sortValue
  );
}

function renderWords() {
  const visibleWords = getFilteredSortedWords();

  elements.wordsGrid.innerHTML = visibleWords
    .map(createWordCard)
    .join("");

  elements.emptyWords.hidden = visibleWords.length !== 0;
}

function renderMistakes() {
  const mistakeWords = words
    .filter((word) => word.wrongCount > 0)
    .sort((a, b) => b.wrongCount - a.wrongCount);

  /*
    The dedicated Mistakes tab was removed to make the UI smaller.
    Mistake words are now handled through the Words filter.
  */
  if (!elements.mistakesGrid || !elements.emptyMistakes) {
    return;
  }

  elements.mistakesGrid.innerHTML = mistakeWords
    .map(createWordCard)
    .join("");

  elements.emptyMistakes.hidden = mistakeWords.length !== 0;
}

function renderQuizScore() {
  const rate = quizState.total === 0
    ? 0
    : Math.round((quizState.correct / quizState.total) * 100);

  elements.quizScore.innerHTML = `
    <div>
      <strong>${quizState.total}</strong>
      <span>Questions</span>
    </div>

    <div>
      <strong>${quizState.correct}</strong>
      <span>Correct</span>
    </div>

    <div>
      <strong>${quizState.wrong}</strong>
      <span>Wrong</span>
    </div>

    <div>
      <strong>${rate}%</strong>
      <span>Accuracy</span>
    </div>
  `;
}

function renderAll() {
  updateCurrentUserBadge();
  updateSummary();
  populateFilterValues();
  populateCardFilterValues();
  populateQuizFilterValues();
  renderWords();
  renderMistakes();
  renderQuizScore();
  updatePosHint();
}

/* --------------------------------------------------
   Tab navigation
-------------------------------------------------- */

function showTab(tabName) {
  elements.navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });

  elements.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `${tabName}Panel`);
  });

  window.location.hash = tabName;
}

/* --------------------------------------------------
   Form handling
-------------------------------------------------- */

function readChecklistFromForm() {
  const checklist = defaultChecklist();

  CHECKLIST_KEYS.forEach((key) => {
    const input = $(`#check-${key}`);
    checklist[key] = Boolean(input?.checked);
  });

  return checklist;
}

function setChecklistForm(checklist) {
  CHECKLIST_KEYS.forEach((key) => {
    const input = $(`#check-${key}`);

    if (input) {
      input.checked = Boolean(checklist?.[key]);
    }
  });
}

function resetForm() {
  currentEditId = null;
  posManuallyChanged = false;

  elements.form.reset();

  elements.posInput.value = "unknown";
  elements.levelInput.value = "unknown";
  elements.correctCountInput.value = 0;
  elements.wrongCountInput.value = 0;

  elements.formTitle.textContent = "Add new word";
  elements.saveWordBtn.textContent = "Save word";

  updatePosHint();
}

function fillFormForEdit(word) {
  currentEditId = word.id;
  posManuallyChanged = true;

  elements.englishInput.value = word.english;
  elements.germanInput.value = word.german;
  elements.posInput.value = word.pos;
  elements.levelInput.value = word.level;
  elements.memoInput.value = word.memo;
  elements.correctCountInput.value = word.correctCount;
  elements.wrongCountInput.value = word.wrongCount;

  setChecklistForm(word.checklist);

  elements.formTitle.textContent = "Edit word";
  elements.saveWordBtn.textContent = "Update word";

  updatePosHint();
  showTab("add");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const english = elements.englishInput.value.trim();
  const german = elements.germanInput.value.trim();

  if (!english || !german) {
    alert("Please enter both English and German.");
    return;
  }

  const existingWord = words.find((word) => word.id === currentEditId);

  const wordData = {
    id: existingWord ? existingWord.id : makeId(),
    english,
    german,
    pos: elements.posInput.value || detectPartOfSpeech(english, german),
    level: elements.levelInput.value,
    memo: elements.memoInput.value.trim(),
    checklist: readChecklistFromForm(),
    correctCount: Math.max(0, Number(elements.correctCountInput.value || 0)),
    wrongCount: Math.max(0, Number(elements.wrongCountInput.value || 0)),
    createdAt: existingWord ? existingWord.createdAt : new Date().toISOString()
  };

  if (existingWord) {
    words = words.map((word) => {
      if (word.id === currentEditId) {
        return normalizeWord(wordData);
      }

      return word;
    });
  } else {
    words.push(normalizeWord(wordData));
  }

  saveWords();
  resetForm();
  renderAll();
  showTab("words");
}

/* --------------------------------------------------
   Word actions
-------------------------------------------------- */

function findWordById(id) {
  return words.find((word) => word.id === Number(id));
}

function updateWordScore(id, isCorrect) {
  const word = findWordById(id);

  if (!word) {
    return;
  }

  if (isCorrect) {
    word.correctCount += 1;
  } else {
    word.wrongCount += 1;
    word.checklist.weak = true;
    word.checklist.review = true;
  }

  saveWords();
  updateSummary();
  renderWords();
  renderMistakes();
}

function deleteWord(id) {
  const word = findWordById(id);

  if (!word) {
    return;
  }

  const ok = confirm(`Delete "${word.english} / ${word.german}"?`);

  if (!ok) {
    return;
  }

  words = words.filter((item) => item.id !== word.id);

  delete individualHiddenState[word.id];
  delete expandedCardState[word.id];

  saveWords();
  renderAll();
}

function handleWordAction(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const card = button.closest(".word-card");
  const id = Number(card?.dataset.id);
  const word = findWordById(id);

  if (!word) {
    return;
  }

  const action = button.dataset.action;

  if (action === "toggle-english") {
    toggleIndividualVisibility(id, "english");
    return;
  }

  if (action === "toggle-german") {
    toggleIndividualVisibility(id, "german");
    return;
  }

  if (action === "toggle-card") {
    toggleCardDetails(id);
    return;
  }

  if (action === "memo") {
    openMemoModal(id);
  }

  if (action === "edit") {
    fillFormForEdit(word);
  }

  if (action === "delete") {
    deleteWord(id);
  }

  if (action === "correct") {
    updateWordScore(id, true);
  }

  if (action === "wrong") {
    updateWordScore(id, false);
  }
}

/* --------------------------------------------------
   Memo modal
-------------------------------------------------- */

function openMemoModal(id) {
  const word = findWordById(id);

  if (!word) {
    return;
  }

  currentMemoId = id;

  elements.memoTextarea.value = word.memo;
  elements.memoModal.classList.remove("is-hidden");
  elements.memoModal.setAttribute("aria-hidden", "false");
  elements.memoTextarea.focus();
}

function closeMemoModal() {
  currentMemoId = null;

  elements.memoModal.classList.add("is-hidden");
  elements.memoModal.setAttribute("aria-hidden", "true");
}

function saveMemo() {
  const word = findWordById(currentMemoId);

  if (!word) {
    return;
  }

  word.memo = elements.memoTextarea.value.trim();

  saveWords();
  renderWords();
  renderMistakes();
  closeMemoModal();
}

function resetAllScores() {
  if (words.length === 0) {
    return;
  }

  const ok = confirm("Reset all correct and wrong counts to 0?");

  if (!ok) {
    return;
  }

  words.forEach((word) => {
    word.correctCount = 0;
    word.wrongCount = 0;
  });

  saveWords();
  resetQuiz();
  renderAll();
}

/* --------------------------------------------------
   Flashcards
-------------------------------------------------- */

function getQuestionText(word, direction) {
  if (direction === "en-de") {
    return word.english;
  }

  return word.german;
}

function getAnswerText(word, direction) {
  if (direction === "en-de") {
    return word.german;
  }

  return word.english;
}

function pickRandomWord(pool) {
  if (pool.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

function startFlashcards() {
  cardState.direction = elements.cardDirection.value;
  cardState.pool = getStudyPool("cards");
  cardState.currentIndex = -1;
  cardState.currentWord = null;
  cardState.answerShown = false;
  cardState.hasStarted = true;

  nextFlashcard();
  showTab("cards");
}

function restartFlashcardsFromControls() {
  if (!cardState.hasStarted) {
    return;
  }

  cardState.direction = elements.cardDirection.value;
  cardState.pool = getStudyPool("cards");
  cardState.currentIndex = -1;
  cardState.currentWord = null;
  cardState.answerShown = false;

  nextFlashcard();
}

function nextFlashcard() {
  if (cardState.pool.length === 0) {
    cardState.currentWord = null;
    cardState.currentIndex = -1;
    cardState.answerShown = false;
    renderFlashcard();
    return;
  }

  cardState.currentIndex = (cardState.currentIndex + 1) % cardState.pool.length;
  cardState.currentWord = cardState.pool[cardState.currentIndex];
  cardState.answerShown = false;

  renderFlashcard();
}

function renderFlashcard() {
  const word = cardState.currentWord;

  if (!word) {
    elements.flashcardBox.innerHTML = `
      <div class="empty-state inside-card">
        No words match this flashcard filter.
      </div>
    `;

    return;
  }

  elements.flashcardBox.innerHTML = `
    <div class="flashcard-face">
      <p class="flashcard-label">Question ${cardState.currentIndex + 1}/${cardState.pool.length}</p>

      <h2>
        ${escapeHtml(getQuestionText(word, cardState.direction))}
      </h2>

      <div class="mini-meta">
        <span class="badge level-badge">${escapeHtml(word.level)}</span>
        <span class="badge pos-badge">${escapeHtml(word.pos)}</span>
      </div>
    </div>

    <div class="flashcard-answer ${cardState.answerShown ? "" : "is-blurred"}">
      <p class="flashcard-label">Answer</p>

      <h3>
        ${cardState.answerShown
          ? escapeHtml(getAnswerText(word, cardState.direction))
          : "••••••"
        }
      </h3>
    </div>

    <div class="study-actions">
      <button type="button" class="btn btn-primary" data-card-action="show">
        Show Answer
      </button>

      <button type="button" class="btn btn-correct" data-card-action="correct">
        Correct
      </button>

      <button type="button" class="btn btn-wrong" data-card-action="wrong">
        Wrong
      </button>

      <button type="button" class="btn btn-soft" data-card-action="next">
        Next
      </button>
    </div>
  `;
}

function handleFlashcardAction(event) {
  const button = event.target.closest("button[data-card-action]");

  if (!button || !cardState.currentWord) {
    return;
  }

  const action = button.dataset.cardAction;

  if (action === "show") {
    cardState.answerShown = true;
    renderFlashcard();
    return;
  }

  if (action === "correct") {
    updateWordScore(cardState.currentWord.id, true);
    nextFlashcard();
    return;
  }

  if (action === "wrong") {
    updateWordScore(cardState.currentWord.id, false);
    nextFlashcard();
    return;
  }

  if (action === "next") {
    nextFlashcard();
  }
}

/* --------------------------------------------------
   Quiz
-------------------------------------------------- */

function resetQuiz() {
  quizState.pool = [];
  quizState.currentIndex = -1;
  quizState.currentWord = null;
  quizState.options = [];
  quizState.answered = false;
  quizState.total = 0;
  quizState.correct = 0;
  quizState.wrong = 0;
  quizState.missedWordIds = [];

  elements.quizBox.innerHTML = `
    <p class="empty-state inside-card">
      Press Start Quiz to begin.
    </p>
  `;

  elements.quizOptions.innerHTML = "";

  renderQuizScore();
}

function buildQuizOptions(targetWord, direction) {
  const correctAnswer = getAnswerText(targetWord, direction);

  const candidates = shuffleArray(
    words
      .filter((word) => word.id !== targetWord.id)
      .map((word) => {
        let priority = 1;

        if (word.pos === targetWord.pos && word.level === targetWord.level) {
          priority = 3;
        } else if (word.pos === targetWord.pos || word.level === targetWord.level) {
          priority = 2;
        }

        return {
          word,
          answer: getAnswerText(word, direction),
          priority
        };
      })
      .filter((item) => {
        return item.answer && item.answer !== correctAnswer;
      })
  ).sort((a, b) => b.priority - a.priority);

  const wrongAnswers = [];
  const usedAnswers = new Set([correctAnswer]);

  for (const item of candidates) {
    if (usedAnswers.has(item.answer)) {
      continue;
    }

    usedAnswers.add(item.answer);
    wrongAnswers.push(item.answer);

    if (wrongAnswers.length === 3) {
      break;
    }
  }

  return shuffleArray([
    correctAnswer,
    ...wrongAnswers
  ]);
}

function startQuiz() {
  if (words.length < 4) {
    elements.quizBox.innerHTML = `
      <p class="empty-state inside-card">
        Please add at least four words to start a four-choice quiz.
      </p>
    `;

    elements.quizOptions.innerHTML = "";
    return;
  }

  resetQuiz();

  quizState.direction = elements.quizDirection.value;
  quizState.pool = getStudyPool("quiz");
  quizState.currentIndex = -1;

  nextQuizQuestion();
}

function nextQuizQuestion() {
  if (words.length < 4) {
    elements.quizBox.innerHTML = `
      <p class="empty-state inside-card">
        Please add at least four words to start a four-choice quiz.
      </p>
    `;

    elements.quizOptions.innerHTML = "";
    return;
  }

  if (quizState.pool.length === 0) {
    elements.quizBox.innerHTML = `
      <p class="empty-state inside-card">
        No words match this quiz filter.
      </p>
    `;

    elements.quizOptions.innerHTML = "";
    return;
  }

  quizState.currentIndex = (quizState.currentIndex + 1) % quizState.pool.length;

  const targetWord = quizState.pool[quizState.currentIndex];
  const options = buildQuizOptions(targetWord, quizState.direction);

  if (options.length < 4) {
    elements.quizBox.innerHTML = `
      <p class="empty-state inside-card">
        Please add at least four words with different answers to create quiz options.
      </p>
    `;

    elements.quizOptions.innerHTML = "";
    return;
  }

  quizState.currentWord = targetWord;
  quizState.options = options;
  quizState.answered = false;

  elements.quizBox.innerHTML = `
    <p class="flashcard-label">Question ${quizState.currentIndex + 1}/${quizState.pool.length}</p>

    <h2>
      ${escapeHtml(getQuestionText(targetWord, quizState.direction))}
    </h2>

    <div class="mini-meta">
      <span class="badge level-badge">${escapeHtml(targetWord.level)}</span>
      <span class="badge pos-badge">${escapeHtml(targetWord.pos)}</span>
    </div>
  `;

  elements.quizOptions.innerHTML = options
    .map((option) => {
      return `
        <button
          type="button"
          class="quiz-option"
          data-answer="${escapeHtml(option)}"
        >
          ${escapeHtml(option)}
        </button>
      `;
    })
    .join("");
}

function handleQuizOption(event) {
  const button = event.target.closest(".quiz-option");

  if (!button || quizState.answered || !quizState.currentWord) {
    return;
  }

  const selectedAnswer = button.dataset.answer;
  const correctAnswer = getAnswerText(
    quizState.currentWord,
    quizState.direction
  );

  const isCorrect = selectedAnswer === correctAnswer;

  quizState.answered = true;
  quizState.total += 1;

  if (isCorrect) {
    quizState.correct += 1;
  } else {
    quizState.wrong += 1;
    quizState.missedWordIds.push(quizState.currentWord.id);
  }

  updateWordScore(quizState.currentWord.id, isCorrect);

  $$(".quiz-option").forEach((optionButton) => {
    const answer = optionButton.dataset.answer;

    optionButton.disabled = true;

    if (answer === correctAnswer) {
      optionButton.classList.add("is-correct");
    }

    if (answer === selectedAnswer && !isCorrect) {
      optionButton.classList.add("is-wrong");
    }
  });

  const nextButton = document.createElement("button");
  nextButton.type = "button";
  nextButton.className = "btn btn-primary wide-btn";
  nextButton.textContent = "Next Question";
  nextButton.addEventListener("click", nextQuizQuestion);

  elements.quizOptions.appendChild(nextButton);

  renderQuizScore();
}

/* --------------------------------------------------
   Event binding
-------------------------------------------------- */

function bindEvents() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showTab(button.dataset.tab);
    });
  });

  elements.searchInput.addEventListener("input", renderWords);

  elements.visibilitySelect.addEventListener("change", () => {
    resetIndividualVisibilityOverrides();
    renderWords();
    renderMistakes();
  });

  elements.sortSelect.addEventListener("change", renderWords);

  elements.resetAllScoresBtn?.addEventListener("click", resetAllScores);

  elements.filterType.addEventListener("change", () => {
    populateFilterValues();
    renderWords();
  });

  elements.filterValue.addEventListener("change", renderWords);

  elements.wordsGrid.addEventListener("click", handleWordAction);
  elements.mistakesGrid?.addEventListener("click", handleWordAction);

  elements.form.addEventListener("submit", handleFormSubmit);

  elements.resetFormBtn.addEventListener("click", resetForm);

  elements.autoDetectBtn.addEventListener("click", () => {
    autoDetectFormPOS(true);
  });

  elements.posInput.addEventListener("change", () => {
    posManuallyChanged = true;
  });

  elements.englishInput.addEventListener("input", () => {
    autoDetectFormPOS(false);
  });

  elements.germanInput.addEventListener("input", () => {
    autoDetectFormPOS(false);
  });

  elements.startCardsBtn.addEventListener("click", startFlashcards);

  elements.flashcardBox.addEventListener("click", handleFlashcardAction);

  elements.cardDirection.addEventListener("change", restartFlashcardsFromControls);

  elements.cardSortSelect?.addEventListener("change", restartFlashcardsFromControls);

  elements.cardFilterType?.addEventListener("change", () => {
    populateCardFilterValues();
    restartFlashcardsFromControls();
  });

  elements.cardFilterValue?.addEventListener("change", restartFlashcardsFromControls);

  elements.startQuizBtn.addEventListener("click", startQuiz);
  elements.resetQuizBtn.addEventListener("click", resetQuiz);
  elements.quizOptions.addEventListener("click", handleQuizOption);

  elements.quizSortSelect?.addEventListener("change", () => {
    resetQuiz();
  });

  elements.quizFilterType?.addEventListener("change", () => {
    populateQuizFilterValues();
    resetQuiz();
  });

  elements.quizFilterValue?.addEventListener("change", () => {
    resetQuiz();
  });

  elements.saveMemoBtn.addEventListener("click", saveMemo);
  elements.closeMemoBtn.addEventListener("click", closeMemoModal);
  elements.modalBackdrop.addEventListener("click", closeMemoModal);

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      !elements.memoModal.classList.contains("is-hidden")
    ) {
      closeMemoModal();
    }
  });
}

/* --------------------------------------------------
   App start
-------------------------------------------------- */

function init() {
  loadWords();
  bindEvents();
  resetQuiz();
  renderAll();

  const hashTab = window.location.hash.replace("#", "");

  if (["words", "cards", "quiz", "add"].includes(hashTab)) {
    showTab(hashTab);
  } else {
    showTab("words");
  }
}

document.addEventListener("DOMContentLoaded", init);
```

# qr_generator_colab.py

```python
# QR Code Generator for English-German Vocabulary Book
# Run this code in Google Colab.

# 1) Install QR library
!pip install -q qrcode[pil]

# 2) Import libraries
import os
import zipfile
import secrets
from pathlib import Path

import pandas as pd
import qrcode
from google.colab import files

# 3) Set your GitHub Pages URL
# Change this URL to your own GitHub Pages URL.
BASE_URL = "https://bokuhabobu.github.io/present/"

# 4-A) Manual user IDs
USER_IDS = [
    "u_001",
    "u_002",
    "u_003",
    "u_004",
    "u_005",
]

# 4-B) Optional: random user IDs
# If you want random IDs, uncomment the next line and comment out the manual USER_IDS above.
# USER_IDS = [f"u_{secrets.token_hex(3)}" for _ in range(20)]

# 5) Create output folder
output_dir = Path("qr_codes")
output_dir.mkdir(exist_ok=True)

records = []

# 6) Generate QR images
for uid in USER_IDS:
    url = f"{BASE_URL}?uid={uid}"

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )

    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    filename = f"{uid}.png"
    filepath = output_dir / filename
    img.save(filepath)

    records.append({
        "uid": uid,
        "url": url,
        "qr_file": filename,
    })

# 7) Save uid-url mapping table
mapping_df = pd.DataFrame(records)
mapping_df.to_csv("qr_mapping.csv", index=False, encoding="utf-8-sig")

print(mapping_df)

# 8) Zip all QR images and mapping CSV
zip_filename = "qr_codes.zip"

with zipfile.ZipFile(zip_filename, "w", compression=zipfile.ZIP_DEFLATED) as zipf:
    for png_file in output_dir.glob("*.png"):
        zipf.write(png_file, arcname=png_file.name)

    zipf.write("qr_mapping.csv", arcname="qr_mapping.csv")

# 9) Download zip file
files.download(zip_filename)

```

# README.md

```markdown
# English-German Vocabulary Book - QR User Version

This version supports QR-code-based user separation with URL parameters.

## Basic URL pattern

```text
https://bokuhabobu.github.io/present/?uid=u_001
https://bokuhabobu.github.io/present/?uid=u_002
https://bokuhabobu.github.io/present/?uid=u_003
```

The app reads `uid` from the URL and saves data to a different localStorage key.

```text
?uid=u_001 -> vocabularyWords_u_001
?uid=u_002 -> vocabularyWords_u_002
```

## Important note

This is not a login system. Data is saved in the browser's localStorage, so it is separated by:

- device
- browser
- domain
- uid in the URL

The same uid on a different device will not automatically sync.

## Files

```text
index.html
style.css
script.js
qr_generator_colab.ipynb
qr_generator_colab.py
```

## GitHub Pages usage

1. Upload `index.html`, `style.css`, and `script.js` to the GitHub Pages repository.
2. Open the site with `?uid=...`.
3. Use `qr_generator_colab.ipynb` in Google Colab to generate QR images.

## Update GitHub

```bash
git add .
git commit -m "Add QR user mode"
git push
```

```
