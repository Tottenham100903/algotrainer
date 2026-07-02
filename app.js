function asCode(lines) {
  return lines.join("\n");
}

const runtimePatterns = [
  {
    title: "Konstante Laufzeit mit sofortigem Rückgabewert",
    build() {
      const answer = sample(["42", "n + 7", "13"]);
      return {
        code: asCode([
          "def mystery(n):",
          "    marker = n + 1",
          "    doubled = marker * 2",
          "    cached = doubled - marker",
          `    answer = ${answer}`,
          "    if True:",
          "        return answer",
          "    shadow = cached - doubled",
          "    if shadow < 0:",
          "        return mystery(n - 1)",
        ]),
        answer: "O(1)",
        explanation: "Die Funktion beendet sich immer sofort; der rekursive Zweig wird nie erreicht.",
      };
    },
  },
  {
    title: "Linearer rekursiver Abstieg",
    build() {
      const step = sample([1, 2, 3]);
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    marker = n",
          "    if n <= 1:",
          "        return 1",
          "    total += marker",
          "    marker = marker - 1",
          "    total += 2",
          `    result = mystery(n - ${step})`,
          "    return total + result",
        ]),
        answer: "O(n)",
        explanation: "Pro Aufruf passiert nur konstante Arbeit, und n sinkt linear.",
      };
    },
  },
  {
    title: "Binäre Rekursion",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    score = 1",
          "    mirror = n - 1",
          "    if n <= 1:",
          "        return score",
          "    left = mystery(mirror)",
          "    right = mystery(mirror)",
          "    score += left",
          "    score += right",
          "    return score",
        ]),
        answer: "O(2^n)",
        explanation: "Jeder Aufruf erzeugt zwei Teilaufrufe der Größe n-1.",
      };
    },
  },
  {
    title: "Halbierung",
    build() {
      const base = sample([1, 2]);
      return {
        code: asCode([
          "def mystery(n):",
          "    counter = 0",
          "    probe = n",
          `    if n <= ${base}:`,
          "        return 1",
          "    counter += 1",
          "    probe = probe // 2",
          "    answer = mystery(probe)",
          "    counter += answer",
          "    return counter",
        ]),
        answer: "O(log n)",
        explanation: "n wird in jedem Schritt halbiert, also gibt es logarithmisch viele Aufrufe.",
      };
    },
  },
  {
    title: "Halbierung mit Schleife",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    if n <= 1:",
          "        return 0",
          "    for i in range(n):",
          "        total += i",
          "    half = n // 2",
          "    rest = mystery(half)",
          "    total += rest",
          "    return total",
        ]),
        answer: "O(n)",
        explanation: "Die Reihe n + n/2 + n/4 + ... summiert sich zu O(n).",
      };
    },
  },
  {
    title: "Wurzelartige Verkleinerung",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    steps = 1",
          "    shadow = n",
          "    if n <= 2:",
          "        return steps",
          "    shadow = int(shadow ** 0.5)",
          "    answer = mystery(shadow)",
          "    steps += answer",
          "    steps += 0",
          "    return steps",
        ]),
        answer: "O(log log n)",
        explanation: "Mehrfaches Wurzelziehen reduziert die Eingabe extrem schnell.",
      };
    },
  },
  {
    title: "Linear mit Schleife",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    marker = n",
          "    if n <= 1:",
          "        return 0",
          "    for i in range(n):",
          "        total += i",
          "    marker = marker - 1",
          "    total += mystery(marker)",
          "    return total",
        ]),
        answer: "O(n^2)",
        explanation: "Es gilt T(n) = T(n-1) + O(n), also entsteht eine quadratische Summe.",
      };
    },
  },
  {
    title: "Lineare Rekursion mit Akkumulator",
    build() {
      return {
        code: asCode([
          "def mystery(n, acc=0):",
          "    delta = 3",
          "    probe = acc",
          "    if n <= 0:",
          "        return probe",
          "    probe += delta",
          "    n = n - 1",
          "    next_value = mystery(n, probe)",
          "    probe = next_value",
          "    return probe",
        ]),
        answer: "O(n)",
        explanation: "Jeder Schritt reduziert n um 1 und führt sonst nur konstante Arbeit aus.",
      };
    },
  },
  {
    title: "Zwei halbierte Teilprobleme",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    score = 0",
          "    if n <= 1:",
          "        return 1",
          "    half = n // 2",
          "    left = mystery(half)",
          "    right = mystery(half)",
          "    score += left",
          "    score += right",
          "    return score",
        ]),
        answer: "O(n)",
        explanation: "Master-Theorem: T(n) = 2T(n/2) + O(1) ergibt O(n).",
      };
    },
  },
  {
    title: "Zwei halbierte Teilprobleme mit linearer Arbeit",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    if n <= 1:",
          "        return 0",
          "    for i in range(n):",
          "        total += i",
          "    half = n // 2",
          "    total += mystery(half)",
          "    total += mystery(half)",
          "    return total",
        ]),
        answer: "O(n log n)",
        explanation: "Master-Theorem: T(n) = 2T(n/2) + O(n) ergibt O(n log n).",
      };
    },
  },
];

const runtimeChoicesPool = [
  "O(1)",
  "O(log log n)",
  "O(log n)",
  "O(n)",
  "O(n log n)",
  "O(n^2)",
  "O(2^n)",
];

const masterRuntimeChoicesPool = [
  "log n",
  "n",
  "n log n",
  "n^log_2(3)",
  "n^2",
  "n^2 log n",
  "n^2 log^2 n",
  "n^3",
  "2^n",
];

const masterMethodChoices = [
  "Divide and Conquer / Master-Theorem",
  "Subtract and Conquer",
  "Substitution",
];

const masterCaseChoices = [
  {
    value: "Fall 1",
    label: "Fall 1: f(n) ist kleiner",
  },
  {
    value: "Fall 2",
    label: "Fall 2: gleich groß",
  },
  {
    value: "Fall 3",
    label: "Fall 3: f(n) ist größer",
  },
  {
    value: "Nicht anwendbar",
    label: "Kein Master-Fall",
  },
];

const masterPatterns = [
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 3T(n / 2) + n",
    recurrenceHtml: 'T(n) = 3T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 1",
    answer: "n^log_2(3)",
    explanation: "n ist polynomial kleiner als n^log_2(3), daher dominiert die Rekursion.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 2T(n / 2) + n",
    recurrenceHtml: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 2",
    answer: "n log n",
    explanation: "f(n) passt zu n^log_2(2) = n, also entsteht ein zusätzlicher log-Faktor.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 2T(n / 2) + n^2",
    recurrenceHtml: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + n<sup>2</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 3",
    answer: "n^2",
    explanation: "n^2 ist polynomial größer als n; die Regularitätsbedingung ist hier erfüllt.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 4T(n / 2) + n^2 log n",
    recurrenceHtml: 'T(n) = 4T(<span class="frac"><span>n</span><span>2</span></span>) + n<sup>2</sup> log n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 2",
    answer: "n^2 log^2 n",
    explanation: "f(n) = n^2 log^1 n; Fall 2 erhöht die Log-Potenz um eins.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 1) + n",
    recurrenceHtml: "T(n) = T(n - 1) + n",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Nicht anwendbar",
    answer: "n^2",
    explanation: "Ein Teilproblem wird nur um 1 kleiner; die arithmetische Summe ergibt n^2.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + 1",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + 1',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Nicht anwendbar",
    answer: "log n",
    explanation: "Es gibt nur ein Teilproblem pro Ebene; nach logarithmisch vielen Halbierungen ist Schluss.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + n",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Nicht anwendbar",
    answer: "n",
    explanation: "Die geometrische Summe ist durch ein konstantes Vielfaches von n beschränkt.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + T(n / 4) + n",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + T(<span class="frac"><span>n</span><span>4</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Substitution",
    caseName: "Nicht anwendbar",
    answer: "n",
    explanation: "Mit T(k) <= ck ergibt sich c(n/2) + c(n/4) + n <= cn für hinreichend großes c.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 1) + T(n - 2) + 1",
    recurrenceHtml: "T(n) = T(n - 1) + T(n - 2) + 1",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Substitution",
    caseName: "Nicht anwendbar",
    answer: "2^n",
    explanation: "Die Rekurrenz verzweigt in zwei fast gleich große Teilprobleme und wächst exponentiell.",
  },
];

