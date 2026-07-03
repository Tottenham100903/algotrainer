import {
  AVLNode,
  AVLTree,
  applyBSTOnly,
  cloneNode,
  collectValues,
  getBalance,
  height,
  maxDepth,
  refreshHeights,
  rotateLeft,
  rotateRight,
  updateHeight,
} from "./js/avl.js?v=20260703-modules";
import {
  generateUniqueNumbers,
  lerp,
  randomInt,
  range,
  sample,
  shuffle,
} from "./js/utils.js?v=20260703-modules";

function asCode(lines) {
  return lines.join("\n");
}

const runtimePatterns = [
  {
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
    title: "Code-Schnipsel analysieren",
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
  {
    title: "Code-Schnipsel analysieren",
    build() {
      const factor = sample([2, 3, 4]);
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    outer = n",
          "    while outer > 1:",
          "        inner = n",
          "        while inner > 1:",
          "            total += inner",
          `            inner = inner // ${factor}`,
          "        outer = outer - 1",
          "    return total",
        ]),
        answer: "O(n log n)",
        explanation: "Die äußere Schleife läuft linear oft, die innere Schleife logarithmisch oft.",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    for i in range(n):",
          "        for j in range(i):",
          "            total += i + j",
          "    return total",
        ]),
        answer: "O(n^2)",
        explanation: "Die verschachtelte Summe 0 + 1 + ... + (n-1) wächst quadratisch.",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    if n <= 1:",
          "        return 1",
          "    left = mystery(n // 2)",
          "    right = mystery(n // 2)",
          "    return left + right + n",
        ]),
        answer: "O(n log n)",
        explanation: "Es gilt T(n) = 2T(n/2) + O(n), also O(n log n).",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    steps = 0",
          "    while n > 1:",
          "        n = n // 2",
          "        steps += 1",
          "    return steps",
        ]),
        answer: "O(log n)",
        explanation: "Die Eingabe wird in jeder Iteration halbiert.",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    i = 1",
          "    steps = 0",
          "    while i < n:",
          "        i = i * 2",
          "        steps += 1",
          "    return steps",
        ]),
        answer: "O(log n)",
        explanation: "i verdoppelt sich in jedem Durchlauf und erreicht n daher nach logarithmisch vielen Schritten.",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    if n <= 1:",
          "        return 1",
          "    total = 0",
          "    for i in range(n):",
          "        total += i",
          "    return total + mystery(n // 2)",
        ]),
        answer: "O(n)",
        explanation: "Die Arbeit bildet die geometrische Reihe n + n/2 + n/4 + ..., also O(n).",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    if n <= 1:",
          "        return 1",
          "    a = mystery(n // 2)",
          "    b = mystery(n // 2)",
          "    return a + b + 1",
        ]),
        answer: "O(n)",
        explanation: "T(n) = 2T(n/2) + O(1) besitzt insgesamt linear viele Rekursionsknoten.",
      };
    },
  },
  {
    title: "Code-Schnipsel analysieren",
    build() {
      return {
        code: asCode([
          "def mystery(n):",
          "    total = 0",
          "    for i in range(n):",
          "        for j in range(n - i):",
          "            total += 1",
          "    return total",
        ]),
        answer: "O(n^2)",
        explanation: "Die innere Schleife läuft n + (n-1) + ... + 1 Mal, also quadratisch oft.",
      };
    },
  },
  {
    title: "Lineare Suche analysieren",
    build() {
      return {
        code: asCode([
          "def contains(values, target):",
          "    for value in values:",
          "        if value == target:",
          "            return True",
          "    return False",
        ]),
        answer: "O(n)",
        explanation: "Im Worst Case wird jedes Element einmal geprüft.",
      };
    },
  },
  {
    title: "Binäre Suche analysieren",
    build() {
      return {
        code: asCode([
          "def binary_search(values, target):",
          "    left = 0",
          "    right = len(values) - 1",
          "    while left <= right:",
          "        mid = (left + right) // 2",
          "        if values[mid] == target:",
          "            return mid",
          "        if values[mid] < target:",
          "            left = mid + 1",
          "        else:",
          "            right = mid - 1",
          "    return -1",
        ]),
        answer: "O(log n)",
        explanation: "Der Suchbereich halbiert sich nach jedem Vergleich.",
      };
    },
  },
  {
    title: "Selectionsort analysieren",
    build() {
      return {
        code: asCode([
          "def selection_sort(values):",
          "    n = len(values)",
          "    for i in range(n):",
          "        best = i",
          "        for j in range(i + 1, n):",
          "            if values[j] < values[best]:",
          "                best = j",
          "        values[i], values[best] = values[best], values[i]",
          "    return values",
        ]),
        answer: "O(n^2)",
        explanation: "Für jede Position wird der restliche unsortierte Bereich durchsucht.",
      };
    },
  },
  {
    title: "Mergesort analysieren",
    build() {
      return {
        code: asCode([
          "def merge_sort(values):",
          "    if len(values) <= 1:",
          "        return values",
          "    mid = len(values) // 2",
          "    left = merge_sort(values[:mid])",
          "    right = merge_sort(values[mid:])",
          "    return merge(left, right)",
        ]),
        answer: "O(n log n)",
        explanation: "Es gibt logarithmisch viele Ebenen, und pro Ebene wird insgesamt linear gemischt.",
      };
    },
  },
  {
    title: "Two-Pointer-Verfahren analysieren",
    build() {
      return {
        code: asCode([
          "def has_pair_sum(values, target):",
          "    left = 0",
          "    right = len(values) - 1",
          "    while left < right:",
          "        current = values[left] + values[right]",
          "        if current == target:",
          "            return True",
          "        if current < target:",
          "            left += 1",
          "        else:",
          "            right -= 1",
          "    return False",
        ]),
        answer: "O(n)",
        explanation: "Jeder Zeiger bewegt sich nur in eine Richtung; zusammen gibt es höchstens linear viele Schritte.",
      };
    },
  },
  {
    title: "Prefix-Sums analysieren",
    build() {
      return {
        code: asCode([
          "def prefix_sums(values):",
          "    prefix = [0]",
          "    for value in values:",
          "        prefix.append(prefix[-1] + value)",
          "    return prefix",
        ]),
        answer: "O(n)",
        explanation: "Jeder Eingabewert wird genau einmal verarbeitet.",
      };
    },
  },
  {
    title: "Hashmap-Lookup analysieren",
    build() {
      return {
        code: asCode([
          "def count_seen(values):",
          "    seen = {}",
          "    for value in values:",
          "        if value in seen:",
          "            seen[value] += 1",
          "        else:",
          "            seen[value] = 1",
          "    return seen",
        ]),
        answer: "O(n)",
        explanation: "Die Schleife läuft n-mal; Hashmap-Zugriffe sind im Durchschnitt O(1).",
      };
    },
  },
  {
    title: "Breitensuche analysieren",
    build() {
      return {
        code: asCode([
          "from collections import deque",
          "",
          "def bfs(graph, start):",
          "    queue = deque([start])",
          "    visited = {start}",
          "    while queue:",
          "        node = queue.popleft()",
          "        for neighbor in graph[node]:",
          "            if neighbor not in visited:",
          "                visited.add(neighbor)",
          "                queue.append(neighbor)",
          "    return visited",
        ]),
        answer: "O(V + E)",
        explanation: "Jeder Knoten und jede Kante wird bei der Breitensuche höchstens konstant oft betrachtet.",
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
  "O(V + E)",
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

const masterFlowChoices = [
  "Master-Theorem: log<sub>b</sub>(a) berechnen und Exponenten vergleichen",
  "Subtract and Conquer: Rekurrenz entfalten und Summe auswerten",
  "Substitution: Schranke einsetzen und per Induktion absichern",
];

const masterCaseChoices = [
  {
    value: "Fall 1",
    label: "d &lt; log<sub>b</sub>(a): Rekursion dominiert",
  },
  {
    value: "Fall 2",
    label: "d = log<sub>b</sub>(a): Gleichgewicht",
  },
  {
    value: "Fall 3",
    label: "d &gt; log<sub>b</sub>(a): Zusatzarbeit dominiert",
  },
  {
    value: "Lineare Entfaltung",
    label: "Subtract: linear viele Schritte ergeben eine Summe",
  },
  {
    value: "Logarithmische Entfaltung",
    label: "Subtract: logarithmisch viele Größenreduktionen",
  },
  {
    value: "Geometrische Summe",
    label: "Subtract: geometrische Summe bleibt durch den ersten Term beschränkt",
  },
  {
    value: "Lineare Substitution",
    label: "Substitution: lineare obere Schranke bleibt nach Einsetzen stabil",
  },
  {
    value: "Exponentielle Substitution",
    label: "Substitution: verzweigte Rekurrenz wächst exponentiell",
  },
];

const masterTrainingConfigs = {
  "Divide and Conquer / Master-Theorem": {
    heading: "Master-Theorem trainieren",
    copy: "Löse die Rekurrenz wie in einer Klausur: Lies die Master-Parameter ab, berechne log<sub>b</sub>(a), wähle den Dominanzfall und leite daraus die Laufzeit her.",
    task: "Bestimme a, b, c und d. Berechne log<sub>b</sub>(a), vergleiche d damit und leite den passenden Master-Fall ab.",
    flow: masterFlowChoices[0],
    caseValues: ["Fall 1", "Fall 2", "Fall 3"],
  },
  "Subtract and Conquer": {
    heading: "Subtract and Conquer trainieren",
    copy: "Löse die Rekurrenz durch Entfalten: Bestimme, wie die Eingabe kleiner wird, formuliere die entstehende Summe und leite daraus die Laufzeit her.",
    task: "Entfalte die Rekurrenz: Bestimme Reduktion, Rekursionstiefe, entstehende Summe und daraus die Laufzeit.",
    flow: masterFlowChoices[1],
    caseValues: ["Lineare Entfaltung", "Logarithmische Entfaltung", "Geometrische Summe"],
  },
  Substitution: {
    heading: "Substitution trainieren",
    copy: "Löse die Rekurrenz über eine Vermutung: Wähle eine passende Schranke, setze sie für kleinere Eingaben ein und prüfe, ob die Ungleichung stabil bleibt.",
    task: "Wähle eine plausible Schranke, setze die Induktionsannahme ein und prüfe die Bedingung für die Konstante.",
    flow: masterFlowChoices[2],
    caseValues: ["Lineare Substitution", "Exponentielle Substitution"],
  },
};

const masterPracticePatterns = [
  {
    recurrenceHtml: 'T(n) = 8T(<span class="frac"><span>n</span><span>2</span></span>) + 3n<sup>2</sup>',
    a: 8, b: 2, c: 3, d: 2, p: 3, comparison: "d<p", caseName: "Fall 1", answer: "n^3",
    explanation: "a = 8, b = 2, c = 3, d = 2 und log<sub>2</sub>(8) = 3. Weil d &lt; log<sub>b</sub>(a), dominiert die Rekursion.",
  },
  {
    recurrenceHtml: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + 5n',
    a: 2, b: 2, c: 5, d: 1, p: 1, comparison: "d=p", caseName: "Fall 2", answer: "n log n",
    explanation: "a = 2, b = 2, c = 5, d = 1 und log<sub>2</sub>(2) = 1. Bei Gleichheit kommt ein zusätzlicher Log-Faktor hinzu.",
  },
  {
    recurrenceHtml: 'T(n) = 3T(<span class="frac"><span>n</span><span>3</span></span>) + 6n<sup>2</sup>',
    a: 3, b: 3, c: 6, d: 2, p: 1, comparison: "d>p", caseName: "Fall 3", answer: "n^2",
    explanation: "a = 3, b = 3, c = 6, d = 2 und log<sub>3</sub>(3) = 1. Weil d &gt; log<sub>b</sub>(a), dominiert die Zusatzarbeit.",
  },
  {
    recurrenceHtml: 'T(n) = 9T(<span class="frac"><span>n</span><span>3</span></span>) + 2n<sup>2</sup>',
    a: 9, b: 3, c: 2, d: 2, p: 2, comparison: "d=p", caseName: "Fall 2", answer: "n^2 log n",
    explanation: "a = 9, b = 3, c = 2, d = 2 und log<sub>3</sub>(9) = 2. Der Gleichgewichtsfall liefert n<sup>2</sup> log n.",
  },
];

const subtractPracticePatterns = [
  {
    recurrenceHtml: "T(n) = T(n - 1) + n",
    reduction: "n - 1",
    depth: "n",
    expansion: "1 + 2 + ... + n",
    caseName: "Lineare Entfaltung",
    answer: "n^2",
    explanation: "Die Rekurrenz sinkt pro Schritt um 1. Beim Entfalten entsteht die arithmetische Summe 1 + 2 + ... + n, also O(n<sup>2</sup>).",
  },
  {
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + 1',
    reduction: "n / 2",
    depth: "log n",
    expansion: "1 + 1 + ... + 1 über log n Ebenen",
    caseName: "Logarithmische Entfaltung",
    answer: "log n",
    explanation: "Die Eingabe halbiert sich pro Schritt. Dadurch gibt es logarithmisch viele Ebenen mit konstanter Arbeit.",
  },
  {
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    reduction: "n / 2",
    depth: "log n",
    expansion: "n + n/2 + n/4 + ...",
    caseName: "Geometrische Summe",
    answer: "n",
    explanation: "Die entstehende geometrische Summe ist durch ein konstantes Vielfaches von n beschränkt.",
  },
];

const substitutionPracticePatterns = [
  {
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + T(<span class="frac"><span>n</span><span>4</span></span>) + n',
    guess: "T(n) ≤ c · n",
    inserted: "c(n/2) + c(n/4) + n ≤ c · n",
    condition: "c ≥ 4",
    caseName: "Lineare Substitution",
    answer: "n",
    explanation: "Mit T(k) ≤ c · k folgt T(n) ≤ 3cn/4 + n. Für c ≥ 4 bleibt die lineare Schranke stabil.",
  },
  {
    recurrenceHtml: "T(n) = T(n - 1) + T(n - 2) + 1",
    guess: "T(n) ≤ c · 2^n",
    inserted: "c2^(n-1) + c2^(n-2) + 1 ≤ c2^n",
    condition: "c groß genug",
    caseName: "Exponentielle Substitution",
    answer: "2^n",
    explanation: "Die beiden fast gleich großen Teilprobleme lassen sich durch eine exponentielle Schranke abfangen.",
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
    recurrence: "T(n) = 8T(n / 2) + n^2",
    recurrenceHtml: 'T(n) = 8T(<span class="frac"><span>n</span><span>2</span></span>) + n<sup>2</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 1",
    answer: "n^3",
    explanation: "n^log_2(8) = n^3 wächst polynomial stärker als n^2.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 9T(n / 3) + n^2",
    recurrenceHtml: 'T(n) = 9T(<span class="frac"><span>n</span><span>3</span></span>) + n<sup>2</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 2",
    answer: "n^2 log n",
    explanation: "n^log_3(9) = n^2; bei gleicher Größe entsteht ein zusätzlicher Log-Faktor.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 3T(n / 3) + n^2",
    recurrenceHtml: 'T(n) = 3T(<span class="frac"><span>n</span><span>3</span></span>) + n<sup>2</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 3",
    answer: "n^2",
    explanation: "n^2 wächst polynomial stärker als n^log_3(3) = n und dominiert die Rekurrenz.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 1) + n",
    recurrenceHtml: "T(n) = T(n - 1) + n",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Lineare Entfaltung",
    answer: "n^2",
    explanation: "Ein Teilproblem wird nur um 1 kleiner; die arithmetische Summe ergibt n^2.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + 1",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + 1',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Logarithmische Entfaltung",
    answer: "log n",
    explanation: "Es gibt nur ein Teilproblem pro Ebene; nach logarithmisch vielen Halbierungen ist Schluss.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + n",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Geometrische Summe",
    answer: "n",
    explanation: "Die geometrische Summe ist durch ein konstantes Vielfaches von n beschränkt.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 2) + 1",
    recurrenceHtml: "T(n) = T(n - 2) + 1",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Lineare Entfaltung",
    answer: "n",
    explanation: "n sinkt um eine Konstante, daher gibt es linear viele Rekursionsschritte.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 1) + log n",
    recurrenceHtml: "T(n) = T(n - 1) + log n",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Lineare Entfaltung",
    answer: "n log n",
    explanation: "Die Summe log 1 + log 2 + ... + log n liegt in O(n log n).",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + T(n / 4) + n",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + T(<span class="frac"><span>n</span><span>4</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Substitution",
    caseName: "Lineare Substitution",
    answer: "n",
    explanation: "Mit T(k) <= ck ergibt sich c(n/2) + c(n/4) + n <= cn für hinreichend großes c.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 1) + T(n - 2) + 1",
    recurrenceHtml: "T(n) = T(n - 1) + T(n - 2) + 1",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Substitution",
    caseName: "Exponentielle Substitution",
    answer: "2^n",
    explanation: "Die Rekurrenz verzweigt in zwei fast gleich große Teilprobleme und wächst exponentiell.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 2) + T(n / 5) + n",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + T(<span class="frac"><span>n</span><span>5</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Substitution",
    caseName: "Lineare Substitution",
    answer: "n",
    explanation: "Mit T(k) <= ck folgt c(n/2) + c(n/5) + n <= cn für hinreichend großes c.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 4T(n / 2) + n",
    recurrenceHtml: 'T(n) = 4T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 1",
    answer: "n^2",
    explanation: "n^log_2(4) = n^2 wächst polynomial stärker als f(n) = n.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 4T(n / 2) + n^2",
    recurrenceHtml: 'T(n) = 4T(<span class="frac"><span>n</span><span>2</span></span>) + n<sup>2</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 2",
    answer: "n^2 log n",
    explanation: "f(n) entspricht n^log_2(4) = n^2, daher kommt ein Log-Faktor hinzu.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = 2T(n / 2) + n^3",
    recurrenceHtml: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + n<sup>3</sup>',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Divide and Conquer / Master-Theorem",
    caseName: "Fall 3",
    answer: "n^3",
    explanation: "n^3 wächst polynomial stärker als n^log_2(2) = n und dominiert.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n - 3) + n^2",
    recurrenceHtml: "T(n) = T(n - 3) + n<sup>2</sup>",
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Lineare Entfaltung",
    answer: "n^3",
    explanation: "Die Summe der quadratischen Kosten über linear viele Schritte wächst kubisch.",
  },
  {
    title: "Rekurrenz analysieren",
    recurrence: "T(n) = T(n / 3) + 1",
    recurrenceHtml: 'T(n) = T(<span class="frac"><span>n</span><span>3</span></span>) + 1',
    task: "Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.",
    method: "Subtract and Conquer",
    caseName: "Logarithmische Entfaltung",
    answer: "log n",
    explanation: "n kann nur logarithmisch oft durch 3 geteilt werden, bevor die Basis erreicht ist.",
  },
];

const masterLearnCases = {
  case1: {
    formula: 'T(n) = 8T(<span class="frac"><span>n</span><span>2</span></span>) + 3n<sup>2</sup>',
    parameters: "a = 8, b = 2, c = 3, d = 2",
    result: "O(n<sup>3</sup>)",
    steps: [
      ["Parameter ablesen", "Aus aT(<span class=\"frac\"><span>n</span><span>b</span></span>) + c · n<sup>d</sup> lesen wir a = 8, b = 2, c = 3 und d = 2 ab."],
      ["Rekursionsanteil berechnen", "log<sub>2</sub>(8) = 3. Der Rekursionsbaum erzeugt also Arbeit in der Größenordnung n<sup>3</sup>."],
      ["Exponenten vergleichen", "d = 2 ist kleiner als log<sub>b</sub>(a) = 3. Die Zusatzarbeit 3n<sup>2</sup> wächst langsamer als n<sup>3</sup>; der Faktor c = 3 ändert daran nichts."],
      ["Ergebnis ableiten", "Wenn d &lt; log<sub>b</sub>(a), dominiert die Rekursion. Deshalb gilt T(n) = O(n<sup>log<sub>b</sub>(a)</sup>) = O(n<sup>3</sup>)."],
    ],
  },
  case2: {
    formula: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + 5n',
    parameters: "a = 2, b = 2, c = 5, d = 1",
    result: "O(n log n)",
    steps: [
      ["Parameter ablesen", "Es gilt a = 2, b = 2, c = 5 und d = 1. Pro Aufruf entstehen zwei halb so große Teilprobleme."],
      ["Rekursionsanteil berechnen", "log<sub>2</sub>(2) = 1. Damit wächst der reine Rekursionsanteil wie n<sup>1</sup>."],
      ["Exponenten vergleichen", "d = 1 und log<sub>b</sub>(a) = 1 sind gleich. Rekursion und Zusatzarbeit tragen auf jeder Ebene dieselbe Größenordnung bei."],
      ["Ergebnis ableiten", "Wenn d = log<sub>b</sub>(a), kommt ein Log-Faktor hinzu: T(n) = O(n<sup>d</sup> log n) = O(n log n)."],
    ],
  },
  case3: {
    formula: 'T(n) = 2T(<span class="frac"><span>n</span><span>2</span></span>) + 4n<sup>2</sup>',
    parameters: "a = 2, b = 2, c = 4, d = 2",
    result: "O(n<sup>2</sup>)",
    steps: [
      ["Parameter ablesen", "Es gilt a = 2, b = 2, c = 4 und d = 2. Außerhalb der Rekursion werden pro Aufruf 4n<sup>2</sup> Operationen modelliert."],
      ["Rekursionsanteil berechnen", "log<sub>2</sub>(2) = 1. Der Rekursionsanteil allein wächst damit wie n."],
      ["Exponenten vergleichen", "d = 2 ist größer als log<sub>b</sub>(a) = 1. Die Zusatzarbeit n<sup>2</sup> wächst polynomial schneller als der Rekursionsanteil n."],
      ["Ergebnis ableiten", "Wenn d &gt; log<sub>b</sub>(a), dominiert die Zusatzarbeit. Für diese polynomiale Form gilt T(n) = O(n<sup>d</sup>) = O(n<sup>2</sup>)."],
    ],
  },
  "subtract-sum": {
    formula: "T(n) = T(n - 1) + n",
    parameters: "ein Teilproblem · Eingabe sinkt um 1 · Zusatzarbeit n",
    result: "O(n<sup>2</sup>)",
    steps: [
      ["Verfahren erkennen", "Es gibt genau ein rekursives Teilproblem und dieses hat Größe n - 1. Das ist kein Master-Theorem-Fall, sondern Subtract and Conquer."],
      ["Rekurrenz entfalten", "Setze wiederholt ein: T(n) = T(n - 1) + n = T(n - 2) + (n - 1) + n = ..."],
      ["Summe formulieren", "Nach n - 1 Schritten landet man bei der Basis: T(n) = T(1) + 2 + 3 + ... + n."],
      ["Ergebnis ableiten", "Die arithmetische Summe 1 + 2 + ... + n liegt in O(n<sup>2</sup>). Deshalb gilt T(n) = O(n<sup>2</sup>)."],
    ],
  },
  "subtract-shrink": {
    formula: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + n',
    parameters: "ein Teilproblem · Eingabe halbiert sich · Zusatzarbeit n",
    result: "O(n)",
    steps: [
      ["Verfahren erkennen", "Es gibt nur ein Teilproblem pro Ebene. Weil die Eingabe halbiert wird, entstehen logarithmisch viele Rekursionsebenen."],
      ["Ebenen aufschreiben", "Die Zusatzarbeit lautet n, danach n/2, danach n/4 und so weiter bis zur Basis."],
      ["Summe bewerten", "Damit entsteht die geometrische Summe n + n/2 + n/4 + ... . Diese Summe ist höchstens 2n."],
      ["Ergebnis ableiten", "Die erste Ebene dominiert die Summe bis auf einen konstanten Faktor. Konstanten fallen in O-Notation weg, also T(n) = O(n)."],
    ],
  },
  "substitution-linear": {
    formula: 'T(n) = T(<span class="frac"><span>n</span><span>2</span></span>) + T(<span class="frac"><span>n</span><span>4</span></span>) + n',
    parameters: "ungleiche Teilprobleme · Master-Theorem passt nicht direkt",
    result: "O(n)",
    steps: [
      ["Vermutung wählen", "Die Zusatzarbeit n ist groß, die Teilprobleme zusammen haben Größe n/2 + n/4 = 3n/4. Eine lineare Schranke T(n) = O(n) ist plausibel."],
      ["Induktionsannahme einsetzen", "Nimm für kleinere Eingaben an: T(k) ≤ c · k. Dann gilt T(n) ≤ c(n/2) + c(n/4) + n."],
      ["Ungleichung vereinfachen", "Das ergibt T(n) ≤ 3cn/4 + n. Damit dies höchstens cn ist, reicht n ≤ cn/4, also c ≥ 4."],
      ["Ergebnis ableiten", "Für ein ausreichend großes c bleibt die lineare Schranke stabil. Daher gilt T(n) = O(n)."],
    ],
  },
  "substitution-branch": {
    formula: "T(n) = T(n - 1) + T(n - 2) + 1",
    parameters: "zwei fast gleich große Teilprobleme · verzweigte Rekursion",
    result: "O(2<sup>n</sup>)",
    steps: [
      ["Wachstum einschätzen", "Die Rekurrenz verzweigt in zwei Teilprobleme, die nur wenig kleiner sind. Das spricht für exponentielles Wachstum."],
      ["Obere Schranke vermuten", "Wähle T(n) = O(2<sup>n</sup>) und setze als Induktionsannahme T(k) ≤ c · 2<sup>k</sup> für kleinere k an."],
      ["Einsetzen", "Dann gilt T(n) ≤ c2<sup>n-1</sup> + c2<sup>n-2</sup> + 1 = (3/4)c2<sup>n</sup> + 1."],
      ["Ergebnis ableiten", "Der zusätzliche konstante Term wird für großes n von c2<sup>n</sup> geschluckt. Damit ist T(n) = O(2<sup>n</sup>) eine passende obere Schranke."],
    ],
  },
};

const masterLearnTopics = {
  "Divide and Conquer / Master-Theorem": {
    formula: 'T(n) = aT(<span class="frac"><span>n</span><span>b</span></span>) + c · n<sup>d</sup>',
    summary: "Nutze das Master-Theorem, wenn die Rekurrenz aus a gleich großen Teilproblemen der Größe n/b und einer polynomialen Zusatzarbeit c · n<sup>d</sup> besteht.",
    tiles: [
      ["a", "Anzahl der rekursiven Teilprobleme"],
      ["b", "Verkleinerungsfaktor der Eingabe"],
      ["c", "konstanter Faktor der Zusatzarbeit"],
      ["d", "Exponent der Zusatzarbeit n<sup>d</sup>"],
    ],
    lessons: [masterLearnCases.case1, masterLearnCases.case2, masterLearnCases.case3],
  },
  "Subtract and Conquer": {
    formula: "T(n) = T(n - k) + g(n) oder T(n) = T(n / b) + g(n)",
    summary: "Nutze Subtract and Conquer, wenn pro Schritt nur ein Teilproblem weiterläuft. Die Laufzeit entsteht durch Entfalten der Rekurrenz als Summe über die Ebenen.",
    tiles: [
      ["Schritt", "Wie stark wird n kleiner?"],
      ["Tiefe", "Wie viele Rekursionsschritte entstehen?"],
      ["Kosten", "Welche Zusatzarbeit g(n) fällt pro Ebene an?"],
      ["Summe", "Welche Reihe entsteht beim Entfalten?"],
    ],
    lessons: [masterLearnCases["subtract-sum"], masterLearnCases["subtract-shrink"]],
  },
  Substitution: {
    formula: "Vermutung einsetzen: T(k) ≤ Schranke(k)",
    summary: "Nutze Substitution, wenn du eine Schranke beweisen möchtest oder die Rekurrenz nicht sauber in ein Standardschema passt. Du vermutest eine Laufzeit und zeigst, dass sie nach dem Einsetzen stabil bleibt.",
    tiles: [
      ["Vermutung", "Welche O-Schranke ist plausibel?"],
      ["Einsetzen", "Ersetze rekursive Terme durch die Induktionsannahme"],
      ["Konstante", "Wähle c so, dass die Ungleichung aufgeht"],
      ["Beweis", "Basisfall und Induktionsschritt sichern die Schranke"],
    ],
    lessons: [masterLearnCases["substitution-linear"], masterLearnCases["substitution-branch"]],
  },
};

const sortAlgorithms = {
  selection: {
    name: "Selectionsort",
    idea: "Teilt das Array in einen sortierten linken und einen unsortierten rechten Bereich. Pro Durchlauf wird das kleinste noch unsortierte Element gesucht und an die nächste freie Position links getauscht.",
    stepWhy: "Nach einem vollständigen Durchlauf ist die nächste Position links endgültig korrekt. Der sortierte Bereich wächst dadurch genau um ein Element.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
  },
  insertion: {
    name: "Insertionsort",
    idea: "Baut links schrittweise einen sortierten Bereich auf. Das aktuelle Element wird zwischengespeichert, größere Werte werden nach rechts verschoben und die entstandene Lücke wird passend gefüllt.",
    stepWhy: "Alle Elemente links der aktuellen Position bleiben sortiert. Verschoben werden nur Werte, die größer als das einzufügende Element sind.",
    stable: "Ja",
    inPlace: "Ja",
    runtimes: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
  },
  bubble: {
    name: "Bubblesort",
    idea: "Vergleicht immer zwei benachbarte Werte. Stehen sie falsch herum, werden sie vertauscht; so wandert der größte noch unsortierte Wert pro Runde bis an das rechte Ende.",
    stepWhy: "Nach einer vollständigen Runde ist das rechte Ende korrekt. Ein einzelner Tausch ordnet zunächst nur das gerade betrachtete Nachbarpaar.",
    stable: "Ja",
    inPlace: "Ja",
    runtimes: { best: "O(n)", average: "O(n^2)", worst: "O(n^2)" },
  },
  merge: {
    name: "Mergesort",
    idea: "Teilt das Array rekursiv bis zu Einzelelementen. Danach werden jeweils zwei sortierte Teilbereiche verglichen und in der richtigen Reihenfolge zu einem größeren Bereich zusammengeführt.",
    stepWhy: "Beim Zusammenführen ist das kleinere vordere Element sicher das nächste im Ergebnis. So bleibt der neu aufgebaute Teilbereich jederzeit sortiert.",
    stable: "Ja",
    inPlace: "Nein",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
  },
  heap: {
    name: "Heapsort",
    idea: "Formt das Array zunächst zu einem Max-Heap, dessen Wurzel das größte Element enthält. Die Wurzel wird ans freie Ende getauscht und der verkleinerte Heap anschließend repariert.",
    stepWhy: "Die Heap-Eigenschaft garantiert das Maximum an der Wurzel. Nach dem Tausch ist es endgültig einsortiert; Bubble-down repariert den verbleibenden Heap.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
  },
  quick: {
    name: "Quicksort",
    idea: "Wählt ein Pivot und partitioniert den Bereich so, dass kleinere Werte links und größere rechts davon liegen. Danach werden beide Seiten unabhängig rekursiv sortiert.",
    stepWhy: "Nach der Partition steht das Pivot endgültig richtig. Die übrigen Werte sind noch nicht vollständig sortiert, liegen aber bereits auf der richtigen Seite des Pivots.",
    stable: "Nein",
    inPlace: "Ja",
    runtimes: { best: "O(n log n)", average: "O(n log n)", worst: "O(n^2)" },
  },
  topological: {
    name: "Topologisches Sortieren",
    idea: "Ordnet die Knoten eines gerichteten azyklischen Graphen so, dass jede Voraussetzung vor dem davon abhängigen Knoten erscheint. Kahn wählt dafür wiederholt einen Knoten mit Eingangsgrad 0.",
    stepWhy: "Ein Knoten ohne eingehende Kante hat keine offene Voraussetzung und darf daher als Nächstes ausgegeben werden. Seine ausgehenden Kanten werden anschließend entfernt.",
    stable: "Nicht anwendbar",
    inPlace: "Nicht anwendbar",
    runtimes: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
  },
};

const sortRuntimeChoices = ["O(n)", "O(n log n)", "O(n^2)"];
const sortPlaybackDelay = 950;

const dataStructureQuestions = [
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list"><span>3</span><span>8</span><span>13</span><span>21</span><span>34</span></div>',
    question: "Welche Operation ist bei einer Array-Liste typischerweise O(1)?",
    choices: ["Zugriff auf Index 3", "Einfügen am Anfang", "Suchen nach Wert 21", "Löschen aus der Mitte ohne Index"],
    answer: "Zugriff auf Index 3",
    explanation: "Array-Listen speichern Elemente zusammenhängend; direkter Indexzugriff ist konstant.",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list linked"><span>A</span><span>B</span><span>C</span><span>D</span></div>',
    question: "Was ist bei einer einfach verketteten Liste ohne Tail-Zeiger besonders teuer?",
    choices: ["Vorne einfügen", "Erstes Element lesen", "Hinten einfügen", "Nachfolger eines bekannten Knotens lesen"],
    answer: "Hinten einfügen",
    explanation: "Ohne Tail-Zeiger muss man erst bis zum letzten Knoten laufen.",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list"><span>0: 7</span><span>1: 11</span><span>2: 18</span><span>3: 29</span></div>',
    question: "Was passiert typischerweise beim Einfügen in die Mitte einer Array-Liste?",
    choices: ["Elemente rechts davon werden verschoben", "Nur ein Zeiger wird geändert", "Die Liste wird automatisch balanciert", "Die Hashfunktion wird neu berechnet"],
    answer: "Elemente rechts davon werden verschoben",
    explanation: "Bei Array-Listen müssen nachfolgende Elemente Platz machen; das kostet im Worst Case O(n).",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list linked"><span>head</span><span>4</span><span>9</span><span>tail</span></div>',
    question: "Welche Stärke hat eine verkettete Liste, wenn der Knoten bereits bekannt ist?",
    choices: ["Einfügen nach diesem Knoten ist O(1)", "Zugriff auf Index 50 ist O(1)", "Binäre Suche ist direkt möglich", "Alle Elemente liegen zusammenhängend im Speicher"],
    answer: "Einfügen nach diesem Knoten ist O(1)",
    explanation: "Ist der Knoten bekannt, müssen nur Referenzen angepasst werden.",
  },
  {
    topic: "Wörterbücher",
    scenarioHtml: '<div class="ds-map"><span>\"id\" → 42</span><span>\"name\" → \"Ada\"</span><span>\"level\" → 3</span></div>',
    question: "Welche Denkweise passt am besten zu einem Wörterbuch?",
    choices: ["Werte werden über Schlüssel gefunden", "Werte sind nur über Positionen erreichbar", "Alle Werte bleiben automatisch sortiert", "Jeder Zugriff muss linear suchen"],
    answer: "Werte werden über Schlüssel gefunden",
    explanation: "Wörterbücher modellieren Key-Value-Zugriff, nicht Positionszugriff.",
  },
  {
    topic: "Wörterbücher",
    scenarioHtml: '<div class="ds-map"><span>\"kurs\" → \"Algo\"</span><span>\"punkte\" → 84</span><span>\"bestanden\" → true</span></div>',
    question: "Was sollte in einem Wörterbuch eindeutig sein?",
    choices: ["Der Schlüssel", "Der Wert", "Die Einfügezeit", "Die Speicheradresse"],
    answer: "Der Schlüssel",
    explanation: "Ein Wörterbuch ordnet jedem Schlüssel höchstens einen aktuellen Wert zu.",
  },
  {
    topic: "Wörterbücher",
    scenarioHtml: '<div class="ds-map"><span>scores[\"Mia\"] = 12</span><span>scores[\"Mia\"] = 15</span></div>',
    question: "Was bewirkt die zweite Zuweisung meistens?",
    choices: ["Der alte Wert wird überschrieben", "Ein zweiter identischer Schlüssel entsteht", "Die Map wird sortiert", "Alle Werte werden gelöscht"],
    answer: "Der alte Wert wird überschrieben",
    explanation: "Ein Schlüssel ist eindeutig; eine erneute Zuweisung aktualisiert seinen Wert.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-buckets"><span>0: Mia</span><span>1: -</span><span>2: Tom, Zoe</span><span>3: Lin</span></div>',
    question: "Was zeigt der Bucket mit Tom und Zoe?",
    choices: ["Eine Kollision", "Eine perfekte Hashfunktion", "Eine Tiefensuche", "Eine Heap-Verletzung"],
    answer: "Eine Kollision",
    explanation: "Eine Kollision entsteht, wenn verschiedene Schlüssel im selben Bucket landen.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-map"><span>load factor = entries / buckets</span><span>zu hoch → resize</span></div>',
    question: "Warum vergrößert eine Hashmap gelegentlich ihre Bucket-Anzahl?",
    choices: ["Um Kollisionen wahrscheinlicher zu machen", "Um die Last pro Bucket zu senken", "Um DFS zu beschleunigen", "Damit Werte sortiert bleiben"],
    answer: "Um die Last pro Bucket zu senken",
    explanation: "Resizing hält den Load Factor klein und stabilisiert erwartete O(1)-Operationen.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-buckets"><span>hash(\"Ada\") % 5 = 2</span><span>hash(\"Lin\") % 5 = 2</span></div>',
    question: "Welche Strategie kann Kollisionen in Buckets behandeln?",
    choices: ["Chaining mit Listen pro Bucket", "AVL-Rotation am Schlüssel", "DFS ab dem Bucket", "Mergesort nach jedem Zugriff"],
    answer: "Chaining mit Listen pro Bucket",
    explanation: "Beim Chaining speichert ein Bucket mehrere Einträge, die denselben Index erhalten.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-map"><span>viele Einträge</span><span>wenige Buckets</span><span>Load Factor steigt</span></div>',
    question: "Was passiert bei zu hohem Load Factor typischerweise mit der erwarteten Zugriffszeit?",
    choices: ["Sie wird schlechter", "Sie bleibt garantiert O(1)", "Sie wird zu O(log log n)", "Sie hängt nur vom Wert ab"],
    answer: "Sie wird schlechter",
    explanation: "Mehr Kollisionen bedeuten längere Bucket-Ketten oder mehr Sondierungsschritte.",
  },
  {
    topic: "Tiefensuche",
    scenarioHtml: '<div class="ds-graph"><span>A: B, C</span><span>B: D</span><span>C: E</span><span>D: -</span><span>E: -</span></div>',
    question: "DFS startet bei A und besucht Nachbarn in angegebener Reihenfolge. Welche Reihenfolge entsteht?",
    choices: ["A, B, D, C, E", "A, C, E, B, D", "A, B, C, D, E", "D, B, E, C, A"],
    answer: "A, B, D, C, E",
    explanation: "DFS geht zuerst so tief wie möglich über B nach D und kehrt dann zu C/E zurück.",
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
    topic: "Tiefensuche",
    scenarioHtml: '<div class="ds-graph"><span>A: B</span><span>B: C</span><span>C: A, D</span><span>D: -</span></div>',
    question: "Was erkennt DFS mit Farben oder visited-Status in gerichteten Graphen besonders gut?",
    choices: ["Zyklen", "Den Median", "Den kleinsten Heap-Wert", "Die Hashfunktion"],
    answer: "Zyklen",
    explanation: "Trifft DFS auf einen Knoten im aktuellen Rekursionspfad, weist das auf einen Zyklus hin.",
  },
  {
    topic: "Tiefensuche",
    scenarioHtml: '<div class="ds-graph"><span>Start: S</span><span>S: A, B</span><span>A: C</span><span>B: D</span></div>',
    question: "Welche Datenstruktur passt zur iterativen Tiefensuche?",
    choices: ["Stack", "Queue", "Hashfunktion", "Min-Heap als Pflicht"],
    answer: "Stack",
    explanation: "DFS verfolgt einen Pfad in die Tiefe; iterativ bildet ein Stack dieses Verhalten ab.",
  },
  {
    topic: "Min-Heap",
    scenarioHtml: '<div class="ds-heap"><span>4</span><span>9</span><span>7</span><span>15</span><span>12</span></div>',
    question: "Welches Element steht bei einem gültigen Min-Heap immer an der Wurzel?",
    choices: ["Das kleinste Element", "Das größte Element", "Das zuletzt eingefügte Element", "Ein zufälliges Pivot"],
    answer: "Das kleinste Element",
    explanation: "Im Min-Heap ist jeder Elternknoten kleiner oder gleich seinen Kindern.",
  },
  {
    topic: "Max-Heap",
    scenarioHtml: '<div class="ds-heap"><span>42</span><span>18</span><span>35</span><span>7</span><span>12</span><span>20</span></div>',
    question: "Welche Aussage beschreibt einen Max-Heap korrekt?",
    choices: ["Eltern sind größer oder gleich ihren Kindern", "Eltern sind kleiner oder gleich ihren Kindern", "Die Blätter sind immer sortiert", "Die Inorder-Reihenfolge ist sortiert"],
    answer: "Eltern sind größer oder gleich ihren Kindern",
    explanation: "Beim Max-Heap steht das Maximum oben; die Ordnung gilt lokal zwischen Eltern und Kindern.",
  },
  {
    topic: "Heaps",
    scenarioHtml: '<div class="ds-heap"><span>2</span><span>8</span><span>5</span><span>13</span><span>11</span></div>',
    question: "Du fügst 1 in diesen Min-Heap ein. Was passiert konzeptionell?",
    choices: ["1 wandert nach oben bis zur Wurzel", "1 bleibt immer am Ende", "Der Heap wird zu einer sortierten Liste", "Alle Elemente werden per DFS besucht"],
    answer: "1 wandert nach oben bis zur Wurzel",
    explanation: "Nach dem Einfügen wird per Bubble-up die Heap-Eigenschaft wiederhergestellt.",
  },
  {
    topic: "Min-Heap",
    scenarioHtml: '<div class="ds-heap"><span>3</span><span>8</span><span>5</span><span>12</span><span>10</span></div>',
    question: "Was passiert beim Entfernen der Wurzel aus einem Min-Heap zuerst?",
    choices: ["Das letzte Element wird nach oben gesetzt", "Alle Blätter werden sortiert", "DFS sucht das Minimum", "Die Hashmap wird vergrößert"],
    answer: "Das letzte Element wird nach oben gesetzt",
    explanation: "Danach wird per Bubble-down die Heap-Eigenschaft wiederhergestellt.",
  },
  {
    topic: "Max-Heap",
    scenarioHtml: '<div class="ds-heap"><span>50</span><span>41</span><span>33</span><span>12</span><span>28</span></div>',
    question: "Welcher Zugriff ist bei einem Max-Heap direkt möglich?",
    choices: ["Maximum lesen", "Minimum lesen", "Median lesen", "Sortierte Reihenfolge aller Blätter lesen"],
    answer: "Maximum lesen",
    explanation: "Beim Max-Heap steht das größte Element an der Wurzel.",
  },
  {
    topic: "Heaps",
    scenarioHtml: '<div class="ds-heap"><span>Heap</span><span>Prioritäten</span><span>push</span><span>pop</span></div>',
    question: "Wofür eignet sich ein Heap besonders gut?",
    choices: ["Prioritätswarteschlangen", "Direkter Zugriff auf beliebige Indizes", "Speichern eindeutiger Schlüssel", "DFS-Rekursion ersetzen"],
    answer: "Prioritätswarteschlangen",
    explanation: "Heaps liefern das Element mit höchster oder niedrigster Priorität effizient.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Stack</span><span>A</span><span>B</span><span>C</span></div>',
    question: "Welches Element wird bei einem Stack als Nächstes entfernt?",
    choices: ["C", "A", "B", "Alle gleichzeitig"],
    answer: "C",
    explanation: "Ein Stack arbeitet nach LIFO: Das zuletzt eingefügte Element wird zuerst entfernt.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Queue</span><span>A</span><span>B</span><span>C</span></div>',
    question: "Welches Element verlässt eine Queue als Nächstes?",
    choices: ["A", "C", "B", "Ein zufälliges Element"],
    answer: "A",
    explanation: "Eine Queue arbeitet nach FIFO: Das zuerst eingefügte Element wird zuerst entfernt.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Queue</span><span>enqueue X</span><span>enqueue Y</span><span>dequeue</span></div>',
    question: "Welches Element wird bei dieser Queue zuerst entfernt?",
    choices: ["X", "Y", "Beide gleichzeitig", "Keines, Queues löschen nicht"],
    answer: "X",
    explanation: "Queues arbeiten nach FIFO: X wurde vor Y eingefügt.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Stack</span><span>push 5</span><span>push 8</span><span>pop</span></div>',
    question: "Welcher Wert wird durch pop entfernt?",
    choices: ["8", "5", "13", "Der kleinste Wert"],
    answer: "8",
    explanation: "Stacks arbeiten nach LIFO: Das zuletzt eingefügte Element kommt zuerst heraus.",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list"><span>10</span><span>20</span><span>30</span><span>40</span></div>',
    question: "Warum ist das Einfügen in der Mitte einer Array-Liste typischerweise O(n)?",
    choices: ["Nachfolgende Elemente müssen verschoben werden", "Der Index muss gehasht werden", "Die Liste muss balanciert werden", "Alle Werte werden rekursiv verdoppelt"],
    answer: "Nachfolgende Elemente müssen verschoben werden",
    explanation: "Für die neue Lücke müssen im Worst Case linear viele Elemente nach rechts rücken.",
  },
  {
    topic: "Listen",
    scenarioHtml: '<div class="ds-list linked"><span>head</span><span>7</span><span>11</span><span>19</span></div>',
    question: "Welche Information speichert ein Knoten einer einfach verketteten Liste?",
    choices: ["Wert und Verweis auf den Nachfolger", "Nur seinen Array-Index", "Immer zwei Kindknoten", "Eine Hashfunktion"],
    answer: "Wert und Verweis auf den Nachfolger",
    explanation: "Die Verkettung entsteht durch den Zeiger auf den jeweils nächsten Knoten.",
  },
  {
    topic: "Wörterbücher",
    scenarioHtml: '<div class="ds-map"><span>\"rot\" → #f00</span><span>\"grün\" → #0f0</span></div>',
    question: "Was passiert konzeptionell beim Überschreiben des Schlüssels „rot“?",
    choices: ["Der zugehörige Wert wird ersetzt", "Ein zweiter gleicher Schlüssel bleibt parallel bestehen", "Alle Schlüssel werden gelöscht", "Die Reihenfolge wird umgedreht"],
    answer: "Der zugehörige Wert wird ersetzt",
    explanation: "Ein Wörterbuch ordnet jedem eindeutigen Schlüssel genau einen aktuellen Wert zu.",
  },
  {
    topic: "Wörterbücher",
    scenarioHtml: '<div class="ds-map"><span>key in map</span><span>map[key]</span><span>map.pop(key)</span></div>',
    question: "Welche Operation prüft, ob ein Schlüssel vorhanden ist, ohne seinen Wert zu verändern?",
    choices: ["Mitgliedschaftstest", "pop", "clear", "Sortieren"],
    answer: "Mitgliedschaftstest",
    explanation: "Der Mitgliedschaftstest fragt nur die Existenz des Schlüssels ab.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-buckets"><span>0: A</span><span>1: B → C → D</span><span>2: -</span></div>',
    question: "Welche Folge hat eine lange Kette in einem Bucket?",
    choices: ["Zugriffe auf diesen Bucket werden langsamer", "Die Hashmap wird automatisch sortiert", "Die Laufzeit wird garantiert O(1)", "Der Bucket wird zu einem AVL-Baum"],
    answer: "Zugriffe auf diesen Bucket werden langsamer",
    explanation: "Bei Chaining müssen innerhalb des Buckets mehrere Einträge verglichen werden.",
  },
  {
    topic: "Hashmaps",
    scenarioHtml: '<div class="ds-map"><span>capacity = 8</span><span>entries = 6</span></div>',
    question: "Wie groß ist der Load Factor dieser Hashmap?",
    choices: ["0,75", "1,33", "2", "48"],
    answer: "0,75",
    explanation: "Der Load Factor ist entries / capacity = 6 / 8 = 0,75.",
  },
  {
    topic: "Heaps",
    scenarioHtml: '<div class="ds-heap"><span>5</span><span>12</span><span>8</span><span>20</span><span>15</span></div>',
    question: "An welcher Position wird ein neuer Heap-Wert zunächst eingefügt?",
    choices: ["Am nächsten freien Platz der untersten Ebene", "Immer direkt an der Wurzel", "An einer zufälligen Stelle", "Links neben die Wurzel"],
    answer: "Am nächsten freien Platz der untersten Ebene",
    explanation: "So bleibt der Baum vollständig; danach repariert Bubble-up die Heap-Eigenschaft.",
  },
  {
    topic: "Heaps",
    scenarioHtml: '<div class="ds-heap"><span>30</span><span>22</span><span>18</span><span>9</span><span>14</span></div>',
    question: "Welche Eigenschaft muss in einem Max-Heap für jede Eltern-Kind-Kante gelten?",
    choices: ["Elternwert ≥ Kindwert", "Elternwert ≤ Kindwert", "Beide Werte müssen gleich sein", "Der linke Wert ist immer gerade"],
    answer: "Elternwert ≥ Kindwert",
    explanation: "Die lokale Max-Heap-Eigenschaft bringt das größte Element an die Wurzel.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Stack</span><span>push A</span><span>push B</span><span>pop</span><span>push C</span></div>',
    question: "Welches Element liegt anschließend oben auf dem Stack?",
    choices: ["C", "A", "B", "Der Stack ist leer"],
    answer: "C",
    explanation: "B wird durch pop entfernt; danach legt push C oben ab.",
  },
  {
    topic: "Stacks & Queues",
    scenarioHtml: '<div class="ds-list"><span>Queue</span><span>enqueue 1</span><span>enqueue 2</span><span>dequeue</span><span>enqueue 3</span></div>',
    question: "Welches Element steht anschließend vorne in der Queue?",
    choices: ["2", "3", "1", "Die Queue ist leer"],
    answer: "2",
    explanation: "1 wird entfernt; 2 bleibt vorne, während 3 hinten angefügt wird.",
  },
];

const graphAlgorithmSteps = {
  bfs: [
    { visited: [], active: "A", note: "Start bei A. Eine Queue speichert die als Nächstes zu besuchenden Knoten." },
    { visited: ["A"], active: "B", note: "A ist besucht. B und C werden in die Queue gelegt." },
    { visited: ["A", "B"], active: "C", note: "B ist besucht. D und E kommen hinter C in die Queue." },
    { visited: ["A", "B", "C"], active: "D", note: "C ist besucht. Bereits vorgemerkte Knoten werden nicht doppelt eingereiht." },
    { visited: ["A", "B", "C", "D", "E", "F"], active: "F", note: "BFS ist fertig: A, B, C, D, E, F." },
  ],
  dfs: [
    { visited: [], active: "A", note: "Start bei A. DFS folgt einem Pfad so tief wie möglich." },
    { visited: ["A"], active: "B", note: "Von A geht es zuerst zu B." },
    { visited: ["A", "B"], active: "D", note: "Von B folgt DFS dem unbesuchten Nachbarn D." },
    { visited: ["A", "B", "D"], active: "F", note: "F ist erreicht. Danach geht DFS zurück zum letzten Knoten mit offenem Nachbarn." },
    { visited: ["A", "B", "D", "F", "E", "C"], active: "C", note: "DFS ist fertig: A, B, D, F, E, C." },
  ],
  dijkstra: [
    { visited: [], active: "A", note: "Start: Distanz A = 0, alle anderen Distanzen sind unendlich." },
    { visited: ["A"], active: "C", note: "Nach A: B = 4 und C = 2. C hat die kleinste vorläufige Distanz." },
    { visited: ["A", "C"], active: "E", note: "Über C verbessert sich E auf 3. E wird als Nächstes fest gewählt." },
    { visited: ["A", "C", "E"], active: "B", note: "Über E ergeben sich weitere Kandidaten; B bleibt mit Distanz 4 der nächste Knoten." },
    { visited: ["A", "C", "E", "B", "F", "D"], active: "D", note: "Alle kürzesten Distanzen ab A sind bestimmt." },
  ],
  backtracking: [
    { visited: [], active: "A", note: "Gesucht ist ein Weg von A nach F. Wir probieren den ersten möglichen Zweig." },
    { visited: ["A"], active: "B", note: "A → B wird gewählt." },
    { visited: ["A", "B"], active: "D", note: "B → D wird ausprobiert." },
    { visited: ["A", "B", "D"], active: "F", note: "D → F erreicht das Ziel. Der gefundene Weg lautet A → B → D → F." },
  ],
  floyd: [
    { visited: [], active: "A", note: "Der Matrixausschnitt A bis D startet mit direkten Kantengewichten.", matrix: "    A  B  C  D\nA   0  4  2  ∞\nB   4  0  ∞  3\nC   2  ∞  0  ∞\nD   ∞  3  ∞  0" },
    { visited: ["A"], active: "B", note: "A wird als Zwischenknoten zugelassen. Prüfe für jedes Paar den Weg über A.", matrix: "    A  B  C  D\nA   0  4  2  ∞\nB   4  0  6  3\nC   2  6  0  ∞\nD   ∞  3  ∞  0" },
    { visited: ["A", "B"], active: "C", note: "B verbessert unter anderem den Weg von A nach D.", matrix: "    A  B  C  D\nA   0  4  2  7\nB   4  0  6  3\nC   2  6  0  9\nD   7  3  9  0" },
    { visited: ["A", "B", "C", "D"], active: "D", note: "Nach allen Zwischenknoten enthält die Matrix die kürzesten Distanzen aller Paare.", matrix: "    A  B  C  D\nA   0  4  2  7\nB   4  0  6  3\nC   2  6  0  9\nD   7  3  9  0" },
  ],
};

const graphAlgorithmInfo = {
  bfs: {
    title: "Breitensuche",
    text: "Ziel: Einen Graphen Ebene für Ebene durchsuchen und in ungewichteten Graphen kürzeste Wege nach Anzahl der Kanten finden. Grundidee: Eine Queue verarbeitet zuerst alle nahen Knoten.",
  },
  dfs: {
    title: "Tiefensuche",
    text: "Ziel: Pfade vollständig verfolgen, Zusammenhang prüfen oder Zyklen entdecken. Grundidee: Mit Stack oder Rekursion so tief wie möglich gehen und danach zurückkehren.",
  },
  dijkstra: {
    title: "Dijkstra",
    text: "Ziel: Kürzeste Wege von einem Startknoten bei nichtnegativen Kantengewichten bestimmen. Grundidee: Immer den noch offenen Knoten mit der kleinsten bekannten Distanz fest auswählen.",
  },
  backtracking: {
    title: "Backtracking",
    text: "Ziel: Durch systematisches Ausprobieren einen gültigen Weg oder eine Lösung finden. Grundidee: Eine Entscheidung treffen, bei einer Sackgasse zurückgehen und den nächsten Zweig testen.",
  },
  floyd: {
    title: "Floyd-Warshall",
    text: "Ziel: Kürzeste Wege zwischen allen Knotenpaaren berechnen. Grundidee: Schrittweise jeden Knoten als möglichen Zwischenknoten zulassen und die Distanzmatrix verbessern.",
  },
};

const state = {
  currentView: "home",
  runtimeQuestion: null,
  masterQuestion: null,
  showMasterHelp: false,
  masterSection: "learn",
  masterLearnLesson: 0,
  masterLearnStep: 0,
  masterTrainingTopic: "Divide and Conquer / Master-Theorem",
  sortValues: [],
  sortSteps: [],
  sortStepIndex: 0,
  sortTimer: null,
  sortSection: "visual",
  sortQuestion: null,
  searchValues: [],
  searchSteps: [],
  searchStepIndex: 0,
  searchTimer: null,
  dataStructureQuestion: null,
  dataStructureSection: "structures",
  dataStructureTopic: "AVL-Bäume",
  lastDataStructureTopic: "AVL-Bäume",
  treeFamilyRoot: null,
  treeFamilyMode: "binary",
  stackQueueMode: "stack",
  stackQueueItems: ["A", "B", "C"],
  graphStepIndex: 0,
  heapMode: "min",
  heapItems: [4, 9, 7, 15, 12, 20, 18],
  avlQuestion: null,
  showAVLPreview: false,
  sandboxTree: new AVLTree(),
  sandboxHistory: [],
  sandboxFuture: [],
  sandboxAnimating: false,
  sandboxAnimationTimer: null,
  avlPreviewTimer: null,
  renderCache: new Map(),
  logoRideTimer: null,
  logoIntroPlayed: false,
  tileScrollFrame: null,
  pathDemoTimer: null,
  pathDemoIndex: 0,
  learningBookTimer: null,
  learningTopic: "Algorithmik",
  learningPoints: 0,
  learningUnlocked: 1,
};

const el = {
  menuToggle: document.getElementById("menu-toggle"),
  menuClose: document.getElementById("menu-close"),
  menuOverlay: document.getElementById("menu-overlay"),
  settingsMenu: document.getElementById("settings-menu"),
  themeToggle: document.getElementById("theme-toggle"),
  darkmodeSetting: document.getElementById("darkmode-setting"),
  homeTitle: document.querySelector(".home-title"),
  logoTrain: document.querySelector(".logo-train"),
  moduleTiles: [...document.querySelectorAll(".module-tile")],
  pathAvatar: document.getElementById("path-avatar"),
  pathSteps: [...document.querySelectorAll("[data-path-step]")],
  pathPreview: document.getElementById("preview-learning-path"),
  learningDesk: document.getElementById("learning-desk"),
  learningRoute: document.getElementById("learning-route"),
  learningRouteTitle: document.getElementById("learning-route-title"),
  learningBooks: [...document.querySelectorAll("[data-learning-book]")],
  backToLearningDesk: document.getElementById("back-to-learning-desk"),
  learningPointsToggle: document.getElementById("learning-points-toggle"),
  learningPointsPanel: document.getElementById("learning-points-panel"),
  learningPointsValue: document.getElementById("learning-points-value"),
  learningUnlockedValue: document.getElementById("learning-unlocked-value"),
  checkpointTask: document.getElementById("checkpoint-task"),
  checkpointTaskClose: document.getElementById("checkpoint-task-close"),
  checkpointFeedback: document.getElementById("checkpoint-feedback"),
  checkpointAnswers: [...document.querySelectorAll("[data-checkpoint-answer]")],
  checkpointButtons: [...document.querySelectorAll("[data-checkpoint]")],
  homeView: document.getElementById("home-view"),
  learningPathView: document.getElementById("learning-path-view"),
  algorithmicsView: document.getElementById("algorithmics-view"),
  basicsView: document.getElementById("basics-view"),
  programmingView: document.getElementById("programming-view"),
  dataScienceView: document.getElementById("data-science-view"),
  runtimeView: document.getElementById("runtime-view"),
  masterView: document.getElementById("master-view"),
  sortingView: document.getElementById("sorting-view"),
  searchView: document.getElementById("search-view"),
  avlView: document.getElementById("avl-view"),
  runtimeTitle: document.getElementById("runtime-title"),
  runtimeSnippet: document.getElementById("runtime-snippet"),
  runtimeOptions: document.getElementById("runtime-options"),
  runtimeFeedback: document.getElementById("runtime-feedback"),
  masterTitle: document.getElementById("master-title"),
  masterRecurrence: document.getElementById("master-recurrence"),
  masterTask: document.getElementById("master-task"),
  masterHelp: document.getElementById("master-help"),
  masterHelpToggle: document.getElementById("toggle-master-help"),
  masterTrainingHeading: document.getElementById("master-training-heading"),
  masterTrainingCopy: document.getElementById("master-training-copy"),
  masterTrainingTopic: document.getElementById("master-training-topic"),
  masterFeedback: document.getElementById("master-feedback"),
  masterSolution: document.getElementById("master-solution"),
  masterLearnOverview: document.getElementById("master-learn-overview"),
  masterLearnCard: document.getElementById("master-learn-card"),
  masterTrainingCard: document.getElementById("master-card"),
  masterLearnCase: document.getElementById("master-learn-case"),
  masterLearnExample: document.getElementById("master-learn-example"),
  masterLearnSteps: document.getElementById("master-learn-steps"),
  masterLearnCount: document.getElementById("master-learn-count"),
  masterLearnPrev: document.getElementById("master-learn-prev"),
  masterLearnNext: document.getElementById("master-learn-next"),
  masterWorkflow: document.getElementById("master-workflow"),
  customRecurrenceInput: document.getElementById("custom-recurrence-input"),
  customRecurrenceExamples: document.getElementById("custom-recurrence-examples"),
  customRecurrenceHint: document.getElementById("custom-recurrence-hint"),
  customRecurrenceSolution: document.getElementById("custom-recurrence-solution"),
  solveCustomRecurrence: document.getElementById("solve-custom-recurrence"),
  sortAlgorithm: document.getElementById("sort-algorithm"),
  sortBars: document.getElementById("sort-bars"),
  sortNote: document.getElementById("sort-note"),
  sortStepCount: document.getElementById("sort-step-count"),
  sortPlay: document.getElementById("sort-play"),
  sortPrev: document.getElementById("sort-prev"),
  sortNext: document.getElementById("sort-next"),
  sortInfo: document.getElementById("sort-info"),
  sortStepDetail: document.getElementById("sort-step-detail"),
  sortQuestionTitle: document.getElementById("sort-question-title"),
  sortBestOptions: document.getElementById("sort-best-options"),
  sortAverageOptions: document.getElementById("sort-average-options"),
  sortWorstOptions: document.getElementById("sort-worst-options"),
  sortFeedback: document.getElementById("sort-feedback"),
  sortingVisualCard: document.getElementById("sorting-visual-card"),
  sortingQuizCard: document.getElementById("sorting-quiz-card"),
  searchAlgorithm: document.getElementById("search-algorithm"),
  searchTarget: document.getElementById("search-target"),
  searchArray: document.getElementById("search-array"),
  searchNote: document.getElementById("search-note"),
  searchStepCount: document.getElementById("search-step-count"),
  searchPlay: document.getElementById("search-play"),
  searchPrev: document.getElementById("search-prev"),
  searchNext: document.getElementById("search-next"),
  searchInfo: document.getElementById("search-info"),
  dataStructureScenario: document.getElementById("ds-scenario"),
  dataStructureQuestion: document.getElementById("ds-question"),
  dataStructureOptions: document.getElementById("ds-options"),
  dataStructureFeedback: document.getElementById("ds-feedback"),
  dataStructureCard: document.getElementById("data-structure-card"),
  dataStructureSectionTitle: document.getElementById("ds-section-title"),
  dataStructureTopicNav: document.getElementById("data-structure-topic-nav"),
  treeFamilyCard: document.getElementById("tree-family-card"),
  treeFamilyTitle: document.getElementById("tree-family-title"),
  treeFamilyValue: document.getElementById("tree-family-value"),
  treeFamilyVisual: document.getElementById("tree-family-visual"),
  treeFamilyIdea: document.getElementById("tree-family-idea"),
  treeFamilyNote: document.getElementById("tree-family-note"),
  stackQueueCard: document.getElementById("stack-queue-card"),
  stackQueueMode: document.getElementById("sq-mode"),
  stackQueueValue: document.getElementById("sq-value"),
  stackQueueVisual: document.getElementById("sq-visual"),
  stackQueueNote: document.getElementById("sq-note"),
  stackQueueDetail: document.getElementById("sq-detail"),
  graphCard: document.getElementById("graph-card"),
  graphAlgorithm: document.getElementById("graph-algorithm"),
  graphIdea: document.getElementById("graph-idea"),
  graphNote: document.getElementById("graph-note"),
  graphStepDetail: document.getElementById("graph-step-detail"),
  graphMatrix: document.getElementById("graph-matrix"),
  heapCard: document.getElementById("heap-card"),
  heapMode: document.getElementById("heap-mode"),
  heapValue: document.getElementById("heap-value"),
  heapVisual: document.getElementById("heap-visual"),
  heapNote: document.getElementById("heap-note"),
  heapGoal: document.getElementById("heap-goal"),
  avlQuizCard: document.getElementById("avl-quiz-card"),
  avlSandboxCard: document.getElementById("avl-sandbox-card"),
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
  sandboxClear: document.getElementById("sandbox-clear"),
  sandboxReset: document.getElementById("reset-sandbox"),
  sandboxUndo: document.getElementById("sandbox-undo"),
  sandboxRedo: document.getElementById("sandbox-redo"),
};

initializeTheme();
initializeLearningProgress();
el.menuToggle.addEventListener("click", () => {
  const isOpen = el.menuToggle.getAttribute("aria-expanded") === "true";
  isOpen ? closeSettingsMenu() : openSettingsMenu();
});
el.menuClose.addEventListener("click", closeSettingsMenu);
el.menuOverlay.addEventListener("click", closeSettingsMenu);
el.themeToggle.addEventListener("change", () => setTheme(el.themeToggle.checked));
el.darkmodeSetting.addEventListener("click", (event) => {
  if (event.target.closest(".theme-switch")) {
    return;
  }
  setTheme(!el.themeToggle.checked);
});
el.darkmodeSetting.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    setTheme(!el.themeToggle.checked);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeSettingsMenu();
  }
});

document.querySelectorAll("[data-open-view]").forEach((button) => {
  button.addEventListener("click", () => setActiveView(button.dataset.openView));
});
document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => setActiveView("home"));
});
document.querySelectorAll("[data-back-algorithmics]").forEach((button) => {
  button.addEventListener("click", () => setActiveView("algorithmics"));
});
el.moduleTiles.forEach((tile) => {
  tile.addEventListener("pointermove", updateTilePointerMotion);
  tile.addEventListener("pointerleave", () => resetTileMotion(tile));
});
window.addEventListener("scroll", queueScrollTileMotion, { passive: true });
window.addEventListener("resize", () => {
  queueScrollTileMotion();
  if (state.currentView === "learning-path" && !el.learningRoute.classList.contains("is-hidden")) {
    movePathAvatar(state.pathDemoIndex, true);
  }
});
el.pathPreview.addEventListener("click", previewLearningPath);
el.checkpointTaskClose.addEventListener("click", closeCheckpointTask);
el.checkpointAnswers.forEach((button) => {
  button.addEventListener("click", () => answerCheckpointTask(button.dataset.checkpointAnswer));
});
el.checkpointButtons.forEach((button) => {
  button.addEventListener("click", () => openCheckpoint(Number(button.dataset.checkpoint)));
});
el.learningBooks.forEach((book) => {
  book.addEventListener("click", () => openLearningBook(book));
});
el.backToLearningDesk.addEventListener("click", resetLearningDesk);
el.learningPointsToggle.addEventListener("click", () => {
  const expanded = el.learningPointsToggle.getAttribute("aria-expanded") === "true";
  el.learningPointsToggle.setAttribute("aria-expanded", String(!expanded));
  el.learningPointsPanel.classList.toggle("is-hidden", expanded);
});
document.getElementById("new-runtime").addEventListener("click", createRuntimeQuestion);
document.getElementById("check-runtime").addEventListener("click", checkRuntimeQuestion);
document.getElementById("new-master").addEventListener("click", createMasterQuestion);
document.getElementById("check-master").addEventListener("click", checkMasterQuestion);
el.solveCustomRecurrence.addEventListener("click", solveCustomRecurrence);
el.customRecurrenceExamples.addEventListener("click", (event) => {
  const button = event.target.closest("[data-custom-recurrence]");
  if (!button) {
    return;
  }
  el.customRecurrenceInput.value = button.dataset.customRecurrence;
  solveCustomRecurrence();
});
el.customRecurrenceInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    solveCustomRecurrence();
  }
});
el.masterHelpToggle.addEventListener("click", toggleMasterHelp);
document.querySelectorAll("[data-master-section]").forEach((button) => {
  button.addEventListener("click", () => setMasterSection(button.dataset.masterSection));
});
document.querySelector("[data-master-learn-options]").addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-learn-case]");
  if (!button) {
    return;
  }

  setMasterChoice(el.masterLearnCase, "[data-master-learn-case]", button.dataset.masterLearnCase);
  state.masterLearnLesson = 0;
  state.masterLearnStep = 0;
  renderMasterLearning();
});
document.querySelector("[data-master-training-options]").addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-training-topic]");
  if (!button) {
    return;
  }

  state.masterTrainingTopic = button.dataset.masterTrainingTopic;
  el.masterTrainingTopic.value = state.masterTrainingTopic;
  syncMasterTrainingTopic();
  createMasterQuestion();
});
el.masterLearnPrev.addEventListener("click", () => changeMasterLearningStep(-1));
el.masterLearnNext.addEventListener("click", () => changeMasterLearningStep(1));
el.sortAlgorithm.addEventListener("change", rebuildSortSteps);
document.getElementById("shuffle-sort").addEventListener("click", resetSortValues);
el.sortPrev.addEventListener("click", previousSortStep);
el.sortNext.addEventListener("click", nextSortStep);
el.sortPlay.addEventListener("click", toggleSortPlayback);
document.getElementById("new-sort-question").addEventListener("click", createSortQuestion);
document.getElementById("check-sort-question").addEventListener("click", checkSortQuestion);
document.querySelectorAll("[data-sort-section]").forEach((button) => {
  button.addEventListener("click", () => setSortSection(button.dataset.sortSection));
});
el.searchAlgorithm.addEventListener("change", rebuildSearchSteps);
el.searchTarget.addEventListener("change", rebuildSearchSteps);
document.getElementById("search-new-values").addEventListener("click", resetSearchValues);
el.searchPrev.addEventListener("click", previousSearchStep);
el.searchNext.addEventListener("click", nextSearchStep);
el.searchPlay.addEventListener("click", toggleSearchPlayback);
document.getElementById("tree-family-insert").addEventListener("click", insertTreeFamilyValue);
document.getElementById("tree-family-reset").addEventListener("click", resetTreeFamily);
document.querySelectorAll("[data-traversal]").forEach((button) => {
  button.addEventListener("click", () => showTreeTraversal(button.dataset.traversal));
});
document.getElementById("new-ds-question").addEventListener("click", createDataStructureQuestion);
document.getElementById("check-ds-question").addEventListener("click", checkDataStructureQuestion);
document.querySelectorAll("[data-ds-topic]").forEach((button) => {
  button.addEventListener("click", () => setDataStructureTopic(button.dataset.dsTopic));
});
document.querySelectorAll("[data-ds-section]").forEach((button) => {
  button.addEventListener("click", () => setDataStructureSection(button.dataset.dsSection));
});
el.stackQueueMode.addEventListener("change", changeStackQueueMode);
document.getElementById("sq-add").addEventListener("click", addStackQueueItem);
document.getElementById("sq-remove").addEventListener("click", removeStackQueueItem);
document.getElementById("sq-reset").addEventListener("click", resetStackQueue);
document.getElementById("graph-next").addEventListener("click", nextGraphStep);
document.getElementById("graph-reset").addEventListener("click", resetGraphVisualization);
el.graphAlgorithm.addEventListener("change", resetGraphVisualization);
el.heapMode.addEventListener("change", changeHeapMode);
document.getElementById("heap-add").addEventListener("click", addHeapValue);
document.getElementById("heap-extract").addEventListener("click", extractHeapRoot);
document.getElementById("heap-reset").addEventListener("click", resetHeap);
document.getElementById("new-avl").addEventListener("click", createAVLQuestion);
document.getElementById("check-avl").addEventListener("click", applyAVLAnswer);
el.avlHelpToggle.addEventListener("click", toggleAVLHelp);
el.avlOptions.addEventListener("change", () => previewAVLRotation(true));
document.getElementById("sandbox-insert").addEventListener("click", () => mutateSandbox("insert"));
el.sandboxClear.addEventListener("click", clearSandbox);
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
setMasterSection("learn");
renderMasterLearning();
resetSortValues();
createSortQuestion();
setSortSection("visual");
resetSearchValues();
setDataStructureSection("structures");
resetTreeFamily();
renderStackQueue();
resetGraphVisualization();
renderHeap();
createAVLQuestion();
resetSandbox(true);
syncMasterHelpVisibility();
syncAVLPreviewVisibility();
setActiveView("home");

