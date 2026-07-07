const STORAGE_KEY = "infotrain-python-game-progress";

const keyboardTokens = ["(", ")", "[", "]", ":", "\"", "=", "+", "-", "*", "    "];

const gameText = {
  entryKicker: { de: "Neu im Programmierbereich", en: "New in programming" },
  entryTitle: { de: "Python-Reise mit Krugo", en: "Python journey with Krugo" },
  entryDescription: {
    de: "Beginne ganz leicht und programmiere dich durch zehn Level.",
    en: "Start gently and code your way through ten levels.",
  },
  entryAction: { de: "Spiel starten", en: "Start game" },
  back: { de: "← Programmiermodule", en: "← Programming modules" },
  kicker: { de: "Deine Python-Reise", en: "Your Python journey" },
  title: { de: "Code-Abenteuer mit Krugo", en: "Code adventure with Krugo" },
  points: { de: "Punkte", en: "Points" },
  completed: { de: "Geschafft", en: "Completed" },
  levelMap: { de: "Levelkarte", en: "Level map" },
  level: { de: "Level", en: "Level" },
  of: { de: "von", en: "of" },
  file: { de: "main.py", en: "main.py" },
  dragInstruction: {
    de: "Ziehe einen Baustein in die Lücke oder tippe ihn auf dem Handy an.",
    en: "Drag a block into the gap or tap it on your phone.",
  },
  inputLabel: { de: "Dein Python-Code", en: "Your Python code" },
  console: { de: "Ausgabe", en: "Output" },
  idleOutput: { de: "Noch nicht ausgeführt.", en: "Not run yet." },
  hint: { de: "Krugos Hinweis", en: "Krugo's hint" },
  reset: { de: "Zurücksetzen", en: "Reset" },
  check: { de: "Code prüfen", en: "Check code" },
  next: { de: "Nächstes Level →", en: "Next level →" },
  tokens: { de: "Baustein-Aufgabe", en: "Block task" },
  input: { de: "Code-Aufgabe", en: "Code task" },
  locked: { de: "Gesperrt", en: "Locked" },
  complete: { de: "Geschafft", en: "Complete" },
  answerFirst: {
    de: "Setze zuerst alle Lücken ein, bevor Krugo den Code startet.",
    en: "Fill every gap before Krugo runs the code.",
  },
  codeFirst: {
    de: "Schreibe zuerst deinen Code in das Eingabefeld.",
    en: "Write your code in the editor first.",
  },
  wrong: {
    de: "Fast. Prüfe die markierte Stelle noch einmal oder nutze Krugos Hinweis.",
    en: "Almost. Check the marked part again or use Krugo's hint.",
  },
  correct: { de: "Richtig! Der Code läuft.", en: "Correct! The code runs." },
  final: {
    de: "Du hast alle zehn Level geschafft. Krugo ist bereit für das nächste Python-Kapitel.",
    en: "You completed all ten levels. Krugo is ready for the next Python chapter.",
  },
  unlock: {
    de: "Das nächste Level ist jetzt freigeschaltet.",
    en: "The next level is now unlocked.",
  },
  difficultyEasy: { de: "Leicht", en: "Easy" },
  difficultyMedium: { de: "Mittel", en: "Medium" },
  difficultyHard: { de: "Knifflig", en: "Tricky" },
  blankLabel: { de: "Code-Lücke", en: "Code gap" },
};