const sortAlgorithms = {
  selection: {
    name: "Selectionsort",
    idea: "Sucht wiederholt das kleinste Element im unsortierten Bereich und tauscht es nach vorne.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
  },
  insertion: {
    name: "Insertionsort",
    idea: "Baut links einen sortierten Bereich auf und fuegt jedes neue Element passend ein.",
    stable: "Ja",
    inPlace: "Ja",
    runtimes: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
  },
  bubble: {
    name: "Bubblesort",
    idea: "Vergleicht Nachbarn und schiebt grosse Werte schrittweise nach rechts.",
    stable: "Ja",
    inPlace: "Ja",
    runtimes: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
  },
  merge: {
    name: "Mergesort",
    idea: "Teilt das Array rekursiv und fuehrt sortierte Teilbereiche wieder zusammen.",
    stable: "Ja",
    inPlace: "Nein",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
  },
  heap: {
    name: "Heapsort",
    idea: "Baut einen Max-Heap und legt das groesste Element wiederholt ans Ende.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
  },
  quick: {
    name: "Quicksort",
    idea: "Partitioniert um ein Pivot; gute Pivots fuehren zu kleinen Rekursionstiefen.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n^2)" },
  },
};

const sortRuntimeChoices = ["O(n)", "O(n log n)", "O(n^2)"];

const dataStructureQuestions = [
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list"><span>3</span><span>8</span><span>13</span><span>21</span><span>34</span></div>',
    question: "Welche Operation ist bei einer Array-Liste typischerweise O(1)?",
    choices: ["Zugriff auf Index 3", "Einfuegen am Anfang", "Suchen nach Wert 21", "Loeschen aus der Mitte ohne Index"],
    answer: "Zugriff auf Index 3",
    explanation: "Array-Listen speichern Elemente zusammenhaengend; direkter Indexzugriff ist konstant.",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list linked"><span>A</span><span>B</span><span>C</span><span>D</span></div>',
    question: "Was ist bei einer einfach verketteten Liste ohne Tail-Zeiger besonders teuer?",
    choices: ["Vorne einfuegen", "Erstes Element lesen", "Hinten einfuegen", "Nachfolger eines bekannten Knotens lesen"],
    answer: "Hinten einfuegen",
    explanation: "Ohne Tail-Zeiger muss man erst bis zum letzten Knoten laufen.",
  },
  {
    topic: "Woerterbuecher",
    scenarioHtml: '<div class="ds-map"><span>\"id\" → 42</span><span>\"name\" → \"Ada\"</span><span>\"level\" → 3</span></div>',
    question: "Welche Denkweise passt am besten zu einem Woerterbuch?",
    choices: ["Werte werden ueber Schluessel gefunden", "Werte sind nur ueber Positionen erreichbar", "Alle Werte bleiben automatisch sortiert", "Jeder Zugriff muss linear suchen"],
    answer: "Werte werden ueber Schluessel gefunden",
    explanation: "Woerterbuecher modellieren Key-Value-Zugriff, nicht Positionszugriff.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-buckets"><span>0: Mia</span><span>1: -</span><span>2: Tom, Zoe</span><span>3: Lin</span></div>',
    question: "Was zeigt der Bucket mit Tom und Zoe?",
    choices: ["Eine Kollision", "Eine perfekte Hashfunktion", "Eine Tiefensuche", "Eine Heap-Verletzung"],
    answer: "Eine Kollision",
    explanation: "Eine Kollision entsteht, wenn verschiedene Schluessel im selben Bucket landen.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-map"><span>load factor = entries / buckets</span><span>zu hoch → resize</span></div>',
    question: "Warum vergroessert eine Hashmap gelegentlich ihre Bucket-Anzahl?",
    choices: ["Um Kollisionen wahrscheinlicher zu machen", "Um die Last pro Bucket zu senken", "Um DFS zu beschleunigen", "Damit Werte sortiert bleiben"],
    answer: "Um die Last pro Bucket zu senken",
    explanation: "Resizing haelt den Load Factor klein und stabilisiert erwartete O(1)-Operationen.",
  },
  {
    topic: "Tiefensuche",
    scenarioHtml: '<div class="ds-graph"><span>A: B, C</span><span>B: D</span><span>C: E</span><span>D: -</span><span>E: -</span></div>',
    question: "DFS startet bei A und besucht Nachbarn in angegebener Reihenfolge. Welche Reihenfolge entsteht?",
    choices: ["A, B, D, C, E", "A, C, E, B, D", "A, B, C, D, E", "D, B, E, C, A"],
    answer: "A, B, D, C, E",
    explanation: "DFS geht zuerst so tief wie moeglich ueber B nach D und kehrt dann zu C/E zurueck.",
  },
  {
    topic: "Tiefensuche",
    scenarioHtml: '<div class="ds-graph"><span>Stack: A</span><span>visited: ∅</span><span>Graph kann Zyklen enthalten</span></div>',
    question: "Warum braucht DFS eine visited-Menge?",
    choices: ["Um Zyklen nicht endlos zu besuchen", "Um den Graphen automatisch zu sortieren", "Um einen Min-Heap zu bauen", "Um Hash-Kollisionen zu verhindern"],
    answer: "Um Zyklen nicht endlos zu besuchen",
    explanation: "Bei Zyklen kann DFS sonst immer wieder dieselben Knoten erreichen.",
  },
  {
    topic: "Min-Heap",
    scenarioHtml: '<div class="ds-heap"><span>4</span><span>9</span><span>7</span><span>15</span><span>12</span></div>',
    question: "Welches Element steht bei einem gueltigen Min-Heap immer an der Wurzel?",
    choices: ["Das kleinste Element", "Das groesste Element", "Das zuletzt eingefuegte Element", "Ein zufaelliges Pivot"],
    answer: "Das kleinste Element",
    explanation: "Im Min-Heap ist jeder Elternknoten kleiner oder gleich seinen Kindern.",
  },
  {
    topic: "Max-Heap",
    scenarioHtml: '<div class="ds-heap"><span>42</span><span>18</span><span>35</span><span>7</span><span>12</span><span>20</span></div>',
    question: "Welche Aussage beschreibt einen Max-Heap korrekt?",
    choices: ["Eltern sind groesser oder gleich ihren Kindern", "Eltern sind kleiner oder gleich ihren Kindern", "Die Blaetter sind immer sortiert", "Die Inorder-Reihenfolge ist sortiert"],
    answer: "Eltern sind groesser oder gleich ihren Kindern",
    explanation: "Beim Max-Heap steht das Maximum oben; die Ordnung gilt lokal zwischen Eltern und Kindern.",
  },
  {
    topic: "Heaps",
    scenarioHtml: '<div class="ds-heap"><span>2</span><span>8</span><span>5</span><span>13</span><span>11</span></div>',
    question: "Du fuegst 1 in diesen Min-Heap ein. Was passiert konzeptionell?",
    choices: ["1 wandert nach oben bis zur Wurzel", "1 bleibt immer am Ende", "Der Heap wird zu einer sortierten Liste", "Alle Elemente werden per DFS besucht"],
    answer: "1 wandert nach oben bis zur Wurzel",
    explanation: "Nach dem Einfuegen wird per Bubble-up die Heap-Eigenschaft wiederhergestellt.",
  },
];