function setActiveView(viewName) {
  closeSettingsMenu();
  if (viewName !== "sorting") {
    stopSortPlayback();
  }
  if (viewName !== "search") {
    stopSearchPlayback();
  }
  if (viewName !== "learning-path") {
    stopLearningPathPreview();
    window.clearTimeout(state.learningBookTimer);
  }
  state.currentView = viewName;
  document.body.classList.toggle("immersive-active", viewName === "learning-path");

  const views = {
    home: el.homeView,
    "learning-path": el.learningPathView,
    algorithmics: el.algorithmicsView,
    basics: el.basicsView,
    programming: el.programmingView,
    "data-science": el.dataScienceView,
    runtime: el.runtimeView,
    master: el.masterView,
    sorting: el.sortingView,
    search: el.searchView,
    avl: el.avlView,
  };

  Object.entries(views).forEach(([name, node]) => {
    const active = name === viewName;
    node.classList.toggle("is-hidden", !active);
    node.classList.toggle("app-view-active", active);
  });

  if (viewName === "sorting") {
    renderSortStep();
    renderSortInfo();
  }
  if (viewName === "avl") {
    createDataStructureQuestion();
  }
  if (viewName === "learning-path") {
    resetLearningDesk();
  }

  queueScrollTileMotion();
  playLogoIntro();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSettingsMenu() {
  el.menuToggle.classList.add("is-open");
  el.menuToggle.setAttribute("aria-expanded", "true");
  el.settingsMenu.classList.add("is-open");
  el.settingsMenu.setAttribute("aria-hidden", "false");
  el.menuOverlay.classList.remove("is-hidden");
  document.body.classList.add("menu-open");
  el.menuClose.focus();
}

function closeSettingsMenu() {
  el.menuToggle.classList.remove("is-open");
  el.menuToggle.setAttribute("aria-expanded", "false");
  el.settingsMenu.classList.remove("is-open");
  el.settingsMenu.setAttribute("aria-hidden", "true");
  el.menuOverlay.classList.add("is-hidden");
  document.body.classList.remove("menu-open");
}

function initializeTheme() {
  let darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  try {
    const storedTheme = window.localStorage.getItem("infotrain-theme");
    if (storedTheme) {
      darkMode = storedTheme === "dark";
    }
  } catch {
    // Theme still follows the device when storage is unavailable.
  }
  setTheme(darkMode, false);
}

function setTheme(darkMode, persist = true) {
  document.body.classList.toggle("theme-dark", darkMode);
  el.themeToggle.checked = darkMode;
  el.darkmodeSetting.setAttribute("aria-checked", String(darkMode));
  if (!persist) {
    return;
  }
  try {
    window.localStorage.setItem("infotrain-theme", darkMode ? "dark" : "light");
  } catch {
    // The visual switch still works when storage is unavailable.
  }
}

function initializeLearningProgress() {
  try {
    const saved = JSON.parse(window.localStorage.getItem("infotrain-learning-progress"));
    if (saved) {
      state.learningPoints = Number(saved.points) || 0;
      state.learningUnlocked = Math.min(el.pathSteps.length, Math.max(1, Number(saved.unlocked) || 1));
    }
  } catch {
    // Progress starts at checkpoint one when storage is unavailable.
  }
}

function saveLearningProgress() {
  try {
    window.localStorage.setItem("infotrain-learning-progress", JSON.stringify({
      points: state.learningPoints,
      unlocked: state.learningUnlocked,
    }));
  } catch {
    // Progress remains available for the current session.
  }
}

function openLearningBook(book) {
  window.clearTimeout(state.learningBookTimer);
  const deskRect = el.learningDesk.getBoundingClientRect();
  const bookRect = book.getBoundingClientRect();
  const offsetX = deskRect.left + (deskRect.width / 2) - (bookRect.left + (bookRect.width / 2));
  const offsetY = deskRect.top + (deskRect.height / 2) - (bookRect.top + (bookRect.height / 2));

  el.learningBooks.forEach((item) => item.classList.remove("is-focusing", "is-opening"));
  book.style.setProperty("--book-dx", `${offsetX}px`);
  book.style.setProperty("--book-dy", `${offsetY}px`);
  book.classList.add("is-focusing");
  state.learningTopic = book.dataset.learningBook;
  el.learningRouteTitle.textContent = state.learningTopic;

  state.learningBookTimer = window.setTimeout(() => {
    book.classList.add("is-opening");
    state.learningBookTimer = window.setTimeout(() => {
      el.learningDesk.classList.add("is-zooming");
      state.learningBookTimer = window.setTimeout(() => {
        el.learningDesk.classList.add("is-hidden");
        el.learningRoute.classList.remove("is-hidden");
        el.learningPointsPanel.classList.add("is-hidden");
        el.learningPointsToggle.setAttribute("aria-expanded", "false");
        renderLearningPathState();
        state.pathDemoIndex = state.learningTopic === "Algorithmik"
          ? Math.max(0, state.learningUnlocked - 1)
          : 0;
        window.requestAnimationFrame(() => movePathAvatar(state.pathDemoIndex, true));
        state.learningBookTimer = null;
      }, 650);
    }, 1050);
  }, 700);
}

function resetLearningDesk() {
  window.clearTimeout(state.learningBookTimer);
  stopLearningPathPreview();
  el.learningRoute.classList.add("is-hidden");
  el.learningPointsPanel.classList.add("is-hidden");
  el.learningPointsToggle.setAttribute("aria-expanded", "false");
  closeCheckpointTask();
  el.learningDesk.classList.remove("is-hidden", "is-zooming");
  el.learningBooks.forEach((book) => {
    book.classList.remove("is-focusing", "is-opening");
    book.style.removeProperty("--book-dx");
    book.style.removeProperty("--book-dy");
  });
  state.learningBookTimer = null;
}

function movePathAvatar(stepIndex, instant = false) {
  const step = el.pathSteps[stepIndex];
  const node = step?.querySelector(".path-node");
  const stage = el.pathAvatar?.parentElement;
  if (!node || !stage) {
    return;
  }

  const stageRect = stage.getBoundingClientRect();
  const nodeRect = node.getBoundingClientRect();
  const x = nodeRect.left - stageRect.left + (nodeRect.width - el.pathAvatar.offsetWidth) / 2;
  const y = nodeRect.top - stageRect.top + (nodeRect.height / 2) - el.pathAvatar.offsetHeight + 8;

  el.pathAvatar.style.transitionDuration = instant ? "0ms" : "";
  el.pathAvatar.style.setProperty("--avatar-x", `${x}px`);
  el.pathAvatar.style.setProperty("--avatar-y", `${y}px`);
  el.pathAvatar.classList.toggle("is-moving", !instant);
  if (instant) {
    window.requestAnimationFrame(() => {
      el.pathAvatar.style.transitionDuration = "";
    });
  }
}

function renderLearningPathState() {
  const algorithmicsActive = state.learningTopic === "Algorithmik";
  const unlocked = algorithmicsActive ? state.learningUnlocked : 0;
  const points = algorithmicsActive ? state.learningPoints : 0;

  el.learningPointsValue.textContent = String(points);
  el.learningUnlockedValue.textContent = `${unlocked} / ${el.pathSteps.length}`;
  el.learningPointsToggle.textContent = `★ ${points} Punkte`;
  el.pathPreview.disabled = unlocked < 2;

  el.pathSteps.forEach((step, index) => {
    const number = index + 1;
    const button = step.querySelector(".path-node");
    const status = step.querySelector(".path-status");
    const isUnlocked = number <= unlocked;
    const isCurrent = number === unlocked && unlocked > 0;

    step.classList.toggle("is-locked", !isUnlocked);
    step.classList.toggle("is-current", isCurrent);
    button.disabled = !isUnlocked;
    button.textContent = isUnlocked ? String(number) : "🔒";
    button.setAttribute("aria-label", isUnlocked ? `Checkpoint ${number}` : `Checkpoint ${number} gesperrt`);
    status.textContent = isUnlocked ? (number === 1 && unlocked === 1 ? "Frei" : "Freigeschaltet") : "Gesperrt";
  });
}

function openCheckpoint(number) {
  if (state.learningTopic !== "Algorithmik") {
    return;
  }
  if (number !== 1) {
    return;
  }
  el.checkpointFeedback.textContent = "";
  el.checkpointFeedback.className = "checkpoint-feedback";
  el.checkpointTask.classList.remove("is-hidden");
}

function closeCheckpointTask() {
  el.checkpointTask.classList.add("is-hidden");
}

function answerCheckpointTask(answer) {
  if (answer !== "O(log n)") {
    el.checkpointFeedback.textContent = "Noch nicht richtig. Denk daran: Der Suchbereich wird in jedem Schritt halbiert.";
    el.checkpointFeedback.className = "checkpoint-feedback is-wrong";
    return;
  }

  state.learningPoints = Math.max(state.learningPoints, 20);
  state.learningUnlocked = Math.max(state.learningUnlocked, 2);
  saveLearningProgress();
  el.checkpointFeedback.textContent = "Richtig! Checkpoint 2 wurde freigeschaltet.";
  el.checkpointFeedback.className = "checkpoint-feedback is-correct";
  renderLearningPathState();
  window.setTimeout(() => {
    closeCheckpointTask();
    state.pathDemoIndex = 1;
    movePathAvatar(1);
  }, 850);
}

function previewLearningPath() {
  stopLearningPathPreview();
  state.pathDemoIndex = 0;
  el.pathPreview.disabled = true;
  movePathAvatar(0, true);

  const advance = () => {
    state.pathDemoIndex += 1;
    movePathAvatar(state.pathDemoIndex);

    if (state.pathDemoIndex < state.learningUnlocked - 1) {
      state.pathDemoTimer = window.setTimeout(advance, 1050);
      return;
    }

    state.pathDemoTimer = window.setTimeout(() => {
      state.pathDemoIndex = 0;
      movePathAvatar(0);
      state.pathDemoTimer = window.setTimeout(() => {
        el.pathAvatar.classList.remove("is-moving");
        el.pathPreview.disabled = false;
        state.pathDemoTimer = null;
      }, 950);
    }, 1300);
  };

  state.pathDemoTimer = window.setTimeout(advance, 350);
}

function stopLearningPathPreview() {
  window.clearTimeout(state.pathDemoTimer);
  state.pathDemoTimer = null;
  state.pathDemoIndex = 0;
  el.pathPreview.disabled = false;
  el.pathAvatar.classList.remove("is-moving");
}

function playLogoRide() {
  if (
    !el.homeTitle
    || el.homeTitle.classList.contains("is-riding")
  ) {
    return;
  }

  window.clearTimeout(state.logoRideTimer);
  el.homeTitle.classList.add("is-riding");
  state.logoRideTimer = window.setTimeout(() => {
    el.homeTitle.classList.remove("is-riding");
  }, 2900);
}

function playLogoIntro() {
  if (
    state.logoIntroPlayed
    || state.currentView !== "home"
    || prefersReducedMotion()
  ) {
    return;
  }

  state.logoIntroPlayed = true;
  window.setTimeout(playLogoRide, 420);
}

function supportsPointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function setTileMotion(tile, { lift = 0, tiltX = 0, tiltY = 0, shiftX = 0, scale = 1 }) {
  tile.style.setProperty("--tile-lift", `${lift.toFixed(2)}px`);
  tile.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
  tile.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
  tile.style.setProperty("--tile-shift-x", `${shiftX.toFixed(2)}px`);
  tile.style.setProperty("--tile-scale", scale.toFixed(3));
}

function setTileFocus(tile, strength = 0) {
  tile.style.setProperty("--tile-focus", strength.toFixed(3));
}

function resetTileMotion(tile) {
  tile.classList.remove("is-scroll-active");
  setTileMotion(tile, {});
  setTileFocus(tile);
}

function updateTilePointerMotion(event) {
  if (!supportsPointerHover() || prefersReducedMotion()) {
    return;
  }

  const tile = event.currentTarget;
  const rect = tile.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  tile.classList.remove("is-scroll-active");
  setTileFocus(tile);
  setTileMotion(tile, {
    lift: 12,
    tiltX: (0.5 - y) * 8,
    tiltY: (x - 0.5) * 10,
    shiftX: (x - 0.5) * 5,
    scale: 1.015,
  });
}

function queueScrollTileMotion() {
  if (state.tileScrollFrame) {
    return;
  }

  state.tileScrollFrame = window.requestAnimationFrame(() => {
    state.tileScrollFrame = null;
    updateScrollTileMotion();
  });
}

function updateScrollTileMotion() {
  const tileViewActive = state.currentView === "home" || state.currentView === "algorithmics";
  if (!tileViewActive || supportsPointerHover() || prefersReducedMotion()) {
    el.moduleTiles.forEach((tile) => {
      tile.classList.remove("is-scroll-active");
      setTileMotion(tile, {});
      setTileFocus(tile);
    });
    return;
  }

  const viewportFocus = window.innerHeight * 0.54;
  const falloff = window.innerHeight * 0.52;
  let activeTile = null;
  let activeStrength = 0;
  const strengths = new Map();

  el.moduleTiles.forEach((tile) => {
    const rect = tile.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const strength = Math.max(0, 1 - (Math.abs(center - viewportFocus) / falloff));
    strengths.set(tile, strength);

    if (strength > activeStrength) {
      activeStrength = strength;
      activeTile = tile;
    }
  });

  el.moduleTiles.forEach((tile) => {
    const isActive = tile === activeTile && activeStrength > 0.16;
    const focusStrength = strengths.get(tile) || 0;
    tile.classList.toggle("is-scroll-active", isActive);
    setTileMotion(tile, {});
    setTileFocus(tile, focusStrength ** 1.7);
  });
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
  const config = getMasterTrainingConfig();
  const pools = {
    "Divide and Conquer / Master-Theorem": masterPracticePatterns,
    "Subtract and Conquer": subtractPracticePatterns,
    Substitution: substitutionPracticePatterns,
  };
  const pattern = sample(pools[state.masterTrainingTopic] || masterPracticePatterns);
  const runtimeChoices = shuffle([
    pattern.answer,
    ...shuffle(masterRuntimeChoicesPool.filter((item) => item !== pattern.answer)).slice(0, 3),
  ]);

  state.masterQuestion = {
    ...pattern,
    method: state.masterTrainingTopic,
    flow: config.flow,
    runtimeChoices,
  };
  syncMasterTrainingTopic();
  el.masterTitle.textContent = `Klausuraufgabe: ${config.heading}`;
  el.masterRecurrence.innerHTML = pattern.recurrenceHtml;
  el.masterTask.innerHTML = config.task;
  renderMasterWorkflow(runtimeChoices);
  setFeedback(el.masterFeedback, "");
  el.masterSolution.classList.add("is-hidden");
  el.masterSolution.innerHTML = "";
  clearCustomRecurrenceSolution();
}

function checkMasterQuestion() {
  const selectedRuntime = getSelectedValue("master-runtime-choice");
  const checks = buildMasterApplicationChecks(selectedRuntime);
  if (!checks) {
    return;
  }
  const firstError = checks.find((check) => !check[0]);

  if (!firstError) {
    setFeedback(
      el.masterFeedback,
      `Vollständig richtig. ${state.masterQuestion.explanation} Du hast die Rekurrenz in einer klausurtauglichen Reihenfolge hergeleitet.`,
      "correct",
    );
  } else {
    setFeedback(
      el.masterFeedback,
      `Der erste fehlerhafte Rechenschritt ist: ${firstError[1]}. Warum: ${state.masterQuestion.explanation} Vergleiche deine Eingabe mit der Herleitung darunter und korrigiere ab diesem Schritt.`,
      "wrong",
    );
  }

  el.masterSolution.innerHTML = `
    <p class="tree-label">Musterlösung</p>
    <ol>
      ${renderMasterSolutionSteps()}
    </ol>
  `;
  el.masterSolution.classList.remove("is-hidden");
}

function clearCustomRecurrenceSolution() {
  if (!el.customRecurrenceSolution) {
    return;
  }
  el.customRecurrenceSolution.classList.add("is-hidden");
  el.customRecurrenceSolution.innerHTML = "";
}

function solveCustomRecurrence() {
  const rawInput = el.customRecurrenceInput.value.trim();
  if (!rawInput) {
    renderCustomRecurrenceResult(
      "Syntax fehlt",
      ["Gib zuerst eine Rekurrenz ein. Beispiel: T(n)=2T(n/2)+n."],
      true,
    );
    return;
  }

  const topic = state.masterTrainingTopic;
  const normalized = normalizeRecurrenceSyntax(rawInput);
  let result;

  if (topic === "Divide and Conquer / Master-Theorem") {
    result = solveMasterRecurrence(normalized);
  } else if (topic === "Subtract and Conquer") {
    result = solveSubtractRecurrence(normalized);
  } else {
    result = solveSubstitutionRecurrence(normalized);
  }

  if (!result) {
    renderCustomRecurrenceResult(
      "Syntax passt noch nicht",
      [customSolverSyntaxHint(topic)],
      true,
    );
    return;
  }

  renderCustomRecurrenceResult(result.title, result.steps, false);
}

function normalizeRecurrenceSyntax(input) {
  return input
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll("·", "*")
    .replaceAll("−", "-")
    .replaceAll("≤", "<=")
    .replaceAll("t(n)=", "")
    .replaceAll("cn", "c*n");
}

function renderCustomRecurrenceResult(title, steps, isError) {
  el.customRecurrenceSolution.classList.toggle("custom-solver-error", isError);
  el.customRecurrenceSolution.innerHTML = `
    <p class="tree-label">${title}</p>
    <ol>
      ${steps.map((step) => `<li>${formatInlineMathLabel(step)}</li>`).join("")}
    </ol>
  `;
  el.customRecurrenceSolution.classList.remove("is-hidden");
}

function customSolverSyntaxHint(topic) {
  if (topic === "Divide and Conquer / Master-Theorem") {
    return "Für das Master-Theorem nutze T(n)=aT(n/b)+c*n^d, zum Beispiel T(n)=3T(n/2)+n oder T(n)=2T(n/2)+5*n^2.";
  }
  if (topic === "Subtract and Conquer") {
    return "Für Subtract and Conquer nutze ein einzelnes Teilproblem, zum Beispiel T(n)=T(n-1)+n oder T(n)=T(n/2)+1.";
  }
  return "Für Substitution nutze eine Form, die eine Schranke beweist, zum Beispiel T(n)=T(n/2)+T(n/4)+n oder T(n)=T(n-1)+T(n-2)+1.";
}

function solveMasterRecurrence(input) {
  const match = input.match(/^(\d*)t\(n\/(\d+)\)\+(.+)$/);
  if (!match) {
    return null;
  }

  const a = Number(match[1] || 1);
  const b = Number(match[2]);
  const work = parsePolynomialWork(match[3]);
  if (!Number.isFinite(a) || !Number.isFinite(b) || a < 1 || b < 2 || !work) {
    return null;
  }

  const p = Math.log(a) / Math.log(b);
  const prettyP = prettyNumber(p);
  const comparison = Math.abs(work.d - p) < 0.001
    ? "d = log<sub>b</sub>(a)"
    : work.d < p
      ? "d < log<sub>b</sub>(a)"
      : "d > log<sub>b</sub>(a)";
  const result = work.d < p - 0.001
    ? `O(n^log_${b}(${a}))`
    : Math.abs(work.d - p) < 0.001
      ? `${orderForPower(work.d).replace(")", " log n)")}`
      : orderForPower(work.d);
  const reason = work.d < p - 0.001
    ? "Die Rekursion dominiert, weil der Rekursionsbaum schneller wächst als die Zusatzarbeit pro Ebene."
    : Math.abs(work.d - p) < 0.001
      ? "Rekursion und Zusatzarbeit sind gleich stark, deshalb kommt ein zusätzlicher log-Faktor dazu."
      : "Die Zusatzarbeit dominiert, weil c · n^d stärker wächst als die rekursive Verzweigung.";

  return {
    title: "Schrittweise Lösung",
    steps: [
      `Form erkennen: T(n)=aT(n/b)+c*n^d mit a=${a}, b=${b}, c=${work.c}, d=${work.d}.`,
      `Vergleichsexponent berechnen: log_${b}(${a}) = ${prettyP}.`,
      `Vergleichen: ${comparison}.`,
      `${reason}`,
      `Ergebnis: T(n) = ${result}.`,
    ],
  };
}

function parsePolynomialWork(value) {
  if (/^\d+$/.test(value)) {
    return { c: Number(value), d: 0 };
  }

  const normalized = value.replace(/^\*/, "");
  const simple = normalized.match(/^(\d+)?\*?n(?:\^(\d+))?$/);
  if (simple) {
    return {
      c: Number(simple[1] || 1),
      d: Number(simple[2] || 1),
    };
  }

  return null;
}

function solveSubtractRecurrence(input) {
  const minusMatch = input.match(/^t\(n-(\d+)\)\+(.+)$/);
  if (minusMatch) {
    const k = Number(minusMatch[1]);
    const work = parseSubtractWork(minusMatch[2]);
    if (!work || k < 1) {
      return null;
    }
    const result = work.kind === "constant" ? "O(n)" : orderForPower(work.power + 1);
    const sum = work.kind === "constant"
      ? "1 + 1 + ... + 1"
      : `1^${work.power} + 2^${work.power} + ... + n^${work.power}`;
    return {
      title: "Schrittweise Lösung",
      steps: [
        `Reduktion erkennen: n wird pro Schritt um ${k} kleiner.`,
        `Rekursionstiefe: etwa n/${k}, also O(n) Ebenen.`,
        `Entfalten: Es entsteht die Summe ${sum}.`,
        work.kind === "constant"
          ? "Konstante Arbeit pro Ebene über linear viele Ebenen ergibt O(n)."
          : `Die Potenzsumme bis n hat Ordnung O(n^${work.power + 1}).`,
        `Ergebnis: T(n) = ${result}.`,
      ],
    };
  }

  const shrinkMatch = input.match(/^t\(n\/(\d+)\)\+(.+)$/);
  if (shrinkMatch) {
    const b = Number(shrinkMatch[1]);
    const work = parseSubtractWork(shrinkMatch[2]);
    if (!work || b < 2) {
      return null;
    }
    const result = work.kind === "constant" ? "O(log n)" : orderForPower(work.power);
    return {
      title: "Schrittweise Lösung",
      steps: [
        `Reduktion erkennen: n wird pro Schritt durch ${b} geteilt.`,
        "Rekursionstiefe: Nach O(log n) Ebenen ist die Eingabe konstant klein.",
        work.kind === "constant"
          ? "Auf jeder Ebene fällt konstante Arbeit an."
          : `Beim Entfalten entsteht eine geometrische Summe wie n^${work.power} + (n/${b})^${work.power} + ... .`,
        work.kind === "constant"
          ? "Konstante Arbeit über logarithmisch viele Ebenen ergibt O(log n)."
          : "Eine fallende geometrische Summe wird durch ihren ersten Term dominiert.",
        `Ergebnis: T(n) = ${result}.`,
      ],
    };
  }

  return null;
}

function parseSubtractWork(value) {
  if (value === "1" || /^\d+$/.test(value)) {
    return { kind: "constant", power: 0 };
  }
  const work = parsePolynomialWork(value);
  return work ? { kind: "polynomial", power: work.d } : null;
}

function solveSubstitutionRecurrence(input) {
  const linearBranch = input.match(/^t\(n\/(\d+)\)\+t\(n\/(\d+)\)\+n$/);
  if (linearBranch) {
    const first = Number(linearBranch[1]);
    const second = Number(linearBranch[2]);
    const fractionSum = (1 / first) + (1 / second);
    if (fractionSum >= 1) {
      return null;
    }
    const cBound = Math.ceil(1 / (1 - fractionSum));
    return {
      title: "Schrittweise Lösung",
      steps: [
        "Vermutung: T(n) ≤ c · n.",
        `Einsetzen: T(n) ≤ c(n/${first}) + c(n/${second}) + n.`,
        `Zusammenfassen: T(n) ≤ ${prettyNumber(fractionSum)}c · n + n.`,
        `Damit T(n) ≤ c · n gilt, reicht c ≥ ${cBound}.`,
        "Ergebnis: T(n) = O(n).",
      ],
    };
  }

  if (input === "t(n-1)+t(n-2)+1") {
    return {
      title: "Schrittweise Lösung",
      steps: [
        "Vermutung: T(n) ≤ c · 2^n.",
        "Einsetzen: T(n) ≤ c2^(n-1) + c2^(n-2) + 1.",
        "Zusammenfassen: c2^(n-1) + c2^(n-2) = 3c · 2^(n-2), also kleiner als c · 2^n.",
        "Für eine ausreichend große Konstante c wird auch das +1 abgefangen.",
        "Ergebnis: T(n) = O(2^n).",
      ],
    };
  }

  return null;
}

function prettyNumber(value) {
  if (Math.abs(value - Math.round(value)) < 0.001) {
    return String(Math.round(value));
  }
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

function orderForPower(power) {
  if (power === 0) {
    return "O(1)";
  }
  if (power === 1) {
    return "O(n)";
  }
  return `O(n^${power})`;
}

function renderMasterWorkflow(runtimeChoices) {
  const topic = state.masterTrainingTopic;

  if (topic === "Divide and Conquer / Master-Theorem") {
    el.masterWorkflow.innerHTML = `
      <section class="master-work-step">
        <span>1</span>
        <div>
          <p class="tree-label">Parameter selbst ablesen</p>
          <div class="master-parameter-inputs">
            <label>a<input id="master-input-a" type="number" min="1" inputmode="numeric"></label>
            <label>b<input id="master-input-b" type="number" min="2" inputmode="numeric"></label>
            <label>c<input id="master-input-c" type="number" min="1" inputmode="numeric"></label>
            <label>d<input id="master-input-d" type="number" min="0" inputmode="numeric"></label>
          </div>
        </div>
      </section>
      <section class="master-work-step">
        <span>2</span>
        <div>
          <p class="tree-label">Vergleichsexponent berechnen</p>
          <label class="master-calculation-input"><span class="math-label">log<sub>b</sub>(a) =</span>
            <input id="master-input-p" type="number" min="0" step="0.001" inputmode="decimal" placeholder="z. B. 2">
          </label>
        </div>
      </section>
      <section class="master-work-step">
        <span>3</span>
        <div>
          <p class="tree-label">d mit log<sub>b</sub>(a) vergleichen</p>
          <form id="master-comparison-options" class="choices compact-choices"></form>
        </div>
      </section>
      <section class="master-work-step">
        <span>4</span>
        <div>
          <p class="tree-label">Laufzeit aus dem Vergleich ableiten</p>
          <form id="master-runtime-options" class="choices compact-choices"></form>
          <p class="master-rule-hint">Aus dem Vergleich folgt der Fall: d &lt; log<sub>b</sub>(a) → Rekursion dominiert, d = log<sub>b</sub>(a) → Gleichgewicht, d &gt; log<sub>b</sub>(a) → Zusatzarbeit dominiert.</p>
        </div>
      </section>
    `;
    renderChoices(document.getElementById("master-comparison-options"), "master-comparison", [
      { value: "d<p", label: "d &lt; log<sub>b</sub>(a)<small>Rekursion dominiert → O(n<sup>log<sub>b</sub>(a)</sup>)</small>" },
      { value: "d=p", label: "d = log<sub>b</sub>(a)<small>Gleichgewicht → O(n<sup>d</sup> log n)</small>" },
      { value: "d>p", label: "d &gt; log<sub>b</sub>(a)<small>Zusatzarbeit dominiert → O(n<sup>d</sup>)</small>" },
    ]);
  } else if (topic === "Subtract and Conquer") {
    el.masterWorkflow.innerHTML = `
      <section class="master-work-step">
        <span>1</span>
        <div>
          <p class="tree-label">Reduktion erkennen</p>
          <label class="master-calculation-input">n wird zu
            <input id="subtract-reduction" type="text" placeholder="z. B. n - 1">
          </label>
        </div>
      </section>
      <section class="master-work-step">
        <span>2</span>
        <div>
          <p class="tree-label">Rekursionstiefe bestimmen</p>
          <label class="master-calculation-input">Tiefe =
            <input id="subtract-depth" type="text" placeholder="z. B. n oder log n">
          </label>
        </div>
      </section>
      <section class="master-work-step">
        <span>3</span>
        <div>
          <p class="tree-label">Entstehende Summe auswählen</p>
          <form id="subtract-expansion-options" class="choices compact-choices"></form>
        </div>
      </section>
      <section class="master-work-step">
        <span>4</span>
        <div>
          <p class="tree-label">Laufzeit ableiten</p>
          <form id="master-runtime-options" class="choices compact-choices"></form>
        </div>
      </section>
    `;
    renderChoices(document.getElementById("subtract-expansion-options"), "subtract-expansion", shuffle([
      state.masterQuestion.expansion,
      "1 + 1 + ... + 1 über n Ebenen",
      "n + n + ... + n über log n Ebenen",
      "n<sup>2</sup> + n + 1",
    ]).map((label) => ({ value: label, label })));
  } else {
    el.masterWorkflow.innerHTML = `
      <section class="master-work-step">
        <span>1</span>
        <div>
          <p class="tree-label">Schranke vermuten</p>
          <label class="master-calculation-input">Vermutung
            <input id="substitution-guess" type="text" placeholder="z. B. T(n) <= c · n">
          </label>
        </div>
      </section>
      <section class="master-work-step">
        <span>2</span>
        <div>
          <p class="tree-label">Induktionsannahme einsetzen</p>
          <form id="substitution-inserted-options" class="choices compact-choices"></form>
        </div>
      </section>
      <section class="master-work-step">
        <span>3</span>
        <div>
          <p class="tree-label">Bedingung für die Konstante prüfen</p>
          <label class="master-calculation-input">Bedingung
            <input id="substitution-condition" type="text" placeholder="z. B. c >= 4">
          </label>
        </div>
      </section>
      <section class="master-work-step">
        <span>4</span>
        <div>
          <p class="tree-label">Laufzeit ableiten</p>
          <form id="master-runtime-options" class="choices compact-choices"></form>
        </div>
      </section>
    `;
    renderChoices(document.getElementById("substitution-inserted-options"), "substitution-inserted", shuffle([
      state.masterQuestion.inserted,
      "c(n - 1) + n ≤ c · n",
      "2c(n/2) + n ≤ c · n",
      "c2^n + 1 ≤ c · n",
    ]).map((label) => ({ value: label, label })));
  }

  renderChoices(
    document.getElementById("master-runtime-options"),
    "master-runtime",
    runtimeChoices.map((choice) => ({ value: choice, label: formatOrderLabel(choice) })),
  );
}

function buildMasterApplicationChecks(selectedRuntime) {
  if (!selectedRuntime) {
    setFeedback(el.masterFeedback, "Leite zuerst die Laufzeit ab. Ohne Laufzeitentscheidung kann die Herleitung noch nicht vollständig geprüft werden.", "wrong");
    return null;
  }

  if (state.masterTrainingTopic === "Divide and Conquer / Master-Theorem") {
    const inputs = ["a", "b", "c", "d", "p"].map((key) => document.getElementById(`master-input-${key}`));
    if (inputs.some((input) => !input || input.value.trim() === "")) {
      setFeedback(el.masterFeedback, "Fülle zuerst alle Parameter und den Vergleichsexponenten aus. Diese Werte bestimmen, welcher Master-Fall gilt.", "wrong");
      return null;
    }

    const values = {
      a: Number(document.getElementById("master-input-a").value),
      b: Number(document.getElementById("master-input-b").value),
      c: Number(document.getElementById("master-input-c").value),
      d: Number(document.getElementById("master-input-d").value),
      p: Number(document.getElementById("master-input-p").value),
    };
    const selectedComparison = getSelectedValue("master-comparison-choice");

    return [
      [["a", "b", "c", "d"].every((key) => values[key] === state.masterQuestion[key]), "Parameter a, b, c und d"],
      [Math.abs(values.p - state.masterQuestion.p) < 0.01, "Vergleichsexponent"],
      [selectedComparison === state.masterQuestion.comparison, "Vergleich von d und dem Vergleichsexponenten"],
      [selectedRuntime === state.masterQuestion.answer, "Laufzeit"],
    ];
  }

  if (state.masterTrainingTopic === "Subtract and Conquer") {
    const reduction = document.getElementById("subtract-reduction").value;
    const depth = document.getElementById("subtract-depth").value;
    const expansion = getSelectedValue("subtract-expansion-choice");

    if (!reduction.trim() || !depth.trim() || !expansion) {
      setFeedback(el.masterFeedback, "Bestimme zuerst Reduktion, Tiefe und entstehende Summe. Beim Entfalten hängt die Laufzeit genau von diesen drei Beobachtungen ab.", "wrong");
      return null;
    }

    return [
      [sameMathText(reduction, state.masterQuestion.reduction), "Reduktion der Eingabe"],
      [sameMathText(depth, state.masterQuestion.depth), "Rekursionstiefe"],
      [expansion === state.masterQuestion.expansion, "entstehende Summe"],
      [selectedRuntime === state.masterQuestion.answer, "Laufzeit"],
    ];
  }

  const guess = document.getElementById("substitution-guess").value;
  const inserted = getSelectedValue("substitution-inserted-choice");
  const condition = document.getElementById("substitution-condition").value;

  if (!guess.trim() || !inserted || !condition.trim()) {
    setFeedback(el.masterFeedback, "Fülle zuerst Vermutung, Einsetzen und Bedingung aus. Bei Substitution ist die Schranke erst bewiesen, wenn die eingesetzte Ungleichung stabil bleibt.", "wrong");
    return null;
  }

  return [
    [sameMathText(guess, state.masterQuestion.guess), "vermutete Schranke"],
    [inserted === state.masterQuestion.inserted, "eingesetzte Induktionsannahme"],
    [sameMathText(condition, state.masterQuestion.condition), "Bedingung für die Konstante"],
    [selectedRuntime === state.masterQuestion.answer, "Laufzeit"],
  ];
}

function renderMasterSolutionSteps() {
  if (state.masterTrainingTopic === "Divide and Conquer / Master-Theorem") {
    return `
      <li><strong>Parameter:</strong> a=${state.masterQuestion.a}, b=${state.masterQuestion.b}, c=${state.masterQuestion.c}, d=${state.masterQuestion.d}.</li>
      <li><strong>Berechnen:</strong> log<sub>${state.masterQuestion.b}</sub>(${state.masterQuestion.a}) = ${state.masterQuestion.p}.</li>
      <li><strong>Fall:</strong> ${formatMasterCaseLabel(state.masterQuestion.caseName)}.</li>
      <li><strong>Folgern:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} Also gilt T(n) = ${formatOrderLabel(state.masterQuestion.answer)}.</li>
    `;
  }

  if (state.masterTrainingTopic === "Subtract and Conquer") {
    return `
      <li><strong>Reduktion:</strong> ${formatInlineMathLabel(state.masterQuestion.reduction)}; dadurch entsteht Tiefe ${formatInlineMathLabel(state.masterQuestion.depth)}.</li>
      <li><strong>Entfalten:</strong> ${formatInlineMathLabel(state.masterQuestion.expansion)}.</li>
      <li><strong>Einordnen:</strong> ${formatMasterCaseLabel(state.masterQuestion.caseName)}.</li>
      <li><strong>Folgern:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} Also gilt T(n) = ${formatOrderLabel(state.masterQuestion.answer)}.</li>
    `;
  }

  return `
    <li><strong>Vermutung:</strong> ${formatInlineMathLabel(state.masterQuestion.guess)}.</li>
    <li><strong>Einsetzen:</strong> ${formatInlineMathLabel(state.masterQuestion.inserted)}.</li>
    <li><strong>Bedingung:</strong> ${state.masterQuestion.condition}.</li>
    <li><strong>Folgern:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} Also gilt T(n) = ${formatOrderLabel(state.masterQuestion.answer)}.</li>
  `;
}

function toggleMasterHelp() {
  state.showMasterHelp = !state.showMasterHelp;
  syncMasterHelpVisibility();
}

function syncMasterHelpVisibility() {
  el.masterHelp.classList.toggle("is-hidden", !state.showMasterHelp);
  el.masterHelpToggle.textContent = state.showMasterHelp ? "Hilfestellung ausblenden" : "Hilfestellung anzeigen";
}

function getMasterTrainingConfig() {
  return masterTrainingConfigs[state.masterTrainingTopic]
    || masterTrainingConfigs["Divide and Conquer / Master-Theorem"];
}

function syncMasterTrainingTopic() {
  const config = getMasterTrainingConfig();
  el.masterTrainingHeading.textContent = config.heading;
  el.masterTrainingCopy.innerHTML = config.copy;
  el.masterTrainingTopic.value = state.masterTrainingTopic;
  renderCustomRecurrenceExamples();
  if (el.customRecurrenceHint) {
    el.customRecurrenceHint.innerHTML = formatInlineMathLabel(customSolverSyntaxHint(state.masterTrainingTopic));
  }
  clearCustomRecurrenceSolution();

  document.querySelectorAll("[data-master-training-topic]").forEach((button) => {
    const active = button.dataset.masterTrainingTopic === state.masterTrainingTopic;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function setMasterSection(section) {
  state.masterSection = section;
  const showLearning = section === "learn";
  el.masterLearnCard.classList.toggle("is-hidden", !showLearning);
  el.masterTrainingCard.classList.toggle("is-hidden", showLearning);

  document.querySelectorAll("[data-master-section]").forEach((button) => {
    const active = button.dataset.masterSection === section;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (showLearning) {
    renderMasterLearning();
  }
}

function changeMasterLearningStep(direction) {
  const topic = masterLearnTopics[el.masterLearnCase.value];
  const lesson = topic.lessons[state.masterLearnLesson] || topic.lessons[0];
  const steps = lesson.steps;
  state.masterLearnStep = Math.max(
    0,
    Math.min(steps.length - 1, state.masterLearnStep + direction),
  );
  renderMasterLearning();
}

function renderMasterLearning(options = {}) {
  const topic = masterLearnTopics[el.masterLearnCase.value];
  if (!topic) {
    return;
  }
  state.masterLearnLesson = Math.max(0, Math.min(topic.lessons.length - 1, state.masterLearnLesson));
  const lesson = topic.lessons[state.masterLearnLesson];
  state.masterLearnStep = Math.max(0, Math.min(lesson.steps.length - 1, state.masterLearnStep));
  const [stepTitle, stepText] = lesson.steps[state.masterLearnStep];

  el.masterLearnOverview.innerHTML = `
    <p class="tree-label">Grundidee</p>
    <p class="master-main-formula">${formatInlineMathLabel(topic.formula)}</p>
    <div class="master-parameter-grid">
      ${topic.tiles.map(([title, text]) => `<p><strong>${title}</strong><span>${formatInlineMathLabel(text)}</span></p>`).join("")}
    </div>
    <p class="section-copy">${formatInlineMathLabel(topic.summary)}</p>
  `;
  el.masterLearnExample.innerHTML = `
    <p class="tree-label">Beispiel auswählen</p>
    <div class="master-example-options">
      ${topic.lessons.map((lessonItem, index) => `
        <button class="master-example-option${index === state.masterLearnLesson ? " is-active" : ""}" type="button" data-master-lesson="${index}" aria-pressed="${index === state.masterLearnLesson}">
          <span>Beispiel ${index + 1}</span>
          <strong>${formatInlineMathLabel(lessonItem.formula)}</strong>
          <small>${formatInlineMathLabel(lessonItem.parameters)} · Ergebnis: ${formatInlineMathLabel(lessonItem.result)}</small>
        </button>
      `).join("")}
    </div>
    <p class="master-rule-hint">Jedes Beispiel wird einzeln erklärt. Wechsel oben das Beispiel, wenn du eine andere Rekurrenz sehen willst.</p>
  `;
  el.masterLearnSteps.innerHTML = `
    <article class="master-focus-step">
      <div class="master-step-progress">
        ${lesson.steps.map((_, index) => `
          <button class="master-step-dot${index === state.masterLearnStep ? " is-active" : ""}${index < state.masterLearnStep ? " is-done" : ""}" type="button" data-master-step="${index}" aria-label="Schritt ${index + 1}" aria-pressed="${index === state.masterLearnStep}">${index + 1}</button>
        `).join("")}
      </div>
      <div class="master-focus-content">
        <p class="step-example-label">Beispiel ${state.masterLearnLesson + 1}: ${formatInlineMathLabel(lesson.formula)}</p>
        <h3>${stepTitle}</h3>
        <p>${formatInlineMathLabel(stepText)}</p>
      </div>
      ${renderMasterStepMemory(lesson, state.masterLearnStep)}
    </article>
  `;
  el.masterLearnCount.textContent = `Schritt ${state.masterLearnStep + 1} / ${lesson.steps.length}`;
  el.masterLearnPrev.disabled = state.masterLearnStep === 0;
  el.masterLearnNext.disabled = state.masterLearnStep === lesson.steps.length - 1;
}

function renderMasterStepMemory(lesson, currentStep) {
  if (currentStep === 0) {
    return `
      <aside class="master-step-memory is-empty">
        <strong>Roter Faden</strong>
        <p>Starte mit diesem Schritt. Die Erkenntnisse werden hier gesammelt, sobald du weitergehst.</p>
      </aside>
    `;
  }

  const previousSteps = lesson.steps.slice(0, currentStep);
  return `
    <aside class="master-step-memory">
      <strong>Bisher erkannt</strong>
      <ol>
        ${previousSteps.map(([title, text]) => `
          <li>
            <span>${title}</span>
            <p>${formatInlineMathLabel(compactStepMemory(text))}</p>
          </li>
        `).join("")}
      </ol>
    </aside>
  `;
}

function compactStepMemory(text) {
  return String(text).split(". ")[0].replace(/\.$/, "");
}

el.masterLearnExample.addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-lesson]");
  if (!button) {
    return;
  }
  state.masterLearnLesson = Number(button.dataset.masterLesson);
  state.masterLearnStep = 0;
  renderMasterLearning();
});

el.masterLearnSteps.addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-step]");
  if (!button) {
    return;
  }
  state.masterLearnStep = Number(button.dataset.masterStep);
  renderMasterLearning();
});

function renderCustomRecurrenceExamples() {
  if (!el.customRecurrenceExamples) {
    return;
  }
  const examples = getCustomSolverExamples(state.masterTrainingTopic);
  el.customRecurrenceExamples.innerHTML = examples
    .map((example) => `
      <button type="button" data-custom-recurrence="${example.value}">
        <span>${example.label}</span>
        <strong>${formatInlineMathLabel(example.value)}</strong>
      </button>
    `).join("");
}

function getCustomSolverExamples(topic) {
  if (topic === "Divide and Conquer / Master-Theorem") {
    return [
      { label: "Master 1", value: "T(n)=2T(n/2)+n" },
      { label: "Master 2", value: "T(n)=3T(n/2)+n" },
      { label: "Quadratisch", value: "T(n)=2T(n/2)+n^2" },
    ];
  }
  if (topic === "Subtract and Conquer") {
    return [
      { label: "Linear senken", value: "T(n)=T(n-1)+n" },
      { label: "Halbieren", value: "T(n)=T(n/2)+1" },
      { label: "Geometrisch", value: "T(n)=T(n/2)+n" },
    ];
  }
  return [
    { label: "Lineare Schranke", value: "T(n)=T(n/2)+T(n/4)+n" },
    { label: "Andere Teilung", value: "T(n)=T(n/2)+T(n/5)+n" },
    { label: "Exponentiell", value: "T(n)=T(n-1)+T(n-2)+1" },
  ];
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
  document.getElementById("shuffle-sort").disabled = algorithm === "topological";
  renderSortStep();
  renderSortInfo();
}

function setSortSection(section) {
  state.sortSection = section;
  const showVisual = section === "visual";
  el.sortingVisualCard.classList.toggle("is-hidden", !showVisual);
  el.sortingQuizCard.classList.toggle("is-hidden", showVisual);

  document.querySelectorAll("[data-sort-section]").forEach((button) => {
    const active = button.dataset.sortSection === section;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (showVisual) {
    renderSortStep();
    renderSortInfo();
  } else {
    stopSortPlayback();
  }
}

function buildSortSteps(algorithm, values) {
  const builders = {
    selection: buildSelectionSortSteps,
    insertion: buildInsertionSortSteps,
    bubble: buildBubbleSortSteps,
    merge: buildMergeSortSteps,
    heap: buildHeapSortSteps,
    quick: buildQuickSortSteps,
    topological: buildTopologicalSortSteps,
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

function buildTopologicalSortSteps() {
  const nodes = ["A", "B", "C", "D", "E", "F"];
  const edges = [["A", "C"], ["B", "C"], ["B", "D"], ["C", "E"], ["D", "F"], ["E", "F"]];
  const indegree = Object.fromEntries(nodes.map((node) => [node, 0]));
  edges.forEach(([, to]) => {
    indegree[to] += 1;
  });
  const queue = nodes.filter((node) => indegree[node] === 0);
  const order = [];
  const steps = [{
    topological: true,
    active: null,
    available: [...queue],
    order: [],
    note: "A und B haben Eingangsgrad 0 und besitzen keine offenen Voraussetzungen.",
  }];

  while (queue.length) {
    const active = queue.shift();
    order.push(active);
    edges.filter(([from]) => from === active).forEach(([, to]) => {
      indegree[to] -= 1;
      if (indegree[to] === 0) queue.push(to);
    });
    steps.push({
      topological: true,
      active,
      available: [...queue],
      order: [...order],
      note: `${active} wird ausgegeben. Danach verfügbar: ${queue.length ? queue.join(", ") : "kein weiterer Knoten"}.`,
    });
  }
  steps[steps.length - 1].note = `Fertig: ${order.join(" → ")} ist eine gültige topologische Reihenfolge.`;
  return steps;
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
    pushSortStep(steps, arr, `Füge ${key} in den sortierten linken Bereich ein.`, [i], range(0, i));
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      pushSortStep(steps, arr, `${arr[j]} ist größer als ${key}; verschiebe nach rechts.`, [j, j + 1], range(0, i + 1));
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
  pushSortStep(steps, arr, "Start: große Elemente wandern durch Nachbarvergleiche nach rechts.");
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
    pushSortStep(steps, arr, "Das größte verbleibende Element ist rechts fixiert.", [end], range(end, arr.length));
    if (!swapped) {
      break;
    }
  }
  pushSortStep(steps, arr, "Fertig: keine Vertauschungen mehr nötig.", [], range(0, arr.length));
  return steps;
}

function buildMergeSortSteps(values) {
  const arr = [...values];
  const steps = [];
  const work = [...arr];
  pushSortStep(steps, arr, "Start: teile rekursiv und führe sortierte Bereiche zusammen.");

  function sort(left, right) {
    if (right - left <= 1) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    pushSortStep(steps, arr, `Teile Bereich ${left + 1}-${right} in zwei Hälften.`, range(left, right));
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
      pushSortStep(steps, arr, "Führe die Teilbereiche sortiert zusammen.", range(left, right), right - left === values.length ? range(left, index + 1) : []);
    }
  }

  sort(0, arr.length);
  pushSortStep(steps, arr, "Fertig: alle Teilbereiche wurden zusammengeführt.", [], range(0, arr.length));
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
    pushSortStep(steps, arr, `Prüfe Heap-Eigenschaft bei Position ${root + 1}.`, [root, left, right].filter((item) => item < size), range(size, arr.length));
    if (largest !== root) {
      [arr[root], arr[largest]] = [arr[largest], arr[root]];
      pushSortStep(steps, arr, "Tausche größeres Kind nach oben.", [root, largest], range(size, arr.length));
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
        pushSortStep(steps, arr, "Element gehört auf die linke Pivot-Seite.", [i, j, high], []);
        i += 1;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    pushSortStep(steps, arr, "Pivot sitzt jetzt an seiner endgültigen Position.", [i], [i]);
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

  if (step.topological) {
    renderTopologicalSortStep(step);
    return;
  }

  el.sortBars.className = "sort-bars";
  el.sortBars.innerHTML = "";
  const max = Math.max(...step.array);
  step.array.forEach((value, index) => {
    const slot = document.createElement("div");
    slot.className = "sort-slot";

    const bar = document.createElement("div");
    bar.className = `sort-bar${step.active.has(index) ? " active" : ""}${step.sorted.has(index) ? " sorted" : ""}`;
    bar.style.height = `${Math.max(14, (value / max) * 100)}%`;
    bar.innerHTML = `<span>${value}</span>`;

    const indexLabel = document.createElement("span");
    indexLabel.className = "sort-index";
    indexLabel.textContent = index;

    slot.appendChild(bar);
    slot.appendChild(indexLabel);
    el.sortBars.appendChild(slot);
  });

  el.sortNote.textContent = step.note;
  el.sortStepCount.textContent = `Schritt ${state.sortStepIndex + 1} / ${state.sortSteps.length}`;
  const algorithm = sortAlgorithms[el.sortAlgorithm.value];
  const activeValues = [...step.active].map((index) => step.array[index]);
  const activeText = activeValues.length
    ? `Gerade betrachtet: ${activeValues.join(", ")}. Orange markiert die beteiligten Werte; grüne Werte sind bereits als sortiert markiert.`
    : "Gerade wird kein einzelner Wert verglichen. Grün markierte Werte gelten bereits als sortiert.";
  el.sortStepDetail.innerHTML = `
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Was zeigen die Farben?</strong> ${activeText}</p>
    <p><strong>Warum ist das korrekt?</strong> ${algorithm.stepWhy}</p>
  `;
  el.sortPrev.disabled = state.sortStepIndex === 0;
  el.sortNext.disabled = state.sortStepIndex >= state.sortSteps.length - 1;
}

function renderTopologicalSortStep(step) {
  const nodes = ["A", "B", "C", "D", "E", "F"];
  const edges = ["A → C", "B → C", "B → D", "C → E", "D → F", "E → F"];
  el.sortBars.className = "sort-bars topological-stage";
  el.sortBars.innerHTML = `
    <div class="topological-graph">
      <div class="topological-nodes">
        ${nodes.map((node) => {
          const isDone = step.order.includes(node);
          const isAvailable = step.available.includes(node);
          const isActive = step.active === node;
          return `<span class="topological-node${isDone ? " is-done" : ""}${isAvailable ? " is-available" : ""}${isActive ? " is-active" : ""}">${node}</span>`;
        }).join("")}
      </div>
      <div class="topological-edges">${edges.map((edge) => `<span>${edge}</span>`).join("")}</div>
    </div>
    <div class="topological-result">
      <small>Topologische Reihenfolge</small>
      <strong>${step.order.length ? step.order.join(" → ") : "noch leer"}</strong>
    </div>
  `;
  el.sortNote.textContent = step.note;
  el.sortStepCount.textContent = `Schritt ${state.sortStepIndex + 1} / ${state.sortSteps.length}`;
  el.sortStepDetail.innerHTML = `
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Verfügbar:</strong> ${step.available.length ? step.available.join(", ") : "Kein Knoten mit Eingangsgrad 0."}</p>
    <p><strong>Warum ist das korrekt?</strong> ${sortAlgorithms.topological.stepWhy}</p>
  `;
  el.sortPrev.disabled = state.sortStepIndex === 0;
  el.sortNext.disabled = state.sortStepIndex >= state.sortSteps.length - 1;
}

function renderSortInfo() {
  const algorithm = sortAlgorithms[el.sortAlgorithm.value];
  el.sortInfo.innerHTML = `
    <div><strong>Idee</strong><span>${algorithm.idea}</span></div>
    <div><strong>Stabil</strong><span>${algorithm.stable}</span></div>
    <div><strong>In-place</strong><span>${algorithm.inPlace}</span></div>
    <div><strong>Laufzeit</strong><span>Best ${formatInlineMathLabel(algorithm.runtimes.best)}, Average ${formatInlineMathLabel(algorithm.runtimes.average)}, Worst ${formatInlineMathLabel(algorithm.runtimes.worst)}</span></div>
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
  if (state.sortStepIndex >= state.sortSteps.length - 1) {
    state.sortStepIndex = 0;
    renderSortStep();
  }
  el.sortPlay.textContent = "Pause";
  state.sortTimer = window.setInterval(nextSortStep, sortPlaybackDelay);
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

function resetSearchValues() {
  stopSearchPlayback();
  state.searchValues = generateUniqueNumbers(9, 5, 90).sort((a, b) => a - b);
  el.searchTarget.innerHTML = [
    ...state.searchValues.map((value) => `<option value="${value}">${value}</option>`),
    '<option value="99">99 (nicht enthalten)</option>',
  ].join("");
  el.searchTarget.value = String(sample(state.searchValues));
  rebuildSearchSteps();
}

function rebuildSearchSteps() {
  stopSearchPlayback();
  const target = Number(el.searchTarget.value);
  const builders = {
    linear: buildLinearSearchSteps,
    binary: buildBinarySearchSteps,
    interpolation: buildInterpolationSearchSteps,
    hash: buildHashSearchSteps,
  };
  state.searchSteps = builders[el.searchAlgorithm.value](state.searchValues, target);
  state.searchStepIndex = 0;
  renderSearchStep();
}

function buildLinearSearchSteps(values, target) {
  const steps = [{ probe: null, low: 0, high: values.length - 1, found: false, note: "Start links beim ersten Element." }];
  for (let index = 0; index < values.length; index += 1) {
    const found = values[index] === target;
    steps.push({
      probe: index,
      low: index,
      high: values.length - 1,
      found,
      note: found ? `${target} wurde an Index ${index} gefunden.` : `${values[index]} ist nicht ${target}; gehe ein Feld weiter.`,
    });
    if (found) return steps;
  }
  steps.push({ probe: null, low: values.length, high: values.length - 1, found: false, note: `${target} ist nicht enthalten.` });
  return steps;
}

function buildBinarySearchSteps(values, target) {
  const steps = [{ probe: null, low: 0, high: values.length - 1, found: false, note: "Das gesamte sortierte Array ist der Suchbereich." }];
  let low = 0;
  let high = values.length - 1;
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const found = values[middle] === target;
    steps.push({
      probe: middle,
      low,
      high,
      found,
      note: found
        ? `${target} wurde in der Mitte an Index ${middle} gefunden.`
        : `${values[middle]} wird geprüft. ${target < values[middle] ? "Die rechte Hälfte entfällt." : "Die linke Hälfte entfällt."}`,
    });
    if (found) return steps;
    if (target < values[middle]) high = middle - 1;
    else low = middle + 1;
  }
  steps.push({ probe: null, low, high, found: false, note: `Der Suchbereich ist leer; ${target} ist nicht enthalten.` });
  return steps;
}

function buildInterpolationSearchSteps(values, target) {
  const steps = [{ probe: null, low: 0, high: values.length - 1, found: false, note: "Schätze die Position aus Zielwert und Wertebereich." }];
  let low = 0;
  let high = values.length - 1;
  while (low <= high && target >= values[low] && target <= values[high]) {
    const spread = values[high] - values[low];
    const estimate = spread === 0 ? low : low + Math.floor(((target - values[low]) * (high - low)) / spread);
    const probe = Math.max(low, Math.min(high, estimate));
    const found = values[probe] === target;
    steps.push({
      probe,
      low,
      high,
      found,
      note: found
        ? `Die Schätzung trifft Index ${probe}; ${target} wurde gefunden.`
        : `Die Formel schätzt Index ${probe} mit Wert ${values[probe]}. Der Bereich wird angepasst.`,
    });
    if (found) return steps;
    if (values[probe] < target) low = probe + 1;
    else high = probe - 1;
  }
  steps.push({ probe: null, low, high, found: false, note: `${target} liegt außerhalb des verbleibenden Wertebereichs.` });
  return steps;
}

function buildHashSearchSteps(values, target) {
  const bucketCount = 7;
  const buckets = Array.from({ length: bucketCount }, () => []);
  values.forEach((value) => buckets[value % bucketCount].push(value));
  const bucket = target % bucketCount;
  const steps = [{
    hash: true,
    buckets,
    bucket: null,
    probeEntry: null,
    found: false,
    note: `Berechne zuerst h(${target}) = ${target} mod ${bucketCount}.`,
  }];
  steps.push({
    hash: true,
    buckets,
    bucket,
    probeEntry: null,
    found: false,
    note: `Der Hashwert ist ${bucket}. Untersuche nur Bucket ${bucket}.`,
  });
  for (const value of buckets[bucket]) {
    const found = value === target;
    steps.push({
      hash: true,
      buckets,
      bucket,
      probeEntry: value,
      found,
      note: found ? `${target} wurde im Bucket ${bucket} gefunden.` : `${value} kollidiert im selben Bucket, ist aber nicht ${target}.`,
    });
    if (found) return steps;
  }
  steps.push({
    hash: true,
    buckets,
    bucket,
    probeEntry: null,
    found: false,
    note: `Bucket ${bucket} enthält ${target} nicht.`,
  });
  return steps;
}

function renderSearchStep() {
  const step = state.searchSteps[state.searchStepIndex];
  if (step.hash) {
    renderHashSearchStep(step);
    return;
  }
  el.searchArray.className = "search-array";
  el.searchArray.innerHTML = state.searchValues.map((value, index) => {
    const classes = [
      "search-cell",
      index >= step.low && index <= step.high ? "is-range" : "is-discarded",
      index === step.probe ? "is-probe" : "",
      index === step.probe && step.found ? "is-found" : "",
    ].filter(Boolean).join(" ");
    return `<div class="${classes}"><span>${value}</span><small>${index}</small></div>`;
  }).join("");
  el.searchStepCount.textContent = `Schritt ${state.searchStepIndex + 1} / ${state.searchSteps.length}`;
  el.searchNote.textContent = step.note;
  el.searchPrev.disabled = state.searchStepIndex === 0;
  el.searchNext.disabled = state.searchStepIndex >= state.searchSteps.length - 1;
  renderSearchInfo();
}

function renderHashSearchStep(step) {
  el.searchArray.className = "search-array hash-table";
  el.searchArray.innerHTML = step.buckets.map((entries, index) => {
    const active = index === step.bucket;
    const content = entries.length
      ? entries.map((value) => {
        const probing = value === step.probeEntry;
        return `<span class="hash-entry${probing ? " is-probe" : ""}${probing && step.found ? " is-found" : ""}">${value}</span>`;
      }).join("")
      : '<span class="hash-empty">leer</span>';
    return `<div class="hash-bucket${active ? " is-active" : ""}"><small>Bucket ${index}</small><div>${content}</div></div>`;
  }).join("");
  el.searchStepCount.textContent = `Schritt ${state.searchStepIndex + 1} / ${state.searchSteps.length}`;
  el.searchNote.textContent = step.note;
  el.searchPrev.disabled = state.searchStepIndex === 0;
  el.searchNext.disabled = state.searchStepIndex >= state.searchSteps.length - 1;
  renderSearchInfo();
}

function renderSearchInfo() {
  const info = {
    linear: ["Lineare Suche", "Prüft alle Elemente nacheinander.", "Kleine oder unsortierte Daten.", "Keine Sortierung erforderlich.", "Best O(1), Average/Worst O(n)."],
    binary: ["Binäre Suche", "Halbiert den Suchbereich nach jedem Vergleich.", "Viele Suchen in sortierten Daten.", "Sortierung und direkter Indexzugriff erforderlich.", "Best O(1), Average/Worst O(log n)."],
    interpolation: ["Interpolationssuche", "Schätzt die Position anhand der Werteverteilung.", "Gleichmäßig verteilte, sortierte Zahlen.", "Sortierte numerische und möglichst gleichmäßig verteilte Daten.", "Best O(1), Average O(log log n), Worst O(n)."],
    hash: ["Hash-basierte Suche", "Berechnet aus dem Schlüssel direkt einen Bucket und prüft nur dessen Einträge.", "Wörterbücher, Mengen, Caches und schnelle Schlüsselabfragen.", "Eine geeignete Hashfunktion und Kollisionsbehandlung sind erforderlich.", "Best/Average O(1), Worst O(n) bei vielen Kollisionen."],
  }[el.searchAlgorithm.value];
  el.searchInfo.innerHTML = `
    <div><strong>${info[0]}: Idee</strong><span>${info[1]}</span></div>
    <div><strong>Anwendungsfall</strong><span>${info[2]}</span></div>
    <div><strong>Voraussetzung</strong><span>${info[3]}</span></div>
    <div><strong>Laufzeit</strong><span>${formatInlineMathLabel(info[4])}</span></div>
  `;
}

function previousSearchStep() {
  stopSearchPlayback();
  state.searchStepIndex = Math.max(0, state.searchStepIndex - 1);
  renderSearchStep();
}

function nextSearchStep() {
  state.searchStepIndex = Math.min(state.searchSteps.length - 1, state.searchStepIndex + 1);
  renderSearchStep();
  if (state.searchStepIndex >= state.searchSteps.length - 1) stopSearchPlayback();
}

function toggleSearchPlayback() {
  if (state.searchTimer) {
    stopSearchPlayback();
    return;
  }
  if (state.searchStepIndex >= state.searchSteps.length - 1) {
    state.searchStepIndex = 0;
    renderSearchStep();
  }
  el.searchPlay.textContent = "Pause";
  state.searchTimer = window.setInterval(nextSearchStep, 1100);
}

function stopSearchPlayback() {
  if (state.searchTimer) {
    window.clearInterval(state.searchTimer);
    state.searchTimer = null;
  }
  if (el.searchPlay) el.searchPlay.textContent = "Abspielen";
}

function createSortQuestion() {
  const key = sample(Object.keys(sortAlgorithms).filter((name) => name !== "topological"));
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
    setFeedback(el.sortFeedback, "Wähle Best, Average und Worst Case aus.", "wrong");
    return;
  }

  const runtimes = state.sortQuestion.algorithm.runtimes;
  if (selectedBest === runtimes.best && selectedAverage === runtimes.average && selectedWorst === runtimes.worst) {
    setFeedback(el.sortFeedback, `Richtig. ${state.sortQuestion.algorithm.name}: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}. Warum: ${state.sortQuestion.algorithm.idea}`, "correct");
    return;
  }
  setFeedback(
    el.sortFeedback,
    `Noch nicht. Korrekt ist: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}. Warum: ${state.sortQuestion.algorithm.idea}`,
    "wrong",
  );
}

function normalizeDataStructureTopic(topic) {
  if (topic === "Min-Heap" || topic === "Max-Heap") {
    return "Heaps";
  }
  return topic;
}

function createDataStructureQuestion() {
  const selectedTopic = state.dataStructureTopic;
  const pool = selectedTopic === "Training"
    ? dataStructureQuestions
    : dataStructureQuestions.filter((question) => normalizeDataStructureTopic(question.topic) === selectedTopic);
  const question = sample(pool.length ? pool : dataStructureQuestions);
  state.dataStructureQuestion = question;
  el.dataStructureScenario.innerHTML = `
    <p class="ds-topic">${question.topic}</p>
    ${question.scenarioHtml}
  `;
  el.dataStructureQuestion.textContent = question.question;
  renderChoices(el.dataStructureOptions, "ds", shuffle(question.choices));
  setFeedback(el.dataStructureFeedback, "");
}

function setDataStructureSection(section) {
  state.dataStructureSection = section;
  const showStructures = section === "structures";

  document.querySelectorAll("[data-ds-section]").forEach((button) => {
    const active = button.dataset.dsSection === section;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (showStructures) {
    el.dataStructureTopicNav.classList.remove("is-hidden");
    setDataStructureTopic(state.lastDataStructureTopic);
  } else {
    if (state.dataStructureTopic !== "Training") {
      state.lastDataStructureTopic = state.dataStructureTopic;
    }
    el.dataStructureTopicNav.classList.add("is-hidden");
    setDataStructureTopic("Training");
  }
}

function setDataStructureTopic(topic) {
  state.dataStructureTopic = topic;
  if (topic !== "Training") {
    state.lastDataStructureTopic = topic;
  }
  const showAVL = topic === "AVL-Bäume";
  const showStackQueue = topic === "Stacks & Queues";
  const showGraph = topic === "Graphen";
  const showHeap = topic === "Heaps";
  const showTreeFamily = topic === "Binärbäume" || topic === "Splaybäume";
  const showQuiz = !showAVL && !showStackQueue && !showGraph && !showHeap && !showTreeFamily;

  el.dataStructureCard.classList.toggle("is-hidden", !showQuiz);
  el.treeFamilyCard.classList.toggle("is-hidden", !showTreeFamily);
  el.stackQueueCard.classList.toggle("is-hidden", !showStackQueue);
  el.graphCard.classList.toggle("is-hidden", !showGraph);
  el.heapCard.classList.toggle("is-hidden", !showHeap);
  el.avlQuizCard.classList.toggle("is-hidden", !showAVL);
  el.avlSandboxCard.classList.toggle("is-hidden", !showAVL);

  document.querySelectorAll("[data-ds-topic]").forEach((button) => {
    const active = button.dataset.dsTopic === topic;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (showQuiz) {
    el.dataStructureSectionTitle.textContent =
      topic === "Training" ? "Datenstruktur-Training" : `${topic}-Training`;
    createDataStructureQuestion();
  } else if (showStackQueue) {
    renderStackQueue();
  } else if (showGraph) {
    resetGraphVisualization();
  } else if (showHeap) {
    renderHeap();
  } else if (showTreeFamily) {
    state.treeFamilyMode = topic === "Splaybäume" ? "splay" : "binary";
    renderTreeFamily();
  }
}

function resetTreeFamily() {
  state.treeFamilyRoot = null;
  [40, 20, 60, 10, 30, 50, 70].forEach((value) => {
    state.treeFamilyRoot = bstInsertOnly(state.treeFamilyRoot, value);
  });
  refreshHeights(state.treeFamilyRoot);
  el.treeFamilyValue.value = "";
  el.treeFamilyNote.textContent = "";
  renderTreeFamily();
}

function insertTreeFamilyValue() {
  const value = Number(el.treeFamilyValue.value);
  if (!Number.isInteger(value)) {
    el.treeFamilyNote.textContent = "Gib bitte eine ganze Zahl ein.";
    return;
  }
  state.treeFamilyRoot = bstInsertOnly(state.treeFamilyRoot, value);
  refreshHeights(state.treeFamilyRoot);
  if (state.treeFamilyMode === "splay") {
    state.treeFamilyRoot = splayNode(state.treeFamilyRoot, value);
    el.treeFamilyNote.textContent = `${value} wurde eingefügt und anschließend zur Wurzel gesplayt.`;
  } else {
    el.treeFamilyNote.textContent = `${value} wurde entsprechend der Suchbaumordnung eingefügt.`;
  }
  el.treeFamilyValue.value = "";
  renderTreeFamily();
}

function accessTreeFamilyNode(value) {
  if (state.treeFamilyMode === "splay") {
    state.renderCache.set(
      el.treeFamilyVisual.id,
      layoutCacheFromRoot(state.treeFamilyRoot, value),
    );
    state.treeFamilyRoot = splayNode(state.treeFamilyRoot, value);
    refreshHeights(state.treeFamilyRoot);
    el.treeFamilyNote.textContent = `Zugriff auf ${value}: Der Knoten wird durch Zig-, Zig-Zig- oder Zig-Zag-Rotationen zur Wurzel bewegt.`;
    renderTreeFamily(true);
    return;
  }
  el.treeFamilyNote.textContent = `Knoten ${value} gefunden. Im normalen Binärbaum bleibt seine Position unverändert.`;
}

function renderTreeFamily(replay = false) {
  const isSplay = state.treeFamilyMode === "splay";
  el.treeFamilyTitle.textContent = isSplay ? "Splaybaum" : "Normaler Binärbaum";
  el.treeFamilyIdea.innerHTML = isSplay
    ? "<strong>Splaybaum</strong><span>Jeder Zugriff bewegt den verwendeten Knoten zur Wurzel. Häufig genutzte Werte werden dadurch mit der Zeit besonders schnell erreichbar; amortisiert kosten Operationen O(log n).</span>"
    : "<strong>Binärer Suchbaum</strong><span>Links stehen kleinere, rechts größere Werte. Suchen, Einfügen und Löschen kosten im Mittel O(log n), bei starker Schieflage jedoch O(n).</span>";
  renderTree(el.treeFamilyVisual, state.treeFamilyRoot, {
    animate: replay,
    replay,
    duration: replay ? 1100 : undefined,
    showStats: false,
    onNodeClick: accessTreeFamilyNode,
  });
}

function showTreeTraversal(order) {
  const values = [];
  function visit(node) {
    if (!node) return;
    if (order === "preorder") values.push(node.value);
    visit(node.left);
    if (order === "inorder") values.push(node.value);
    visit(node.right);
    if (order === "postorder") values.push(node.value);
  }
  visit(state.treeFamilyRoot);
  const labels = { inorder: "Inorder", preorder: "Preorder", postorder: "Postorder" };
  el.treeFamilyNote.textContent = `${labels[order]}: ${values.join(" → ")}`;
}

function splayNode(root, value) {
  if (!root || root.value === value) return root;

  if (value < root.value) {
    if (!root.left) return root;
    if (value < root.left.value) {
      root.left.left = splayNode(root.left.left, value);
      root = rotateRight(root);
    } else if (value > root.left.value) {
      root.left.right = splayNode(root.left.right, value);
      if (root.left.right) root.left = rotateLeft(root.left);
    }
    return root.left ? rotateRight(root) : root;
  }

  if (!root.right) return root;
  if (value > root.right.value) {
    root.right.right = splayNode(root.right.right, value);
    root = rotateLeft(root);
  } else if (value < root.right.value) {
    root.right.left = splayNode(root.right.left, value);
    if (root.right.left) root.right = rotateRight(root.right);
  }
  return root.right ? rotateLeft(root) : root;
}

function changeStackQueueMode() {
  state.stackQueueMode = el.stackQueueMode.value;
  state.stackQueueItems = ["A", "B", "C"];
  renderStackQueue();
}

function addStackQueueItem() {
  const value = el.stackQueueValue.value.trim();
  if (!value) {
    el.stackQueueNote.textContent = "Gib zuerst einen Wert ein.";
    return;
  }
  state.stackQueueItems.push(value);
  el.stackQueueValue.value = "";
  el.stackQueueNote.textContent = state.stackQueueMode === "stack"
    ? `${value} wurde oben auf den Stack gelegt.`
    : `${value} wurde hinten in die Queue eingereiht.`;
  renderStackQueue(false);
}

function removeStackQueueItem() {
  if (!state.stackQueueItems.length) {
    el.stackQueueNote.textContent = "Die Struktur ist bereits leer.";
    return;
  }
  const index = state.stackQueueMode === "stack" ? state.stackQueueItems.length - 1 : 0;
  const [removed] = state.stackQueueItems.splice(index, 1);
  el.stackQueueNote.textContent = state.stackQueueMode === "stack"
    ? `${removed} wurde per Pop entfernt.`
    : `${removed} wurde per Dequeue entfernt.`;
  renderStackQueue(false);
}

function resetStackQueue() {
  state.stackQueueItems = ["A", "B", "C"];
  el.stackQueueValue.value = "";
  el.stackQueueNote.textContent = "";
  renderStackQueue();
}

function renderStackQueue(resetNote = true) {
  const isStack = state.stackQueueMode === "stack";
  el.stackQueueMode.value = state.stackQueueMode;
  document.getElementById("sq-add").textContent = isStack ? "Push" : "Enqueue";
  document.getElementById("sq-remove").textContent = isStack ? "Pop" : "Dequeue";
  el.stackQueueVisual.className = `sq-visual ${isStack ? "is-stack" : "is-queue"}`;
  el.stackQueueVisual.innerHTML = state.stackQueueItems
    .map((item, index) => {
      const isNext = isStack ? index === state.stackQueueItems.length - 1 : index === 0;
      return `<div class="sq-item${isNext ? " is-next" : ""}"><span>${escapeAttribute(item)}</span>${isNext ? "<small>als Nächstes</small>" : ""}</div>`;
    })
    .join("");
  if (!state.stackQueueItems.length) {
    el.stackQueueVisual.innerHTML = '<p class="tree-empty">(leer)</p>';
  }
  if (resetNote) {
    el.stackQueueNote.textContent = isStack
      ? "LIFO: Das oberste Element wird zuerst entfernt."
      : "FIFO: Das vorderste Element wird zuerst entfernt.";
  }
  el.stackQueueDetail.innerHTML = isStack
    ? `<p><strong>Stack (LIFO):</strong> Push legt ein neues Element oben ab. Pop entfernt genau dieses oberste und damit zuletzt eingefügte Element.</p>
       <p><strong>Aktueller Zustand:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[state.stackQueueItems.length - 1])} liegt oben und würde als Nächstes entfernt.` : "Der Stack ist leer; Pop kann kein Element liefern."}</p>`
    : `<p><strong>Queue (FIFO):</strong> Enqueue fügt hinten an, Dequeue entfernt vorne. So bleibt die zeitliche Reihenfolge der Einträge erhalten.</p>
       <p><strong>Aktueller Zustand:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[0])} steht vorne und würde als Nächstes entfernt.` : "Die Queue ist leer; Dequeue kann kein Element liefern."}</p>`;
}

function resetGraphVisualization() {
  state.graphStepIndex = 0;
  renderGraphStep();
}

function nextGraphStep() {
  const steps = graphAlgorithmSteps[el.graphAlgorithm.value];
  state.graphStepIndex = Math.min(steps.length - 1, state.graphStepIndex + 1);
  renderGraphStep();
}

function renderGraphStep() {
  const algorithm = el.graphAlgorithm.value;
  const steps = graphAlgorithmSteps[algorithm];
  const step = steps[state.graphStepIndex];
  const info = graphAlgorithmInfo[algorithm];

  document.querySelectorAll("[data-graph-node]").forEach((node) => {
    const name = node.dataset.graphNode;
    node.classList.toggle("is-visited", step.visited.includes(name));
    node.classList.toggle("is-active", step.active === name);
  });
  el.graphNote.textContent = `Schritt ${state.graphStepIndex + 1} von ${steps.length}: ${step.note}`;
  el.graphIdea.innerHTML = `<strong>${info.title}</strong><span>${info.text}</span>`;
  const graphDetails = {
    bfs: "Die Queue arbeitet nach FIFO. Darum werden erst alle direkt erreichbaren Nachbarn verarbeitet, bevor die Suche eine Ebene tiefer geht. In ungewichteten Graphen findet BFS so Wege mit möglichst wenigen Kanten.",
    dfs: "Ein Stack merkt sich den aktuellen Pfad. Erst wenn kein unbesuchter Nachbar mehr existiert, springt DFS zurück und probiert am letzten Verzweigungspunkt den nächsten Weg.",
    dijkstra: "Der aktive Knoten hat unter allen offenen Knoten die kleinste vorläufige Distanz. Bei nichtnegativen Kantengewichten kann ein späterer Umweg diesen Wert nicht mehr verbessern.",
    backtracking: "Eine Entscheidung wird probeweise zum aktuellen Pfad hinzugefügt. Führt sie in eine Sackgasse, wird sie zurückgenommen und anschließend die nächste Möglichkeit getestet.",
    floyd: "Für jedes Knotenpaar wird geprüft, ob der Weg über den aktuellen Zwischenknoten kürzer ist: dist(i,j) = min(dist(i,j), dist(i,k) + dist(k,j)).",
  };
  const visitedText = step.visited.length
    ? `Bereits abgeschlossen oder fest berücksichtigt: ${step.visited.join(", ")}.`
    : "Noch kein Knoten ist abgeschlossen; dies ist der Ausgangszustand.";
  el.graphStepDetail.innerHTML = `
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Aktueller Zustand:</strong> ${step.active} ist aktiv. ${visitedText}</p>
    <p><strong>Warum dieser Schritt?</strong> ${graphDetails[algorithm]}</p>
  `;
  el.graphMatrix.classList.toggle("is-hidden", algorithm !== "floyd");
  el.graphMatrix.textContent = step.matrix || "";
  document.getElementById("graph-next").disabled = state.graphStepIndex >= steps.length - 1;
}

function changeHeapMode() {
  state.heapMode = el.heapMode.value;
  resetHeap();
}

function resetHeap() {
  state.heapItems = state.heapMode === "min"
    ? [4, 9, 7, 15, 12, 20, 18]
    : [42, 18, 35, 7, 12, 20, 30];
  el.heapValue.value = "";
  el.heapNote.textContent = "";
  renderHeap();
}

function addHeapValue() {
  const value = Number(el.heapValue.value);
  if (!Number.isFinite(value)) {
    el.heapNote.textContent = "Gib zuerst eine Zahl ein.";
    return;
  }

  state.heapItems.push(value);
  let index = state.heapItems.length - 1;
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);
    if (!heapComesFirst(state.heapItems[index], state.heapItems[parent])) {
      break;
    }
    [state.heapItems[index], state.heapItems[parent]] = [state.heapItems[parent], state.heapItems[index]];
    index = parent;
  }
  el.heapValue.value = "";
  el.heapNote.textContent = `${value} wurde eingefügt und per Bubble-up einsortiert.`;
  renderHeap(false);
}

function extractHeapRoot() {
  if (!state.heapItems.length) {
    el.heapNote.textContent = "Der Heap ist bereits leer.";
    return;
  }
  const removed = state.heapItems[0];
  const replacement = state.heapItems.pop();
  if (state.heapItems.length) {
    state.heapItems[0] = replacement;
    let index = 0;
    while (true) {
      const left = index * 2 + 1;
      const right = left + 1;
      let preferred = index;
      if (left < state.heapItems.length && heapComesFirst(state.heapItems[left], state.heapItems[preferred])) {
        preferred = left;
      }
      if (right < state.heapItems.length && heapComesFirst(state.heapItems[right], state.heapItems[preferred])) {
        preferred = right;
      }
      if (preferred === index) {
        break;
      }
      [state.heapItems[index], state.heapItems[preferred]] = [state.heapItems[preferred], state.heapItems[index]];
      index = preferred;
    }
  }
  el.heapNote.textContent = `${removed} wurde entfernt; der Ersatzwert wurde per Bubble-down einsortiert.`;
  renderHeap(false);
}

function heapComesFirst(first, second) {
  return state.heapMode === "min" ? first < second : first > second;
}

function renderHeap(resetNote = true) {
  el.heapMode.value = state.heapMode;
  el.heapGoal.textContent = state.heapMode === "min"
    ? "Min-Heap: Der kleinste Wert steht immer an der Wurzel."
    : "Max-Heap: Der größte Wert steht immer an der Wurzel.";
  el.heapVisual.innerHTML = "";

  let start = 0;
  let width = 1;
  while (start < state.heapItems.length) {
    const row = document.createElement("div");
    row.className = "heap-level";
    state.heapItems.slice(start, start + width).forEach((value, offset) => {
      const node = document.createElement("div");
      node.className = `heap-node${start + offset === 0 ? " is-root" : ""}`;
      node.innerHTML = `<strong>${value}</strong><small>Index ${start + offset}</small>`;
      row.appendChild(node);
    });
    el.heapVisual.appendChild(row);
    start += width;
    width *= 2;
  }
  if (!state.heapItems.length) {
    el.heapVisual.innerHTML = '<p class="tree-empty">(leer)</p>';
  }
  if (resetNote) {
    el.heapNote.textContent = "Die Array-Indizes zeigen die interne Speicherung des vollständigen Binärbaums.";
  }
}

function checkDataStructureQuestion() {
  const selected = getSelectedValue("ds-choice");
  if (!selected) {
    setFeedback(el.dataStructureFeedback, "Wähle erst eine Antwort aus.", "wrong");
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
  setFeedback(
    el.avlFeedback,
    `Noch nicht richtig. ${selected} führt nicht zum korrekten AVL-Endzustand. Richtig ist ${state.avlQuestion.rotation}, weil die Rotation am unausgeglichenen Knoten ${state.avlQuestion.pivot} den Höhenunterschied wieder auf höchstens 1 bringt.`,
    "wrong",
  );
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

function clearSandbox() {
  clearTimeout(state.sandboxAnimationTimer);
  setSandboxAnimating(false);
  hideSandboxRotationNotice();
  pushSandboxHistory();
  state.sandboxFuture = [];
  state.sandboxTree = new AVLTree();
  renderSandbox({ motionHint: "Der Baum wurde geleert." });
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
    const labelHtml = formatInlineMathLabel(labelText);
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="${name}-choice" value="${escapeAttribute(value)}"><span>${labelHtml}</span>`;
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

