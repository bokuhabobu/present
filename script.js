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
  vocabularyWords
*/

const STORAGE_KEY = "vocabularyWords";

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

const cardState = {
  direction: "en-de",
  pool: [],
  currentWord: null,
  answerShown: false,
  mistakesOnly: false
};

const quizState = {
  direction: "en-de",
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

  searchInput: $("#searchInput"),
  visibilitySelect: $("#visibilitySelect"),
  sortSelect: $("#sortSelect"),
  filterType: $("#filterType"),
  filterValue: $("#filterValue"),
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
  startCardsBtn: $("#startCardsBtn"),
  flashcardBox: $("#flashcardBox"),

  quizDirection: $("#quizDirection"),
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
      english: false,
      german: false
    };
  }

  return individualHiddenState[wordId];
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
  if (isHiddenByGlobalMode(language)) {
    return true;
  }

  const state = getIndividualHiddenState(word.id);

  if (language === "english") {
    return state.english;
  }

  if (language === "german") {
    return state.german;
  }

  return false;
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
  const state = getIndividualHiddenState(wordId);

  if (language === "english") {
    state.english = !state.english;
  }

  if (language === "german") {
    state.german = !state.german;
  }

  renderWords();
  renderMistakes();
}

/* --------------------------------------------------
   Rendering
-------------------------------------------------- */

function updateSummary() {
  const total = words.length;
  const mistakes = words.filter((word) => word.wrongCount > 0).length;

  elements.wordSummary.textContent = `${total} words / ${mistakes} mistakes`;
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

  const individualState = getIndividualHiddenState(word.id);

  const englishButtonText = individualState.english ? "Show EN" : "Hide EN";
  const germanButtonText = individualState.german ? "Show DE" : "Hide DE";

  const englishButtonActive = individualState.english ? "is-active" : "";
  const germanButtonActive = individualState.german ? "is-active" : "";

  return `
    <article class="word-card" data-id="${word.id}">
      <div class="word-card-top">
        <div>
          <h3 class="${englishClass}">
            ${escapeHtml(visibleEnglish)}
          </h3>

          <p class="german-word ${germanClass}">
            ${escapeHtml(visibleGerman)}
          </p>
        </div>

        <div class="badge-stack">
          <span class="badge level-badge">${escapeHtml(word.level)}</span>
          <span class="badge pos-badge">${escapeHtml(word.pos)}</span>
        </div>
      </div>

      <div class="word-visibility-actions">
        <button
          type="button"
          class="btn btn-mini-toggle ${englishButtonActive}"
          data-action="toggle-english"
        >
          ${englishButtonText}
        </button>

        <button
          type="button"
          class="btn btn-mini-toggle ${germanButtonActive}"
          data-action="toggle-german"
        >
          ${germanButtonText}
        </button>
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
    </article>
  `;
}

function populateFilterValues() {
  const type = elements.filterType.value;
  const currentValue = elements.filterValue.value;

  elements.filterValue.innerHTML = "";

  if (type === "level") {
    elements.filterValue.classList.remove("is-hidden");

    elements.filterValue.innerHTML = LEVEL_OPTIONS
      .map((level) => `<option value="${level}">${level}</option>`)
      .join("");

    if (LEVEL_OPTIONS.includes(currentValue)) {
      elements.filterValue.value = currentValue;
    }

    return;
  }

  if (type === "pos") {
    elements.filterValue.classList.remove("is-hidden");

    elements.filterValue.innerHTML = POS_OPTIONS
      .map((pos) => `<option value="${pos}">${pos}</option>`)
      .join("");

    if (POS_OPTIONS.includes(currentValue)) {
      elements.filterValue.value = currentValue;
    }

    return;
  }

  elements.filterValue.classList.add("is-hidden");
}