class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
    this.log = [];
  }

  cloneRoot() {
    return cloneNode(this.root);
  }

  insert(value) {
    this.log.push(`Insert ${value}`);
    this.root = this.#insert(this.root, value);
  }

  delete(value) {
    this.log.push(`Delete ${value}`);
    this.root = this.#delete(this.root, value);
  }

  #insert(node, value) {
    if (!node) {
      return new AVLNode(value);
    }
    if (value === node.value) {
      this.log.push(`Skip ${value}, already present`);
      return node;
    }
    if (value < node.value) {
      node.left = this.#insert(node.left, value);
    } else {
      node.right = this.#insert(node.right, value);
    }
    return this.#rebalance(node);
  }

  #delete(node, value) {
    if (!node) {
      this.log.push(`Value ${value} not found`);
      return null;
    }

    if (value < node.value) {
      node.left = this.#delete(node.left, value);
    } else if (value > node.value) {
      node.right = this.#delete(node.right, value);
    } else {
      if (!node.left || !node.right) {
        return node.left || node.right;
      }
      const successor = this.#minValueNode(node.right);
      node.value = successor.value;
      node.right = this.#delete(node.right, successor.value);
    }

    return this.#rebalance(node);
  }

  #minValueNode(node) {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  #rebalance(node) {
    if (!node) {
      return null;
    }

    updateHeight(node);
    const balance = getBalance(node);

    if (balance > 1) {
      if (getBalance(node.left) < 0) {
        this.log.push(`LR rotation at ${node.value}`);
        node.left = rotateLeft(node.left);
      } else {
        this.log.push(`LL rotation at ${node.value}`);
      }
      return rotateRight(node);
    }

    if (balance < -1) {
      if (getBalance(node.right) > 0) {
        this.log.push(`RL rotation at ${node.value}`);
        node.right = rotateRight(node.right);
      } else {
        this.log.push(`RR rotation at ${node.value}`);
      }
      return rotateLeft(node);
    }

    return node;
  }
}

const state = {
  currentView: "home",
  runtimeQuestion: null,
  masterQuestion: null,
  showMasterHelp: false,
  sortValues: [],
  sortSteps: [],
  sortStepIndex: 0,
  sortTimer: null,
  sortQuestion: null,
  dataStructureQuestion: null,
  avlQuestion: null,
  showAVLPreview: false,
  sandboxTree: new AVLTree(),
  sandboxHistory: [],
  sandboxFuture: [],
  sandboxAnimating: false,
  sandboxAnimationTimer: null,
  avlPreviewTimer: null,
  renderCache: new Map(),
};

const el = {
  homeView: document.getElementById("home-view"),
  runtimeView: document.getElementById("runtime-view"),
  masterView: document.getElementById("master-view"),
  sortingView: document.getElementById("sorting-view"),
  avlView: document.getElementById("avl-view"),
  runtimeTitle: document.getElementById("runtime-title"),
  runtimeSnippet: document.getElementById("runtime-snippet"),
  runtimeOptions: document.getElementById("runtime-options"),
  runtimeFeedback: document.getElementById("runtime-feedback"),
  masterTitle: document.getElementById("master-title"),
  masterRecurrence: document.getElementById("master-recurrence"),
  masterTask: document.getElementById("master-task"),
  masterHelp: document.getElementById("master-help"),
  masterCaseHelp: document.getElementById("master-case-help"),
  masterHelpToggle: document.getElementById("toggle-master-help"),
  masterMethodOptions: document.getElementById("master-method-options"),
  masterCaseOptions: document.getElementById("master-case-options"),
  masterRuntimeOptions: document.getElementById("master-runtime-options"),
  masterFeedback: document.getElementById("master-feedback"),
  sortAlgorithm: document.getElementById("sort-algorithm"),
  sortBars: document.getElementById("sort-bars"),
  sortNote: document.getElementById("sort-note"),
  sortStepCount: document.getElementById("sort-step-count"),
  sortPlay: document.getElementById("sort-play"),
  sortPrev: document.getElementById("sort-prev"),
  sortNext: document.getElementById("sort-next"),
  sortInfo: document.getElementById("sort-info"),
  sortQuestionTitle: document.getElementById("sort-question-title"),
  sortBestOptions: document.getElementById("sort-best-options"),
  sortAverageOptions: document.getElementById("sort-average-options"),
  sortWorstOptions: document.getElementById("sort-worst-options"),
  sortFeedback: document.getElementById("sort-feedback"),
  dataStructureScenario: document.getElementById("ds-scenario"),
  dataStructureQuestion: document.getElementById("ds-question"),
  dataStructureOptions: document.getElementById("ds-options"),
  dataStructureFeedback: document.getElementById("ds-feedback"),
  avlOperation: document.getElementById("avl-operation"),
  avlSequence: document.getElementById("avl-sequence"),
  avlTreeBefore: document.getElementById("avl-tree-before"),
  avlTreeAfter: document.getElementById("avl-tree-after"),
  avlOptions: document.getElementById("avl-options"),
  avlFeedback: document.getElementById("avl-feedback"),
  avlPreviewPanel: document.getElementById("avl-preview-panel"),
  avlHelpToggle: document.getElementById("toggle-avl-help"),
  sandboxValue: document.getElementById("sandbox-value"),
  sandboxTree: document.getElementById("sandbox-tree"),
  sandboxRotationNotice: document.getElementById("sandbox-rotation-notice"),
  sandboxInsert: document.getElementById("sandbox-insert"),
  sandboxDelete: document.getElementById("sandbox-delete"),
  sandboxReset: document.getElementById("reset-sandbox"),
  sandboxUndo: document.getElementById("sandbox-undo"),
  sandboxRedo: document.getElementById("sandbox-redo"),
};

document.querySelectorAll("[data-open-view]").forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.openView));
});
document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => setActiveView("home"));
});
document.getElementById("new-runtime").addEventListener("click", createRuntimeQuestion);
document.getElementById("check-runtime").addEventListener("click", checkRuntimeQuestion);
document.getElementById("new-master").addEventListener("click", createMasterQuestion);
document.getElementById("check-master").addEventListener("click", checkMasterQuestion);
el.masterHelpToggle.addEventListener("click", toggleMasterHelp);
el.sortAlgorithm.addEventListener("change", rebuildSortSteps);
document.getElementById("shuffle-sort").addEventListener("click", resetSortValues);
el.sortPrev.addEventListener("click", previousSortStep);
el.sortNext.addEventListener("click", nextSortStep);
el.sortPlay.addEventListener("click", toggleSortPlayback);
document.getElementById("new-sort-question").addEventListener("click", createSortQuestion);
document.getElementById("check-sort-question").addEventListener("click", checkSortQuestion);
document.getElementById("new-ds-question").addEventListener("click", createDataStructureQuestion);
document.getElementById("check-ds-question").addEventListener("click", checkDataStructureQuestion);
document.getElementById("new-avl").addEventListener("click", createAVLQuestion);
document.getElementById("check-avl").addEventListener("click", applyAVLAnswer);
el.avlHelpToggle.addEventListener("click", toggleAVLHelp);
el.avlOptions.addEventListener("change", () => previewAVLRotation(true));
document.getElementById("sandbox-insert").addEventListener("click", () => mutateSandbox("insert"));
document.getElementById("sandbox-delete").addEventListener("click", () => mutateSandbox("delete"));
document.getElementById("reset-sandbox").addEventListener("click", () => resetSandbox(false));
el.sandboxUndo.addEventListener("click", undoSandbox);
el.sandboxRedo.addEventListener("click", redoSandbox);
el.sandboxValue.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    mutateSandbox("insert");
  }
});

createRuntimeQuestion();
createMasterQuestion();
resetSortValues();
createSortQuestion();
createDataStructureQuestion();
createAVLQuestion();
resetSandbox(true);
syncMasterHelpVisibility();
syncAVLPreviewVisibility();
setActiveView("home");