function formatOrderLabel(value) {
  return `O(${formatRuntimeLabel(value)})`;
}

function formatMasterCaseLabel(value) {
  const match = masterCaseChoices.find((choice) => choice.value === value);
  return match ? match.label : value;
}

function sameMathText(actual, expected) {
  return normalizeMathText(actual) === normalizeMathText(expected);
}

function normalizeMathText(value) {
  return String(value)
    .toLowerCase()
    .replaceAll("≤", "<=")
    .replaceAll("≥", ">=")
    .replaceAll("·", "")
    .replaceAll(" ", "")
    .replace(/^o\((.*)\)$/u, "$1")
    .replaceAll("log(n)", "logn")
    .replaceAll("t(n)", "tn")
    .replaceAll("c*n", "cn")
    .replaceAll("c·n", "cn");
}

function formatInlineMathLabel(value) {
  const text = String(value);
  if (text.includes("<")) {
    return formatPlainFractions(text);
  }

  return formatPlainFractions(text)
    .replace(/2\^\(([^)]+)\)/g, "2<sup>$1</sup>")
    .replace(/n\^\(([^)]+)\)/g, "n<sup>$1</sup>")
    .replace(/n\^log_(\d+)\((\d+)\)/g, "n<sup>log<sub>$1</sub>($2)</sup>")
    .replace(/log_(\d+)\((\d+)\)/g, "log<sub>$1</sub>($2)")
    .replace(/n\^(\d+)/g, "n<sup>$1</sup>")
    .replace(/n\^([a-z])/g, "n<sup>$1</sup>")
    .replace(/log\^(\d+) n/g, "log<sup>$1</sup> n")
    .replaceAll("n^log_2(3)", "n<sup>log<sub>2</sub>(3)</sup>")
    .replaceAll("n^log_2(8)", "n<sup>log<sub>2</sub>(8)</sup>")
    .replaceAll("n^log_3(9)", "n<sup>log<sub>3</sub>(9)</sup>")
    .replaceAll("n^2 log^2 n", "n<sup>2</sup> log<sup>2</sup> n")
    .replaceAll("n^2 log n", "n<sup>2</sup> log n")
    .replaceAll("n^3", "n<sup>3</sup>")
    .replaceAll("n^2", "n<sup>2</sup>")
    .replaceAll("2^n", "2<sup>n</sup>")
    .replaceAll("*", " · ");
}