function getFilteredSortedWords() {
  const query = elements.searchInput.value.trim().toLowerCase();
  const filterType = elements.filterType.value;
  const filterValue = elements.filterValue.value;
  const sortValue = elements.sortSelect.value;

  let result = words.filter((word) => {
    const matchesSearch =
      word.english.toLowerCase().includes(query) ||
      word.german.toLowerCase().includes(query);

    if (!matchesSearch) {
      return false;
    }

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

  if (sortValue === "az") {
    result.sort((a, b) => a.english.localeCompare(b.english));
  } else if (sortValue === "za") {
    result.sort((a, b) => b.english.localeCompare(a.english));
  } else if (sortValue === "created-asc") {
    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortValue === "random") {
    result = shuffleArray(result);
  } else if (sortValue === "wrong-desc") {
    result.sort((a, b) => b.wrongCount - a.wrongCount);
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

  elements.mistakesGrid.innerHTML = mistakeWords
    .map(createWordCard)
    .join("");

  elements.emptyMistakes.hidden = mistakeWords.length !== 0;
  elements.practiceMistakesBtn.disabled = mistakeWords.length === 0;
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

  const missedWords = [...new Set(quizState.missedWordIds)]
    .map((id) => words.find((word) => word.id === id))
    .filter(Boolean);

  if (missedWords.length === 0) {
    elements.quizMistakes.innerHTML = `
      <p class="muted-text">No missed words yet.</p>
    `;
    return;
  }

  elements.quizMistakes.innerHTML = missedWords
    .map((word) => {
      return `
        <span class="mistake-chip">
          ${escapeHtml(word.english)} / ${escapeHtml(word.german)}
        </span>
      `;
    })
    .join("");
}

function renderAll() {
  updateSummary();
  populateFilterValues();
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

function startFlashcards(mistakesOnly = false) {
  cardState.direction = elements.cardDirection.value;
  cardState.mistakesOnly = mistakesOnly;
  cardState.pool = mistakesOnly
    ? words.filter((word) => word.wrongCount > 0)
    : [...words];

  cardState.currentWord = pickRandomWord(cardState.pool);
  cardState.answerShown = false;

  renderFlashcard();
  showTab("cards");
}

function nextFlashcard() {
  cardState.pool = cardState.mistakesOnly
    ? words.filter((word) => word.wrongCount > 0)
    : [...words];

  cardState.currentWord = pickRandomWord(cardState.pool);
  cardState.answerShown = false;

  renderFlashcard();
}

function renderFlashcard() {
  const word = cardState.currentWord;

  if (!word) {
    elements.flashcardBox.innerHTML = `
      <div class="empty-state inside-card">
        ${cardState.mistakesOnly
          ? "No mistaken words yet."
          : "Add some words to start flashcard practice."
        }
      </div>
    `;

    return;
  }

  elements.flashcardBox.innerHTML = `
    <div class="flashcard-face">
      <p class="flashcard-label">Question</p>

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

  const targetWord = pickRandomWord(words);
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
    <p class="flashcard-label">Question</p>

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
    renderWords();
    renderMistakes();
  });

  elements.sortSelect.addEventListener("change", renderWords);

  elements.filterType.addEventListener("change", () => {
    populateFilterValues();
    renderWords();
  });

  elements.filterValue.addEventListener("change", renderWords);

  elements.wordsGrid.addEventListener("click", handleWordAction);
  elements.mistakesGrid.addEventListener("click", handleWordAction);

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

  elements.startCardsBtn.addEventListener("click", () => {
    startFlashcards(false);
  });

  elements.flashcardBox.addEventListener("click", handleFlashcardAction);

  elements.cardDirection.addEventListener("change", () => {
    cardState.direction = elements.cardDirection.value;
    cardState.answerShown = false;
    renderFlashcard();
  });

  elements.startQuizBtn.addEventListener("click", startQuiz);
  elements.resetQuizBtn.addEventListener("click", resetQuiz);
  elements.quizOptions.addEventListener("click", handleQuizOption);

  elements.practiceMistakesBtn.addEventListener("click", () => {
    startFlashcards(true);
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

  if (["words", "cards", "quiz", "mistakes", "add"].includes(hashTab)) {
    showTab(hashTab);
  } else {
    showTab("words");
  }
}

document.addEventListener("DOMContentLoaded", init);