function setActiveView(viewName) {
  if (viewName !== "sorting") {
    stopSortPlayback();
  }
  state.currentView = viewName;

  const views = {
    home: el.homeView,
    runtime: el.runtimeView,
    master: el.masterView,
    sorting: el.sortingView,
    avl: el.avlView,
  };

  Object.entries(views).forEach(([name, node]) => {
    const active = name === viewName;
    node.classList.toggle("is-hidden", !active);
    node.classList.toggle("app-view-active", active);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createRuntimeQuestion() {
  const pattern = sample(runtimePatterns);
  const built = pattern.build();
  const choices = shuffle([
    built.answer,
    ...shuffle(runtimeChoicesPool.filter((item) => item !== built.answer)).slice(0, 3),
  ]);

  state.runtimeQuestion = { ...built, title: pattern.title, choices };
  el.runtimeTitle.textContent = pattern.title;
  el.runtimeSnippet.textContent = built.code;
  renderChoices(el.runtimeOptions, "runtime", choices);
  setFeedback(el.runtimeFeedback, "");
}

function checkRuntimeQuestion() {
  const selected = getSelectedValue("runtime-choice");
  if (!selected) {
    setFeedback(el.runtimeFeedback, "Wähle erst eine Laufzeit aus.", "wrong");
    return;
  }

  if (selected === state.runtimeQuestion.answer) {
    setFeedback(
      el.runtimeFeedback,
      `Richtig: ${selected}. ${state.runtimeQuestion.explanation}`,
      "correct",
    );
  } else {
    setFeedback(
      el.runtimeFeedback,
      `Noch nicht: Korrekt ist ${state.runtimeQuestion.answer}. ${state.runtimeQuestion.explanation}`,
      "wrong",
    );
  }
}

function createMasterQuestion() {
  const pattern = sample(masterPatterns);
  const runtimeChoices = shuffle([
    pattern.answer,
    ...shuffle(masterRuntimeChoicesPool.filter((item) => item !== pattern.answer)).slice(0, 3),
  ]);

  state.masterQuestion = { ...pattern, runtimeChoices };
  el.masterTitle.textContent = pattern.title;
  el.masterRecurrence.innerHTML = pattern.recurrenceHtml || pattern.recurrence;
  el.masterTask.textContent = pattern.task;
  renderChoices(el.masterMethodOptions, "master-method", masterMethodChoices);
  renderChoices(el.masterCaseOptions, "master-case", masterCaseChoices);
  renderChoices(
    el.masterRuntimeOptions,
    "master-runtime",
    runtimeChoices.map((choice) => ({ value: choice, label: formatRuntimeLabel(choice) })),
  );
  setFeedback(el.masterFeedback, "");
}

function checkMasterQuestion() {
  const selectedMethod = getSelectedValue("master-method-choice");
  const selectedCase = getSelectedValue("master-case-choice");
  const selectedRuntime = getSelectedValue("master-runtime-choice");

  if (!selectedMethod || !selectedCase || !selectedRuntime) {
    setFeedback(el.masterFeedback, "Wähle Verfahren, Fall/Begründung und Laufzeit aus.", "wrong");
    return;
  }

  const methodCorrect = selectedMethod === state.masterQuestion.method;
  const caseCorrect = selectedCase === state.masterQuestion.caseName;
  const runtimeCorrect = selectedRuntime === state.masterQuestion.answer;

  if (methodCorrect && caseCorrect && runtimeCorrect) {
    setFeedback(
      el.masterFeedback,
      `Richtig: ${selectedMethod}, ${selectedCase}, Laufzeitklasse ${selectedRuntime}. ${state.masterQuestion.explanation}`,
      "correct",
    );
    return;
  }

  const missing = [];
  if (!methodCorrect) {
    missing.push(`Verfahren: ${state.masterQuestion.method}`);
  }
  if (!caseCorrect) {
    missing.push(`Fall/Begründung: ${state.masterQuestion.caseName}`);
  }
  if (!runtimeCorrect) {
    missing.push(`Laufzeitklasse: ${state.masterQuestion.answer}`);
  }

  setFeedback(
    el.masterFeedback,
    `Noch nicht ganz. Korrektur: ${missing.join(", ")}. ${state.masterQuestion.explanation}`,
    "wrong",
  );
}

function toggleMasterHelp() {
  state.showMasterHelp = !state.showMasterHelp;
  syncMasterHelpVisibility();
}

function syncMasterHelpVisibility() {
  el.masterHelp.classList.toggle("is-hidden", !state.showMasterHelp);
  el.masterCaseHelp.classList.toggle("is-hidden", !state.showMasterHelp);
  el.masterHelpToggle.textContent = state.showMasterHelp ? "Hilfestellung ausblenden" : "Hilfestellung anzeigen";
}

function resetSortValues() {
  stopSortPlayback();
  state.sortValues = shuffle([18, 42, 27, 64, 35, 12, 56, 73, 49, 30]);
  rebuildSortSteps();
}

function rebuildSortSteps() {
  stopSortPlayback();
  const algorithm = el.sortAlgorithm.value;
  state.sortSteps = buildSortSteps(algorithm, state.sortValues);
  state.sortStepIndex = 0;
  renderSortStep();
  renderSortInfo();
}

function buildSortSteps(algorithm, values) {
  const builders = {
    selection: buildSelectionSortSteps,
    insertion: buildInsertionSortSteps,
    bubble: buildBubbleSortSteps,
    merge: buildMergeSortSteps,
    heap: buildHeapSortSteps,
    quick: buildQuickSortSteps,
  };
  return builders[algorithm](values);
}

function pushSortStep(steps, array, note, active = [], sorted = []) {
  steps.push({
    array: [...array],
    note,
    active: new Set(active),
    sorted: new Set(sorted),
  });
}

function buildSelectionSortSteps(values) {
  const arr = [...values];
  const steps = [];
  pushSortStep(steps, arr, "Start: links entsteht nach und nach der sortierte Bereich.");
  for (let i = 0; i < arr.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      pushSortStep(steps, arr, `Vergleiche aktuelles Minimum ${arr[min]} mit ${arr[j]}.`, [min, j], range(0, i));
      if (arr[j] < arr[min]) {
        min = j;
        pushSortStep(steps, arr, `${arr[min]} ist das neue Minimum.`, [min], range(0, i));
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    pushSortStep(steps, arr, `Tausche das Minimum an Position ${i + 1}.`, [i, min], range(0, i + 1));
  }
  pushSortStep(steps, arr, "Fertig: alle Elemente sind sortiert.", [], range(0, arr.length));
  return steps;
}

function buildInsertionSortSteps(values) {
  const arr = [...values];
  const steps = [];
  pushSortStep(steps, arr, "Start: der linke Bereich gilt als sortiert.", [], [0]);
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    pushSortStep(steps, arr, `Fuege ${key} in den sortierten linken Bereich ein.`, [i], range(0, i));
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      pushSortStep(steps, arr, `${arr[j]} ist groesser als ${key}; verschiebe nach rechts.`, [j, j + 1], range(0, i + 1));
      j -= 1;
    }
    arr[j + 1] = key;
    pushSortStep(steps, arr, `${key} sitzt an der passenden Stelle.`, [j + 1], range(0, i + 1));
  }
  pushSortStep(steps, arr, "Fertig: der sortierte Bereich umfasst das ganze Array.", [], range(0, arr.length));
  return steps;
}

function buildBubbleSortSteps(values) {
  const arr = [...values];
  const steps = [];
  pushSortStep(steps, arr, "Start: grosse Elemente wandern durch Nachbarvergleiche nach rechts.");
  for (let end = arr.length - 1; end > 0; end -= 1) {
    let swapped = false;
    for (let i = 0; i < end; i += 1) {
      pushSortStep(steps, arr, `Vergleiche Nachbarn ${arr[i]} und ${arr[i + 1]}.`, [i, i + 1], range(end + 1, arr.length));
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        pushSortStep(steps, arr, "Tausche, weil die Reihenfolge falsch ist.", [i, i + 1], range(end + 1, arr.length));
      }
    }
    pushSortStep(steps, arr, "Das groesste verbleibende Element ist rechts fixiert.", [end], range(end, arr.length));
    if (!swapped) {
      break;
    }
  }
  pushSortStep(steps, arr, "Fertig: keine Vertauschungen mehr noetig.", [], range(0, arr.length));
  return steps;
}

function buildMergeSortSteps(values) {
  const arr = [...values];
  const steps = [];
  const work = [...arr];
  pushSortStep(steps, arr, "Start: teile rekursiv und fuehre sortierte Bereiche zusammen.");

  function sort(left, right) {
    if (right - left <= 1) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    pushSortStep(steps, arr, `Teile Bereich ${left + 1}-${right} in zwei Haelften.`, range(left, right));
    sort(left, mid);
    sort(mid, right);
    let i = left;
    let j = mid;
    let k = left;
    while (i < mid && j < right) {
      if (arr[i] <= arr[j]) {
        work[k] = arr[i];
        i += 1;
      } else {
        work[k] = arr[j];
        j += 1;
      }
      k += 1;
    }
    while (i < mid) {
      work[k] = arr[i];
      i += 1;
      k += 1;
    }
    while (j < right) {
      work[k] = arr[j];
      j += 1;
      k += 1;
    }
    for (let index = left; index < right; index += 1) {
      arr[index] = work[index];
      pushSortStep(steps, arr, "Fuehre die Teilbereiche sortiert zusammen.", range(left, right), right - left === values.length ? range(left, index + 1) : []);
    }
  }

  sort(0, arr.length);
  pushSortStep(steps, arr, "Fertig: alle Teilbereiche wurden zusammengefuehrt.", [], range(0, arr.length));
  return steps;
}

function buildHeapSortSteps(values) {
  const arr = [...values];
  const steps = [];
  pushSortStep(steps, arr, "Start: baue zuerst einen Max-Heap.");

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (left < size && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < size && arr[right] > arr[largest]) {
      largest = right;
    }
    pushSortStep(steps, arr, `Pruefe Heap-Eigenschaft bei Position ${root + 1}.`, [root, left, right].filter((item) => item < size), range(size, arr.length));
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      pushSortStep(steps, arr, "Tausche groesseres Kind nach oben.", [root, largest], range(size, arr.length));
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
    heapify(arr.length, i);
  }
  pushSortStep(steps, arr, "Max-Heap steht: das Maximum liegt an der Wurzel.", [0]);

  for (let end = arr.length - 1; end > 0; end -= 1) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    pushSortStep(steps, arr, "Lege das aktuelle Maximum ans Ende.", [0, end], range(end, arr.length));
    heapify(end, 0);
  }
  pushSortStep(steps, arr, "Fertig: der sortierte Bereich ist komplett.", [], range(0, arr.length));
  return steps;
}