const levels = [
  {
    title: { de: "Sag Hallo", en: "Say hello" },
    objective: {
      de: "Wähle die Python-Funktion, die Text auf dem Bildschirm ausgibt.",
      en: "Choose the Python function that prints text on the screen.",
    },
    intro: {
      de: "Wir starten ganz leicht. Python soll uns zuerst begrüßen.",
      en: "We will start gently. First, let Python greet us.",
    },
    hint: {
      de: "Die gesuchte Funktion beginnt mit p und bedeutet ausgeben.",
      en: "The function starts with p and means to display something.",
    },
    success: {
      de: "Perfekt. print() zeigt Text in der Konsole an.",
      en: "Perfect. print() displays text in the console.",
    },
    type: "tokens",
    difficulty: "easy",
    code: {
      de: ["{{0}}(\"Hallo, Krugo!\")"],
      en: ["{{0}}(\"Hello, Krugo!\")"],
    },
    choices: ["print", "input", "return"],
    answer: ["print"],
    output: { de: "Hallo, Krugo!", en: "Hello, Krugo!" },
  },
  {
    title: { de: "Eine Variable", en: "A variable" },
    objective: {
      de: "Speichere Krugos Namen als Text in einer Variable.",
      en: "Store Krugo's name as text in a variable.",
    },
    intro: {
      de: "Variablen sind beschriftete Kisten. In diese Kiste legen wir einen Text.",
      en: "Variables are labelled boxes. We will put text into this one.",
    },
    hint: {
      de: "Text steht in Python immer zwischen Anführungszeichen.",
      en: "Text in Python is written inside quotation marks.",
    },
    success: {
      de: "Genau. Anführungszeichen machen aus Krugo einen String.",
      en: "Exactly. Quotation marks turn Krugo into a string.",
    },
    type: "tokens",
    difficulty: "easy",
    code: { de: ["name = {{0}}"], en: ["name = {{0}}"] },
    choices: ["\"Krugo\"", "Krugo", "42"],
    answer: ["\"Krugo\""],
    output: { de: "Variable name enthält: Krugo", en: "Variable name contains: Krugo" },
  },
  {
    title: { de: "Variable ausgeben", en: "Print a variable" },
    objective: {
      de: "Gib den gespeicherten Wert aus, ohne erneut \"Python\" zu schreiben.",
      en: "Print the stored value without writing \"Python\" again.",
    },
    intro: {
      de: "Jetzt öffnen wir unsere beschriftete Kiste wieder.",
      en: "Now we will open our labelled box again.",
    },
    hint: {
      de: "In print() gehört der Name links vom Gleichheitszeichen.",
      en: "Put the name from the left side of the equals sign into print().",
    },
    success: {
      de: "Sehr gut. Python ersetzt den Variablennamen durch seinen Wert.",
      en: "Great. Python replaces the variable name with its value.",
    },
    type: "tokens",
    difficulty: "easy",
    code: { de: ["ziel = \"Python\"", "print({{0}})"], en: ["goal = \"Python\"", "print({{0}})"] },
    choices: ["ziel", "\"ziel\"", "print"],
    choicesEn: ["goal", "\"goal\"", "print"],
    answer: ["ziel"],
    answerEn: ["goal"],
    output: { de: "Python", en: "Python" },
  },
  {
    title: { de: "Punkte addieren", en: "Add points" },
    objective: {
      de: "Wähle den Operator, der aus 4 und 3 insgesamt 7 Punkte macht.",
      en: "Choose the operator that turns 4 and 3 into 7 points.",
    },
    intro: {
      de: "Rechnen kann Python natürlich auch. Welches Zeichen brauchen wir?",
      en: "Python can calculate too. Which symbol do we need?",
    },
    hint: { de: "Wir möchten beide Zahlen zusammenzählen.", en: "We want to add both numbers." },
    success: { de: "Richtig. Das Pluszeichen addiert Zahlen.", en: "Correct. The plus sign adds numbers." },
    type: "tokens",
    difficulty: "easy",
    code: { de: ["punkte = 4 {{0}} 3", "print(punkte)"], en: ["points = 4 {{0}} 3", "print(points)"] },
    choices: ["+", "-", "*"],
    answer: ["+"],
    output: { de: "7", en: "7" },
  },
  {
    title: { de: "Eine Entscheidung", en: "Make a decision" },
    objective: {
      de: "Die Nachricht soll erscheinen, wenn mindestens zehn Punkte erreicht wurden.",
      en: "Show the message when at least ten points have been reached.",
    },
    intro: {
      de: "Mit if trifft Python Entscheidungen. Jetzt fehlt nur noch der Vergleich.",
      en: "Python makes decisions with if. Only the comparison is missing.",
    },
    hint: {
      de: "Mindestens bedeutet: größer als oder gleich.",
      en: "At least means greater than or equal to.",
    },
    success: {
      de: "Genau. >= prüft größer oder gleich.",
      en: "Exactly. >= checks greater than or equal to.",
    },
    type: "tokens",
    difficulty: "medium",
    code: {
      de: ["punkte = 12", "if punkte {{0}} 10:", "    print(\"Weiter!\")"],
      en: ["points = 12", "if points {{0}} 10:", "    print(\"Continue!\")"],
    },
    choices: [">=", "==", "<"],
    answer: [">="],
    output: { de: "Weiter!", en: "Continue!" },
  },
  {
    title: { de: "Dreimal wiederholen", en: "Repeat three times" },
    objective: {
      de: "Verbinde die Schleifenvariable mit range(3).",
      en: "Connect the loop variable to range(3).",
    },
    intro: {
      de: "Schleifen ersparen Wiederholungen. Dieses kleine Wort verbindet Variable und Zahlenfolge.",
      en: "Loops save repetition. This small word connects the variable and number sequence.",
    },
    hint: {
      de: "Eine Python-for-Schleife verwendet zwischen Variable und Sammlung das Wort in.",
      en: "A Python for loop uses the word in between the variable and collection.",
    },
    success: {
      de: "Stark. range(3) liefert die Zahlen 0, 1 und 2.",
      en: "Nice. range(3) produces the numbers 0, 1 and 2.",
    },
    type: "tokens",
    difficulty: "medium",
    code: { de: ["for zahl {{0}} range(3):", "    print(zahl)"], en: ["for number {{0}} range(3):", "    print(number)"] },
    choices: ["in", "of", "while"],
    answer: ["in"],
    output: { de: "0\n1\n2", en: "0\n1\n2" },
  },
  {
    title: { de: "Eine Liste erweitern", en: "Extend a list" },
    objective: {
      de: "Füge \"grün\" am Ende der Farbliste hinzu.",
      en: "Add \"green\" to the end of the color list.",
    },
    intro: {
      de: "Listen sammeln mehrere Werte. Dafür besitzt eine Liste eigene Methoden.",
      en: "Lists collect several values and provide their own methods.",
    },
    hint: {
      de: "Die Methode zum Anhängen heißt auf Englisch append.",
      en: "The method for adding an item to the end is called append.",
    },
    success: {
      de: "Richtig. append verändert die bestehende Liste.",
      en: "Correct. append changes the existing list.",
    },
    type: "tokens",
    difficulty: "medium",
    code: {
      de: ["farben = [\"rot\"]", "farben.{{0}}(\"grün\")", "print(farben)"],
      en: ["colors = [\"red\"]", "colors.{{0}}(\"green\")", "print(colors)"],
    },
    choices: ["append", "add", "push"],
    answer: ["append"],
    output: { de: "['rot', 'grün']", en: "['red', 'green']" },
  },
  {
    title: { de: "Selbst schreiben", en: "Write it yourself" },
    objective: {
      de: "Schreibe die eingerückte Rückgabezeile, die x verdoppelt.",
      en: "Write the indented return line that doubles x.",
    },
    intro: {
      de: "Ab jetzt übernimmst du die Tastatur. Eine einzige Codezeile reicht.",
      en: "You are taking over the keyboard now. One line of code is enough.",
    },
    hint: {
      de: "Beginne mit return und multipliziere x mit 2.",
      en: "Start with return and multiply x by 2.",
    },
    success: {
      de: "Sehr gut. return gibt das berechnete Ergebnis aus der Funktion zurück.",
      en: "Great. return sends the calculated result back from the function.",
    },
    type: "input",
    difficulty: "medium",
    code: {
      de: ["def doppelt(x):", "    # Schreibe hier die Rückgabezeile"],
      en: ["def double(x):", "    # Write the return line here"],
    },
    placeholder: { de: "    return x * 2", en: "    return x * 2" },
    accepted: ["returnx*2", "return2*x"],
    output: { de: "doppelt(4) → 8", en: "double(4) → 8" },
  },
  {
    title: { de: "Ein kleiner Codeblock", en: "A small code block" },
    objective: {
      de: "Schreibe eine if-Bedingung und die eingerückte Ausgabe für mindestens zehn Punkte.",
      en: "Write an if condition and an indented output for at least ten points.",
    },
    intro: {
      de: "Jetzt kombinieren wir Entscheidung und Ausgabe in zwei Zeilen.",
      en: "Now we will combine a decision and output in two lines.",
    },
    hint: {
      de: "Erste Zeile: if punkte >= 10: Danach folgt eingerückt print(\"Level geschafft!\").",
      en: "First line: if points >= 10: Then indent print(\"Level complete!\").",
    },
    success: {
      de: "Klasse. Doppelpunkt und Einrückung bilden gemeinsam den if-Block.",
      en: "Excellent. The colon and indentation form the if block.",
    },
    type: "input",
    difficulty: "hard",
    code: {
      de: ["punkte = 12", "# Schreibe darunter die Bedingung und Ausgabe"],
      en: ["points = 12", "# Write the condition and output below"],
    },
    placeholder: {
      de: "if punkte >= 10:\n    print(\"Level geschafft!\")",
      en: "if points >= 10:\n    print(\"Level complete!\")",
    },
    required: {
      de: [["ifpunkte>=10:"], ["print(\"levelgeschafft!\")"]],
      en: [["ifpoints>=10:"], ["print(\"levelcomplete!\")"]],
    },
    output: { de: "Level geschafft!", en: "Level complete!" },
  },
  {
    title: { de: "Deine erste Funktion", en: "Your first function" },
    objective: {
      de: "Schreibe eine Funktion begruessung(name), die \"Hallo, Name!\" zurückgibt.",
      en: "Write a function greeting(name) that returns \"Hello, name!\".",
    },
    intro: {
      de: "Finale! Baue jetzt selbst eine kleine wiederverwendbare Funktion.",
      en: "Finale! Build a small reusable function yourself.",
    },
    hint: {
      de: "Nutze def, einen Doppelpunkt und danach eingerückt return f\"Hallo, {name}!\".",
      en: "Use def, a colon and then indent return f\"Hello, {name}!\".",
    },
    success: {
      de: "Geschafft. Du hast Parameter, String und Rückgabewert zu einer Funktion verbunden.",
      en: "You did it. You combined a parameter, string and return value in one function.",
    },
    type: "input",
    difficulty: "hard",
    code: {
      de: ["# Schreibe die gesamte Funktion selbst"],
      en: ["# Write the complete function yourself"],
    },
    placeholder: {
      de: "def begruessung(name):\n    return f\"Hallo, {name}!\"",
      en: "def greeting(name):\n    return f\"Hello, {name}!\"",
    },
    required: {
      de: [["defbegruessung(name):"], ["returnf\"hallo,{name}!\""]],
      en: [["defgreeting(name):"], ["returnf\"hello,{name}!\""]],
    },
    output: { de: "Hallo, Krugo!", en: "Hello, Krugo!" },
  },
];