function formatPlainFractions(value) {
  return String(value)
    .replaceAll("3cn/4", '3c · <span class="frac"><span>n</span><span>4</span></span>')
    .replaceAll("cn/4", 'c · <span class="frac"><span>n</span><span>4</span></span>')
    .replace(/(\d+)c\(n\/(\d+)\)/g, '$1c(<span class="frac"><span>n</span><span>$2</span></span>)')
    .replace(/(\d+)c\(n \/ (\d+)\)/g, '$1c(<span class="frac"><span>n</span><span>$2</span></span>)')
    .replace(/c\(n\/(\d+)\)/g, 'c(<span class="frac"><span>n</span><span>$1</span></span>)')
    .replace(/c\(n \/ (\d+)\)/g, 'c(<span class="frac"><span>n</span><span>$1</span></span>)')
    .replaceAll("c(n/2)", 'c(<span class="frac"><span>n</span><span>2</span></span>)')
    .replaceAll("c(n / 2)", 'c(<span class="frac"><span>n</span><span>2</span></span>)')
    .replaceAll("c(n/4)", 'c(<span class="frac"><span>n</span><span>4</span></span>)')
    .replaceAll("c(n / 4)", 'c(<span class="frac"><span>n</span><span>4</span></span>)')
    .replaceAll("c(n/5)", 'c(<span class="frac"><span>n</span><span>5</span></span>)')
    .replaceAll("c(n / 5)", 'c(<span class="frac"><span>n</span><span>5</span></span>)')
    .replaceAll("n/b", '<span class="frac"><span>n</span><span>b</span></span>')
    .replaceAll("n / b", '<span class="frac"><span>n</span><span>b</span></span>')
    .replaceAll("n/2", '<span class="frac"><span>n</span><span>2</span></span>')
    .replaceAll("n / 2", '<span class="frac"><span>n</span><span>2</span></span>')
    .replaceAll("n/3", '<span class="frac"><span>n</span><span>3</span></span>')
    .replaceAll("n / 3", '<span class="frac"><span>n</span><span>3</span></span>')
    .replaceAll("n/4", '<span class="frac"><span>n</span><span>4</span></span>')
    .replaceAll("n / 4", '<span class="frac"><span>n</span><span>4</span></span>')
    .replaceAll("n/5", '<span class="frac"><span>n</span><span>5</span></span>')
    .replaceAll("n / 5", '<span class="frac"><span>n</span><span>5</span></span>')
    .replace(/n\/(\d+)/g, '<span class="frac"><span>n</span><span>$1</span></span>')
    .replace(/n \/ (\d+)/g, '<span class="frac"><span>n</span><span>$1</span></span>');
}

function setFeedback(node, text, type = "") {
  node.innerHTML = formatInlineMathLabel(text);
  node.className = `feedback${type ? ` ${type}` : ""}`;
}

function getSelectedValue(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  return selected ? selected.value : "";
}

function setMasterChoice(input, buttonSelector, value) {
  input.value = value;
  document.querySelectorAll(buttonSelector).forEach((button) => {
    const selected = button.dataset.masterLearnCase === value;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
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
  el.sandboxClear.disabled = isAnimating;
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