function buildQuickSortSteps(values) {
  const arr = [...values];
  const steps = [];
  pushSortStep(steps, arr, "Start: partitioniere Bereiche um ein Pivot.");

  function partition(low, high) {
    const pivot = arr[high];
    let i = low;
    pushSortStep(steps, arr, `Pivot ist ${pivot}. Kleinere Werte wandern nach links.`, [high], []);
    for (let j = low; j < high; j += 1) {
      pushSortStep(steps, arr, `Vergleiche ${arr[j]} mit Pivot ${pivot}.`, [j, high], []);
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        pushSortStep(steps, arr, "Element gehoert auf die linke Pivot-Seite.", [i, j, high], []);
        i += 1;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    pushSortStep(steps, arr, "Pivot sitzt jetzt an seiner endgueltigen Position.", [i], [i]);
    return i;
  }

  function quickSort(low, high) {
    if (low >= high) {
      if (low === high) {
        pushSortStep(steps, arr, "Ein einzelnes Element ist bereits sortiert.", [low], [low]);
      }
      return;
    }
    const pivotIndex = partition(low, high);
    quickSort(low, pivotIndex - 1);
    quickSort(pivotIndex + 1, high);
  }

  quickSort(0, arr.length - 1);
  pushSortStep(steps, arr, "Fertig: alle Partitionen sind sortiert.", [], range(0, arr.length));
  return steps;
}

function renderSortStep() {
  const step = state.sortSteps[state.sortStepIndex];
  if (!step) {
    return;
  }

  el.sortBars.innerHTML = "";
  const max = Math.max(...step.array);
  step.array.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = `sort-bar${step.active.has(index) ? " active" : ""}${step.sorted.has(index) ? " sorted" : ""}`;
    bar.style.height = `${Math.max(14, (value / max) * 100)}%`;
    bar.innerHTML = `<span>${value}</span>`;
    el.sortBars.appendChild(bar);
  });

  el.sortNote.textContent = step.note;
  el.sortStepCount.textContent = `Schritt ${state.sortStepIndex + 1} / ${state.sortSteps.length}`;
  el.sortPrev.disabled = state.sortStepIndex === 0;
  el.sortNext.disabled = state.sortStepIndex >= state.sortSteps.length - 1;
}

function renderSortInfo() {
  const algorithm = sortAlgorithms[el.sortAlgorithm.value];
  el.sortInfo.innerHTML = `
    <div><strong>Idee</strong><span>${algorithm.idea}</span></div>
    <div><strong>Stabil</strong><span>${algorithm.stable}</span></div>
    <div><strong>In-place</strong><span>${algorithm.inPlace}</span></div>
  `;
}

function previousSortStep() {
  stopSortPlayback();
  state.sortStepIndex = Math.max(0, state.sortStepIndex - 1);
  renderSortStep();
}

function nextSortStep() {
  state.sortStepIndex = Math.min(state.sortSteps.length - 1, state.sortStepIndex + 1);
  renderSortStep();
  if (state.sortStepIndex >= state.sortSteps.length - 1) {
    stopSortPlayback();
  }
}

function toggleSortPlayback() {
  if (state.sortTimer) {
    stopSortPlayback();
    return;
  }
  el.sortPlay.textContent = "Pause";
  state.sortTimer = window.setInterval(nextSortStep, 700);
}

function stopSortPlayback() {
  if (state.sortTimer) {
    window.clearInterval(state.sortTimer);
    state.sortTimer = null;
  }
  if (el.sortPlay) {
    el.sortPlay.textContent = "Abspielen";
  }
}

function createSortQuestion() {
  const key = sample(Object.keys(sortAlgorithms));
  const algorithm = sortAlgorithms[key];
  state.sortQuestion = { key, algorithm };
  el.sortQuestionTitle.textContent = `Welche Laufzeiten hat ${algorithm.name}?`;
  renderChoices(el.sortBestOptions, "sort-best", sortRuntimeChoices);
  renderChoices(el.sortAverageOptions, "sort-average", sortRuntimeChoices);
  renderChoices(el.sortWorstOptions, "sort-worst", sortRuntimeChoices);
  setFeedback(el.sortFeedback, "");
}

function checkSortQuestion() {
  const selectedBest = getSelectedValue("sort-best-choice");
  const selectedAverage = getSelectedValue("sort-average-choice");
  const selectedWorst = getSelectedValue("sort-worst-choice");
  if (!selectedBest || !selectedAverage || !selectedWorst) {
    setFeedback(el.sortFeedback, "Waehle Best, Average und Worst Case aus.", "wrong");
    return;
  }

  const runtimes = state.sortQuestion.algorithm.runtimes;
  if (selectedBest === runtimes.best && selectedAverage === runtimes.average && selectedWorst === runtimes.worst) {
    setFeedback(el.sortFeedback, `Richtig. ${state.sortQuestion.algorithm.name}: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}.`, "correct");
    return;
  }
  setFeedback(el.sortFeedback, `Noch nicht. Korrekt ist: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}.`, "wrong");
}

function createDataStructureQuestion() {
  const question = sample(dataStructureQuestions);
  state.dataStructureQuestion = question;
  el.dataStructureScenario.innerHTML = `
    <p class="ds-topic">${question.topic}</p>
    ${question.scenarioHtml}
  `;
  el.dataStructureQuestion.textContent = question.question;
  renderChoices(el.dataStructureOptions, "ds", shuffle(question.choices));
  setFeedback(el.dataStructureFeedback, "");
}

function checkDataStructureQuestion() {
  const selected = getSelectedValue("ds-choice");
  if (!selected) {
    setFeedback(el.dataStructureFeedback, "Waehle erst eine Antwort aus.", "wrong");
    return;
  }

  if (selected === state.dataStructureQuestion.answer) {
    setFeedback(el.dataStructureFeedback, `Richtig. ${state.dataStructureQuestion.explanation}`, "correct");
    return;
  }

  setFeedback(
    el.dataStructureFeedback,
    `Noch nicht. Korrekt ist: ${state.dataStructureQuestion.answer}. ${state.dataStructureQuestion.explanation}`,
    "wrong",
  );
}

function createAVLQuestion() {
  clearTimeout(state.avlPreviewTimer);
  let attempt = null;
  let tries = 0;
  while ((!attempt || attempt.rotation === "Keine Rotation") && tries < 80) {
    attempt = buildAVLScenario();
    tries += 1;
  }

  state.avlQuestion = attempt;
  el.avlOperation.textContent = attempt.operation;
  el.avlSequence.textContent = attempt.sequenceText;
  renderTree(el.avlTreeBefore, attempt.beforeInvalidRoot, {
    pivot: attempt.pivot,
    motionHint: "Ausgangslage vor der Rotation",
    animate: false,
    showStats: false,
  });
  renderChoices(el.avlOptions, "avl", shuffle(["LL", "RR", "LR", "RL", "Keine Rotation"]));
  state.showAVLPreview = false;
  syncAVLPreviewVisibility();
  showPreviewPlaceholder();
  setFeedback(el.avlFeedback, "");
}