export function createPythonGame({ root, getLanguage }) {
  if (!root) {
    return { render() {}, close() {} };
  }

  const refs = {
    entry: root.querySelector("#python-game-entry"),
    entryKicker: root.querySelector("#python-game-entry-kicker"),
    entryTitle: root.querySelector("#python-game-entry-title"),
    entryDescription: root.querySelector("#python-game-entry-description"),
    entryAction: root.querySelector("#python-game-entry-action"),
    panel: root.querySelector("#python-game-panel"),
    close: root.querySelector("#python-game-close"),
    kicker: root.querySelector("#python-game-kicker"),
    title: root.querySelector("#python-game-title"),
    scoreLabel: root.querySelector("#python-game-score-label"),
    score: root.querySelector("#python-game-score"),
    progressLabel: root.querySelector("#python-game-progress-label"),
    progressCount: root.querySelector("#python-game-progress-count"),
    progressBar: root.querySelector("#python-game-progress-bar"),
    dialogue: root.querySelector("#python-game-dialogue"),
    levelsLabel: root.querySelector("#python-game-levels-label"),
    levels: root.querySelector("#python-game-levels"),
    levelLabel: root.querySelector("#python-game-level-label"),
    levelTitle: root.querySelector("#python-game-level-title"),
    difficulty: root.querySelector("#python-game-difficulty"),
    objective: root.querySelector("#python-game-objective"),
    fileLabel: root.querySelector("#python-game-file-label"),
    taskType: root.querySelector("#python-game-task-type"),
    code: root.querySelector("#python-game-code"),
    tokenArea: root.querySelector("#python-game-token-area"),
    tokenInstruction: root.querySelector("#python-game-token-instruction"),
    tokenBank: root.querySelector("#python-game-token-bank"),
    inputArea: root.querySelector("#python-game-input-area"),
    inputLabel: root.querySelector("#python-game-input-label"),
    keyboard: root.querySelector("#python-game-keyboard"),
    input: root.querySelector("#python-game-input"),
    consoleLabel: root.querySelector("#python-game-console-label"),
    consoleOutput: root.querySelector("#python-game-console-output"),
    hint: root.querySelector("#python-game-hint"),
    reset: root.querySelector("#python-game-reset"),
    check: root.querySelector("#python-game-check"),
    next: root.querySelector("#python-game-next"),
    feedback: root.querySelector("#python-game-feedback"),
  };

  const progress = loadProgress();
  let currentLevel = Math.min(Math.max(progress.unlocked - 1, 0), levels.length - 1);
  let placedTokens = [];
  let activeBlank = 0;
  let isOpen = false;

  function language() {
    const selected = getLanguage?.() || "de";
    return selected === "de" ? "de" : "en";
  }

  function text(value) {
    if (typeof value === "string") {
      return value;
    }
    return value?.[language()] || value?.en || value?.de || "";
  }

  function label(key) {
    return text(gameText[key]);
  }

  function current() {
    return levels[currentLevel];
  }

  function open() {
    isOpen = true;
    root.classList.add("python-game-active");
    refs.entry.classList.add("is-hidden");
    refs.panel.classList.remove("is-hidden");
    resetLevel();
    refs.close.focus();
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function close() {
    if (!isOpen) {
      return;
    }
    isOpen = false;
    root.classList.remove("python-game-active");
    refs.entry.classList.remove("is-hidden");
    refs.panel.classList.add("is-hidden");
    refs.entry.focus();
  }

  function render() {
    renderStaticText();
    renderProgress();
    renderLevelMap();
    if (isOpen) {
      renderStage();
    }
  }

  function renderStaticText() {
    refs.entryKicker.textContent = label("entryKicker");
    refs.entryTitle.textContent = label("entryTitle");
    refs.entryDescription.textContent = label("entryDescription");
    refs.entryAction.textContent = label("entryAction");
    refs.close.textContent = label("back");
    refs.kicker.textContent = label("kicker");
    refs.title.textContent = label("title");
    refs.scoreLabel.textContent = label("points");
    refs.progressLabel.textContent = label("completed");
    refs.levelsLabel.textContent = label("levelMap");
    refs.fileLabel.textContent = label("file");
    refs.tokenInstruction.textContent = label("dragInstruction");
    refs.inputLabel.textContent = label("inputLabel");
    refs.consoleLabel.textContent = label("console");
    refs.hint.textContent = label("hint");
    refs.reset.textContent = label("reset");
    refs.check.textContent = label("check");
    refs.next.textContent = label("next");
  }

  function renderProgress() {
    const completedCount = progress.completed.length;
    refs.score.textContent = String(completedCount * 100);
    refs.progressCount.textContent = `${completedCount}/${levels.length}`;
    refs.progressBar.style.width = `${(completedCount / levels.length) * 100}%`;
  }

  function renderLevelMap() {
    refs.levels.innerHTML = levels.map((level, index) => {
      const levelNumber = index + 1;
      const complete = progress.completed.includes(index);
      const locked = levelNumber > progress.unlocked;
      const status = complete ? label("complete") : locked ? label("locked") : text(level.title);
      return `
        <button class="python-game-level${index === currentLevel ? " is-current" : ""}${complete ? " is-complete" : ""}"
          type="button" data-python-level="${index}" ${locked ? "disabled" : ""} aria-current="${index === currentLevel ? "step" : "false"}">
          <span>${String(levelNumber).padStart(2, "0")}</span>
          <small>${escapeHtml(status)}</small>
        </button>
      `;
    }).join("");
  }

  function renderStage() {
    const level = current();
    refs.levelLabel.textContent = `${label("level")} ${currentLevel + 1} ${label("of")} ${levels.length}`;
    refs.levelTitle.textContent = text(level.title);
    refs.objective.textContent = text(level.objective);
    refs.difficulty.textContent = label(`difficulty${capitalize(level.difficulty)}`);
    refs.taskType.textContent = label(level.type);
    refs.dialogue.textContent = text(level.intro);
    refs.tokenArea.classList.toggle("is-hidden", level.type !== "tokens");
    refs.inputArea.classList.toggle("is-hidden", level.type !== "input");
    refs.input.value = "";
    refs.input.placeholder = text(level.placeholder);
    refs.consoleOutput.textContent = label("idleOutput");
    refs.feedback.className = "python-game-feedback";
    refs.feedback.textContent = "";
    refs.next.classList.toggle("is-hidden", currentLevel >= levels.length - 1 || !progress.completed.includes(currentLevel));
    placedTokens = Array(getAnswer(level).length).fill("");
    activeBlank = 0;
    renderCode();
    renderTokenBank();
    renderKeyboard();
  }

  function renderCode() {
    const codeLines = text(current().code);
    refs.code.innerHTML = codeLines.map((line, lineIndex) => {
      const parts = String(line).split(/(\{\{\d+\}\})/g);
      const content = parts.map((part) => {
        const match = part.match(/^\{\{(\d+)\}\}$/);
        if (!match) {
          return escapeHtml(part);
        }
        const blankIndex = Number(match[1]);
        const value = placedTokens[blankIndex] || "";
        return `<button class="python-game-dropzone${activeBlank === blankIndex ? " is-active" : ""}${value ? " is-filled" : ""}"
          type="button" data-python-blank="${blankIndex}" aria-label="${label("blankLabel")} ${blankIndex + 1}">${escapeHtml(value || "____")}</button>`;
      }).join("");
      return `<span class="python-game-code-line"><span class="python-game-line-number">${lineIndex + 1}</span><span>${content || " "}</span></span>`;
    }).join("");
  }

  function renderTokenBank() {
    if (current().type !== "tokens") {
      refs.tokenBank.innerHTML = "";
      return;
    }
    const choices = language() === "en" && current().choicesEn ? current().choicesEn : current().choices;
    refs.tokenBank.innerHTML = choices.map((token, index) => {
      const used = placedTokens.includes(token);
      return `<button class="python-game-token${used ? " is-used" : ""}" type="button" draggable="true"
        data-python-token="${index}" ${used ? "disabled" : ""}><code>${escapeHtml(token)}</code></button>`;
    }).join("");
  }

  function renderKeyboard() {
    refs.keyboard.innerHTML = keyboardTokens.map((token) => `
      <button type="button" data-python-key="${escapeAttribute(token)}">${token.trim() ? escapeHtml(token) : "Tab"}</button>
    `).join("");
  }

  function selectLevel(index) {
    if (index < 0 || index >= levels.length || index + 1 > progress.unlocked) {
      return;
    }
    currentLevel = index;
    resetLevel();
  }

  function resetLevel() {
    renderProgress();
    renderLevelMap();
    renderStage();
  }

  function placeToken(choiceIndex, blankIndex = activeBlank) {
    const level = current();
    const choices = language() === "en" && level.choicesEn ? level.choicesEn : level.choices;
    const token = choices?.[choiceIndex];
    if (!token || level.type !== "tokens") {
      return;
    }
    const target = Number.isInteger(blankIndex) ? blankIndex : placedTokens.findIndex((value) => !value);
    if (target < 0 || target >= placedTokens.length) {
      return;
    }
    placedTokens[target] = token;
    activeBlank = placedTokens.findIndex((value) => !value);
    if (activeBlank < 0) {
      activeBlank = target;
    }
    refs.feedback.textContent = "";
    refs.feedback.className = "python-game-feedback";
    renderCode();
    renderTokenBank();
  }

  function clearBlank(index) {
    if (!placedTokens[index]) {
      activeBlank = index;
    } else {
      placedTokens[index] = "";
      activeBlank = index;
    }
    renderCode();
    renderTokenBank();
  }

  function showHint() {
    refs.dialogue.textContent = text(current().hint);
    refs.dialogue.classList.remove("is-celebrating");
    refs.dialogue.classList.add("is-hinting");
  }

  function checkLevel() {
    const level = current();
    let correct = false;

    if (level.type === "tokens") {
      if (placedTokens.some((value) => !value)) {
        showFeedback(label("answerFirst"), "wrong");
        return;
      }
      correct = placedTokens.every((value, index) => value === getAnswer(level)[index]);
    } else {
      const answer = refs.input.value.trim();
      if (!answer) {
        showFeedback(label("codeFirst"), "wrong");
        refs.input.focus();
        return;
      }
      correct = validateInput(level, answer);
    }

    if (!correct) {
      refs.consoleOutput.textContent = "SyntaxError: try again";
      showFeedback(label("wrong"), "wrong");
      refs.dialogue.textContent = text(level.hint);
      refs.dialogue.classList.add("is-hinting");
      return;
    }

    const wasComplete = progress.completed.includes(currentLevel);
    if (!wasComplete) {
      progress.completed.push(currentLevel);
      progress.completed.sort((a, b) => a - b);
      progress.unlocked = Math.min(levels.length, Math.max(progress.unlocked, currentLevel + 2));
      saveProgress(progress);
    }
    refs.consoleOutput.textContent = text(level.output);
    refs.dialogue.textContent = text(level.success);
    refs.dialogue.classList.remove("is-hinting");
    refs.dialogue.classList.add("is-celebrating");
    const extra = currentLevel === levels.length - 1 ? label("final") : label("unlock");
    showFeedback(`${label("correct")} ${extra}`, "correct");
    refs.next.classList.toggle("is-hidden", currentLevel >= levels.length - 1);
    renderProgress();
    renderLevelMap();
  }

  function showFeedback(message, type) {
    refs.feedback.textContent = message;
    refs.feedback.className = `python-game-feedback ${type}`;
  }

  function nextLevel() {
    if (currentLevel >= levels.length - 1) {
      return;
    }
    selectLevel(currentLevel + 1);
    refs.levelTitle.focus?.();
  }

  function insertKeyboardToken(token) {
    const input = refs.input;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    input.value = `${input.value.slice(0, start)}${token}${input.value.slice(end)}`;
    input.focus();
    input.setSelectionRange(start + token.length, start + token.length);
  }

  refs.entry.addEventListener("click", open);
  refs.close.addEventListener("click", close);
  refs.hint.addEventListener("click", showHint);
  refs.reset.addEventListener("click", resetLevel);
  refs.check.addEventListener("click", checkLevel);
  refs.next.addEventListener("click", nextLevel);
  refs.levels.addEventListener("click", (event) => {
    const button = event.target.closest("[data-python-level]");
    if (button) {
      selectLevel(Number(button.dataset.pythonLevel));
    }
  });
  refs.tokenBank.addEventListener("click", (event) => {
    const button = event.target.closest("[data-python-token]");
    if (button) {
      placeToken(Number(button.dataset.pythonToken));
    }
  });
  refs.tokenBank.addEventListener("dragstart", (event) => {
    const button = event.target.closest("[data-python-token]");
    if (!button || !event.dataTransfer) {
      return;
    }
    event.dataTransfer.setData("text/python-token", button.dataset.pythonToken);
    event.dataTransfer.effectAllowed = "move";
  });
  refs.code.addEventListener("click", (event) => {
    const blank = event.target.closest("[data-python-blank]");
    if (blank) {
      clearBlank(Number(blank.dataset.pythonBlank));
    }
  });
  refs.code.addEventListener("dragover", (event) => {
    if (event.target.closest("[data-python-blank]")) {
      event.preventDefault();
    }
  });
  refs.code.addEventListener("drop", (event) => {
    const blank = event.target.closest("[data-python-blank]");
    if (!blank || !event.dataTransfer) {
      return;
    }
    event.preventDefault();
    placeToken(Number(event.dataTransfer.getData("text/python-token")), Number(blank.dataset.pythonBlank));
  });
  refs.keyboard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-python-key]");
    if (button) {
      insertKeyboardToken(button.dataset.pythonKey);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      close();
    }
  });

  render();
  return { render, close, open };
}

function getAnswer(level) {
  return level.answerEn && document.documentElement.lang !== "de" ? level.answerEn : level.answer;
}

function validateInput(level, answer) {
  const normalized = normalizeCode(answer);
  if (level.accepted?.some((accepted) => normalized === normalizeCode(accepted))) {
    return true;
  }
  const language = document.documentElement.lang === "de" ? "de" : "en";
  const required = level.required?.[language] || level.required?.en;
  return Boolean(required?.every((alternatives) => alternatives.some((part) => normalized.includes(normalizeCode(part)))));
}

function normalizeCode(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("'", "\"")
    .replaceAll(" ", "")
    .replaceAll("\t", "")
    .replaceAll("\r", "")
    .replaceAll("\n", "");
}

function loadProgress() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    const completed = Array.isArray(stored?.completed)
      ? [...new Set(stored.completed.filter((value) => Number.isInteger(value) && value >= 0 && value < levels.length))]
      : [];
    const unlocked = Math.min(levels.length, Math.max(1, Number(stored?.unlocked) || 1));
    return { completed, unlocked };
  } catch {
    return { completed: [], unlocked: 1 };
  }
}

function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The game remains usable when storage is unavailable.
  }
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", "&#10;");
}
