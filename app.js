function asCode(lines) {
  return lines.join("\n");
}

const runtimePatterns = [
  {
    title: "Konstante Laufzeit mit sofortigem Rueckgabewert",
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
    title: "Binaere Rekursion",
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
        explanation: "Jeder Aufruf erzeugt zwei Teilaufrufe der Groesse n-1.",
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
        explanation: "Jeder Schritt reduziert n um 1 und fuehrt sonst nur konstante Arbeit aus.",
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
  runtimeQuestion: null,
  avlQuestion: null,
  showAVLPreview: true,
  showTreeStats: true,
  sandboxTree: new AVLTree(),
  sandboxHistory: [],
  sandboxFuture: [],
  renderCache: new Map(),
};

const el = {
  runtimeTitle: document.getElementById("runtime-title"),
  runtimeSnippet: document.getElementById("runtime-snippet"),
  runtimeOptions: document.getElementById("runtime-options"),
  runtimeFeedback: document.getElementById("runtime-feedback"),
  avlOperation: document.getElementById("avl-operation"),
  avlSequence: document.getElementById("avl-sequence"),
  avlTreeBefore: document.getElementById("avl-tree-before"),
  avlTreeAfter: document.getElementById("avl-tree-after"),
  avlOptions: document.getElementById("avl-options"),
  avlFeedback: document.getElementById("avl-feedback"),
  avlPreviewPanel: document.getElementById("avl-preview-panel"),
  avlPreviewToggle: document.getElementById("toggle-avl-preview"),
  treeStatsToggle: document.getElementById("toggle-tree-stats"),
  sandboxValue: document.getElementById("sandbox-value"),
  sandboxTree: document.getElementById("sandbox-tree"),
  sandboxLog: document.getElementById("sandbox-log"),
  sandboxUndo: document.getElementById("sandbox-undo"),
  sandboxRedo: document.getElementById("sandbox-redo"),
};

document.getElementById("new-runtime").addEventListener("click", createRuntimeQuestion);
document.getElementById("check-runtime").addEventListener("click", checkRuntimeQuestion);
document.getElementById("new-avl").addEventListener("click", createAVLQuestion);
document.getElementById("check-avl").addEventListener("click", applyAVLAnswer);
el.avlPreviewToggle.addEventListener("click", toggleAVLPreview);
el.treeStatsToggle.addEventListener("click", toggleTreeStats);
el.avlOptions.addEventListener("change", () => previewAVLRotation(false));
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
createAVLQuestion();
resetSandbox(true);
syncAVLPreviewVisibility();
syncTreeStatsVisibility();

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
    setFeedback(el.runtimeFeedback, "Waehle erst eine Laufzeit aus.", "wrong");
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

function createAVLQuestion() {
  let attempt = null;
  while (!attempt || attempt.rotation === "Keine Rotation") {
    attempt = buildAVLScenario();
  }

  state.avlQuestion = attempt;
  el.avlOperation.textContent = attempt.operation;
  el.avlSequence.textContent = attempt.sequenceText;
  renderTree(el.avlTreeBefore, attempt.beforeInvalidRoot, {
    pivot: attempt.pivot,
    motionHint: "Ausgangslage vor der Rotation",
    animate: false,
  });
  renderChoices(el.avlOptions, "avl", shuffle(["LL", "RR", "LR", "RL", "Keine Rotation"]));
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
  if (forceReplay) {
    state.renderCache.set(
      el.avlTreeAfter.id,
      layoutCacheFromRoot(state.avlQuestion.beforeInvalidRoot, state.avlQuestion.pivot),
    );
  }
  renderTree(el.avlTreeAfter, rotated, {
    pivot: state.avlQuestion.pivot,
    motionHint: describeRotationPreview(selected, state.avlQuestion.pivot),
    replay: forceReplay,
  });
}

function applyAVLAnswer() {
  const selected = getSelectedValue("avl-choice");
  if (!selected) {
    setFeedback(el.avlFeedback, "Waehle erst eine Rotation aus.", "wrong");
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
  setFeedback(el.avlFeedback, `Noch nicht richtig. ${selected} fuehrt nicht zum korrekten AVL-Endzustand.`, "wrong");
}

function mutateSandbox(mode) {
  const value = Number(el.sandboxValue.value);
  if (!Number.isInteger(value)) {
    state.sandboxTree.log.push("Bitte eine ganze Zahl eingeben.");
    renderSandbox({ animate: false, motionHint: "Nur ganze Zahlen sind erlaubt." });
    return;
  }

  pushSandboxHistory();
  state.sandboxFuture = [];
  const beforeLogLength = state.sandboxTree.log.length;

  if (mode === "insert") {
    state.sandboxTree.insert(value);
  } else {
    state.sandboxTree.delete(value);
  }

  const motion = sandboxMotionHint(mode, value, state.sandboxTree.log.slice(beforeLogLength));
  el.sandboxValue.value = "";
  renderSandbox({ motionHint: motion });
  updateUndoRedoButtons();
}

function resetSandbox(isInitial) {
  if (!isInitial) {
    pushSandboxHistory();
    state.sandboxFuture = [];
  }

  state.sandboxTree = new AVLTree();
  [30, 20, 40, 10, 25, 35, 50].forEach((value) => state.sandboxTree.insert(value));
  state.sandboxTree.log.push("Sandbox neu aufgebaut.");
  renderSandbox({
    animate: !isInitial,
    motionHint: "Startbaum geladen. Du kannst jetzt Einfuegen, Loeschen, Undo und Redo testen.",
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
  renderSandbox({ motionHint: "Redo: der naechste Baumstand wurde erneut geladen." });
  updateUndoRedoButtons();
}

function renderSandbox(options = {}) {
  const latestRotation = latestRotationEntry(state.sandboxTree.log);
  renderTree(el.sandboxTree, state.sandboxTree.root, {
    pivot: latestRotation ? latestRotation.pivot : null,
    motionHint: options.motionHint || "AVL-Baum mit automatischer Balance",
    animate: options.animate !== false,
    replay: options.replay === true,
  });
  el.sandboxLog.textContent = state.sandboxTree.log.slice(-12).join("\n");
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
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="${name}-choice" value="${choice}"><span>${choice}</span>`;
    container.appendChild(label);
  });
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
  note.textContent = "Waehle eine Rotation aus, dann wird der Baum mit Bewegung umgebaut.";
  el.avlTreeAfter.appendChild(note);
}

function toggleAVLPreview() {
  state.showAVLPreview = !state.showAVLPreview;
  syncAVLPreviewVisibility();
  if (state.showAVLPreview) {
    previewAVLRotation(false);
  } else {
    showPreviewPlaceholder();
  }
}

function syncAVLPreviewVisibility() {
  el.avlPreviewPanel.classList.toggle("is-hidden", !state.showAVLPreview);
  el.avlPreviewToggle.textContent = state.showAVLPreview ? "Vorschau ausblenden" : "Vorschau einblenden";
}

function toggleTreeStats() {
  state.showTreeStats = !state.showTreeStats;
  syncTreeStatsVisibility();
}

function syncTreeStatsVisibility() {
  el.treeStatsToggle.textContent = state.showTreeStats ? "BF/H ausblenden" : "BF/H anzeigen";

  document.querySelectorAll(".tree-stats").forEach((node) => {
    node.classList.toggle("is-hidden", !state.showTreeStats);
  });

  document.querySelectorAll(".tree-value").forEach((node) => {
    node.setAttribute("y", state.showTreeStats ? "-2" : "1");
  });
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
    value.setAttribute("y", state.showTreeStats ? "-2" : "1");
    stats.setAttribute("class", `tree-stats${state.showTreeStats ? "" : " is-hidden"}`);
    stats.textContent = `h=${node.height} bf=${node.balance}`;
    stats.setAttribute("y", "34");

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

  animateTreeVisuals(nodeVisuals, edgeVisuals, options.animate !== false, options.replay === true);
  syncTreeStatsVisibility();
  state.renderCache.set(container.id, {
    nodes: new Map(layout.nodes.map((node) => [node.id, { x: node.x, y: node.y, parentId: node.parentId }])),
    edges: new Map(layout.edges.map((edge) => [edge.id, edge])),
  });
}

function animateTreeVisuals(nodeVisuals, edgeVisuals, animate, replay) {
  const duration = animate ? 420 : 0;
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
  return `${rotation}-Rotation an Knoten ${pivot}: beobachte, wie die Teilbaeume die Seite wechseln.`;
}

function sandboxMotionHint(mode, value, newEntries) {
  const rotation = latestRotationEntry(newEntries);
  if (rotation) {
    return `${mode === "insert" ? "Einfuegen" : "Loeschen"} von ${value}. Danach ${rotation.rotation} an Knoten ${rotation.pivot}.`;
  }
  return `${mode === "insert" ? "Einfuegen" : "Loeschen"} von ${value}. Der Baum bleibt AVL-stabil.`;
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
  el.sandboxUndo.disabled = state.sandboxHistory.length === 0;
  el.sandboxRedo.disabled = state.sandboxFuture.length === 0;
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