function previewAVLRotation(forceReplay) {
  if (!state.showAVLPreview) {
    return;
  }
  const selected = getSelectedValue("avl-choice");
  if (!selected) {
    showPreviewPlaceholder();
    return;
  }

  const previewRoot = cloneNode(state.avlQuestion.beforeInvalidRoot);
  const rotated = applyNamedRotation(previewRoot, state.avlQuestion.pivot, selected);
  clearTimeout(state.avlPreviewTimer);

  if (!forceReplay) {
    renderTree(el.avlTreeAfter, rotated, {
      pivot: state.avlQuestion.pivot,
      motionHint: describeRotationPreview(selected, state.avlQuestion.pivot),
      showStats: true,
    });
    return;
  }

  renderTree(el.avlTreeAfter, cloneNode(state.avlQuestion.beforeInvalidRoot), {
    pivot: state.avlQuestion.pivot,
    animate: false,
    showStats: true,
  });

  state.avlPreviewTimer = setTimeout(() => {
    state.renderCache.set(
      el.avlTreeAfter.id,
      layoutCacheFromRoot(state.avlQuestion.beforeInvalidRoot, state.avlQuestion.pivot),
    );
    renderTree(el.avlTreeAfter, rotated, {
      pivot: state.avlQuestion.pivot,
      motionHint: describeRotationPreview(selected, state.avlQuestion.pivot),
      replay: true,
      duration: 1200,
      showStats: true,
    });
  }, 450);
}

function applyAVLAnswer() {
  const selected = getSelectedValue("avl-choice");
  if (!selected) {
    setFeedback(el.avlFeedback, "Wähle erst eine Rotation aus.", "wrong");
    return;
  }

  if (selected === state.avlQuestion.rotation) {
    state.renderCache.set(
      el.avlTreeBefore.id,
      layoutCacheFromRoot(state.avlQuestion.beforeInvalidRoot, state.avlQuestion.pivot),
    );
    renderTree(el.avlTreeBefore, cloneNode(state.avlQuestion.afterRoot), {
      pivot: state.avlQuestion.pivot,
      motionHint: `Richtig: ${selected}. Der Ausgangsbaum wurde in den balancierten Endzustand rotiert.`,
      replay: true,
      showStats: false,
    });
    if (state.showAVLPreview) {
      previewAVLRotation(true);
    }
    setFeedback(el.avlFeedback, `Richtig: ${selected}. Genau diese Rotation stellt die AVL-Balance wieder her.`, "correct");
    return;
  }

  if (state.showAVLPreview) {
    previewAVLRotation(true);
  }
  setFeedback(el.avlFeedback, `Noch nicht richtig. ${selected} führt nicht zum korrekten AVL-Endzustand.`, "wrong");
}

function mutateSandbox(mode, explicitValue = null) {
  const value = explicitValue ?? Number(el.sandboxValue.value);
  if (!Number.isInteger(value)) {
    state.sandboxTree.log.push("Bitte eine ganze Zahl eingeben.");
    renderSandbox({ animate: false, motionHint: "Nur ganze Zahlen sind erlaubt." });
    return;
  }

  clearTimeout(state.sandboxAnimationTimer);
  setSandboxAnimating(false);
  const rootBeforeOperation = cloneNode(state.sandboxTree.root);
  pushSandboxHistory();
  state.sandboxFuture = [];
  const beforeLogLength = state.sandboxTree.log.length;

  if (mode === "insert") {
    state.sandboxTree.insert(value);
  } else {
    state.sandboxTree.delete(value);
  }

  const newEntries = state.sandboxTree.log.slice(beforeLogLength);
  const rotation = latestRotationEntry(newEntries);
  el.sandboxValue.value = "";

  if (!rotation) {
    hideSandboxRotationNotice();
    renderSandbox();
    updateUndoRedoButtons();
    return;
  }

  const action = mode === "insert" ? "Hinzufügen" : "Löschen";
  el.sandboxRotationNotice.textContent =
    `Achtung: Beim ${action} von ${value} wird eine ${rotation.rotation}-Rotation an Knoten ${rotation.pivot} angewendet.`;
  el.sandboxRotationNotice.classList.remove("is-hidden");

  const beforeRotation = applyBSTOnly(rootBeforeOperation, value, mode);
  renderTree(el.sandboxTree, beforeRotation, {
    pivot: rotation.pivot,
    animate: false,
    showStats: false,
    onNodeClick: offerSandboxDelete,
  });
  setSandboxAnimating(true);
  updateUndoRedoButtons();

  state.sandboxAnimationTimer = setTimeout(() => {
    state.renderCache.set(
      el.sandboxTree.id,
      layoutCacheFromRoot(beforeRotation, rotation.pivot),
    );
    renderTree(el.sandboxTree, state.sandboxTree.root, {
      pivot: rotation.pivot,
      replay: true,
      duration: 1500,
      showStats: false,
      onNodeClick: offerSandboxDelete,
    });
    state.sandboxAnimationTimer = setTimeout(() => {
      setSandboxAnimating(false);
      updateUndoRedoButtons();
    }, 1500);
  }, 1100);
}

function resetSandbox(isInitial) {
  clearTimeout(state.sandboxAnimationTimer);
  setSandboxAnimating(false);
  hideSandboxRotationNotice();
  if (!isInitial) {
    pushSandboxHistory();
    state.sandboxFuture = [];
  }

  state.sandboxTree = new AVLTree();
  [30, 20, 40, 10, 25, 35, 50].forEach((value) => state.sandboxTree.insert(value));
  state.sandboxTree.log.push("Sandbox neu aufgebaut.");
  renderSandbox({
    animate: !isInitial,
    motionHint: "Startbaum geladen. Du kannst jetzt Einfügen, Löschen, Undo und Redo testen.",
  });
  updateUndoRedoButtons();
}

function undoSandbox() {
  if (!state.sandboxHistory.length) {
    return;
  }
  state.sandboxFuture.push(snapshotSandbox());
  const snapshot = state.sandboxHistory.pop();
  restoreSandboxSnapshot(snapshot);
  hideSandboxRotationNotice();
  renderSandbox({ motionHint: "Undo: vorheriger Baumstand wiederhergestellt." });
  updateUndoRedoButtons();
}

function redoSandbox() {
  if (!state.sandboxFuture.length) {
    return;
  }
  state.sandboxHistory.push(snapshotSandbox());
  const snapshot = state.sandboxFuture.pop();
  restoreSandboxSnapshot(snapshot);
  hideSandboxRotationNotice();
  renderSandbox({ motionHint: "Redo: der nächste Baumstand wurde erneut geladen." });
  updateUndoRedoButtons();
}

function renderSandbox(options = {}) {
  const latestRotation = latestRotationEntry(state.sandboxTree.log);
  renderTree(el.sandboxTree, state.sandboxTree.root, {
    pivot: latestRotation ? latestRotation.pivot : null,
    animate: options.animate !== false,
    replay: options.replay === true,
    showStats: false,
    onNodeClick: offerSandboxDelete,
  });
}

function buildAVLScenario() {
  const tree = new AVLTree();
  const seed = generateUniqueNumbers(7, 10, 99);
  seed.slice(0, 5).forEach((value) => tree.insert(value));
  const beforeValid = tree.cloneRoot();
  const operation = sample(["insert", "delete"]);

  let target;
  if (operation === "insert") {
    const existing = collectValues(tree.root);
    do {
      target = randomInt(10, 99);
    } while (existing.includes(target));
  } else {
    target = sample(collectValues(tree.root));
  }

  const beforeInvalidRoot = operation === "insert"
    ? applyBSTOnly(beforeValid, target, "insert")
    : applyBSTOnly(beforeValid, target, "delete");

  const answerTree = new AVLTree();
  seed.slice(0, 5).forEach((value) => answerTree.insert(value));
  if (operation === "insert") {
    answerTree.insert(target);
  } else {
    answerTree.delete(target);
  }

  const rotation = extractRotation(answerTree.log);
  const pivot = extractPivot(answerTree.log);

  return {
    operation: operation === "insert" ? `Operation: insert(${target})` : `Operation: delete(${target})`,
    sequenceText: `Ausgangswerte: ${seed.slice(0, 5).join(", ")}`,
    beforeInvalidRoot,
    rotation,
    pivot,
    afterRoot: answerTree.root,
  };
}

function renderChoices(container, name, choices) {
  container.innerHTML = "";
  choices.forEach((choice) => {
    const value = typeof choice === "string" ? choice : choice.value;
    const labelText = typeof choice === "string" ? choice : choice.label;
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="${name}-choice" value="${escapeAttribute(value)}"><span>${labelText}</span>`;
    container.appendChild(label);
  });
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatRuntimeLabel(value) {
  return String(value)
    .replaceAll("n^log_2(3)", "n<sup>log<sub>2</sub>(3)</sup>")
    .replaceAll("n^2 log^2 n", "n<sup>2</sup> log<sup>2</sup> n")
    .replaceAll("n^2 log n", "n<sup>2</sup> log n")
    .replaceAll("n^2", "n<sup>2</sup>")
    .replaceAll("n^3", "n<sup>3</sup>")
    .replaceAll("2^n", "2<sup>n</sup>");
}

function setFeedback(node, text, type = "") {
  node.textContent = text;
  node.className = `feedback${type ? ` ${type}` : ""}`;
}

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function showPreviewPlaceholder() {
  el.avlTreeAfter.innerHTML = "";
  state.renderCache.delete(el.avlTreeAfter.id);
  const note = document.createElement("div");
  note.className = "tree-preview-note";
  note.textContent = state.showAVLPreview
    ? "Wähle eine Rotation aus, dann siehst du hier die Hilfe mit Vorschau, Höhe und Balancefaktor."
    : "Tippe auf Hilfe, um die Vorschau mit Höhe und Balancefaktor einzublenden.";
  el.avlTreeAfter.appendChild(note);
}

function toggleAVLHelp() {
  state.showAVLPreview = !state.showAVLPreview;
  syncAVLPreviewVisibility();
  if (state.showAVLPreview) {
    previewAVLRotation(true);
  } else {
    clearTimeout(state.avlPreviewTimer);
    showPreviewPlaceholder();
  }
}

function syncAVLPreviewVisibility() {
  el.avlPreviewPanel.classList.toggle("is-hidden", !state.showAVLPreview);
  el.avlHelpToggle.textContent = state.showAVLPreview ? "Hilfe ausblenden" : "Hilfe anzeigen";
}

function renderTree(container, root, options = {}) {
  container.innerHTML = "";
  if (!root) {
    const empty = document.createElement("div");
    empty.className = "tree-empty";
    empty.textContent = "(leer)";
    container.appendChild(empty);
    state.renderCache.set(container.id, { nodes: new Map(), edges: new Map() });
    return;
  }

  const layout = buildTreeLayout(root, options.pivot);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${layout.width} ${layout.height}`);
  svg.setAttribute("class", "tree-svg");
  const showStats = options.showStats === true;

  const previous = state.renderCache.get(container.id) || { nodes: new Map(), edges: new Map() };
  const nodeVisuals = [];
  const edgeVisuals = [];

  layout.edges.forEach((edge) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("class", `tree-edge${edge.active ? " active" : ""}`);
    svg.appendChild(line);
    edgeVisuals.push({
      line,
      from: previousEdgePosition(previous, edge, layout.nodesById),
      to: edge,
    });
  });

  layout.nodes.forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const value = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const stats = document.createElementNS("http://www.w3.org/2000/svg", "text");

    circle.setAttribute("r", "22");
    circle.setAttribute("class", `tree-node-circle${node.isRoot ? " root" : ""}${node.isPivot ? " pivot" : ""}`);
    value.setAttribute("class", "tree-value");
    value.textContent = node.label;
    value.setAttribute("y", showStats ? "-2" : "1");
    stats.setAttribute("class", `tree-stats${showStats ? "" : " is-hidden"}`);
    stats.textContent = `h=${node.height} bf=${node.balance}`;
    stats.setAttribute("y", "34");

    if (options.onNodeClick) {
      group.setAttribute("class", "tree-node-interactive");
      group.setAttribute("role", "button");
      group.setAttribute("tabindex", "0");
      group.setAttribute("aria-label", `Knoten ${node.label} zum Löschen auswählen`);
      group.addEventListener("click", () => options.onNodeClick(Number(node.label)));
      group.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          options.onNodeClick(Number(node.label));
        }
      });
    }

    group.appendChild(circle);
    group.appendChild(value);
    group.appendChild(stats);
    svg.appendChild(group);

    nodeVisuals.push({
      group,
      from: previousNodePosition(previous, node, layout.nodesById),
      to: node,
    });
  });

  container.appendChild(svg);

  if (options.motionHint) {
    const note = document.createElement("div");
    note.className = "tree-motion-hint";
    note.textContent = options.motionHint;
    container.appendChild(note);
  }

  animateTreeVisuals(
    nodeVisuals,
    edgeVisuals,
    options.animate !== false,
    options.replay === true,
    options.duration,
  );
  state.renderCache.set(container.id, {
    nodes: new Map(layout.nodes.map((node) => [node.id, { x: node.x, y: node.y, parentId: node.parentId }])),
    edges: new Map(layout.edges.map((edge) => [edge.id, edge])),
  });
}

function animateTreeVisuals(nodeVisuals, edgeVisuals, animate, replay, requestedDuration) {
  const duration = animate ? (requestedDuration || 420) : 0;
  const opacityStart = replay ? 0.4 : 0.65;

  if (!duration) {
    edgeVisuals.forEach((edge) => setLine(edge.line, edge.to));
    nodeVisuals.forEach((node) => setGroupPosition(node.group, node.to.x, node.to.y, 1));
    return;
  }

  const start = performance.now();

  function frame(now) {
    const raw = Math.min(1, (now - start) / duration);
    const eased = 1 - ((1 - raw) ** 3);

    edgeVisuals.forEach((edge) => {
      setLine(edge.line, {
        x1: lerp(edge.from.x1, edge.to.x1, eased),
        y1: lerp(edge.from.y1, edge.to.y1, eased),
        x2: lerp(edge.from.x2, edge.to.x2, eased),
        y2: lerp(edge.from.y2, edge.to.y2, eased),
      });
      edge.line.style.opacity = String(lerp(opacityStart, 1, eased));
    });

    nodeVisuals.forEach((node) => {
      setGroupPosition(
        node.group,
        lerp(node.from.x, node.to.x, eased),
        lerp(node.from.y, node.to.y, eased),
        lerp(opacityStart, 1, eased),
      );
    });

    if (raw < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function buildTreeLayout(root, pivot) {
  const nodes = [];
  const edges = [];
  const positions = new Map();
  const gapX = 84;
  const gapY = 92;
  let cursor = 0;

  function assign(node, depth, parentId = null) {
    if (!node) {
      return;
    }
    assign(node.left, depth + 1, node.value);
    const current = {
      id: String(node.value),
      label: String(node.value),
      parentId: parentId === null ? null : String(parentId),
      x: 56 + cursor * gapX,
      y: 48 + depth * gapY,
      height: node.height,
      balance: getBalance(node),
      isRoot: parentId === null,
      isPivot: node.value === pivot,
    };
    cursor += 1;
    nodes.push(current);
    positions.set(current.id, current);
    assign(node.right, depth + 1, node.value);
  }

  function connect(node) {
    if (!node) {
      return;
    }
    if (node.left) {
      edges.push(edgeFromNodes(positions.get(String(node.value)), positions.get(String(node.left.value)), pivot));
    }
    if (node.right) {
      edges.push(edgeFromNodes(positions.get(String(node.value)), positions.get(String(node.right.value)), pivot));
    }
    connect(node.left);
    connect(node.right);
  }

  assign(root, 0, null);
  connect(root);

  return {
    nodes,
    edges,
    nodesById: new Map(nodes.map((node) => [node.id, node])),
    width: Math.max(260, 112 + Math.max(0, cursor - 1) * gapX),
    height: Math.max(180, 120 + Math.max(0, maxDepth(root) - 1) * gapY),
  };
}

function previousNodePosition(previous, node, nodesById) {
  const existing = previous.nodes.get(node.id);
  if (existing) {
    return existing;
  }
  if (node.parentId && previous.nodes.get(node.parentId)) {
    return previous.nodes.get(node.parentId);
  }
  if (node.parentId && nodesById.get(node.parentId)) {
    return nodesById.get(node.parentId);
  }
  return node;
}

function previousEdgePosition(previous, edge, nodesById) {
  const existing = previous.edges.get(edge.id);
  if (existing) {
    return existing;
  }
  const parent = previous.nodes.get(edge.fromId) || nodesById.get(edge.fromId);
  const child = previous.nodes.get(edge.toId) || parent || nodesById.get(edge.toId);
  return {
    x1: parent.x,
    y1: parent.y,
    x2: child.x,
    y2: child.y,
  };
}

function edgeFromNodes(from, to, pivot) {
  return {
    id: `${from.id}-${to.id}`,
    fromId: from.id,
    toId: to.id,
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    active: from.id === String(pivot) || to.id === String(pivot),
  };
}

function layoutCacheFromRoot(root, pivot) {
  const layout = buildTreeLayout(root, pivot);
  return {
    nodes: new Map(layout.nodes.map((node) => [node.id, { x: node.x, y: node.y, parentId: node.parentId }])),
    edges: new Map(layout.edges.map((edge) => [edge.id, edge])),
  };
}

function setGroupPosition(group, x, y, opacity) {
  group.setAttribute("transform", `translate(${x} ${y})`);
  group.style.opacity = String(opacity);
}

function setLine(line, edge) {
  line.setAttribute("x1", edge.x1);
  line.setAttribute("y1", edge.y1);
  line.setAttribute("x2", edge.x2);
  line.setAttribute("y2", edge.y2);
}

function applyNamedRotation(root, pivot, rotation) {
  if (!pivot || rotation === "Keine Rotation") {
    refreshHeights(root);
    return root;
  }
  const rotated = rotateAtPivot(root, pivot, rotation);
  refreshHeights(rotated);
  return rotated;
}

function rotateAtPivot(node, pivot, rotation) {
  if (!node) {
    return null;
  }

  if (pivot < node.value) {
    node.left = rotateAtPivot(node.left, pivot, rotation);
  } else if (pivot > node.value) {
    node.right = rotateAtPivot(node.right, pivot, rotation);
  } else {
    if (rotation === "LL") {
      node = rotateRight(node);
    } else if (rotation === "RR") {
      node = rotateLeft(node);
    } else if (rotation === "LR") {
      node.left = rotateLeft(node.left);
      node = rotateRight(node);
    } else if (rotation === "RL") {
      node.right = rotateRight(node.right);
      node = rotateLeft(node);
    }
  }

  refreshHeights(node);
  return node;
}

function extractRotation(logEntries) {
  const match = [...logEntries].reverse().find((entry) => /rotation/.test(entry));
  return match ? match.slice(0, 2) : "Keine Rotation";
}

function extractPivot(logEntries) {
  const match = [...logEntries].reverse().find((entry) => /rotation at/.test(entry));
  if (!match) {
    return null;
  }
  const pivot = Number(match.split(" at ")[1]);
  return Number.isFinite(pivot) ? pivot : null;
}

function latestRotationEntry(logEntries) {
  const entry = [...logEntries].reverse().find((item) => /rotation at/.test(item));
  if (!entry) {
    return null;
  }
  return {
    rotation: entry.slice(0, 2),
    pivot: extractPivot([entry]),
  };
}

function describeRotationPreview(rotation, pivot) {
  if (rotation === "Keine Rotation") {
    return "Kein Umbau: der Baum bleibt in seiner aktuellen Form.";
  }
  return `${rotation}-Rotation an Knoten ${pivot}: beobachte, wie die Teilbäume die Seite wechseln.`;
}

function sandboxMotionHint(mode, value, newEntries) {
  const rotation = latestRotationEntry(newEntries);
  if (rotation) {
    return `${mode === "insert" ? "Einfügen" : "Löschen"} von ${value}. Danach ${rotation.rotation} an Knoten ${rotation.pivot}.`;
  }
  return `${mode === "insert" ? "Einfügen" : "Löschen"} von ${value}. Der Baum bleibt AVL-stabil.`;
}

function snapshotSandbox() {
  return {
    root: cloneNode(state.sandboxTree.root),
    log: [...state.sandboxTree.log],
  };
}

function restoreSandboxSnapshot(snapshot) {
  const tree = new AVLTree();
  tree.root = cloneNode(snapshot.root);
  refreshHeights(tree.root);
  tree.log = [...snapshot.log];
  state.sandboxTree = tree;
}

function pushSandboxHistory() {
  state.sandboxHistory.push(snapshotSandbox());
  if (state.sandboxHistory.length > 40) {
    state.sandboxHistory.shift();
  }
}

function updateUndoRedoButtons() {
  el.sandboxUndo.disabled = state.sandboxAnimating || state.sandboxHistory.length === 0;
  el.sandboxRedo.disabled = state.sandboxAnimating || state.sandboxFuture.length === 0;
}

function setSandboxAnimating(isAnimating) {
  state.sandboxAnimating = isAnimating;
  el.sandboxValue.disabled = isAnimating;
  el.sandboxInsert.disabled = isAnimating;
  el.sandboxDelete.disabled = isAnimating;
  el.sandboxReset.disabled = isAnimating;
}

function hideSandboxRotationNotice() {
  el.sandboxRotationNotice.classList.add("is-hidden");
  el.sandboxRotationNotice.textContent = "";
}

function offerSandboxDelete(value) {
  if (state.sandboxAnimating) {
    return;
  }

  el.sandboxRotationNotice.replaceChildren();
  const text = document.createElement("span");
  text.textContent = `Knoten ${value} löschen?`;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "delete-node-btn";
  button.textContent = "Knoten löschen";
  button.addEventListener("click", () => mutateSandbox("delete", value));
  el.sandboxRotationNotice.append(text, button);
  el.sandboxRotationNotice.classList.remove("is-hidden");
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqueNumbers(count, min, max) {
  const values = new Set();
  while (values.size < count) {
    values.add(randomInt(min, max));
  }
  return [...values];
}

function range(start, end) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

function lerp(start, end, factor) {
  return start + ((end - start) * factor);
}

function height(node) {
  return node ? node.height : 0;
}

function updateHeight(node) {
  if (!node) {
    return;
  }
  node.height = Math.max(height(node.left), height(node.right)) + 1;
}

function getBalance(node) {
  return node ? height(node.left) - height(node.right) : 0;
}

function rotateRight(y) {
  if (!y || !y.left) {
    return y;
  }
  const x = y.left;
  const t2 = x.right;
  x.right = y;
  y.left = t2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x) {
  if (!x || !x.right) {
    return x;
  }
  const y = x.right;
  const t2 = y.left;
  y.left = x;
  x.right = t2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function cloneNode(node) {
  if (!node) {
    return null;
  }
  const copy = new AVLNode(node.value);
  copy.height = node.height;
  copy.left = cloneNode(node.left);
  copy.right = cloneNode(node.right);
  return copy;
}

function collectValues(node, acc = []) {
  if (!node) {
    return acc;
  }
  collectValues(node.left, acc);
  acc.push(node.value);
  collectValues(node.right, acc);
  return acc;
}

function maxDepth(node) {
  if (!node) {
    return 0;
  }
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

function applyBSTOnly(root, value, mode) {
  const clone = cloneNode(root);
  if (mode === "insert") {
    return bstInsertOnly(clone, value);
  }
  return bstDeleteOnly(clone, value);
}

function bstInsertOnly(node, value) {
  if (!node) {
    return new AVLNode(value);
  }
  if (value < node.value) {
    node.left = bstInsertOnly(node.left, value);
  } else if (value > node.value) {
    node.right = bstInsertOnly(node.right, value);
  }
  refreshHeights(node);
  return node;
}

function bstDeleteOnly(node, value) {
  if (!node) {
    return null;
  }
  if (value < node.value) {
    node.left = bstDeleteOnly(node.left, value);
  } else if (value > node.value) {
    node.right = bstDeleteOnly(node.right, value);
  } else {
    if (!node.left) {
      return node.right;
    }
    if (!node.right) {
      return node.left;
    }
    const successorValue = collectValues(node.right, [])[0];
    node.value = successorValue;
    node.right = bstDeleteOnly(node.right, successorValue);
  }
  refreshHeights(node);
  return node;
}

function refreshHeights(node) {
  if (!node) {
    return 0;
  }
  const leftHeight = refreshHeights(node.left);
  const rightHeight = refreshHeights(node.right);
  node.height = Math.max(leftHeight, rightHeight) + 1;
  return node.height;
}
