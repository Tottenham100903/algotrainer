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
import { englishSubjectLearningAreas } from "./js/content-en.js";
import {
  applyLanguage,
  currentLanguage,
  initializeLanguage,
  languageNames,
  t,
} from "./js/i18n.js?v=20260703-basics-wording";

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

const subjectLearningAreas = {
  basics: {
    defaultTopic: "daten",
    topics: {
      daten: {
        nav: "Daten & Information",
        title: "Daten und Informationen",
        copy: "Daten sind Zeichen oder Messwerte. Information entsteht erst, wenn diese Daten in einem Kontext interpretiert werden.",
        concepts: [
          ["Daten", "Rohwerte wie 42, true, Pixelwerte oder Tabellenzellen."],
          ["Information", "Bedeutung, die durch Kontext entsteht: 42 kann Alter, Temperatur oder ID sein."],
          ["Codierung", "Regeln, mit denen Informationen als Daten dargestellt werden, etwa Binärzahlen oder Zeichenkodierung."],
        ],
        questions: [
          {
            title: "Begriff unterscheiden",
            question: "Welche Aussage beschreibt den Unterschied zwischen Daten und Information am besten?",
            choices: [
              "Daten erhalten Bedeutung erst durch Interpretation im Kontext.",
              "Information ist immer binär, Daten sind immer Text.",
              "Daten und Information meinen exakt dasselbe.",
              "Information entsteht nur in relationalen Datenbanken.",
            ],
            answer: "Daten erhalten Bedeutung erst durch Interpretation im Kontext.",
            explanation: "Der Kontext macht aus einem Rohwert eine Aussage. Die Zahl 21 ist nur ein Datum; als Alter oder Punktzahl wird sie Information.",
          },
        ],
      },
      datenbanken: {
        nav: "Datenbanken",
        title: "Relationale Datenbanken",
        copy: "Relationale Datenbanken organisieren Informationen in Tabellen. Beziehungen entstehen über Schlüssel statt über doppelt gespeicherte Werte.",
        concepts: [
          ["Relation", "Eine Tabelle mit Zeilen und Spalten."],
          ["Primärschlüssel", "Eindeutige Kennung einer Zeile, zum Beispiel kunden_id."],
          ["Fremdschlüssel", "Verweis auf einen Primärschlüssel in einer anderen Tabelle."],
        ],
        questions: [
          {
            title: "Schlüssel erkennen",
            question: "Eine Tabelle Bestellung enthält kunden_id. Diese verweist auf Kunde.id. Was ist kunden_id in Bestellung?",
            choices: ["Fremdschlüssel", "Primärschlüssel der Kundentabelle", "Attribut ohne Beziehung", "Sortierschlüssel"],
            answer: "Fremdschlüssel",
            explanation: "kunden_id verweist aus Bestellung heraus auf eine Zeile in Kunde. Genau diese Verweisrolle nennt man Fremdschlüssel.",
          },
        ],
      },
      modellierung: {
        nav: "Modellierung",
        title: "UML, Syntax und Automaten",
        copy: "Modellierung macht Strukturen sichtbar, bevor man sie implementiert: Klassen, Regeln, Zustände und Übergänge.",
        concepts: [
          ["UML-Klasse", "Beschreibt Attribute, Methoden und Beziehungen eines Objekttyps."],
          ["Syntaxbeschreibung", "Legt fest, welche Zeichenfolgen formal gültig sind."],
          ["Endlicher Automat", "Verarbeitet Eingaben über Zustände und Übergänge."],
        ],
        questions: [
          {
            title: "Modell wählen",
            question: "Du möchtest beschreiben, dass ein Login zwischen 'ausgeloggt', 'eingeloggt' und 'gesperrt' wechseln kann. Welches Modell passt am besten?",
            choices: ["Endlicher Automat", "Primärschlüssel", "Merge Sort", "Histogramm"],
            answer: "Endlicher Automat",
            explanation: "Zustände und Übergänge sind genau die Sprache endlicher Automaten. UML-Klassen wären eher für Objektstrukturen geeignet.",
          },
        ],
      },
      berechenbarkeit: {
        nav: "Berechenbarkeit",
        title: "Turingmaschinen und Grenzen",
        copy: "Berechenbarkeit fragt, was Algorithmen grundsätzlich leisten können und wo es prinzipielle Grenzen gibt.",
        concepts: [
          ["Turingmaschine", "Abstraktes Rechenmodell mit Band, Kopf, Zuständen und Übergangsregeln."],
          ["Algorithmus", "Endliche, eindeutige Vorschrift zur Lösung eines Problems."],
          ["Grenzen", "Manche Probleme sind nicht algorithmisch entscheidbar."],
        ],
        questions: [
          {
            title: "Grundidee verstehen",
            question: "Wozu nutzt man Turingmaschinen in der Informatik vor allem?",
            choices: [
              "Als abstraktes Modell, um Berechenbarkeit zu untersuchen.",
              "Als schnellere Variante relationaler Datenbanken.",
              "Als Sprache für Webseitenlayouts.",
              "Als Sortierverfahren für Arrays.",
            ],
            answer: "Als abstraktes Modell, um Berechenbarkeit zu untersuchen.",
            explanation: "Turingmaschinen sind kein Praxiswerkzeug für Datenbanken oder Webseiten, sondern ein theoretisches Modell für Rechenbarkeit.",
          },
        ],
      },
      ueberblick: {
        nav: "Überblick",
        title: "Landkarte der Informatik",
        copy: "Grundlagen verbinden die anderen Lernfelder: Algorithmik analysiert Verfahren, Programmieren setzt sie um, Data Science arbeitet mit Daten, KI lernt Muster.",
        concepts: [
          ["Algorithmik", "Wie löse ich ein Problem effizient?"],
          ["Programmieren", "Wie formuliere ich eine Lösung als ausführbaren Code?"],
          ["Data Science & KI", "Wie nutze ich Daten, um Fragen zu beantworten oder Muster zu lernen?"],
        ],
        questions: [
          {
            title: "Lernfeld zuordnen",
            question: "Ein Lerninhalt erklärt, warum binäre Suche O(log n) benötigt. In welches Feld gehört er am klarsten?",
            choices: ["Algorithmik", "Programmieren", "Relationale Datenbanken", "UML-Modellierung"],
            answer: "Algorithmik",
            explanation: "Hier geht es um Verfahren und Effizienz. Die konkrete Umsetzung in Python oder Java wäre dann Programmieren.",
          },
        ],
      },
    },
  },
  programming: {
    defaultTopic: "python",
    topics: {
      python: {
        nav: "Python",
        title: "Python lesen",
        copy: "Python eignet sich gut für Algorithmik, Automatisierung und Datenarbeit, weil die Syntax nah an Pseudocode liegt.",
        concepts: [
          ["Einrückung", "Blöcke entstehen durch Einrückung statt durch geschweifte Klammern."],
          ["Listen", "Flexible Sequenzen, die mit Schleifen und Indizes verarbeitet werden."],
          ["Funktionen", "Wiederverwendbare Blöcke mit Parametern und Rückgabewerten."],
        ],
        questions: [
          {
            title: "Python-Ausgabe",
            snippet: asCode(["werte = [2, 4, 6]", "summe = 0", "for wert in werte:", "    summe += wert", "print(summe)"]),
            question: "Welche Ausgabe erzeugt der Code?",
            choices: ["12", "246", "6", "Fehler wegen Einrückung"],
            answer: "12",
            explanation: "Die Schleife addiert 2, 4 und 6. Dadurch steht am Ende 12 in summe.",
          },
        ],
      },
      java: {
        nav: "Java",
        title: "Java-Grundidee",
        copy: "Java ist stark typisiert und objektorientiert. Viele Konzepte wie Klassen, Methoden und Sichtbarkeit werden hier sehr explizit.",
        concepts: [
          ["Typen", "Variablen haben feste Typen wie int, double oder String."],
          ["Klassen", "Bündeln Zustand und Verhalten in einem Bauplan."],
          ["main", "Typischer Einstiegspunkt eines Java-Programms."],
        ],
        questions: [
          {
            title: "Typ verstehen",
            snippet: asCode(["int punkte = 7;", "punkte = punkte + 3;"]),
            question: "Welchen Wert hat punkte nach diesen Zeilen?",
            choices: ["10", "73", "7", "Der Typ int erlaubt keine Addition"],
            answer: "10",
            explanation: "int speichert ganze Zahlen. Die zweite Zeile addiert 3 zum bisherigen Wert 7.",
          },
        ],
      },
      cpp: {
        nav: "C++",
        title: "C++ bewusst lesen",
        copy: "C++ ist nah an Speicher- und Laufzeitfragen. Für Grundlagen sind Typen, Schleifen und Referenzen besonders wichtig.",
        concepts: [
          ["Compiler", "C++ wird vor der Ausführung übersetzt."],
          ["Vektor", "std::vector ist ein dynamisches Array."],
          ["Referenz", "Kann auf bestehende Werte zeigen, ohne sie zu kopieren."],
        ],
        questions: [
          {
            title: "Schleife lesen",
            snippet: asCode(["int sum = 0;", "for (int i = 1; i <= 3; i++) {", "  sum += i;", "}"]),
            question: "Welcher Wert steht am Ende in sum?",
            choices: ["6", "3", "4", "9"],
            answer: "6",
            explanation: "Die Schleife addiert 1 + 2 + 3. Das ergibt 6.",
          },
        ],
      },
      web: {
        nav: "HTML/CSS/JS",
        title: "Web-Grundlagen",
        copy: "HTML beschreibt Struktur, CSS Gestaltung und JavaScript Verhalten. Diese Trennung verhindert Durcheinander im Code.",
        concepts: [
          ["HTML", "Semantische Struktur: Überschriften, Absätze, Buttons, Formulare."],
          ["CSS", "Layout, Farben, Abstände und responsive Darstellung."],
          ["JavaScript", "Interaktion, Zustände und dynamische Inhalte."],
        ],
        questions: [
          {
            title: "Rolle zuordnen",
            snippet: asCode(["<button class=\"primary-btn\">Speichern</button>"]),
            question: "Was beschreibt diese Zeile hauptsächlich?",
            choices: ["HTML-Struktur", "CSS-Farbregel", "Java-Klasse", "SQL-Abfrage"],
            answer: "HTML-Struktur",
            explanation: "Die Zeile erzeugt ein Button-Element. Die Klasse kann CSS ansprechen, ist aber selbst noch keine CSS-Regel.",
          },
        ],
      },
      konzepte: {
        nav: "Konzepte",
        title: "Sprachübergreifende Konzepte",
        copy: "Viele Ideen bleiben gleich, auch wenn die Syntax wechselt: Variablen, Bedingungen, Schleifen, Funktionen und Datenstrukturen.",
        concepts: [
          ["Variable", "Benannter Speicher für einen Wert."],
          ["Bedingung", "Entscheidet, welcher Codepfad ausgeführt wird."],
          ["Schleife", "Wiederholt einen Block, bis eine Bedingung endet."],
        ],
        questions: [
          {
            title: "Konzept erkennen",
            question: "Welches Konzept steckt hinter 'solange die Liste noch Elemente hat, wiederhole den Schritt'?",
            choices: ["Schleife", "Klasse", "Primärschlüssel", "HTML-Tag"],
            answer: "Schleife",
            explanation: "Eine Schleife wiederholt Code abhängig von einer Bedingung oder über eine Sammlung.",
          },
        ],
      },
    },
  },
  dataScience: {
    defaultTopic: "datenblick",
    topics: {
      datenblick: {
        nav: "Datenblick",
        title: "Daten verstehen",
        copy: "Data Science beginnt nicht mit Modellen, sondern mit guten Fragen an Daten: Was bedeuten Spalten, Zeilen, Werte und Ausreißer?",
        concepts: [
          ["Zeile", "Ein Beobachtungsfall, zum Beispiel eine Bestellung."],
          ["Spalte", "Ein Merkmal, zum Beispiel Preis oder Datum."],
          ["Datenqualität", "Fehlende, falsche oder uneinheitliche Werte beeinflussen Ergebnisse."],
        ],
        questions: [
          {
            title: "Tabellenverständnis",
            question: "In einer Tabelle orders steht jede Zeile für eine Bestellung. Was beschreibt dann die Spalte amount?",
            choices: ["Ein Merkmal jeder Bestellung", "Eine ganze Datenbank", "Immer einen Primärschlüssel", "Ein Machine-Learning-Modell"],
            answer: "Ein Merkmal jeder Bestellung",
            explanation: "Eine Spalte beschreibt ein Merkmal, das für jede Zeile einen Wert haben kann.",
          },
        ],
      },
      mysql: {
        nav: "MySQL",
        title: "SQL mit MySQL",
        copy: "SQL beantwortet Fragen an Tabellen. Für den Anfang sind SELECT, WHERE, GROUP BY und JOIN die wichtigsten Bausteine.",
        concepts: [
          ["SELECT", "Wählt Spalten oder berechnete Werte aus."],
          ["WHERE", "Filtert Zeilen vor der Auswertung."],
          ["GROUP BY", "Fasst Zeilen zu Gruppen zusammen, etwa pro Kunde."],
        ],
        questions: [
          {
            title: "SQL lesen",
            snippet: asCode(["SELECT customer_id, COUNT(*)", "FROM orders", "GROUP BY customer_id;"]),
            question: "Was liefert diese Abfrage?",
            choices: [
              "Die Anzahl der Bestellungen pro Kunde.",
              "Alle Kunden ohne Bestellung.",
              "Den höchsten Bestellwert pro Tag.",
              "Eine zufällige Stichprobe aus orders.",
            ],
            answer: "Die Anzahl der Bestellungen pro Kunde.",
            explanation: "GROUP BY customer_id bildet Kundengruppen; COUNT(*) zählt die Zeilen je Gruppe.",
          },
        ],
      },
      pyspark: {
        nav: "PySpark",
        title: "PySpark einordnen",
        copy: "PySpark verarbeitet große Datenmengen verteilt. Es ist sinnvoll, wenn Daten zu groß für einfache lokale Auswertung werden.",
        concepts: [
          ["DataFrame", "Tabellarische Datenstruktur mit Spaltennamen."],
          ["Transformation", "Beschreibt eine Umformung, etwa filter oder select."],
          ["Action", "Löst die Berechnung aus, etwa count oder show."],
        ],
        questions: [
          {
            title: "PySpark-Idee",
            snippet: asCode(["orders.filter(orders.amount > 100).count()"]),
            question: "Was ist die fachliche Bedeutung dieser Zeile?",
            choices: [
              "Zähle Bestellungen mit Betrag über 100.",
              "Sortiere alle Bestellungen alphabetisch.",
              "Lösche alle Bestellungen unter 100.",
              "Erzeuge ein UML-Klassendiagramm.",
            ],
            answer: "Zähle Bestellungen mit Betrag über 100.",
            explanation: "filter behält passende Zeilen, count zählt sie. Das ist eine typische DataFrame-Auswertung.",
          },
        ],
      },
      analyse: {
        nav: "Analyse",
        title: "Aggregation und Muster",
        copy: "Viele Datenfragen laufen auf Aggregation hinaus: zählen, summieren, gruppieren, vergleichen und Muster vorsichtig interpretieren.",
        concepts: [
          ["Aggregation", "Viele Zeilen werden zu Kennzahlen zusammengefasst."],
          ["Korrelation", "Zwei Größen bewegen sich gemeinsam, ohne automatisch Ursache zu beweisen."],
          ["Visualisierung", "Macht Verteilungen und Ausreißer sichtbar."],
        ],
        questions: [
          {
            title: "Interpretation",
            question: "Warum beweist eine Korrelation allein noch keine Ursache?",
            choices: [
              "Weil ein dritter Faktor beide Größen beeinflussen kann.",
              "Weil Korrelation nur bei Textdaten existiert.",
              "Weil Korrelation immer falsch berechnet wird.",
              "Weil Datenbanken keine Zahlen speichern können.",
            ],
            answer: "Weil ein dritter Faktor beide Größen beeinflussen kann.",
            explanation: "Gemeinsames Auftreten ist ein Hinweis, aber kein Beweis für Ursache und Wirkung.",
          },
        ],
      },
      mlAusblick: {
        nav: "ML-Ausblick",
        title: "Brücke zu KI und maschinellem Lernen",
        copy: "Maschinelles Lernen nutzt Daten, um Muster für Vorhersagen zu lernen. Es sollte später ein eigenes Lernfeld werden, statt Data Science zu überladen.",
        concepts: [
          ["Training", "Modell lernt Muster aus Beispieldaten."],
          ["Testdaten", "Prüfen, ob das Modell auf neue Fälle übertragbar ist."],
          ["Overfitting", "Modell merkt sich Trainingsdaten zu stark und generalisiert schlecht."],
        ],
        questions: [
          {
            title: "ML-Grundidee",
            question: "Wozu trennt man Trainings- und Testdaten?",
            choices: [
              "Um zu prüfen, ob das Modell auf neue Daten generalisiert.",
              "Um SQL-Abfragen schneller zu sortieren.",
              "Um HTML und CSS zu trennen.",
              "Um Primärschlüssel automatisch zu löschen.",
            ],
            answer: "Um zu prüfen, ob das Modell auf neue Daten generalisiert.",
            explanation: "Ein Modell soll nicht nur bekannte Beispiele auswendig können, sondern auf neue Fälle sinnvoll reagieren.",
          },
        ],
      },
    },
  },
};

const subjectModes = [
  { key: "learn", label: { de: "Erklärung", en: "Explanation" } },
  { key: "guided", label: { de: "Geführte Übung", en: "Guided practice" } },
  { key: "exam", label: { de: "Klausuraufgabe", en: "Exam task" } },
];

const subjectAreaEnhancements = {
  basics: {
    defaultTopic: "zahlensysteme",
    topics: {
      zahlensysteme: {
        nav: "Zahlensysteme",
        title: "Binär, Hex und Zweierkomplement",
        copy: "Zahlendarstellung ist klausurrelevant, weil viele Fehler beim Stellenwert, beim Vorzeichenbit oder beim Overflow entstehen.",
        learningGoals: ["Binär- und Hexzahlen einordnen", "Zweierkomplement schrittweise bilden", "Overflow-Regel erklären"],
        explanation: "Im Binärsystem zählt jede Stelle eine Zweierpotenz. Im Zweierkomplement steht das höchstwertige Bit für das Vorzeichen. Für eine negative Zahl invertierst du die positive Darstellung und addierst 1. Typischer Denkfehler: Nicht das letzte Bit entscheidet über das Vorzeichen, sondern das linke Bit.",
        concepts: [
          ["Stellenwert", "1011₂ bedeutet 8 + 0 + 2 + 1 = 11."],
          ["Zweierkomplement", "Invertieren und 1 addieren; dadurch sind Additionen technisch einheitlich möglich."],
          ["Overflow", "Bei gleicher Vorzeichenaddition entsteht ein Ergebnis mit falschem Vorzeichen."],
        ],
        visualization: {
          title: "8-Bit-Darstellung",
          type: "bit-grid",
          bits: "11111011",
          rows: [
            ["Ausgang", "+5 = 00000101"],
            ["Invertieren", "11111010"],
            ["+1 addieren", "11111011 = -5"],
          ],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Zweierkomplement bilden",
            question: "Welche 8-Bit-Darstellung ist -5 im Zweierkomplement?",
            choices: ["11111011", "10000101", "11111010", "00000101"],
            answer: "11111011",
            hint: "Starte mit +5 = 00000101, invertiere alle Bits und addiere 1.",
            explanation: "00000101 wird zu 11111010, plus 1 ergibt 11111011. Das linke Bit zeigt das negative Vorzeichen.",
            commonMistakes: {
              "10000101": "Das wäre Vorzeichen-Betrag-Denken. Im Zweierkomplement wird nicht nur ein Vorzeichenbit gesetzt.",
              "11111010": "Du hast invertiert, aber die abschließende +1 vergessen.",
            },
            solution: "00000101 → 11111010 → 11111011.",
            examRelevance: "Sehr typisch in Klausuren zu Zahlendarstellung und Overflow.",
          },
        ],
        examTasks: [
          {
            type: "multi",
            level: 4,
            title: "Overflow erkennen",
            question: "Welche Aussagen zu 8-Bit-Zweierkomplement sind korrekt?",
            choices: [
              "01111111 + 00000001 erzeugt Overflow.",
              "Das höchstwertige Bit ist für das Vorzeichen entscheidend.",
              "11111111 entspricht +255.",
              "Overflow kann bei Addition zweier positiver Zahlen entstehen.",
            ],
            answer: [
              "01111111 + 00000001 erzeugt Overflow.",
              "Das höchstwertige Bit ist für das Vorzeichen entscheidend.",
              "Overflow kann bei Addition zweier positiver Zahlen entstehen.",
            ],
            hint: "Prüfe Vorzeichen vor und nach der Addition.",
            explanation: "127 + 1 kippt in 10000000 und damit in den negativen Bereich. 11111111 entspricht im Zweierkomplement -1, nicht +255.",
            solution: "Korrekt sind 1, 2 und 4. Aussage 3 verwechselt unsigned mit Zweierkomplement.",
          },
        ],
      },
      boolesch: {
        nav: "Boolesche Algebra",
        title: "Wahrheitstabellen, DNF und KNF",
        copy: "Boolesche Algebra prüft, ob du logische Ausdrücke strukturiert auswerten und Normalformen erkennen kannst.",
        learningGoals: ["Operatoren sicher lesen", "DNF und KNF unterscheiden", "Wahrheitstabellen nutzen"],
        explanation: "Eine DNF ist eine Oder-Verknüpfung von Und-Blöcken. Eine KNF ist eine Und-Verknüpfung von Oder-Blöcken. Klausurtrick: Schaue auf die oberste Verknüpfung, nicht nur auf einzelne Klammern.",
        concepts: [
          ["DNF", "Oder von Konjunktionen, zum Beispiel (A ∧ B) ∨ (¬A ∧ C)."],
          ["KNF", "Und von Disjunktionen, zum Beispiel (A ∨ B) ∧ (¬A ∨ C)."],
          ["KDNF/KKNF", "Kanonische Formen enthalten alle Variablen in jedem Block."],
        ],
        visualization: {
          title: "Ausdrucksbaum",
          type: "logic-tree",
          nodes: ["∨", "A ∧ B", "¬A ∧ C"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Normalform erkennen",
            question: "Welche Form hat (A ∧ B) ∨ (¬A ∧ C)?",
            choices: ["DNF", "KNF", "Weder noch", "Automat"],
            answer: "DNF",
            hint: "Die oberste Verknüpfung ist ein Oder zwischen Und-Blöcken.",
            explanation: "Der Ausdruck ist eine Disjunktion von Konjunktionen und erfüllt damit die DNF-Struktur.",
            solution: "Oberste Ebene: ∨. Darunter: zwei ∧-Terme. Also DNF.",
          },
        ],
        examTasks: [
          {
            type: "truefalse",
            level: 4,
            title: "KNF/DNF begründen",
            question: "(A ∨ B) ∧ (¬A ∨ C) ist eine KNF.",
            choices: ["Wahr", "Falsch"],
            answer: "Wahr",
            hint: "KNF bedeutet: Und von Oder-Blöcken.",
            explanation: "Die oberste Verknüpfung ist ∧, die einzelnen Klammern sind Oder-Terme. Genau das ist KNF.",
            solution: "Wahr, weil (A ∨ B) und (¬A ∨ C) Disjunktionen sind und beide konjunktiv verbunden werden.",
          },
        ],
      },
      automaten: {
        nav: "Automaten",
        title: "Endliche Automaten und Grammatiken",
        copy: "Automaten helfen, Zustände, Übergänge und akzeptierte Wörter präzise zu prüfen.",
        learningGoals: ["Zustände und Übergänge lesen", "Akzeptanz simulieren", "Automat und Grammatik trennen"],
        explanation: "Ein endlicher Automat verarbeitet ein Wort Zeichen für Zeichen. Nach jedem Zeichen folgt er genau einem Übergang. Am Ende entscheidet der erreichte Zustand, ob das Wort akzeptiert wird.",
        concepts: [
          ["Startzustand", "Hier beginnt die Verarbeitung."],
          ["Endzustand", "Ist nach dem letzten Zeichen ein Endzustand erreicht, wird akzeptiert."],
          ["Übergang", "Regel der Form: von Zustand q mit Zeichen a nach Zustand p."],
        ],
        visualization: {
          title: "Mini-Automat für gerade Anzahl von 1en",
          type: "automaton",
          states: ["q0 Start/Ende", "q1"],
          transitions: ["q0 --1--> q1", "q1 --1--> q0", "0 bleibt im Zustand"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Wort akzeptieren",
            question: "Ein Automat wechselt bei jeder 1 zwischen q0 und q1. q0 ist Endzustand. Wird 101 akzeptiert?",
            choices: ["Ja", "Nein", "Nur wenn 0 verboten ist", "Nicht entscheidbar"],
            answer: "Ja",
            hint: "Zähle nur die Einsen: 101 enthält zwei Einsen.",
            explanation: "Start in q0, erste 1 nach q1, 0 bleibt, zweite 1 zurück nach q0. q0 ist Endzustand.",
            solution: "q0 --1--> q1 --0--> q1 --1--> q0. Akzeptiert.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Automat erklären",
            question: "Beschreibe kurz, welche Sprache ein Automat akzeptiert, der bei jeder 1 den Zustand wechselt und q0 als Endzustand hat.",
            answer: ["gerade", "anzahl", "1"],
            hint: "Welche Eigenschaft zählt der Automat?",
            explanation: "Eine gute Antwort nennt die gerade Anzahl von Einsen. Nullen ändern die Parität nicht.",
            solution: "Der Automat akzeptiert alle Wörter mit gerader Anzahl von 1en.",
          },
        ],
      },
      computersysteme: {
        nav: "Computersysteme",
        title: "Speicherhierarchie und Rechnergrundlagen",
        copy: "Computersysteme verbinden Hardware, Speicherarten und die Frage, warum Zugriffsgeschwindigkeit und Persistenz verschieden sind.",
        learningGoals: ["SRAM und DRAM unterscheiden", "Speicherhierarchie ordnen", "Flüchtigkeit erklären"],
        explanation: "Je näher ein Speicher am Prozessor liegt, desto schneller und meist kleiner ist er. Register und Cache sind sehr schnell, Hauptspeicher ist größer, SSD/Festplatte dauerhaft, aber langsamer.",
        concepts: [
          ["SRAM", "Sehr schnell, teurer, typisch für Cache."],
          ["DRAM", "Hauptspeicher, muss regelmäßig aufgefrischt werden."],
          ["Persistenz", "Daten bleiben nach dem Ausschalten erhalten, etwa auf SSD."],
        ],
        visualization: {
          title: "Speicherhierarchie",
          type: "pipeline",
          steps: ["Register", "Cache/SRAM", "RAM/DRAM", "SSD", "Archiv"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 1,
            title: "Speicherart einordnen",
            question: "Welche Speicherart wird typischerweise für Cache verwendet?",
            choices: ["SRAM", "DRAM", "SSD", "Magnetband"],
            answer: "SRAM",
            hint: "Cache braucht besonders schnellen Zugriff.",
            explanation: "SRAM ist schnell und teuer, deshalb eignet er sich für kleine Cache-Speicher.",
            solution: "Cache → SRAM; Hauptspeicher → DRAM; dauerhafter Speicher → SSD/HDD.",
          },
        ],
        examTasks: [
          {
            type: "multi",
            level: 4,
            title: "Speicherhierarchie begründen",
            question: "Welche Aussagen zur Speicherhierarchie sind korrekt?",
            choices: ["Register sind sehr schnell und sehr klein.", "SSD ist flüchtiger als RAM.", "DRAM wird typischerweise als Hauptspeicher genutzt.", "Cache liegt konzeptionell näher an der CPU als SSD."],
            answer: ["Register sind sehr schnell und sehr klein.", "DRAM wird typischerweise als Hauptspeicher genutzt.", "Cache liegt konzeptionell näher an der CPU als SSD."],
            hint: "Ordne nach CPU-Nähe und Persistenz.",
            explanation: "SSD ist nicht flüchtiger als RAM; sie ist persistent. Register, Cache und RAM sind schneller, aber flüchtig.",
            solution: "Korrekt sind 1, 3 und 4.",
          },
        ],
      },
    },
  },
  programming: {
    defaultTopic: "javaOop",
    topics: {
      javaOop: {
        nav: "Java OOP",
        title: "Klassen, Konstruktoren und Vererbung",
        copy: "Java-Aufgaben prüfen oft, ob du Objektzustand, Konstruktoren, Überschreiben und Interfaces sauber trennst.",
        learningGoals: ["Konstruktoren erkennen", "Vererbung erklären", "Überschreiben von Überladen trennen"],
        explanation: "Eine Klasse ist ein Bauplan. Der Konstruktor initialisiert neue Objekte. Überschreiben bedeutet: Unterklasse liefert eine neue Implementierung derselben Methodensignatur. Überladen bedeutet: gleicher Methodenname, aber andere Parameterliste.",
        concepts: [
          ["Konstruktor", "Hat keinen Rückgabetyp und trägt den Klassennamen."],
          ["Override", "Gleiche Signatur in Unterklasse, andere Implementierung."],
          ["Interface", "Legt Verhalten vertraglich fest, ohne zwingend Zustand zu speichern."],
        ],
        visualization: {
          title: "Vererbungshierarchie",
          type: "uml",
          boxes: ["Person", "Student extends Person", "Dozent extends Person"],
        },
        guidedTasks: [
          {
            type: "multi",
            level: 2,
            title: "Konstruktoren verstehen",
            snippet: asCode(["class Konto {", "  private int saldo;", "  Konto(int start) {", "    saldo = start;", "  }", "}"]),
            question: "Welche Aussagen sind korrekt?",
            choices: ["Konto(int start) ist ein Konstruktor.", "Der Konstruktor hat keinen Rückgabetyp.", "saldo ist lokal im Konstruktor.", "start initialisiert den Objektzustand."],
            answer: ["Konto(int start) ist ein Konstruktor.", "Der Konstruktor hat keinen Rückgabetyp.", "start initialisiert den Objektzustand."],
            hint: "Achte auf Klassennamen, Rückgabetyp und Feldzugriff.",
            explanation: "saldo ist ein Feld der Klasse. Der Konstruktor setzt dieses Feld mit dem Parameter start.",
            solution: "Korrekt sind 1, 2 und 4.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "UML in Java übersetzen",
            question: "Eine UML-Klasse Buch hat Attribut titel:String und Methode getTitel():String. Welche Java-Bausteine müssen in der Klasse vorkommen?",
            answer: ["class", "String", "getTitel"],
            hint: "Nenne Klassendeklaration, Feld und Methode.",
            explanation: "Eine passende Lösung enthält eine Klasse Buch, ein String-Feld titel und eine Methode String getTitel().",
            solution: "class Buch { private String titel; String getTitel() { return titel; } }",
          },
        ],
      },
      javaReferences: {
        nav: "Java Referenzen",
        title: "Referenzen vs. Objektkopien",
        copy: "Ein häufiger Klausurfehler ist die Annahme, dass a = b ein Objekt kopiert. Tatsächlich wird nur die Referenz kopiert.",
        learningGoals: ["Referenzzuweisung erklären", "Alias-Effekte erkennen", "Objekt und Variable unterscheiden"],
        explanation: "Objektvariablen enthalten Referenzen. Bei a = b zeigen danach beide Variablen auf dasselbe Objekt. Änderungen über a sind dann auch über b sichtbar, weil es nur ein Objekt gibt.",
        concepts: [
          ["Referenz", "Verweis auf ein Objekt im Heap."],
          ["Alias", "Mehrere Variablen zeigen auf dasselbe Objekt."],
          ["Kopie", "Entsteht nur durch explizites Erzeugen/Kopieren eines neuen Objekts."],
        ],
        visualization: {
          title: "Vorher/Nachher bei a = b",
          type: "reference",
          before: ["a → Objekt A", "b → Objekt B"],
          after: ["a → Objekt B", "b → Objekt B", "Objekt A ohne Referenz"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Referenzzuweisung",
            question: "Was passiert bei a = b, wenn a und b Objektvariablen sind?",
            choices: ["a zeigt danach auf dasselbe Objekt wie b.", "Das Objekt von b wird vollständig kopiert.", "b zeigt danach auf a.", "Beide Objekte werden gelöscht."],
            answer: "a zeigt danach auf dasselbe Objekt wie b.",
            hint: "Bei Java werden Objektvariablen als Referenzen behandelt.",
            explanation: "Die Referenz wird kopiert, nicht das Objekt. Danach gibt es zwei Variablen, die auf dasselbe Objekt zeigen.",
            commonMistakes: {
              "Das Objekt von b wird vollständig kopiert.": "Das ist der klassische Denkfehler. Eine Kopie bräuchte ein neues Objekt, zum Beispiel über Konstruktor oder clone-Logik.",
            },
            solution: "Nach a = b zeigen a und b auf dasselbe Objekt.",
          },
        ],
        examTasks: [
          {
            type: "single",
            level: 4,
            title: "Alias-Effekt",
            snippet: asCode(["Box a = new Box(1);", "Box b = new Box(2);", "a = b;", "a.value = 7;", "System.out.println(b.value);"]),
            question: "Welche Ausgabe entsteht?",
            choices: ["7", "2", "1", "Compilerfehler"],
            answer: "7",
            hint: "Nach a = b zeigen beide Variablen auf dieselbe Box.",
            explanation: "a.value verändert das Objekt, auf das auch b zeigt. Deshalb liest b.value den Wert 7.",
            solution: "Ausgabe: 7.",
          },
        ],
      },
      python: {
        nav: "Python",
        title: "Kontrollfluss, Funktionen und Collections",
        copy: "Python-Aufgaben prüfen oft, ob du Schleifen, Listenmutation und Dictionaries präzise Schritt für Schritt lesen kannst.",
        learningGoals: ["Schleifen auswerten", "Listenmutation erkennen", "Dictionary-Zugriff verstehen"],
        explanation: "Python-Code wird häufig nahe an Pseudocode gelesen. Trotzdem sind Mutation und Einrückung entscheidend: append verändert eine Liste, eine falsche Einrückung verändert den Kontrollfluss.",
        concepts: [
          ["Liste", "Geordnete, veränderbare Sammlung."],
          ["Dictionary", "Schlüssel-Wert-Struktur mit schnellem Zugriff über Keys."],
          ["Funktion", "Kapselt Schritte und kann Werte zurückgeben."],
        ],
        visualization: {
          title: "Listenmutation",
          type: "table",
          headers: ["Schritt", "Liste"],
          rows: [["Start", "[1, 2]"], ["append(3)", "[1, 2, 3]"], ["pop(0)", "[2, 3]"]],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Python-Ausgabe",
            snippet: asCode(["werte = [1, 2]", "werte.append(3)", "print(werte[1])"]),
            question: "Welche Ausgabe erzeugt der Code?",
            choices: ["2", "3", "[1, 2, 3]", "IndexError"],
            answer: "2",
            hint: "Python-Indizes starten bei 0.",
            explanation: "Nach append ist die Liste [1, 2, 3]. Index 1 ist das zweite Element, also 2.",
            solution: "Ausgabe: 2.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Codefehler finden",
            snippet: asCode(["def summe(xs):", "total = 0", "for x in xs:", "    total += x", "return total"]),
            question: "Welcher Fehler ist in diesem Python-Code klausurtypisch?",
            answer: ["einrückung", "indent"],
            hint: "Welche Zeilen gehören zum Funktionsblock?",
            explanation: "Der Funktionskörper muss eingerückt sein. total = 0 und return total stehen aktuell nicht im Block.",
            solution: "Die Einrückung nach def ist falsch; der Funktionskörper muss eingerückt werden.",
          },
        ],
      },
      cpp: {
        nav: "C++",
        title: "C++ Grundlagen",
        copy: "C++ verbindet Syntax mit Speicherdenken. Für Grundlagen reichen Schleifen, Typen, Vektoren und Referenzen.",
        learningGoals: ["for-Schleifen lesen", "Wert und Referenz unterscheiden", "vector-Grundoperationen kennen"],
        explanation: "In C++ ist der Typ oft explizit sichtbar. Referenzen mit & können einen vorhandenen Wert verändern, während normale Zuweisungen häufig kopieren.",
        concepts: [
          ["std::vector", "Dynamisches Array mit push_back und Indexzugriff."],
          ["Referenz &", "Alias auf einen bestehenden Wert."],
          ["Compiler", "Übersetzt Code vor der Ausführung."],
        ],
        visualization: {
          title: "Vektor-Aufbau",
          type: "array",
          values: ["Index 0: 4", "Index 1: 7", "Index 2: 9"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            snippet: asCode(["int sum = 0;", "for (int i = 1; i <= 3; i++) {", "  sum += i;", "}"]),
            title: "C++ Schleife",
            question: "Welcher Wert steht am Ende in sum?",
            choices: ["6", "3", "4", "9"],
            answer: "6",
            hint: "Die Schleife läuft für i = 1, 2, 3.",
            explanation: "Es wird 1 + 2 + 3 addiert.",
            solution: "sum = 6.",
          },
        ],
        examTasks: [
          {
            type: "truefalse",
            level: 4,
            title: "Referenz verstehen",
            question: "Eine C++-Referenz kann als Alias auf eine bereits existierende Variable wirken.",
            choices: ["Wahr", "Falsch"],
            answer: "Wahr",
            hint: "Denke an int& r = x.",
            explanation: "Eine Referenz kann Änderungen am ursprünglichen Wert sichtbar machen.",
            solution: "Wahr. int& r = x; r = 5; verändert x.",
          },
        ],
      },
    },
  },
  dataScience: {
    defaultTopic: "relationen",
    topics: {
      relationen: {
        nav: "Relationen",
        title: "Relation, Schlüssel und funktionale Abhängigkeiten",
        copy: "Datenbankklausuren prüfen oft, ob du Schlüsselminimalität und Attributabschluss sauber anwenden kannst.",
        learningGoals: ["Relation/Tupel/Attribut unterscheiden", "Superkey und Candidate Key trennen", "Attributabschluss berechnen"],
        explanation: "Ein Superkey identifiziert Tupel eindeutig, muss aber nicht minimal sein. Ein Candidate Key ist ein minimaler Superkey. Mit funktionalen Abhängigkeiten bestimmst du, welche Attribute aus einer Attributmenge folgen.",
        concepts: [
          ["Superkey", "Garantiert Eindeutigkeit, kann überflüssige Attribute enthalten."],
          ["Candidate Key", "Minimaler Superkey ohne überflüssige Attribute."],
          ["Attributabschluss", "Alle Attribute, die aus einer Menge funktional folgen."],
        ],
        visualization: {
          title: "Attributabschluss",
          type: "closure",
          steps: ["Start: A⁺ = {A}", "A → B anwenden: {A, B}", "B → C anwenden: {A, B, C}", "A ist Candidate Key"],
        },
        guidedTasks: [
          {
            type: "multi",
            level: 2,
            title: "Candidate Key bestimmen",
            question: "Gegeben R(A,B,C) mit A → B und B → C. Welche Attributmengen sind Candidate Keys?",
            choices: ["{A}", "{A,B}", "{B}", "{A,C}"],
            answer: ["{A}"],
            hint: "Berechne A⁺ und prüfe anschließend Minimalität.",
            explanation: "A bestimmt B und über B auch C. {A,B} ist zwar eindeutig, aber nicht minimal.",
            commonMistakes: {
              "{A,B}": "{A,B} ist ein Superkey, aber kein Candidate Key, weil A allein reicht.",
              "{B}": "B bestimmt C, aber nicht A. Damit fehlt ein Attribut.",
            },
            solution: "A⁺ = {A,B,C}. Also ist {A} Candidate Key.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Minimalität begründen",
            question: "Warum ist {A,B} in diesem Beispiel kein Candidate Key, obwohl {A,B} alle Attribute bestimmt?",
            answer: ["nicht minimal", "a allein"],
            hint: "Candidate Keys müssen minimal sein.",
            explanation: "{A,B} enthält B überflüssig, weil A allein bereits A, B und C bestimmt.",
            solution: "{A,B} ist nur Superkey. Candidate Key ist {A}, weil A allein alle Attribute bestimmt.",
          },
        ],
      },
      sql: {
        nav: "SQL/MySQL",
        title: "SQL-Ausführungslogik",
        copy: "SQL wird klausurnah oft über die logische Reihenfolge verstanden: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.",
        learningGoals: ["WHERE und HAVING trennen", "JOIN-Ergebnisse bestimmen", "Aggregation erklären"],
        explanation: "WHERE filtert Zeilen vor der Gruppierung. HAVING filtert Gruppen nach Aggregation. Ein häufiger Fehler ist, Aggregatbedingungen wie COUNT(*) > 2 in WHERE zu schreiben.",
        concepts: [
          ["WHERE", "Filter auf einzelne Zeilen vor GROUP BY."],
          ["HAVING", "Filter auf Gruppen nach Aggregation."],
          ["JOIN", "Kombiniert Tupel anhand einer Bedingung."],
        ],
        visualization: {
          title: "Logische SQL-Reihenfolge",
          type: "pipeline",
          steps: ["FROM/JOIN", "WHERE", "GROUP BY", "HAVING", "SELECT", "ORDER BY"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "HAVING erkennen",
            snippet: asCode(["SELECT customer_id, COUNT(*)", "FROM orders", "GROUP BY customer_id", "HAVING COUNT(*) > 2;"]),
            question: "Warum steht COUNT(*) > 2 in HAVING?",
            choices: ["Weil auf aggregierte Gruppen gefiltert wird.", "Weil WHERE keine Zahlen erlaubt.", "Weil SELECT immer zuletzt steht.", "Weil GROUP BY dadurch gelöscht wird."],
            answer: "Weil auf aggregierte Gruppen gefiltert wird.",
            hint: "COUNT(*) entsteht erst nach der Gruppierung.",
            explanation: "Bedingungen auf Aggregaten gehören in HAVING, weil WHERE vor der Aggregation arbeitet.",
            solution: "HAVING COUNT(*) > 2 filtert Kundengruppen mit mehr als zwei Bestellungen.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "SQL selbst formulieren",
            question: "Formuliere den Kern einer SQL-Abfrage, die pro Kunde die Anzahl der Bestellungen zählt.",
            answer: ["group by", "count", "customer"],
            hint: "Du brauchst SELECT, COUNT und GROUP BY.",
            explanation: "Die Musterlösung gruppiert nach customer_id und zählt die Zeilen je Gruppe.",
            solution: "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;",
          },
        ],
      },
      normalformen: {
        nav: "Normalformen",
        title: "1NF, 2NF, 3NF und Abhängigkeiten",
        copy: "Normalisierung macht Redundanzen sichtbar und verhindert Update-, Insert- und Delete-Anomalien.",
        learningGoals: ["1NF/2NF/3NF unterscheiden", "partielle Abhängigkeit erkennen", "transitive Abhängigkeit erklären"],
        explanation: "1NF fordert atomare Werte. 2NF verbietet partielle Abhängigkeiten von einem Teil eines zusammengesetzten Schlüssels. 3NF verbietet transitive Abhängigkeiten von Nicht-Schlüsselattributen.",
        concepts: [
          ["1NF", "Keine Listen oder wiederholten Gruppen in einem Feld."],
          ["2NF", "Jedes Nicht-Schlüsselattribut hängt vom ganzen Schlüssel ab."],
          ["3NF", "Keine Nicht-Schlüsselattribute bestimmen andere Nicht-Schlüsselattribute."],
        ],
        visualization: {
          title: "Normalisierungsschritte",
          type: "pipeline",
          steps: ["Unnormalisierte Tabelle", "1NF: atomare Werte", "2NF: partielle Abhängigkeiten entfernen", "3NF: transitive Abhängigkeiten entfernen"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Partielle Abhängigkeit",
            question: "Relation Bestellung(Position, Artikel, ArtikelName) hat Schlüssel (Position, Artikel). Artikel → ArtikelName. Welche Normalform ist verletzt?",
            choices: ["2NF", "1NF", "BCNF ist immer erfüllt", "Keine"],
            answer: "2NF",
            hint: "ArtikelName hängt nur von Artikel ab, nicht vom ganzen zusammengesetzten Schlüssel.",
            explanation: "Das ist eine partielle Abhängigkeit von einem Teil des zusammengesetzten Schlüssels und verletzt 2NF.",
            solution: "Artikel und ArtikelName gehören in eine eigene Artikeltabelle.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "3NF-Verletzung erklären",
            question: "Warum verletzt KundeID → PLZ und PLZ → Ort typischerweise die 3NF, wenn Ort in der Kundentabelle gespeichert wird?",
            answer: ["transitiv", "plz", "ort"],
            hint: "Ein Nicht-Schlüsselattribut bestimmt ein anderes Nicht-Schlüsselattribut.",
            explanation: "Ort hängt transitiv über PLZ von KundeID ab. Dadurch entsteht Redundanz.",
            solution: "Die Abhängigkeit KundeID → PLZ → Ort ist transitiv; PLZ/Ort sollte ausgelagert werden.",
          },
        ],
      },
      ermodellierung: {
        nav: "ER-Modell",
        title: "ER-Modellierung aus Text",
        copy: "ER-Aufgaben verlangen, Entitäten, Beziehungen und Kardinalitäten aus Sprache strukturiert abzuleiten.",
        learningGoals: ["Entitäten erkennen", "Kardinalitäten begründen", "Beziehungen sauber benennen"],
        explanation: "Substantive mit eigener Identität werden oft Entitäten. Verben zwischen Entitäten weisen auf Beziehungen hin. Kardinalitäten entstehen aus Formulierungen wie 'genau ein', 'mehrere' oder 'optional'.",
        concepts: [
          ["Entität", "Objektklasse mit eigener Identität, etwa Kunde."],
          ["Beziehung", "Zusammenhang zwischen Entitäten, etwa Kunde gibt Bestellung auf."],
          ["Kardinalität", "Wie viele Objekte miteinander verbunden sein dürfen oder müssen."],
        ],
        visualization: {
          title: "Mini-ER-Skizze",
          type: "erd",
          boxes: ["Kunde 1", "gibt auf", "n Bestellung"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Kardinalität lesen",
            question: "Ein Kunde kann viele Bestellungen aufgeben, jede Bestellung gehört genau einem Kunden. Welche Kardinalität passt?",
            choices: ["Kunde 1:n Bestellung", "Kunde n:m Bestellung", "Kunde 1:1 Bestellung", "Keine Beziehung"],
            answer: "Kunde 1:n Bestellung",
            hint: "Ein Kunde → viele Bestellungen; eine Bestellung → ein Kunde.",
            explanation: "Vom Kunden zur Bestellung ist es 1:n.",
            solution: "Kunde 1:n Bestellung.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Entitäten nennen",
            question: "Text: Kunden bestellen Artikel. Eine Bestellung enthält mehrere Positionen. Nenne zwei zentrale Entitäten.",
            answer: ["kunde", "bestellung"],
            hint: "Suche Dinge mit eigener Identität.",
            explanation: "Kunde und Bestellung sind zentrale Entitäten; Artikel und Position wären ebenfalls plausibel.",
            solution: "Zum Beispiel Kunde, Bestellung, Artikel und Bestellposition.",
          },
        ],
      },
      pyspark: {
        nav: "PySpark",
        title: "PySpark DataFrames und Big-Data-Pipelines",
        copy: "PySpark-Aufgaben prüfen, ob du Transformationen, Actions und Pipeline-Denken unterscheiden kannst.",
        learningGoals: ["Transformation und Action unterscheiden", "DataFrame-Schritte erklären", "Lazy Evaluation einordnen"],
        explanation: "Transformationen wie filter oder select beschreiben einen neuen DataFrame. Actions wie count oder show lösen die Ausführung aus. PySpark plant viele Schritte zunächst nur.",
        concepts: [
          ["Transformation", "filter, select, groupBy beschreiben Umformungen."],
          ["Action", "count, show, collect lösen Berechnung aus."],
          ["DAG", "Abhängigkeitsgraph der Verarbeitungsschritte."],
        ],
        visualization: {
          title: "PySpark-Pipeline",
          type: "pipeline",
          steps: ["read orders", "filter amount > 100", "groupBy customer", "count"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Transformation oder Action",
            snippet: asCode(["orders.filter(orders.amount > 100).count()"]),
            question: "Welche Operation löst die Berechnung aus?",
            choices: ["count()", "filter()", "orders.amount", "Der Punktoperator"],
            answer: "count()",
            hint: "Eine Action verlangt ein konkretes Ergebnis.",
            explanation: "filter ist eine Transformation, count ist eine Action und stößt die Ausführung an.",
            solution: "count() löst die Berechnung aus.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Pipeline erklären",
            question: "Erkläre kurz, warum PySpark Transformationen oft lazy auswertet.",
            answer: ["optimieren", "plan", "action"],
            hint: "PySpark kann den Ausführungsplan verbessern, bevor eine Action kommt.",
            explanation: "Lazy Evaluation erlaubt Optimierung und vermeidet unnötige Berechnungen, bis ein Ergebnis gebraucht wird.",
            solution: "Transformationen bauen einen Plan auf; erst eine Action löst optimierte Ausführung aus.",
          },
        ],
      },
    },
  },
  informationManagement: {
    defaultTopic: "im",
    topics: {
      im: {
        nav: "Informationsmanagement",
        title: "Informationsbedarf, Quellen und Nutzung",
        copy: "Informationsmanagement fragt, welche Informationen eine Organisation braucht, woher sie kommen und wie sie nutzbar gemacht werden.",
        learningGoals: ["IM-Ebenen einordnen", "Informationsquellen unterscheiden", "Stammdaten als Ressource verstehen"],
        explanation: "Informationsmanagement verbindet strategische, organisatorische und technische Perspektiven. Typischer Fehler: SQL-Detailwissen mit Informationsmanagement zu vermischen. Hier geht es um Bedarf, Qualität, Nutzung und Steuerung von Information.",
        concepts: [
          ["Informationsbedarf", "Welche Information wird für eine Entscheidung benötigt?"],
          ["Informationsquelle", "Intern oder extern, formal oder informell."],
          ["Stammdaten", "Langfristig gültige Kerndaten wie Kunde, Material oder Lieferant."],
        ],
        visualization: {
          title: "IM-Ebenenmodell",
          type: "layers",
          layers: ["Strategie", "Organisation", "Anwendungssysteme", "Datenbasis"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "IM-Fokus erkennen",
            question: "Welche Frage gehört am klarsten zum Informationsmanagement?",
            choices: ["Welche Informationen braucht der Vertrieb für Entscheidungen?", "Wie lautet die SQL-Syntax für INNER JOIN?", "Welche Rotation braucht ein AVL-Baum?", "Wie wird ein Python-Dictionary iteriert?"],
            answer: "Welche Informationen braucht der Vertrieb für Entscheidungen?",
            hint: "IM startet beim fachlichen Informationsbedarf.",
            explanation: "Informationsmanagement betrachtet Bedarf, Quellen, Nutzung und Qualität von Information auf Organisationsebene.",
            solution: "Die Vertriebsfrage ist fachlich-organisatorisch und damit IM.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Stammdaten begründen",
            question: "Warum brauchen Stammdaten global eindeutige Schlüssel?",
            answer: ["eindeutig", "system", "prozess"],
            hint: "Denke an mehrere Systeme und Prozesse.",
            explanation: "Ohne eindeutige Schlüssel entstehen Dubletten, falsche Zuordnungen und Prozessfehler über Systemgrenzen hinweg.",
            solution: "Eindeutige Schlüssel verhindern Dubletten und ermöglichen konsistente Prozess- und Systemintegration.",
          },
        ],
      },
      erp: {
        nav: "ERP-Prozesse",
        title: "ERP, Nebenbücher und Prozessinteraktion",
        copy: "ERP-Systeme integrieren Geschäftsprozesse. Klausuraufgaben prüfen oft Rollen, Organisationseinheiten und Datenflüsse.",
        learningGoals: ["ERP-Prozessketten lesen", "Nebenbücher einordnen", "Kunde-Lieferant-Interaktion verstehen"],
        explanation: "ERP verbindet Vertrieb, Beschaffung, Lager, Produktion und Finanzwesen. Nebenbücher verdichten Detailvorgänge später ins Hauptbuch. Ein Prozessschritt in einer Abteilung erzeugt oft Folgeeffekte in einer anderen.",
        concepts: [
          ["ERP", "Integriertes Anwendungssystem für betriebliche Prozesse."],
          ["Nebenbuch", "Detailbuchhaltung, etwa Debitoren oder Kreditoren."],
          ["Customizing", "System wird an Organisationsstruktur und Prozesse angepasst."],
        ],
        visualization: {
          title: "Order-to-Cash-Prozess",
          type: "pipeline",
          steps: ["Kundenauftrag", "Lieferung", "Warenausgang", "Rechnung", "Zahlung"],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Nebenbuch einordnen",
            question: "Wo werden offene Forderungen gegenüber Kunden typischerweise detailliert geführt?",
            choices: ["Debitoren-Nebenbuch", "Quellcode-Repository", "AVL-Baum", "CPU-Register"],
            answer: "Debitoren-Nebenbuch",
            hint: "Debitoren sind Kunden mit Forderungen.",
            explanation: "Das Debitoren-Nebenbuch enthält kundenbezogene Forderungsdetails, die ins Hauptbuch verdichtet werden.",
            solution: "Debitoren-Nebenbuch.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Prozessfolge erklären",
            question: "Nenne zwei Folgeeffekte, die ein Warenausgang im ERP typischerweise auslösen kann.",
            answer: ["bestand", "buchung"],
            hint: "Denke an Lager und Rechnungswesen.",
            explanation: "Warenausgang reduziert Bestand und erzeugt buchhalterische Effekte, etwa Material-/Kostenbuchungen.",
            solution: "Bestandsminderung im Lager und Buchung im Rechnungswesen; später kann die Fakturierung folgen.",
          },
        ],
      },
      systemauswahl: {
        nav: "Systemauswahl",
        title: "Nutzwertanalyse und Kriterien",
        copy: "Systemauswahl-Aufgaben prüfen, ob du Muss-, Soll- und Kann-Kriterien sowie Gewichtungen begründet einsetzen kannst.",
        learningGoals: ["Kriterienarten trennen", "Nutzwertanalyse lesen", "Projektentscheidungen begründen"],
        explanation: "Muss-Kriterien sind Ausschlusskriterien. Soll-Kriterien werden bewertet und gewichtet. Kann-Kriterien erhöhen den Nutzen, sind aber nicht entscheidend. Typischer Fehler: Ein verletztes Muss-Kriterium durch hohe Punktzahl ausgleichen wollen.",
        concepts: [
          ["Muss-Kriterium", "Nicht erfüllt bedeutet Ausschluss."],
          ["Soll-Kriterium", "Wird gewichtet bewertet."],
          ["Nutzwert", "Gewichtete Punktzahl für Entscheidungsvergleich."],
        ],
        visualization: {
          title: "Nutzwertmatrix",
          type: "table",
          headers: ["Kriterium", "Gewicht", "System A", "System B"],
          rows: [["DSGVO", "Muss", "ja", "nein"], ["Kosten", "30%", "4", "5"], ["Usability", "20%", "3", "4"]],
        },
        guidedTasks: [
          {
            type: "single",
            level: 2,
            title: "Muss-Kriterium",
            question: "Ein CRM-System erfüllt ein Muss-Kriterium nicht. Was folgt in einer sauberen Auswahl?",
            choices: ["Es wird ausgeschlossen.", "Es gewinnt bei gutem Preis trotzdem.", "Das Muss-Kriterium wird zu Kann.", "Es bekommt automatisch volle Punktzahl."],
            answer: "Es wird ausgeschlossen.",
            hint: "Muss heißt Ausschlussbedingung.",
            explanation: "Muss-Kriterien dürfen nicht durch andere Vorteile kompensiert werden.",
            solution: "Das System scheidet aus.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Kriterium formulieren",
            question: "Formuliere ein sinnvolles Muss-Kriterium für ein ERP-Cloud-Migrationsprojekt.",
            answer: ["datenschutz", "verfügbarkeit", "schnittstelle", "compliance"],
            hint: "Denke an harte Anforderungen, ohne die das Projekt nicht tragfähig ist.",
            explanation: "Gute Muss-Kriterien sind prüfbar und projektkritisch, etwa DSGVO-Konformität oder benötigte Schnittstellen.",
            solution: "Beispiel: Das System muss DSGVO-konform sein und die bestehende Finanzbuchhaltungsschnittstelle unterstützen.",
          },
        ],
      },
      processMining: {
        nav: "Process Mining",
        title: "Ereignislogs, Regeln und Flattening",
        copy: "Process Mining rekonstruiert und prüft Prozesse anhand von Ereignisdaten. Entscheidend sind Case-Begriff, Objektbezug und Ereignisreihenfolge.",
        learningGoals: ["Ereignislog lesen", "Regelverletzungen erkennen", "Flattening nach Objekttyp erklären"],
        explanation: "Klassisches Process Mining nutzt einen Case, etwa Bestellung. Objektzentriertes Process Mining betrachtet mehrere Objekte gleichzeitig, etwa Bestellung, Artikel und Paket. Flattening reduziert diese Sicht auf einen Objekttyp und kann Zusammenhänge verlieren.",
        concepts: [
          ["Event", "Aktivität mit Zeitstempel und Objektbezug."],
          ["Case", "Prozessinstanz, entlang der Ereignisse sortiert werden."],
          ["Flattening", "Objektzentriertes Log wird auf einen Case-Typ abgebildet."],
        ],
        visualization: {
          title: "Ereignislog-Timeline",
          type: "event-log",
          events: [
            ["10:00", "Bestellung angelegt", "Bestellung B1"],
            ["10:04", "Artikel hinzugefügt", "Artikel A1"],
            ["10:10", "Paket versendet", "Paket P1"],
            ["10:12", "Zahlung erhalten", "Bestellung B1"],
          ],
        },
        guidedTasks: [
          {
            type: "multi",
            level: 3,
            title: "Regelverletzung markieren",
            question: "Regel: Paket darf erst nach Bezahlung versendet werden. Welche Ereignisse sind problematisch?",
            choices: ["10:10 Paket versendet", "10:12 Zahlung erhalten", "10:04 Artikel hinzugefügt", "10:00 Bestellung angelegt"],
            answer: ["10:10 Paket versendet"],
            hint: "Vergleiche die Zeitpunkte von Versand und Zahlung.",
            explanation: "Das Paket wird um 10:10 versendet, die Zahlung kommt erst um 10:12. Der Versand verletzt die Regel.",
            solution: "Problematisch ist 10:10 Paket versendet.",
          },
        ],
        examTasks: [
          {
            type: "text",
            level: 4,
            title: "Objektzentrierung erklären",
            question: "Warum kann objektzentriertes Process Mining informativer sein als ein flach nach Bestellung erzeugtes Log?",
            answer: ["mehrere", "objekte", "beziehungen"],
            hint: "Denke an Bestellung, Artikel und Paket gleichzeitig.",
            explanation: "OCPM erhält Beziehungen zwischen mehreren Objekttypen. Flattening kann Ereignisse duplizieren oder Zusammenhänge verlieren.",
            solution: "OCPM betrachtet mehrere Objekttypen und ihre Beziehungen; ein flaches Case-Log kann diese Beziehungen verzerren.",
          },
        ],
      },
    },
  },
};

function mergeSubjectAreaEnhancements() {
  Object.entries(subjectAreaEnhancements).forEach(([areaKey, enhancement]) => {
    const current = subjectLearningAreas[areaKey] || { defaultTopic: enhancement.defaultTopic, topics: {} };
    subjectLearningAreas[areaKey] = {
      ...current,
      ...enhancement,
      topics: {
        ...current.topics,
        ...enhancement.topics,
      },
    };
  });
}

mergeSubjectAreaEnhancements();
normalizeProgrammingArea(subjectLearningAreas.programming, "de");
normalizeProgrammingArea(englishSubjectLearningAreas.programming, "en");
addAppliedSubjectTasks(subjectLearningAreas, "de");
addAppliedSubjectTasks(englishSubjectLearningAreas, "en");

function normalizeProgrammingArea(area, language) {
  if (!area?.topics) {
    return;
  }

  const isEn = language === "en";
  area.defaultTopic = "java";
  area.topics.java = isEn ? {
    nav: "Java",
    title: "Java: classes, references and UML to code",
    copy: "One Java module is enough: constructors, object state, inheritance, interfaces, references and UML translation belong together.",
    learningGoals: ["Write simple Java classes", "Explain references and aliasing", "Translate UML fragments into code"],
    explanation: "Java is strongly typed and object-oriented. A class defines fields and methods, a constructor initializes object state, and object variables store references. With a = b, Java copies the reference, not the object.",
    concepts: [
      ["Class", "Blueprint with fields, constructors and methods."],
      ["Constructor", "Has no return type and initializes a new object."],
      ["Reference", "Several variables can point to the same object."],
      ["Inheritance", "A subclass can reuse and override behavior."],
    ],
    visualization: {
      title: "Reference effect and class structure",
      type: "reference",
      before: ["Book b1 -> Book(\"Algo\")", "Book b2 -> Book(\"DB\")"],
      after: ["b1 = b2", "b1 -> Book(\"DB\")", "b2 -> Book(\"DB\")"],
    },
    guidedTasks: [
      {
        type: "multi",
        level: 2,
        title: "Understand constructors",
        snippet: asCode(["class Account {", "  private int balance;", "  Account(int start) {", "    balance = start;", "  }", "}"]),
        question: "Which statements are correct?",
        choices: ["Account(int start) is a constructor.", "The constructor has no return type.", "balance is local to the constructor.", "start initializes object state."],
        answer: ["Account(int start) is a constructor.", "The constructor has no return type.", "start initializes object state."],
        hint: "Look at the class name, missing return type and field access.",
        explanation: "balance is a field of the class. The constructor assigns the parameter start to that field.",
        solution: "Statements 1, 2 and 4 are correct.",
      },
      {
        type: "code",
        level: 3,
        title: "Complete a Java class",
        snippet: asCode(["class Book {", "  private String title;", "", "  // add constructor and getter", "}"]),
        question: "Write the missing constructor Book(String title) and a getTitle() method.",
        answer: ["book", "string", "title", "return"],
        hint: "The constructor stores the parameter in the field; the getter returns that field.",
        explanation: "A correct solution initializes the field in the constructor and returns it in the getter.",
        solution: asCode(["Book(String title) {", "  this.title = title;", "}", "String getTitle() {", "  return title;", "}"]),
      },
      {
        type: "single",
        level: 2,
        title: "Reference assignment",
        question: "What happens with a = b when a and b are object variables?",
        choices: ["a then refers to the same object as b.", "The object of b is fully copied.", "b then points to a.", "Both objects are deleted."],
        answer: "a then refers to the same object as b.",
        hint: "Object variables store references.",
        explanation: "The reference is copied, not the object. Afterwards both variables point to the same object.",
        solution: "After a = b, a and b refer to the same object.",
      },
    ],
    examTasks: [
      {
        type: "code",
        level: 4,
        title: "Translate UML to Java",
        question: "A UML class Book has title:String and getTitle():String. Write the core Java structure.",
        answer: ["class", "book", "string", "return"],
        hint: "Name class, field and method. Visibility can be simplified.",
        explanation: "The central building blocks are class declaration, String field and getter method.",
        solution: "class Book { private String title; String getTitle() { return title; } }",
      },
      {
        type: "text",
        level: 4,
        title: "Explain aliasing",
        snippet: asCode(["Box a = new Box(1);", "Box b = new Box(2);", "a = b;", "a.value = 7;", "System.out.println(b.value);"]),
        question: "Explain why the output is 7.",
        answer: ["same object", "reference", "a = b"],
        hint: "After a = b both variables refer to the same Box.",
        explanation: "a.value changes the object also referenced by b. Therefore b.value reads 7.",
        solution: "a = b copies the reference. Both variables point to the same object, so changing a.value changes what b.value reads.",
      },
    ],
  } : {
    nav: "Java",
    title: "Java: Klassen, Referenzen und UML in Code",
    copy: "Ein Java-Modul reicht: Konstruktoren, Objektzustand, Vererbung, Interfaces, Referenzen und UML-Übersetzung gehören zusammen.",
    learningGoals: ["Einfache Java-Klassen schreiben", "Referenzen und Alias-Effekte erklären", "UML-Fragmente in Code übersetzen"],
    explanation: "Java ist stark typisiert und objektorientiert. Eine Klasse beschreibt Felder und Methoden, ein Konstruktor initialisiert Objektzustand, und Objektvariablen speichern Referenzen. Bei a = b wird die Referenz kopiert, nicht das Objekt.",
    concepts: [
      ["Klasse", "Bauplan mit Feldern, Konstruktoren und Methoden."],
      ["Konstruktor", "Hat keinen Rückgabetyp und initialisiert ein neues Objekt."],
      ["Referenz", "Mehrere Variablen können auf dasselbe Objekt zeigen."],
      ["Vererbung", "Eine Unterklasse kann Verhalten übernehmen und überschreiben."],
    ],
    visualization: {
      title: "Referenzeffekt und Klassenstruktur",
      type: "reference",
      before: ["Buch b1 -> Buch(\"Algo\")", "Buch b2 -> Buch(\"DB\")"],
      after: ["b1 = b2", "b1 -> Buch(\"DB\")", "b2 -> Buch(\"DB\")"],
    },
    guidedTasks: [
      {
        type: "multi",
        level: 2,
        title: "Konstruktoren verstehen",
        snippet: asCode(["class Konto {", "  private int saldo;", "  Konto(int start) {", "    saldo = start;", "  }", "}"]),
        question: "Welche Aussagen sind korrekt?",
        choices: ["Konto(int start) ist ein Konstruktor.", "Der Konstruktor hat keinen Rückgabetyp.", "saldo ist lokal im Konstruktor.", "start initialisiert den Objektzustand."],
        answer: ["Konto(int start) ist ein Konstruktor.", "Der Konstruktor hat keinen Rückgabetyp.", "start initialisiert den Objektzustand."],
        hint: "Achte auf Klassennamen, fehlenden Rückgabetyp und Feldzugriff.",
        explanation: "saldo ist ein Feld der Klasse. Der Konstruktor weist dem Feld den Parameter start zu.",
        solution: "Korrekt sind 1, 2 und 4.",
      },
      {
        type: "code",
        level: 3,
        title: "Java-Klasse vervollständigen",
        snippet: asCode(["class Buch {", "  private String titel;", "", "  // Konstruktor und Getter ergänzen", "}"]),
        question: "Schreibe den fehlenden Konstruktor Buch(String titel) und eine getTitel()-Methode.",
        answer: ["buch", "string", "titel", "return"],
        hint: "Der Konstruktor speichert den Parameter im Feld; der Getter gibt das Feld zurück.",
        explanation: "Eine passende Lösung initialisiert das Feld im Konstruktor und gibt es im Getter zurück.",
        solution: asCode(["Buch(String titel) {", "  this.titel = titel;", "}", "String getTitel() {", "  return titel;", "}"]),
      },
      {
        type: "single",
        level: 2,
        title: "Referenzzuweisung",
        question: "Was passiert bei a = b, wenn a und b Objektvariablen sind?",
        choices: ["a zeigt danach auf dasselbe Objekt wie b.", "Das Objekt von b wird vollständig kopiert.", "b zeigt danach auf a.", "Beide Objekte werden gelöscht."],
        answer: "a zeigt danach auf dasselbe Objekt wie b.",
        hint: "Objektvariablen speichern Referenzen.",
        explanation: "Die Referenz wird kopiert, nicht das Objekt. Danach zeigen beide Variablen auf dasselbe Objekt.",
        solution: "Nach a = b zeigen a und b auf dasselbe Objekt.",
      },
    ],
    examTasks: [
      {
        type: "code",
        level: 4,
        title: "UML in Java übersetzen",
        question: "Eine UML-Klasse Buch hat titel:String und getTitel():String. Schreibe die zentrale Java-Struktur.",
        answer: ["class", "buch", "string", "return"],
        hint: "Nenne Klasse, Feld und Methode. Sichtbarkeit darf vereinfacht werden.",
        explanation: "Die zentralen Bausteine sind Klassendeklaration, String-Feld und Getter-Methode.",
        solution: "class Buch { private String titel; String getTitel() { return titel; } }",
      },
      {
        type: "text",
        level: 4,
        title: "Alias-Effekt erklären",
        snippet: asCode(["Box a = new Box(1);", "Box b = new Box(2);", "a = b;", "a.value = 7;", "System.out.println(b.value);"]),
        question: "Erkläre, warum die Ausgabe 7 ist.",
        answer: ["dasselbe objekt", "referenz", "a = b"],
        hint: "Nach a = b zeigen beide Variablen auf dieselbe Box.",
        explanation: "a.value verändert das Objekt, auf das auch b zeigt. Deshalb liest b.value den Wert 7.",
        solution: "a = b kopiert die Referenz. Beide Variablen zeigen auf dasselbe Objekt, daher verändert a.value auch den Wert, den b.value liest.",
      },
    ],
  };

  delete area.topics.javaOop;
  delete area.topics.javaReferences;
}

function addAppliedSubjectTasks(areaSet, language) {
  const isEn = language === "en";
  const programming = areaSet.programming?.topics || {};
  if (programming.python) {
    programming.python.guidedTasks = [
      ...(programming.python.guidedTasks || programming.python.questions || []),
      isEn ? {
        type: "code",
        level: 3,
        title: "Write a small function",
        question: "Write a Python function count_even(xs) that counts the even numbers in a list.",
        answer: ["def count_even", "for", "% 2", "return"],
        hint: "Loop over xs, test x % 2 == 0 and count matches.",
        explanation: "The task checks whether you can apply loops, conditions and a return value yourself.",
        solution: asCode(["def count_even(xs):", "    count = 0", "    for x in xs:", "        if x % 2 == 0:", "            count += 1", "    return count"]),
      } : {
        type: "code",
        level: 3,
        title: "Kleine Funktion schreiben",
        question: "Schreibe eine Python-Funktion count_even(xs), die die geraden Zahlen einer Liste zählt.",
        answer: ["def count_even", "for", "% 2", "return"],
        hint: "Gehe über xs, prüfe x % 2 == 0 und zähle Treffer.",
        explanation: "Die Aufgabe prüft, ob du Schleifen, Bedingungen und Rückgabewert selbst anwenden kannst.",
        solution: asCode(["def count_even(xs):", "    count = 0", "    for x in xs:", "        if x % 2 == 0:", "            count += 1", "    return count"]),
      },
    ];
  }

  const dataScience = areaSet.dataScience?.topics || {};
  if (dataScience.sql) {
    dataScience.sql.guidedTasks = [
      ...(dataScience.sql.guidedTasks || []),
      isEn ? {
        type: "code",
        level: 3,
        title: "Write a SQL query",
        question: "Write the core SQL query that returns customer_id and the number of orders per customer, but only for customers with more than two orders.",
        answer: ["SELECT customer_id", "COUNT", "GROUP BY customer_id", "HAVING"],
        hint: "Aggregate first with GROUP BY, then filter groups with HAVING.",
        explanation: "Conditions on aggregate values belong in HAVING because WHERE runs before grouping.",
        solution: "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > 2;",
      } : {
        type: "code",
        level: 3,
        title: "SQL-Abfrage schreiben",
        question: "Schreibe den Kern einer SQL-Abfrage, die pro Kunde customer_id und Anzahl der Bestellungen liefert, aber nur Kunden mit mehr als zwei Bestellungen zeigt.",
        answer: ["SELECT customer_id", "COUNT", "GROUP BY customer_id", "HAVING"],
        hint: "Aggregiere mit GROUP BY und filtere Gruppen danach mit HAVING.",
        explanation: "Bedingungen auf Aggregatwerte gehören in HAVING, weil WHERE vor der Gruppierung läuft.",
        solution: "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) > 2;",
      },
    ];
  }

  if (dataScience.normalformen) {
    dataScience.normalformen.guidedTasks = [
      ...(dataScience.normalformen.guidedTasks || []),
      isEn ? {
        type: "text",
        level: 3,
        title: "Decompose a relation",
        question: "Relation Order(orderId, customerId, customerName) has orderId -> customerId and customerId -> customerName. Propose a 3NF decomposition.",
        answer: ["order", "customer", "customerId"],
        hint: "Move the transitive customer data into a separate customer relation.",
        explanation: "customerName depends on customerId, not directly on the order as a fact about the order.",
        solution: "Order(orderId, customerId) and Customer(customerId, customerName).",
      } : {
        type: "text",
        level: 3,
        title: "Relation zerlegen",
        question: "Relation Bestellung(bestellId, kundenId, kundenName) hat bestellId -> kundenId und kundenId -> kundenName. Schlage eine 3NF-Zerlegung vor.",
        answer: ["bestellung", "kunde", "kundenId"],
        hint: "Lagere die transitiven Kundendaten in eine eigene Kundenrelation aus.",
        explanation: "kundenName hängt von kundenId ab und nicht als direkte Eigenschaft von der Bestellung.",
        solution: "Bestellung(bestellId, kundenId) und Kunde(kundenId, kundenName).",
      },
    ];
  }

  const basics = areaSet.basics?.topics || {};
  if (basics.boolean) {
    basics.boolean.guidedTasks = [
      ...(basics.boolean.guidedTasks || []),
      isEn ? {
        type: "text",
        level: 3,
        title: "Build a truth-table row",
        question: "Evaluate (A AND NOT B) for A=true and B=false and justify the result.",
        answer: ["true", "not b", "and"],
        hint: "First evaluate NOT B, then combine with A.",
        explanation: "B=false makes NOT B=true. true AND true is true.",
        solution: "NOT B = true, so A AND NOT B = true AND true = true.",
      } : {
        type: "text",
        level: 3,
        title: "Wahrheitstabellen-Zeile bilden",
        question: "Werte (A UND NICHT B) für A=wahr und B=falsch aus und begründe das Ergebnis.",
        answer: ["wahr", "nicht b", "und"],
        hint: "Werte zuerst NICHT B aus und verknüpfe dann mit A.",
        explanation: "B=falsch macht NICHT B=wahr. wahr UND wahr ergibt wahr.",
        solution: "NICHT B = wahr, also A UND NICHT B = wahr UND wahr = wahr.",
      },
    ];
  }

  const information = areaSet.informationManagement?.topics || {};
  if (information.processMining) {
    information.processMining.guidedTasks = [
      ...(information.processMining.guidedTasks || []),
      isEn ? {
        type: "text",
        level: 3,
        title: "Flatten an event log",
        question: "Flatten an object-centric log by order. Which events should belong to order B1 if payment and shipment reference B1?",
        answer: ["payment", "shipment", "B1"],
        hint: "Keep all events connected to the selected order case.",
        explanation: "Flattening by order uses the order as case and attaches related events to that case.",
        solution: "The B1 case contains the order events plus payment and shipment events that reference B1.",
      } : {
        type: "text",
        level: 3,
        title: "Ereignislog flatten",
        question: "Flattene ein objektzentriertes Log nach Bestellung. Welche Ereignisse gehören zum Case B1, wenn Zahlung und Versand auf B1 verweisen?",
        answer: ["zahlung", "versand", "B1"],
        hint: "Behalte alle Ereignisse, die mit dem ausgewählten Bestell-Case verbunden sind.",
        explanation: "Flattening nach Bestellung nutzt die Bestellung als Case und hängt die verbundenen Ereignisse an diesen Case.",
        solution: "Zum Case B1 gehören die Bestellereignisse sowie Zahlungs- und Versandereignisse, die auf B1 verweisen.",
      },
    ];
  }
}

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
    a: 8,
    b: 2,
    c: 3,
    d: 2,
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
    a: 2,
    b: 2,
    c: 5,
    d: 1,
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
    a: 2,
    b: 2,
    c: 4,
    d: 2,
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
    formula: 'T(n) = <span class="math-token math-token-a">a</span>T(<span class="frac"><span>n</span><span class="math-token math-token-b">b</span></span>) + <span class="math-token math-token-c">c</span> · n<sup><span class="math-token math-token-d">d</span></sup>',
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

const globalSearchCatalog = [
  { title: "Startseite", path: ["InfoTrain"], view: "home", icon: "⌂", keywords: "home übersicht" },
  { title: "Lernpfad", path: ["InfoTrain"], view: "learning-path", icon: "↗", keywords: "fortschritt krugo zug" },
  { title: "Informatik-Grundlagen", path: ["Fachbereiche"], view: "basics", icon: "01", keywords: "eva daten information bits binär hardware software netzwerk sicherheit" },
  { title: "Programmieren", path: ["Fachbereiche"], view: "programming", icon: "02", keywords: "python java c++ html code" },
  { title: "Algorithmik", path: ["Fachbereiche"], view: "algorithmics", icon: "03", keywords: "algorithmen training" },
  { title: "Data Science", path: ["Fachbereiche"], view: "data-science", icon: "04", keywords: "mysql pyspark daten analyse" },
  { title: "Informationsmanagement", path: ["Fachbereiche"], view: "information-management", icon: "05", keywords: "erp geschäftsprozesse process mining" },
  { title: "Laufzeiten", path: ["Algorithmik"], view: "runtime", icon: "O", keywords: "komplexität asymptotisch big o rekursion" },
  { title: "Master-Theorem", path: ["Algorithmik"], view: "master", icon: "M", keywords: "rekurrenz divide conquer substitution" },
  { title: "Sortierverfahren", path: ["Algorithmik"], view: "sorting", icon: "↕", keywords: "mergesort heapsort selectionsort topologisch" },
  { title: "Suchverfahren", path: ["Algorithmik"], view: "search", icon: "⌕", keywords: "linear binär interpolation hash" },
  { title: "Datenstrukturen", path: ["Algorithmik"], view: "avl", icon: "◇", keywords: "listen bäume graphen hashmaps stacks queues heaps" },
  { title: "AVL-Bäume", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "AVL-Bäume", icon: "A", keywords: "rotation balance baum" },
  { title: "Binärbäume", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Binärbäume", icon: "B", keywords: "baum traversal" },
  { title: "Splaybäume", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Splaybäume", icon: "S", keywords: "baum rotation" },
  { title: "Listen", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Listen", icon: "L", keywords: "verkettet linked list" },
  { title: "Wörterbücher", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Wörterbücher", icon: "W", keywords: "dictionary schlüssel wert" },
  { title: "Hashmaps", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Hashmaps", icon: "#", keywords: "hashing hash suche" },
  { title: "Graphen", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Graphen", icon: "G", keywords: "breitensuche tiefensuche dijkstra floyd backtracking" },
  { title: "Heaps", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Heaps", icon: "H", keywords: "min heap max heap priorität" },
  { title: "Stacks & Queues", path: ["Algorithmik", "Datenstrukturen"], view: "avl", topic: "Stacks & Queues", icon: "⇅", keywords: "stapel warteschlange lifo fifo" },
];

const state = {
  currentView: "home",
  runtimeQuestion: null,
  basicsTopic: subjectLearningAreas.basics.defaultTopic,
  basicsMode: "learn",
  basicsQuestion: null,
  programmingTopic: subjectLearningAreas.programming.defaultTopic,
  programmingMode: "learn",
  programmingQuestion: null,
  dataScienceTopic: subjectLearningAreas.dataScience.defaultTopic,
  dataScienceMode: "learn",
  dataScienceQuestion: null,
  informationManagementTopic: subjectLearningAreas.informationManagement.defaultTopic,
  informationManagementMode: "learn",
  informationManagementQuestion: null,
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
  basicsLessons: null,
  basicsLessonIndex: 0,
  krugoWelcomeShown: false,
};

const el = {
  globalSearch: document.getElementById("global-search"),
  globalSearchToggle: document.getElementById("global-search-toggle"),
  globalSearchPanel: document.getElementById("global-search-panel"),
  globalSearchInput: document.getElementById("global-search-input"),
  globalSearchResults: document.getElementById("global-search-results"),
  menuToggle: document.getElementById("menu-toggle"),
  menuOverlay: document.getElementById("menu-overlay"),
  settingsMenu: document.getElementById("settings-menu"),
  themeToggle: document.getElementById("theme-toggle"),
  darkmodeSetting: document.getElementById("darkmode-setting"),
  languageSetting: document.getElementById("language-setting"),
  languageOptions: document.getElementById("language-options"),
  currentLanguageLabel: document.getElementById("current-language-label"),
  languageButtons: [...document.querySelectorAll("[data-language]")],
  krugoWelcome: document.getElementById("krugo-welcome"),
  krugoStart: document.getElementById("krugo-start"),
  krugoLater: document.getElementById("krugo-later"),
  worldBoarding: document.getElementById("world-boarding"),
  boardInfoTrain: document.getElementById("board-infotrain"),
  homeTitle: document.querySelector(".home-title"),
  logoTrain: document.querySelector(".logo-train"),
  moduleTiles: [...document.querySelectorAll(".module-tile")],
  pathAvatar: document.getElementById("path-avatar"),
  pathSteps: [...document.querySelectorAll("[data-path-step]")],
  pathPreview: document.getElementById("preview-learning-path"),
  learningDesk: document.getElementById("learning-desk"),
  learningRoute: document.getElementById("learning-route"),
  learningRouteTitle: document.getElementById("learning-route-title"),
  backToLearningDesk: document.getElementById("back-to-learning-desk"),
  learningPointsToggle: document.getElementById("learning-points-toggle"),
  learningPointsPanel: document.getElementById("learning-points-panel"),
  learningPointsValue: document.getElementById("learning-points-value"),
  learningUnlockedValue: document.getElementById("learning-unlocked-value"),
  basicsStory: document.getElementById("basics-story"),
  basicsStoryTitle: document.getElementById("basics-story-title"),
  basicsStoryProgress: document.getElementById("basics-story-progress"),
  basicsStoryContent: document.getElementById("basics-story-content"),
  basicsStoryPrev: document.getElementById("basics-story-prev"),
  basicsStoryNext: document.getElementById("basics-story-next"),
  basicsStoryClose: document.getElementById("basics-story-close"),
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
  informationManagementView: document.getElementById("information-management-view"),
  runtimeView: document.getElementById("runtime-view"),
  masterView: document.getElementById("master-view"),
  sortingView: document.getElementById("sorting-view"),
  searchView: document.getElementById("search-view"),
  avlView: document.getElementById("avl-view"),
  runtimeTitle: document.getElementById("runtime-title"),
  runtimeSnippet: document.getElementById("runtime-snippet"),
  runtimeOptions: document.getElementById("runtime-options"),
  runtimeFeedback: document.getElementById("runtime-feedback"),
  basicsTopicNav: document.getElementById("basics-topic-nav"),
  basicsModeNav: document.getElementById("basics-mode-nav"),
  basicsTopicTitle: document.getElementById("basics-topic-title"),
  basicsTopicCopy: document.getElementById("basics-topic-copy"),
  basicsLearningGoals: document.getElementById("basics-learning-goals"),
  basicsExplanation: document.getElementById("basics-explanation"),
  basicsConcepts: document.getElementById("basics-concepts"),
  basicsVisualTitle: document.getElementById("basics-visual-title"),
  basicsVisual: document.getElementById("basics-visual"),
  basicsTaskMeta: document.getElementById("basics-task-meta"),
  basicsQuestionTitle: document.getElementById("basics-question-title"),
  basicsQuestion: document.getElementById("basics-question"),
  basicsOptions: document.getElementById("basics-options"),
  basicsHint: document.getElementById("basics-hint"),
  basicsFeedback: document.getElementById("basics-feedback"),
  basicsSolution: document.getElementById("basics-solution"),
  programmingTopicNav: document.getElementById("programming-topic-nav"),
  programmingModeNav: document.getElementById("programming-mode-nav"),
  programmingTopicTitle: document.getElementById("programming-topic-title"),
  programmingTopicCopy: document.getElementById("programming-topic-copy"),
  programmingLearningGoals: document.getElementById("programming-learning-goals"),
  programmingExplanation: document.getElementById("programming-explanation"),
  programmingConcepts: document.getElementById("programming-concepts"),
  programmingVisualTitle: document.getElementById("programming-visual-title"),
  programmingVisual: document.getElementById("programming-visual"),
  programmingTaskMeta: document.getElementById("programming-task-meta"),
  programmingQuestionTitle: document.getElementById("programming-question-title"),
  programmingSnippet: document.getElementById("programming-snippet"),
  programmingQuestion: document.getElementById("programming-question"),
  programmingOptions: document.getElementById("programming-options"),
  programmingHint: document.getElementById("programming-hint"),
  programmingFeedback: document.getElementById("programming-feedback"),
  programmingSolution: document.getElementById("programming-solution"),
  dataScienceTopicNav: document.getElementById("data-science-topic-nav"),
  dataScienceModeNav: document.getElementById("data-science-mode-nav"),
  dataScienceTopicTitle: document.getElementById("data-science-topic-title"),
  dataScienceTopicCopy: document.getElementById("data-science-topic-copy"),
  dataScienceLearningGoals: document.getElementById("data-science-learning-goals"),
  dataScienceExplanation: document.getElementById("data-science-explanation"),
  dataScienceConcepts: document.getElementById("data-science-concepts"),
  dataScienceVisualTitle: document.getElementById("data-science-visual-title"),
  dataScienceVisual: document.getElementById("data-science-visual"),
  dataScienceTaskMeta: document.getElementById("data-science-task-meta"),
  dataScienceQuestionTitle: document.getElementById("data-science-question-title"),
  dataScienceSnippet: document.getElementById("data-science-snippet"),
  dataScienceQuestion: document.getElementById("data-science-question"),
  dataScienceOptions: document.getElementById("data-science-options"),
  dataScienceHint: document.getElementById("data-science-hint"),
  dataScienceFeedback: document.getElementById("data-science-feedback"),
  dataScienceSolution: document.getElementById("data-science-solution"),
  informationManagementTopicNav: document.getElementById("information-management-topic-nav"),
  informationManagementModeNav: document.getElementById("information-management-mode-nav"),
  informationManagementTopicTitle: document.getElementById("information-management-topic-title"),
  informationManagementTopicCopy: document.getElementById("information-management-topic-copy"),
  informationManagementLearningGoals: document.getElementById("information-management-learning-goals"),
  informationManagementExplanation: document.getElementById("information-management-explanation"),
  informationManagementConcepts: document.getElementById("information-management-concepts"),
  informationManagementVisualTitle: document.getElementById("information-management-visual-title"),
  informationManagementVisual: document.getElementById("information-management-visual"),
  informationManagementTaskMeta: document.getElementById("information-management-task-meta"),
  informationManagementQuestionTitle: document.getElementById("information-management-question-title"),
  informationManagementSnippet: document.getElementById("information-management-snippet"),
  informationManagementQuestion: document.getElementById("information-management-question"),
  informationManagementOptions: document.getElementById("information-management-options"),
  informationManagementHint: document.getElementById("information-management-hint"),
  informationManagementFeedback: document.getElementById("information-management-feedback"),
  informationManagementSolution: document.getElementById("information-management-solution"),
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
updateLanguageMenu(initializeLanguage());
initializeKrugoWelcome();
renderGlobalSearchResults("");
el.globalSearchToggle.addEventListener("click", () => {
  const isOpen = el.globalSearchToggle.getAttribute("aria-expanded") === "true";
  isOpen ? closeGlobalSearch() : openGlobalSearch();
});
el.globalSearchInput.addEventListener("input", () => renderGlobalSearchResults(el.globalSearchInput.value));
el.globalSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    el.globalSearchResults.querySelector("button")?.click();
  }
});
el.menuToggle.addEventListener("click", () => {
  const isOpen = el.menuToggle.getAttribute("aria-expanded") === "true";
  closeGlobalSearch();
  isOpen ? closeSettingsMenu() : openSettingsMenu();
});
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
el.languageSetting.addEventListener("click", () => {
  const isOpen = el.languageSetting.getAttribute("aria-expanded") === "true";
  el.languageSetting.setAttribute("aria-expanded", String(!isOpen));
  el.languageOptions.classList.toggle("is-hidden", isOpen);
});
el.languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = applyLanguage(button.dataset.language);
    updateLanguageMenu(language);
  });
});
el.krugoStart.addEventListener("click", beginKrugoJourney);
el.krugoLater.addEventListener("click", () => dismissKrugoWelcome(true));
el.boardInfoTrain.addEventListener("click", boardInfoTrain);
el.basicsStoryPrev.addEventListener("click", () => changeBasicsStory(-1));
el.basicsStoryNext.addEventListener("click", () => changeBasicsStory(1));
el.basicsStoryClose.addEventListener("click", closeBasicsStory);
window.addEventListener("infotrain:languagechange", (event) => {
  updateLanguageMenu(event.detail.language);
  el.learningRouteTitle.textContent = translatedLearningTopic(state.learningTopic);
  renderLearningPathState();
  syncLocalizedContent();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!el.krugoWelcome.classList.contains("is-hidden")) {
      dismissKrugoWelcome();
      return;
    }
    if (el.globalSearchToggle.getAttribute("aria-expanded") === "true") {
      closeGlobalSearch();
      el.globalSearchToggle.focus();
      return;
    }
    closeSettingsMenu();
  }
});
document.addEventListener("pointerdown", (event) => {
  if (!el.globalSearch.contains(event.target)) {
    closeGlobalSearch();
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
el.backToLearningDesk.addEventListener("click", resetLearningDesk);
el.learningPointsToggle.addEventListener("click", () => {
  const expanded = el.learningPointsToggle.getAttribute("aria-expanded") === "true";
  el.learningPointsToggle.setAttribute("aria-expanded", String(!expanded));
  el.learningPointsPanel.classList.toggle("is-hidden", expanded);
});
document.getElementById("new-runtime").addEventListener("click", createRuntimeQuestion);
document.getElementById("check-runtime").addEventListener("click", checkRuntimeQuestion);
setupSubjectLearningArea("basics");
setupSubjectLearningArea("programming");
setupSubjectLearningArea("dataScience");
setupSubjectLearningArea("informationManagement");
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
bindDelegatedPress(document.querySelector("[data-master-learn-options]"), "[data-master-learn-case]", (button) => {
  setMasterChoice(el.masterLearnCase, "[data-master-learn-case]", button.dataset.masterLearnCase);
  state.masterLearnLesson = 0;
  state.masterLearnStep = 0;
  renderMasterLearning();
});
bindDelegatedPress(document.querySelector("[data-master-training-options]"), "[data-master-training-topic]", (button) => {
  setMasterTrainingTopic(button.dataset.masterTrainingTopic);
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
renderSubjectLearningArea("basics");
renderSubjectLearningArea("programming");
renderSubjectLearningArea("dataScience");
renderSubjectLearningArea("informationManagement");
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
syncLocalizedContent();
setActiveView("home");

function normalizeSearchText(value) {
  return value
    .toLocaleLowerCase("de")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function openGlobalSearch() {
  closeSettingsMenu();
  el.globalSearchToggle.setAttribute("aria-expanded", "true");
  el.globalSearch.classList.add("is-open");
  el.globalSearchPanel.classList.remove("is-hidden");
  renderGlobalSearchResults(el.globalSearchInput.value);
  window.requestAnimationFrame(() => el.globalSearchInput.focus());
}

function closeGlobalSearch() {
  el.globalSearchToggle.setAttribute("aria-expanded", "false");
  el.globalSearch.classList.remove("is-open");
  el.globalSearchPanel.classList.add("is-hidden");
}

function renderGlobalSearchResults(query) {
  const normalizedQuery = normalizeSearchText(query.trim());
  const terms = normalizedQuery.split(/\s+/).filter(Boolean);
  const matches = globalSearchCatalog
    .filter((item) => {
      if (!terms.length) {
        return ["home", "learning-path", "basics", "programming", "algorithmics", "data-science"].includes(item.view);
      }
      const haystack = normalizeSearchText([
        item.title,
        item.path.join(" "),
        item.keywords,
      ].join(" "));
      return terms.every((term) => haystack.includes(term));
    })
    .slice(0, 8);

  el.globalSearchResults.replaceChildren();
  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "global-search-empty";
    empty.textContent = "Keine passenden Inhalte gefunden.";
    el.globalSearchResults.append(empty);
    return;
  }

  matches.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "option");
    button.className = "global-search-result";

    const icon = document.createElement("span");
    icon.className = "global-search-result-icon";
    icon.textContent = item.icon;

    const text = document.createElement("span");
    text.className = "global-search-result-text";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const chain = document.createElement("small");
    chain.textContent = [...item.path, item.title].join(" › ");
    text.append(title, chain);

    const arrow = document.createElement("span");
    arrow.className = "global-search-result-arrow";
    arrow.textContent = "›";
    arrow.setAttribute("aria-hidden", "true");

    button.append(icon, text, arrow);
    button.addEventListener("click", () => navigateToSearchResult(item));
    el.globalSearchResults.append(button);
  });
}

function navigateToSearchResult(item) {
  closeGlobalSearch();
  el.globalSearchInput.value = "";
  setActiveView(item.view);
  if (item.topic) {
    setDataStructureSection("structures");
    setDataStructureTopic(item.topic);
  }
}

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
    "information-management": el.informationManagementView,
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
  const subjectViewMap = {
    basics: "basics",
    programming: "programming",
    "data-science": "dataScience",
    "information-management": "informationManagement",
  };
  if (subjectViewMap[viewName]) {
    renderSubjectLearningArea(subjectViewMap[viewName]);
  }
  if (viewName === "master") {
    setMasterSection(state.masterSection);
    syncMasterTrainingTopic();
    if (!state.masterQuestion) {
      createMasterQuestion();
    }
  }
  if (viewName === "avl") {
    setDataStructureSection(state.dataStructureSection);
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
  el.settingsMenu.querySelector(".settings-item")?.focus();
}

function closeSettingsMenu() {
  el.menuToggle.classList.remove("is-open");
  el.menuToggle.setAttribute("aria-expanded", "false");
  el.settingsMenu.classList.remove("is-open");
  el.settingsMenu.setAttribute("aria-hidden", "true");
  el.menuOverlay.classList.add("is-hidden");
  el.languageSetting.setAttribute("aria-expanded", "false");
  el.languageOptions.classList.add("is-hidden");
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

function updateLanguageMenu(language) {
  el.currentLanguageLabel.textContent = languageNames[language];
  el.languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function initializeKrugoWelcome() {
  if (state.krugoWelcomeShown) {
    return;
  }
  state.krugoWelcomeShown = true;

  window.setTimeout(() => {
    el.krugoWelcome.classList.remove("is-hidden");
    document.body.classList.add("krugo-is-speaking");
    el.krugoStart.focus();
  }, 650);
}

function dismissKrugoWelcome() {
  el.krugoWelcome.classList.add("is-leaving");
  document.body.classList.remove("krugo-is-speaking");
  window.setTimeout(() => {
    el.krugoWelcome.classList.add("is-hidden");
    el.krugoWelcome.classList.remove("is-leaving");
  }, 420);
}

function beginKrugoJourney() {
  dismissKrugoWelcome(true);
  window.setTimeout(() => {
    state.learningTopic = "Informatik-Grundlagen";
    el.learningRouteTitle.textContent = translatedLearningTopic(state.learningTopic);
    setActiveView("learning-path");
    window.setTimeout(() => el.boardInfoTrain.focus(), 450);
  }, 430);
}

function boardInfoTrain() {
  state.learningTopic = "Informatik-Grundlagen";
  el.learningRouteTitle.textContent = translatedLearningTopic(state.learningTopic);
  el.worldBoarding.classList.add("is-departing");
  el.boardInfoTrain.disabled = true;
  window.setTimeout(() => {
    el.learningDesk.classList.add("is-hidden");
    el.learningRoute.classList.remove("is-hidden");
    el.worldBoarding.classList.add("is-hidden");
    el.worldBoarding.classList.remove("is-departing");
    el.learningPointsPanel.classList.add("is-hidden");
    el.learningPointsToggle.setAttribute("aria-expanded", "false");
    renderLearningPathState();
    state.pathDemoIndex = state.learningTopic === "Algorithmik"
      ? Math.max(0, state.learningUnlocked - 1)
      : 0;
    window.requestAnimationFrame(() => movePathAvatar(state.pathDemoIndex, true));
    if (state.learningTopic === "Informatik-Grundlagen") {
      openBasicsStory();
    }
  }, 1600);
}

async function openBasicsStory() {
  el.basicsStory.classList.remove("is-hidden");
  if (!state.basicsLessons) {
    try {
      const response = await fetch("content/grundlagen-lernreise.md?v=20260703");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      state.basicsLessons = parseBasicsJourney(await response.text());
    } catch {
      el.basicsStoryContent.textContent = "Die Grundlagen-Lektionen konnten nicht geladen werden.";
      return;
    }
  }
  state.basicsLessonIndex ??= 0;
  renderBasicsStory();
}

function parseBasicsJourney(markdown) {
  return markdown
    .split(/\n---\n/)
    .filter((block) => block.includes("## Station"))
    .map((block) => {
      const title = block.match(/^##\s+(.+)$/m)?.[1] || "Grundlagen";
      const sections = {};
      const sectionPattern = /\*\*(Krugo|InfoTrain-Beispiel|Übergang|Abschluss):\*\*\s*\n([\s\S]*?)(?=\n\*\*|\s*$)/g;
      for (const match of block.matchAll(sectionPattern)) {
        sections[match[1]] = match[2].trim().split(/\n\s*\n/).map((paragraph) => paragraph.replace(/\n/g, " "));
      }
      return { title, sections };
    });
}

function renderBasicsStory() {
  const lesson = state.basicsLessons?.[state.basicsLessonIndex];
  if (!lesson) {
    return;
  }
  el.basicsStoryProgress.textContent = `Station ${state.basicsLessonIndex + 1} von ${state.basicsLessons.length}`;
  el.basicsStoryTitle.textContent = lesson.title.replace(/^Station \d+:\s*/, "");
  el.basicsStoryContent.replaceChildren();

  appendStorySection("Krugo", lesson.sections.Krugo);
  appendStorySection("InfoTrain-Beispiel", lesson.sections["InfoTrain-Beispiel"]);
  appendStorySection("Weiterfahrt", lesson.sections.Übergang || lesson.sections.Abschluss);

  el.basicsStoryPrev.disabled = state.basicsLessonIndex === 0;
  el.basicsStoryNext.disabled = state.basicsLessonIndex === state.basicsLessons.length - 1;
  el.basicsStoryContent.scrollTop = 0;
}

function appendStorySection(label, paragraphs) {
  if (!paragraphs?.length) {
    return;
  }
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = label;
  section.append(heading);
  paragraphs.forEach((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    section.append(paragraph);
  });
  el.basicsStoryContent.append(section);
}

function changeBasicsStory(direction) {
  state.basicsLessonIndex = Math.min(
    state.basicsLessons.length - 1,
    Math.max(0, state.basicsLessonIndex + direction),
  );
  renderBasicsStory();
}

function closeBasicsStory() {
  el.basicsStory.classList.add("is-hidden");
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

function resetLearningDesk() {
  window.clearTimeout(state.learningBookTimer);
  stopLearningPathPreview();
  el.learningRoute.classList.add("is-hidden");
  el.learningPointsPanel.classList.add("is-hidden");
  el.learningPointsToggle.setAttribute("aria-expanded", "false");
  closeCheckpointTask();
  closeBasicsStory();
  el.learningDesk.classList.remove("is-hidden", "is-zooming");
  el.learningDesk.classList.add("is-boarding");
  el.learningDesk.classList.remove("world-has-arrived");
  el.worldBoarding.classList.remove("is-hidden");
  el.worldBoarding.classList.remove("is-departing");
  el.boardInfoTrain.disabled = false;
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
  const unlocked = algorithmicsActive ? state.learningUnlocked : 1;
  const points = algorithmicsActive ? state.learningPoints : 0;

  el.learningPointsValue.textContent = String(points);
  el.learningUnlockedValue.textContent = `${unlocked} / ${el.pathSteps.length}`;
  el.learningPointsToggle.textContent = t("learning.pointsButton", { points });
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
    button.setAttribute("aria-label", isUnlocked
      ? t("learning.checkpoint", { number })
      : t("learning.checkpointLocked", { number }));
    status.textContent = isUnlocked
      ? (number === 1 && unlocked === 1 ? t("learning.free") : t("learning.unlocked"))
      : t("learning.locked");
    const title = step.querySelector("h2");
    if (number > 1 && number < el.pathSteps.length) {
      title.textContent = t("learning.lesson", { number });
    }
  });
}

function translatedLearningTopic(topic) {
  const keys = {
    Algorithmik: "topics.algorithmics",
    "Informatik-Grundlagen": "topics.basics",
    Programmieren: "topics.programming",
    "Data Science": "topics.dataScience",
  };
  return t(keys[topic] || "topics.algorithmics");
}

function openCheckpoint(number) {
  if (state.learningTopic === "Informatik-Grundlagen") {
    state.basicsLessonIndex = Math.max(0, number - 1);
    openBasicsStory();
    return;
  }
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

const staticEnglishText = new Map([
  ["Zurück zur Startseite", "Back to home"],
  ["Zurück zu Algorithmik", "Back to Algorithms"],
  ["Fachbereich", "Subject area"],
  ["Modul 1", "Module 1"],
  ["Modul 2", "Module 2"],
  ["Modul 3", "Module 3"],
  ["Modul 4", "Module 4"],
  ["Algorithmik", "Algorithms"],
  ["Informatik-Grundlagen", "Computer Science Basics"],
  ["Programmieren", "Programming"],
  ["Informationsmanagement", "Information Management"],
  ["Data Science & Datenbanken", "Data Science & Databases"],
  ["Wähle ein Thema und starte direkt mit dem Training.", "Choose a topic and start practicing right away."],
  ["Baue ein Gefühl für die Informatik auf: Begriffe, Modelle und Denkweisen, bevor es tief in einzelne Werkzeuge geht.", "Build intuition for computer science: terms, models and ways of thinking before going deep into individual tools."],
  ["Lies Code bewusst, erkenne Sprachunterschiede und trainiere Konzepte, die in Python, Java, C++, HTML und JavaScript wiederkehren.", "Read code deliberately, recognize language differences and practice concepts shared by Python, Java, C++, HTML and JavaScript."],
  ["Übe Datenfragen praktisch: Tabellen, SQL, Normalformen, ER-Modelle und PySpark schrittweise verstehen.", "Practice data questions hands-on: understand tables, SQL, normal forms, ER models and PySpark step by step."],
  ["Verstehe Informationsbedarf, ERP-Prozesse, Projektlogik und Process Mining anhand klausurnaher Fälle.", "Understand information needs, ERP processes, project logic and process mining through exam-oriented cases."],
  ["Orientierung", "Orientation"],
  ["Visualisierung", "Visualization"],
  ["Geführte Übung", "Guided practice"],
  ["Klausuraufgabe", "Exam task"],
  ["Neue Aufgabe", "New task"],
  ["Neue Frage", "New question"],
  ["Hinweis anzeigen", "Show hint"],
  ["Antwort prüfen", "Check answer"],
  ["Musterlösung", "Model solution"],
  ["Laufzeiten", "Runtime complexity"],
  ["Master Theorem", "Master Theorem"],
  ["Sortierverfahren", "Sorting algorithms"],
  ["Suchverfahren", "Search algorithms"],
  ["Datenstrukturen", "Data structures"],
  ["Rekursive Python-Schnipsel lesen und die asymptotische Laufzeit einschätzen.", "Read recursive Python snippets and estimate their asymptotic runtime."],
  ["Verfahren erkennen, Fälle bestimmen und Rekurrenzen mit der passenden Methode lösen.", "Recognize methods, determine cases and solve recurrences with the right technique."],
  ["Heapsort, Mergesort, Selectionsort und weitere Verfahren visuell Schritt für Schritt verstehen.", "Understand heapsort, mergesort, selection sort and other algorithms visually step by step."],
  ["Lineare, binäre und Interpolationssuche visuell vergleichen und verstehen.", "Compare and understand linear, binary and interpolation search visually."],
  ["Listen, Graphen, Hashmaps, Binär-, Splay- und AVL-Bäume gezielt trainieren.", "Practice lists, graphs, hash maps, binary, splay and AVL trees deliberately."],
  ["Training starten →", "Start training →"],
  ["Visualisierung starten →", "Start visualization →"],
  ["Rekursion und Laufzeiten", "Recursion and runtime complexity"],
  ["Code-Schnipsel analysieren", "Analyze code snippet"],
  ["Lies den Python-Schnipsel und wähle die asymptotische Laufzeit.", "Read the Python snippet and choose the asymptotic runtime."],
  ["Schritt-für-Schritt-Erklärung", "Step-by-step explanation"],
  ["Anwendungsübungen", "Application practice"],
  ["Erklärmodus", "Explanation mode"],
  ["Methode auswählen", "Choose method"],
  ["Beispiel auswählen", "Choose example"],
  ["Vorheriger Schritt", "Previous step"],
  ["Nächster Schritt", "Next step"],
  ["Hilfestellung anzeigen", "Show help"],
  ["Hilfestellung ausblenden", "Hide help"],
  ["Rekurrenz selbst lösen", "Solve your own recurrence"],
  ["Lösen", "Solve"],
  ["Algorithmus verstehen", "Understand the algorithm"],
  ["Wähle ein Verfahren und gehe die Schritte manuell oder automatisch durch.", "Choose an algorithm and walk through the steps manually or automatically."],
  ["Verfahren", "Algorithm"],
  ["Neue Werte", "New values"],
  ["Ein Schritt zurück", "One step back"],
  ["Abspielen", "Play"],
  ["Ein Schritt weiter", "One step forward"],
  ["Aktuellen Schritt genauer erklären", "Explain the current step"],
  ["Abfrage", "Quiz"],
  ["Laufzeiten trainieren", "Practice runtimes"],
  ["Suchalgorithmen", "Search algorithms"],
  ["Suchen", "Search"],
  ["Wert im Array finden", "Find a value in the array"],
  ["Zielwert", "Target value"],
  ["Datenstruktur-Modus", "Data-structure mode"],
  ["Datenstruktur-Training", "Data-structure training"],
  ["Grundlagen", "Basics"],
  ["Szenario", "Scenario"],
  ["Frage", "Question"],
  ["Neue Aufgabe", "New task"],
  ["Binäre Suchbäume", "Binary search trees"],
  ["Zurücksetzen", "Reset"],
  ["Wert", "Value"],
  ["Einfügen", "Insert"],
  ["Prinzip genauer erklären", "Explain the principle"],
  ["Graphalgorithmen", "Graph algorithms"],
  ["Graphen Schritt für Schritt", "Graphs step by step"],
  ["Nächster Schritt", "Next step"],
  ["Prioritätsstruktur", "Priority structure"],
  ["Min-Heap und Max-Heap", "Min-heap and max-heap"],
  ["Heap-Typ", "Heap type"],
  ["Wurzel entfernen", "Remove root"],
  ["AVL-Rotationen", "AVL rotations"],
  ["Hilfe anzeigen", "Show help"],
  ["Hilfe / Vorschau", "Help / preview"],
  ["Vor der Rotation", "Before rotation"],
  ["Rotation anwenden", "Apply rotation"],
  ["AVL-Sandbox", "AVL sandbox"],
  ["Baum leeren", "Clear tree"],
  ["Bereich ansehen →", "View section →"],
  ["Bereich öffnen →", "Open section →"],
  ["Bereich ansehen", "View section"],
  ["Bereich öffnen", "Open section"],
  ["ERP, Geschäftsprozesse und Process Mining klausurnah verstehen und anwenden.", "Understand ERP, business processes and process mining through exam-oriented practice."],
  ["Datenstrukturen", "Data structures"],
  ["Training", "Training"],
  ["Visualisierung", "Visualization"],
  ["Datenstrukturen", "Data structures"],
  ["AVL-Bäume", "AVL trees"],
  ["Binärbäume", "Binary trees"],
  ["Splaybäume", "Splay trees"],
  ["Listen", "Lists"],
  ["Wörterbücher", "Dictionaries"],
  ["Graphen", "Graphs"],
  ["Stacks & Queues", "Stacks & Queues"],
]);

function syncLocalizedContent() {
  ["basics", "programming", "dataScience", "informationManagement"].forEach(renderSubjectLearningArea);
  syncAlgorithmLocalizedContent();
  applyStaticTextLanguage();
}

function syncAlgorithmLocalizedContent() {
  if (el.masterView && !el.masterView.classList.contains("is-hidden")) {
    syncMasterTrainingTopic();
    renderMasterLearning();
    if (state.masterQuestion) {
      el.masterTitle.textContent = `${algorithmText("Klausuraufgabe")}: ${algorithmText(getMasterTrainingConfig().heading)}`;
      renderMasterWorkflow(state.masterQuestion.runtimeChoices);
    }
  }
  if (state.sortSteps?.length) {
    renderSortStep();
  }
  if (state.searchSteps?.length) {
    renderSearchStep();
  }
  if (el.avlView && !el.avlView.classList.contains("is-hidden")) {
    setDataStructureTopic(state.dataStructureTopic);
  }
}

function applyStaticTextLanguage() {
  document.querySelectorAll("button, h1, h2, p, label, option, summary, span, strong, small").forEach((node) => {
    if (node.children.length > 0) {
      return;
    }
    if (!isEnglish()) {
      node.dataset.deText = node.textContent;
      return;
    }
    if (!node.dataset.deText) {
      node.dataset.deText = node.textContent;
    }
    const original = node.dataset.deText.trim();
    if (isEnglish() && staticEnglishText.has(original)) {
      node.textContent = preserveOuterWhitespace(node.dataset.deText, staticEnglishText.get(original));
    }
  });
}

function preserveOuterWhitespace(original, replacement) {
  const prefix = original.match(/^\s*/u)?.[0] || "";
  const suffix = original.match(/\s*$/u)?.[0] || "";
  return `${prefix}${replacement}${suffix}`;
}

function answerCheckpointTask(answer) {
  if (answer !== "O(log n)") {
    el.checkpointFeedback.textContent = t("learning.wrong");
    el.checkpointFeedback.className = "checkpoint-feedback is-wrong";
    return;
  }

  state.learningPoints = Math.max(state.learningPoints, 20);
  state.learningUnlocked = Math.max(state.learningUnlocked, 2);
  saveLearningProgress();
  el.checkpointFeedback.textContent = t("learning.correct");
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
  el.runtimeTitle.textContent = algorithmText(pattern.title);
  el.runtimeSnippet.textContent = built.code;
  renderChoices(el.runtimeOptions, "runtime", choices);
  setFeedback(el.runtimeFeedback, "");
}

function checkRuntimeQuestion() {
  const selected = getSelectedValue("runtime-choice");
  if (!selected) {
    setFeedback(el.runtimeFeedback, algorithmText("Wähle erst eine Laufzeit aus."), "wrong");
    return;
  }

  if (selected === state.runtimeQuestion.answer) {
    setFeedback(
      el.runtimeFeedback,
      `${isEnglish() ? "Correct" : "Richtig"}: ${selected}. ${algorithmText(state.runtimeQuestion.explanation)}`,
      "correct",
    );
  } else {
    setFeedback(
      el.runtimeFeedback,
      isEnglish()
        ? `Not quite: the correct answer is ${state.runtimeQuestion.answer}. ${algorithmText(state.runtimeQuestion.explanation)}`
        : `Noch nicht: Korrekt ist ${state.runtimeQuestion.answer}. ${state.runtimeQuestion.explanation}`,
      "wrong",
    );
  }
}

function setupSubjectLearningArea(areaKey) {
  const refs = getSubjectRefs(areaKey);
  bindDelegatedPress(refs.nav, "[data-subject-topic]", (button) => {
    state[`${areaKey}Topic`] = button.dataset.subjectTopic;
    state[`${areaKey}Mode`] = state[`${areaKey}Mode`] || "learn";
    renderSubjectLearningArea(areaKey);
  });
  bindDelegatedPress(refs.modeNav, "[data-subject-mode]", (button) => {
    state[`${areaKey}Mode`] = button.dataset.subjectMode;
    renderSubjectLearningArea(areaKey);
  });
  document.getElementById(`new-${subjectDomId(areaKey)}-question`).addEventListener("click", () => createSubjectQuestion(areaKey));
  document.getElementById(`check-${subjectDomId(areaKey)}-question`).addEventListener("click", () => checkSubjectQuestion(areaKey));
  document.getElementById(`hint-${subjectDomId(areaKey)}-question`).addEventListener("click", () => showSubjectHint(areaKey));
  document.getElementById(`solution-${subjectDomId(areaKey)}-question`).addEventListener("click", () => showSubjectSolution(areaKey));
}

function getSubjectRefs(areaKey) {
  const prefix = areaKey;
  return {
    nav: el[`${prefix}TopicNav`],
    modeNav: el[`${prefix}ModeNav`],
    title: el[`${prefix}TopicTitle`],
    copy: el[`${prefix}TopicCopy`],
    learningGoals: el[`${prefix}LearningGoals`],
    explanation: el[`${prefix}Explanation`],
    concepts: el[`${prefix}Concepts`],
    visualTitle: el[`${prefix}VisualTitle`],
    visual: el[`${prefix}Visual`],
    taskMeta: el[`${prefix}TaskMeta`],
    questionTitle: el[`${prefix}QuestionTitle`],
    snippet: el[`${prefix}Snippet`] || null,
    question: el[`${prefix}Question`],
    options: el[`${prefix}Options`],
    hint: el[`${prefix}Hint`],
    feedback: el[`${prefix}Feedback`],
    solution: el[`${prefix}Solution`],
  };
}

function getSubjectArea(areaKey) {
  if (isEnglish()) {
    return englishSubjectLearningAreas[areaKey] || subjectLearningAreas[areaKey];
  }
  return subjectLearningAreas[areaKey];
}

function subjectDomId(areaKey) {
  const ids = {
    dataScience: "data-science",
    informationManagement: "information-management",
  };
  return ids[areaKey] || areaKey;
}

function isEnglish() {
  return currentLanguage() === "en";
}

function localized(value) {
  if (value && typeof value === "object") {
    return value[currentLanguage()] || value.en || value.de || "";
  }
  return value;
}

function uiText(key) {
  const strings = {
    answerFirst: {
      de: "Gib zuerst eine Antwort. Danach bekommst du eine Begründung und kannst mit der Musterlösung abgleichen.",
      en: "Answer first. Then you will get an explanation and can compare your work with the model solution.",
    },
    correct: { de: "Richtig.", en: "Correct." },
    notYet: { de: "Noch nicht.", en: "Not quite." },
    examTip: { de: "Klausurtipp", en: "Exam tip" },
    guidedPractice: { de: "Geführte Übung", en: "Guided practice" },
    examTask: { de: "Klausuraufgabe", en: "Exam task" },
    shortAnswer: { de: "Kurze Antwort", en: "Short answer" },
    shortAnswerPlaceholder: {
      de: "Formuliere deine Lösung in Stichpunkten.",
      en: "Write your answer in short bullet-like notes.",
    },
    missing: { de: "Es fehlen", en: "Missing" },
    tooMuch: { de: "Zu viel gewählt", en: "Selected unnecessarily" },
    multiAdvice: {
      de: "Vergleiche jede Aussage einzeln mit der Regel, statt nach Bauchgefühl zu bündeln.",
      en: "Check each statement against the rule individually instead of grouping by intuition.",
    },
    textAdvice: {
      de: "Deine Antwort enthält noch nicht genug Kernbegriffe. Nutze die Musterlösung als Checkliste und prüfe, ob Regel, Begründung und Ergebnis vorkommen.",
      en: "Your answer does not yet contain enough key terms. Use the model solution as a checklist: rule, reasoning and result should be present.",
    },
    correctWouldBe: { de: "Korrekt wäre", en: "The correct answer would be" },
    ruleAdvice: {
      de: "Prüfe die zugrunde liegende Regel und nicht nur das Endergebnis.",
      en: "Check the underlying rule, not only the final result.",
    },
    defaultHint: {
      de: "Zerlege die Aufgabe in Begriff, Regel und Anwendungsschritt.",
      en: "Break the task into term, rule and application step.",
    },
    modelSolution: { de: "Musterlösung", en: "Model solution" },
    defaultSolution: {
      de: "Vergleiche deine Antwort mit den zentralen Begriffen der Erklärung.",
      en: "Compare your answer with the key terms from the explanation.",
    },
    examHintLabel: { de: "Klausurhinweis", en: "Exam note" },
    defaultExamHint: {
      de: "Achte auf Begriffe, Bedingungen und Zwischenschritte. Genau dort entstehen die meisten Folgefehler.",
      en: "Watch the terminology, conditions and intermediate steps. Most follow-up errors start there.",
    },
  };
  return localized(strings[key] || key);
}

const algorithmEnglishText = new Map([
  ["Code-Schnipsel analysieren", "Analyze code snippet"],
  ["Klausuraufgabe", "Exam task"],
  ["Musterlösung", "Model solution"],
  ["Grundidee", "Core idea"],
  ["Beispiel auswählen", "Choose example"],
  ["Hilfestellung ausblenden", "Hide help"],
  ["Hilfestellung anzeigen", "Show help"],
  ["Schrittweise Lösung", "Step-by-step solution"],
  ["Syntax fehlt", "Syntax is missing"],
  ["Syntax passt noch nicht", "The syntax does not match yet"],
  ["Gib zuerst eine Rekurrenz ein. Beispiel: T(n)=2T(n/2)+n.", "Enter a recurrence first. Example: T(n)=2T(n/2)+n."],
  ["Für das Master-Theorem nutze T(n)=aT(n/b)+c*n^d, zum Beispiel T(n)=3T(n/2)+n oder T(n)=2T(n/2)+5*n^2.", "For the Master theorem use T(n)=aT(n/b)+c*n^d, for example T(n)=3T(n/2)+n or T(n)=2T(n/2)+5*n^2."],
  ["Für Subtract and Conquer nutze ein einzelnes Teilproblem, zum Beispiel T(n)=T(n-1)+n oder T(n)=T(n/2)+1.", "For Subtract and Conquer use a single subproblem, for example T(n)=T(n-1)+n or T(n)=T(n/2)+1."],
  ["Für Substitution nutze eine Form, die eine Schranke beweist, zum Beispiel T(n)=T(n/2)+T(n/4)+n oder T(n)=T(n-1)+T(n-2)+1.", "For substitution use a form that proves a bound, for example T(n)=T(n/2)+T(n/4)+n or T(n)=T(n-1)+T(n-2)+1."],
  ["Wähle Best, Average und Worst Case aus.", "Choose best, average and worst case."],
  ["Datenstruktur-Training", "Data structure training"],
  ["Training", "Training"],
  ["Binärbäume", "Binary trees"],
  ["Splaybäume", "Splay trees"],
  ["Graphen", "Graphs"],
  ["Heaps", "Heaps"],
  ["AVL-Bäume", "AVL trees"],
  ["B-Bäume", "B-trees"],
  ["Stacks & Queues", "Stacks & Queues"],
  ["Normaler Binärbaum", "Regular binary tree"],
  ["Splaybaum", "Splay tree"],
  ["Binärer Suchbaum", "Binary search tree"],
  ["Datenstruktur", "Data structure"],
  ["Stapel", "Stack"],
  ["Warteschlange", "Queue"],
  ["Keine Rotation", "No rotation"],
  ["Wähle erst eine Antwort aus.", "Choose an answer first."],
  ["Wähle erst eine Rotation aus.", "Choose a rotation first."],
  ["Gib bitte eine ganze Zahl ein.", "Please enter an integer."],
  ["Gib zuerst einen Wert ein.", "Enter a value first."],
  ["Gib zuerst eine Zahl ein.", "Enter a number first."],
  ["Die Struktur ist bereits leer.", "The structure is already empty."],
  ["Der Heap ist bereits leer.", "The heap is already empty."],
  ["Die Array-Indizes zeigen die interne Speicherung des vollständigen Binärbaums.", "The array indices show the internal storage of the complete binary tree."],
  ["LIFO: Das oberste Element wird zuerst entfernt.", "LIFO: The top element is removed first."],
  ["FIFO: Das vorderste Element wird zuerst entfernt.", "FIFO: The front element is removed first."],
  ["Start links beim ersten Element.", "Start on the left at the first element."],
  ["Das gesamte sortierte Array ist der Suchbereich.", "The whole sorted array is the search interval."],
  ["Schätze die Position aus Zielwert und Wertebereich.", "Estimate the position from the target value and value range."],
  ["Topologische Reihenfolge", "Topological order"],
  ["noch leer", "still empty"],
  ["Kein Knoten mit Eingangsgrad 0.", "No vertex with in-degree 0."],
  ["Wähle erst eine Laufzeit aus.", "Choose a runtime first."],
  ["Die Funktion beendet sich immer sofort; der rekursive Zweig wird nie erreicht.", "The function always returns immediately; the recursive branch is never reached."],
  ["Pro Aufruf passiert nur konstante Arbeit, und n sinkt linear.", "Each call performs only constant work and n decreases linearly."],
  ["Jeder Aufruf erzeugt zwei Teilaufrufe der Größe n-1.", "Each call creates two subcalls of size n-1."],
  ["n wird in jedem Schritt halbiert, also gibt es logarithmisch viele Aufrufe.", "n is halved in every step, so there are logarithmically many calls."],
  ["Die Reihe n + n/2 + n/4 + ... summiert sich zu O(n).", "The series n + n/2 + n/4 + ... sums to O(n)."],
  ["Mehrfaches Wurzelziehen reduziert die Eingabe extrem schnell.", "Repeated square-root reduction shrinks the input extremely quickly."],
  ["Es gilt T(n) = T(n-1) + O(n), also entsteht eine quadratische Summe.", "The recurrence is T(n) = T(n-1) + O(n), which creates a quadratic sum."],
  ["Jeder Schritt reduziert n um 1 und führt sonst nur konstante Arbeit aus.", "Each step reduces n by 1 and otherwise performs only constant work."],
  ["Master-Theorem: T(n) = 2T(n/2) + O(1) ergibt O(n).", "Master theorem: T(n) = 2T(n/2) + O(1) gives O(n)."],
  ["Master-Theorem: T(n) = 2T(n/2) + O(n) ergibt O(n log n).", "Master theorem: T(n) = 2T(n/2) + O(n) gives O(n log n)."],
  ["Die äußere Schleife läuft linear oft, die innere Schleife logarithmisch oft.", "The outer loop runs linearly many times; the inner loop runs logarithmically many times."],
  ["Die verschachtelte Summe 0 + 1 + ... + (n-1) wächst quadratisch.", "The nested sum 0 + 1 + ... + (n-1) grows quadratically."],
  ["Für jede Position wird der restliche unsortierte Bereich durchsucht.", "For each position, the remaining unsorted part is scanned."],
  ["Im Worst Case wird jedes Element einmal geprüft.", "In the worst case every element is checked once."],
  ["Jeder Zeiger bewegt sich nur in eine Richtung; zusammen gibt es höchstens linear viele Schritte.", "Each pointer moves in only one direction; together they create at most linear work."],
  ["Die Schleife läuft n-mal; Hashmap-Zugriffe sind im Durchschnitt O(1).", "The loop runs n times; hash-map access is O(1) on average."],
  ["Jeder Knoten und jede Kante wird bei der Breitensuche höchstens konstant oft betrachtet.", "In breadth-first search, every vertex and edge is considered only a constant number of times."],
  ["Master-Theorem trainieren", "Practice the Master theorem"],
  ["Subtract and Conquer trainieren", "Practice Subtract and Conquer"],
  ["Substitution trainieren", "Practice substitution"],
  ["Rekurrenz analysieren", "Analyze recurrence"],
  ["Bestimme Verfahren, Fall/Begründung und Laufzeitklasse.", "Determine method, case/reasoning and runtime class."],
  ["Parameter ablesen", "Read off parameters"],
  ["Rekursionsanteil berechnen", "Calculate recursive contribution"],
  ["Exponenten vergleichen", "Compare exponents"],
  ["Ergebnis ableiten", "Derive result"],
  ["Verfahren erkennen", "Identify method"],
  ["Rekurrenz entfalten", "Expand recurrence"],
  ["Summe formulieren", "Formulate sum"],
  ["Ebenen aufschreiben", "Write down levels"],
  ["Summe bewerten", "Evaluate sum"],
  ["Vermutung wählen", "Choose a guess"],
  ["Induktionsannahme einsetzen", "Substitute induction hypothesis"],
  ["Ungleichung vereinfachen", "Simplify inequality"],
  ["Wachstum einschätzen", "Estimate growth"],
  ["Obere Schranke vermuten", "Guess an upper bound"],
  ["Einsetzen", "Substitute"],
  ["Anzahl der rekursiven Teilprobleme", "Number of recursive subproblems"],
  ["Verkleinerungsfaktor der Eingabe", "Shrink factor of the input"],
  ["konstanter Faktor der Zusatzarbeit", "constant factor of the extra work"],
  ["Exponent der Zusatzarbeit n<sup>d</sup>", "exponent of the extra work n<sup>d</sup>"],
  ["Wie stark wird n kleiner?", "How strongly does n shrink?"],
  ["Wie viele Rekursionsschritte entstehen?", "How many recursion steps occur?"],
  ["Welche Zusatzarbeit g(n) fällt pro Ebene an?", "What extra work g(n) occurs per level?"],
  ["Welche Reihe entsteht beim Entfalten?", "Which series appears during expansion?"],
  ["Welche O-Schranke ist plausibel?", "Which O-bound is plausible?"],
  ["Ersetze rekursive Terme durch die Induktionsannahme", "Replace recursive terms by the induction hypothesis"],
  ["Wähle c so, dass die Ungleichung aufgeht", "Choose c so the inequality works"],
  ["Basisfall und Induktionsschritt sichern die Schranke", "Base case and induction step secure the bound"],
  ["Löse die Rekurrenz wie in einer Klausur: Lies die Master-Parameter ab, berechne log<sub>b</sub>(a), wähle den Dominanzfall und leite daraus die Laufzeit her.", "Solve the recurrence as in an exam: read off the Master parameters, compute log<sub>b</sub>(a), choose the dominance case and derive the runtime."],
  ["Löse die Rekurrenz durch Entfalten: Bestimme, wie die Eingabe kleiner wird, formuliere die entstehende Summe und leite daraus die Laufzeit her.", "Solve the recurrence by expansion: determine how the input shrinks, formulate the resulting sum and derive the runtime."],
  ["Löse die Rekurrenz über eine Vermutung: Wähle eine passende Schranke, setze sie für kleinere Eingaben ein und prüfe, ob die Ungleichung stabil bleibt.", "Solve the recurrence via a guess: choose a suitable bound, substitute it for smaller inputs and check whether the inequality remains stable."],
  ["Bestimme a, b, c und d. Berechne log<sub>b</sub>(a), vergleiche d damit und leite den passenden Master-Fall ab.", "Determine a, b, c and d. Compute log<sub>b</sub>(a), compare d with it and derive the matching Master case."],
  ["Entfalte die Rekurrenz: Bestimme Reduktion, Rekursionstiefe, entstehende Summe und daraus die Laufzeit.", "Expand the recurrence: determine reduction, recursion depth, resulting sum and the runtime derived from it."],
  ["Wähle eine plausible Schranke, setze die Induktionsannahme ein und prüfe die Bedingung für die Konstante.", "Choose a plausible bound, substitute the induction hypothesis and check the condition for the constant."],
  ["Ja", "Yes"],
  ["Nein", "No"],
  ["Nicht anwendbar", "Not applicable"],
  ["Teilt das Array in einen sortierten linken und einen unsortierten rechten Bereich. Pro Durchlauf wird das kleinste noch unsortierte Element gesucht und an die nächste freie Position links getauscht.", "Splits the array into a sorted left part and an unsorted right part. Each pass finds the smallest still unsorted element and swaps it into the next free position on the left."],
  ["Nach einem vollständigen Durchlauf ist die nächste Position links endgültig korrekt. Der sortierte Bereich wächst dadurch genau um ein Element.", "After one full pass, the next position on the left is final. The sorted region grows by exactly one element."],
  ["Baut links schrittweise einen sortierten Bereich auf. Das aktuelle Element wird zwischengespeichert, größere Werte werden nach rechts verschoben und die entstandene Lücke wird passend gefüllt.", "Builds a sorted region on the left step by step. The current element is stored temporarily, larger values are shifted right and the gap is filled correctly."],
  ["Alle Elemente links der aktuellen Position bleiben sortiert. Verschoben werden nur Werte, die größer als das einzufügende Element sind.", "All elements left of the current position remain sorted. Only values larger than the inserted element are shifted."],
  ["Vergleicht immer zwei benachbarte Werte. Stehen sie falsch herum, werden sie vertauscht; so wandert der größte noch unsortierte Wert pro Runde bis an das rechte Ende.", "Always compares two adjacent values. If they are in the wrong order, they are swapped; thus the largest still unsorted value moves to the right end each round."],
  ["Nach einer vollständigen Runde ist das rechte Ende korrekt. Ein einzelner Tausch ordnet zunächst nur das gerade betrachtete Nachbarpaar.", "After one full round, the right end is correct. A single swap initially only orders the adjacent pair being considered."],
  ["Teilt das Array rekursiv bis zu Einzelelementen. Danach werden jeweils zwei sortierte Teilbereiche verglichen und in der richtigen Reihenfolge zu einem größeren Bereich zusammengeführt.", "Recursively splits the array down to single elements. Then two sorted subranges are compared and merged into a larger sorted range."],
  ["Beim Zusammenführen ist das kleinere vordere Element sicher das nächste im Ergebnis. So bleibt der neu aufgebaute Teilbereich jederzeit sortiert.", "During merging, the smaller front element is certainly next in the result. This keeps the newly built subrange sorted at all times."],
  ["Formt das Array zunächst zu einem Max-Heap, dessen Wurzel das größte Element enthält. Die Wurzel wird ans freie Ende getauscht und der verkleinerte Heap anschließend repariert.", "First turns the array into a max-heap whose root contains the largest element. The root is swapped to the free end and the reduced heap is repaired."],
  ["Die Heap-Eigenschaft garantiert das Maximum an der Wurzel. Nach dem Tausch ist es endgültig einsortiert; Bubble-down repariert den verbleibenden Heap.", "The heap property guarantees the maximum at the root. After the swap it is final; bubble-down repairs the remaining heap."],
  ["Wählt ein Pivot und partitioniert den Bereich so, dass kleinere Werte links und größere rechts davon liegen. Danach werden beide Seiten unabhängig rekursiv sortiert.", "Chooses a pivot and partitions the range so smaller values are left and larger values are right of it. Then both sides are sorted recursively."],
  ["Nach der Partition steht das Pivot endgültig richtig. Die übrigen Werte sind noch nicht vollständig sortiert, liegen aber bereits auf der richtigen Seite des Pivots.", "After partitioning, the pivot is final. The remaining values are not fully sorted yet, but already lie on the correct side of the pivot."],
  ["Ordnet die Knoten eines gerichteten azyklischen Graphen so, dass jede Voraussetzung vor dem davon abhängigen Knoten erscheint. Kahn wählt dafür wiederholt einen Knoten mit Eingangsgrad 0.", "Orders the vertices of a directed acyclic graph so each prerequisite appears before the dependent vertex. Kahn's algorithm repeatedly chooses a vertex with in-degree 0."],
  ["Ein Knoten ohne eingehende Kante hat keine offene Voraussetzung und darf daher als Nächstes ausgegeben werden. Seine ausgehenden Kanten werden anschließend entfernt.", "A vertex without incoming edges has no open prerequisite and may be output next. Its outgoing edges are then removed."],
  ["Listen", "Lists"],
  ["Wörterbücher", "Dictionaries"],
  ["Hashmaps", "Hash maps"],
  ["Tiefensuche", "Depth-first search"],
  ["Min-Heap", "Min-heap"],
  ["Max-Heap", "Max-heap"],
  ["Welche Operation ist bei einer Array-Liste typischerweise O(1)?", "Which operation is typically O(1) for an array list?"],
  ["Zugriff auf Index 3", "Accessing index 3"],
  ["Einfügen am Anfang", "Inserting at the beginning"],
  ["Suchen nach Wert 21", "Searching for value 21"],
  ["Löschen aus der Mitte ohne Index", "Deleting from the middle without an index"],
  ["Array-Listen speichern Elemente zusammenhängend; direkter Indexzugriff ist konstant.", "Array lists store elements contiguously; direct index access is constant."],
  ["Was ist bei einer einfach verketteten Liste ohne Tail-Zeiger besonders teuer?", "What is especially expensive in a singly linked list without a tail pointer?"],
  ["Vorne einfügen", "Insert at the front"],
  ["Erstes Element lesen", "Read first element"],
  ["Hinten einfügen", "Insert at the back"],
  ["Nachfolger eines bekannten Knotens lesen", "Read successor of a known node"],
  ["Ohne Tail-Zeiger muss man erst bis zum letzten Knoten laufen.", "Without a tail pointer, you first have to traverse to the last node."],
  ["Was passiert typischerweise beim Einfügen in die Mitte einer Array-Liste?", "What typically happens when inserting into the middle of an array list?"],
  ["Elemente rechts davon werden verschoben", "Elements to the right are shifted"],
  ["Nur ein Zeiger wird geändert", "Only one pointer is changed"],
  ["Die Liste wird automatisch balanciert", "The list is automatically balanced"],
  ["Die Hashfunktion wird neu berechnet", "The hash function is recomputed"],
  ["Bei Array-Listen müssen nachfolgende Elemente Platz machen; das kostet im Worst Case O(n).", "In array lists, following elements must make room; in the worst case this costs O(n)."],
  ["Welche Denkweise passt am besten zu einem Wörterbuch?", "Which mental model best matches a dictionary?"],
  ["Werte werden über Schlüssel gefunden", "Values are found through keys"],
  ["Werte sind nur über Positionen erreichbar", "Values are only reachable through positions"],
  ["Alle Werte bleiben automatisch sortiert", "All values stay automatically sorted"],
  ["Jeder Zugriff muss linear suchen", "Every access must search linearly"],
  ["Wörterbücher modellieren Key-Value-Zugriff, nicht Positionszugriff.", "Dictionaries model key-value access, not positional access."],
  ["Was sollte in einem Wörterbuch eindeutig sein?", "What should be unique in a dictionary?"],
  ["Der Schlüssel", "The key"],
  ["Der Wert", "The value"],
  ["Die Einfügezeit", "The insertion time"],
  ["Die Speicheradresse", "The memory address"],
  ["Ein Wörterbuch ordnet jedem Schlüssel höchstens einen aktuellen Wert zu.", "A dictionary maps each key to at most one current value."],
  ["Was zeigt der Bucket mit Tom und Zoe?", "What does the bucket with Tom and Zoe show?"],
  ["Eine Kollision", "A collision"],
  ["Eine perfekte Hashfunktion", "A perfect hash function"],
  ["Eine Heap-Verletzung", "A heap violation"],
  ["Eine Kollision entsteht, wenn verschiedene Schlüssel im selben Bucket landen.", "A collision occurs when different keys land in the same bucket."],
  ["Um die Last pro Bucket zu senken", "To reduce the load per bucket"],
  ["Resizing hält den Load Factor klein und stabilisiert erwartete O(1)-Operationen.", "Resizing keeps the load factor small and stabilizes expected O(1) operations."],
  ["Chaining mit Listen pro Bucket", "Chaining with lists per bucket"],
  ["Beim Chaining speichert ein Bucket mehrere Einträge, die denselben Index erhalten.", "With chaining, a bucket stores multiple entries that receive the same index."],
  ["DFS startet bei A und besucht Nachbarn in angegebener Reihenfolge. Welche Reihenfolge entsteht?", "DFS starts at A and visits neighbors in the given order. Which order results?"],
  ["DFS geht zuerst so tief wie möglich über B nach D und kehrt dann zu C/E zurück.", "DFS first goes as deep as possible via B to D and then returns to C/E."],
  ["Warum braucht DFS eine visited-Menge?", "Why does DFS need a visited set?"],
  ["Um Zyklen nicht endlos zu besuchen", "To avoid visiting cycles forever"],
  ["Bei Zyklen kann DFS sonst immer wieder dieselben Knoten erreichen.", "With cycles, DFS could otherwise reach the same vertices again and again."],
  ["Welche Datenstruktur passt zur iterativen Tiefensuche?", "Which data structure fits iterative DFS?"],
  ["DFS verfolgt einen Pfad in die Tiefe; iterativ bildet ein Stack dieses Verhalten ab.", "DFS follows a path into depth; iteratively, a stack models this behavior."],
  ["Welches Element steht bei einem gültigen Min-Heap immer an der Wurzel?", "Which element is always at the root of a valid min-heap?"],
  ["Das kleinste Element", "The smallest element"],
  ["Das größte Element", "The largest element"],
  ["Das zuletzt eingefügte Element", "The last inserted element"],
  ["Ein zufälliges Pivot", "A random pivot"],
  ["Im Min-Heap ist jeder Elternknoten kleiner oder gleich seinen Kindern.", "In a min-heap, every parent is smaller than or equal to its children."],
  ["Welche Aussage beschreibt einen Max-Heap korrekt?", "Which statement correctly describes a max-heap?"],
  ["Eltern sind größer oder gleich ihren Kindern", "Parents are greater than or equal to their children"],
  ["Eltern sind kleiner oder gleich ihren Kindern", "Parents are smaller than or equal to their children"],
  ["Die Blätter sind immer sortiert", "The leaves are always sorted"],
  ["Die Inorder-Reihenfolge ist sortiert", "The inorder order is sorted"],
  ["Beim Max-Heap steht das Maximum oben; die Ordnung gilt lokal zwischen Eltern und Kindern.", "In a max-heap, the maximum is at the top; the order holds locally between parents and children."],
  ["Welches Element wird bei einem Stack als Nächstes entfernt?", "Which element is removed next from a stack?"],
  ["Ein Stack arbeitet nach LIFO: Das zuletzt eingefügte Element wird zuerst entfernt.", "A stack works by LIFO: the last inserted element is removed first."],
  ["Welches Element verlässt eine Queue als Nächstes?", "Which element leaves a queue next?"],
  ["Ein zufälliges Element", "A random element"],
  ["Eine Queue arbeitet nach FIFO: Das zuerst eingefügte Element wird zuerst entfernt.", "A queue works by FIFO: the first inserted element is removed first."],
  ["Warum ist das Einfügen in der Mitte einer Array-Liste typischerweise O(n)?", "Why is inserting into the middle of an array list typically O(n)?"],
  ["Nachfolgende Elemente müssen verschoben werden", "Subsequent elements must be shifted"],
  ["Für die neue Lücke müssen im Worst Case linear viele Elemente nach rechts rücken.", "For the new gap, linearly many elements must move to the right in the worst case."],
  ["Welche Information speichert ein Knoten einer einfach verketteten Liste?", "What information does a node of a singly linked list store?"],
  ["Wert und Verweis auf den Nachfolger", "Value and reference to the successor"],
  ["Nur seinen Array-Index", "Only its array index"],
  ["Immer zwei Kindknoten", "Always two child nodes"],
  ["Eine Hashfunktion", "A hash function"],
  ["Die Verkettung entsteht durch den Zeiger auf den jeweils nächsten Knoten.", "The linkage is created by the pointer to the next node."],
  ["Mitgliedschaftstest", "Membership test"],
  ["Sortieren", "Sorting"],
  ["Der Mitgliedschaftstest fragt nur die Existenz des Schlüssels ab.", "The membership test only checks whether the key exists."],
  ["Zugriffe auf diesen Bucket werden langsamer", "Accesses to this bucket become slower"],
  ["Bei Chaining müssen innerhalb des Buckets mehrere Einträge verglichen werden.", "With chaining, several entries inside the bucket must be compared."],
  ["An welcher Position wird ein neuer Heap-Wert zunächst eingefügt?", "At which position is a new heap value inserted first?"],
  ["Am nächsten freien Platz der untersten Ebene", "At the next free position on the lowest level"],
  ["Immer direkt an der Wurzel", "Always directly at the root"],
  ["An einer zufälligen Stelle", "At a random position"],
  ["Links neben die Wurzel", "Left of the root"],
  ["So bleibt der Baum vollständig; danach repariert Bubble-up die Heap-Eigenschaft.", "This keeps the tree complete; afterwards bubble-up repairs the heap property."],
  ["Breitensuche", "Breadth-first search"],
  ["Ziel: Einen Graphen Ebene für Ebene durchsuchen und in ungewichteten Graphen kürzeste Wege nach Anzahl der Kanten finden. Grundidee: Eine Queue verarbeitet zuerst alle nahen Knoten.", "Goal: search a graph level by level and find shortest paths by number of edges in unweighted graphs. Core idea: a queue processes nearby vertices first."],
  ["Ziel: Pfade vollständig verfolgen, Zusammenhang prüfen oder Zyklen entdecken. Grundidee: Mit Stack oder Rekursion so tief wie möglich gehen und danach zurückkehren.", "Goal: follow paths completely, check connectivity or detect cycles. Core idea: use a stack or recursion to go as deep as possible and then return."],
  ["Ziel: Kürzeste Wege von einem Startknoten bei nichtnegativen Kantengewichten bestimmen. Grundidee: Immer den noch offenen Knoten mit der kleinsten bekannten Distanz fest auswählen.", "Goal: determine shortest paths from a start vertex with nonnegative edge weights. Core idea: always settle the open vertex with the smallest known distance."],
  ["Ziel: Durch systematisches Ausprobieren einen gültigen Weg oder eine Lösung finden. Grundidee: Eine Entscheidung treffen, bei einer Sackgasse zurückgehen und den nächsten Zweig testen.", "Goal: find a valid path or solution through systematic trial. Core idea: make a decision, backtrack at a dead end and test the next branch."],
  ["a = 8, b = 2, c = 3, d = 2 und log<sub>2</sub>(8) = 3. Weil d &lt; log<sub>b</sub>(a), dominiert die Rekursion.", "a = 8, b = 2, c = 3, d = 2 and log<sub>2</sub>(8) = 3. Since d &lt; log<sub>b</sub>(a), recursion dominates."],
  ["a = 2, b = 2, c = 5, d = 1 und log<sub>2</sub>(2) = 1. Bei Gleichheit kommt ein zusätzlicher Log-Faktor hinzu.", "a = 2, b = 2, c = 5, d = 1 and log<sub>2</sub>(2) = 1. In the equal case, an additional log factor appears."],
  ["a = 3, b = 3, c = 6, d = 2 und log<sub>3</sub>(3) = 1. Weil d &gt; log<sub>b</sub>(a), dominiert die Zusatzarbeit.", "a = 3, b = 3, c = 6, d = 2 and log<sub>3</sub>(3) = 1. Since d &gt; log<sub>b</sub>(a), the extra work dominates."],
  ["a = 9, b = 3, c = 2, d = 2 und log<sub>3</sub>(9) = 2. Der Gleichgewichtsfall liefert n<sup>2</sup> log n.", "a = 9, b = 3, c = 2, d = 2 and log<sub>3</sub>(9) = 2. The balanced case yields n<sup>2</sup> log n."],
  ["Die Rekurrenz sinkt pro Schritt um 1. Beim Entfalten entsteht die arithmetische Summe 1 + 2 + ... + n, also O(n<sup>2</sup>).", "The recurrence decreases by 1 each step. Expansion creates the arithmetic sum 1 + 2 + ... + n, so O(n<sup>2</sup>)."],
  ["Die Eingabe halbiert sich pro Schritt. Dadurch gibt es logarithmisch viele Ebenen mit konstanter Arbeit.", "The input halves each step. Therefore there are logarithmically many levels with constant work."],
  ["Die entstehende geometrische Summe ist durch ein konstantes Vielfaches von n beschränkt.", "The resulting geometric sum is bounded by a constant multiple of n."],
  ["Mit T(k) ≤ c · k folgt T(n) ≤ 3cn/4 + n. Für c ≥ 4 bleibt die lineare Schranke stabil.", "With T(k) ≤ c · k, T(n) ≤ 3cn/4 + n follows. For c ≥ 4, the linear bound remains stable."],
  ["Die beiden fast gleich großen Teilprobleme lassen sich durch eine exponentielle Schranke abfangen.", "The two almost equally large subproblems can be bounded by an exponential bound."],
  ["Die Rekursion dominiert, weil der Rekursionsbaum schneller wächst als die Zusatzarbeit pro Ebene.", "Recursion dominates because the recursion tree grows faster than the extra work per level."],
  ["Rekursion und Zusatzarbeit sind gleich stark, deshalb kommt ein zusätzlicher log-Faktor dazu.", "Recursion and extra work are equally strong, so an additional log factor appears."],
  ["Die Zusatzarbeit dominiert, weil c · n^d stärker wächst als die rekursive Verzweigung.", "The extra work dominates because c · n^d grows faster than the recursive branching."],
  ["Konstante Arbeit pro Ebene über linear viele Ebenen ergibt O(n).", "Constant work per level over linearly many levels gives O(n)."],
  ["Konstante Arbeit über logarithmisch viele Ebenen ergibt O(log n).", "Constant work over logarithmically many levels gives O(log n)."],
  ["Eine fallende geometrische Summe wird durch ihren ersten Term dominiert.", "A decreasing geometric sum is dominated by its first term."],
  ["Ergebnis: T(n) = O(n).", "Result: T(n) = O(n)."],
  ["Ergebnis: T(n) = O(2^n).", "Result: T(n) = O(2^n)."],
]);

function algorithmText(text) {
  if (!isEnglish()) {
    return text;
  }
  return algorithmEnglishText.get(text) || text;
}

function algorithmHtml(html) {
  if (!isEnglish()) {
    return html;
  }
  let translated = String(html);
  algorithmEnglishText.forEach((english, german) => {
    translated = translated.replaceAll(german, english);
  });
  return translated
    .replaceAll("Parameter selbst ablesen", "Read off the parameters yourself")
    .replaceAll("Vergleichsexponent berechnen", "Calculate the comparison exponent")
    .replaceAll("d mit log<sub>b</sub>(a) vergleichen", "Compare d with log<sub>b</sub>(a)")
    .replaceAll("Laufzeit aus dem Vergleich ableiten", "Derive the runtime from the comparison")
    .replaceAll("Aus dem Vergleich folgt der Fall", "The comparison determines the case")
    .replaceAll("Rekursion dominiert", "recursion dominates")
    .replaceAll("Gleichgewicht", "balanced case")
    .replaceAll("Zusatzarbeit dominiert", "extra work dominates")
    .replaceAll("Reduktion erkennen", "Identify the reduction")
    .replaceAll("Rekursionstiefe bestimmen", "Determine recursion depth")
    .replaceAll("Entstehende Summe auswählen", "Choose the resulting sum")
    .replaceAll("Laufzeit ableiten", "Derive runtime")
    .replaceAll("Schranke vermuten", "Guess the bound")
    .replaceAll("Induktionsannahme einsetzen", "Substitute the induction hypothesis")
    .replaceAll("Bedingung für die Konstante prüfen", "Check the condition for the constant")
    .replaceAll("Beispiel", "Example")
    .replaceAll("Ergebnis", "Result")
    .replaceAll("Jedes Beispiel wird einzeln erklärt. Wechsel oben das Beispiel, wenn du eine andere Rekurrenz sehen willst.", "Each example is explained separately. Switch the example above if you want to see another recurrence.")
    .replaceAll("Teilprobleme", "subproblems")
    .replaceAll("Verkleinerung", "shrink factor")
    .replaceAll("Faktor", "factor")
    .replaceAll("Exponent", "exponent")
    .replaceAll("Was passiert?", "What happens?")
    .replaceAll("Was zeigen die Farben?", "What do the colors show?")
    .replaceAll("Warum ist das korrekt?", "Why is this correct?")
    .replaceAll("Verfügbar", "Available")
    .replaceAll("Anwendungsfall", "Use case")
    .replaceAll("Voraussetzung", "Prerequisite")
    .replaceAll("Laufzeit", "Runtime")
    .replaceAll("Idee", "Idea")
    .replaceAll("Stabil", "Stable")
    .replaceAll("In-place", "In-place")
    .replaceAll("Aktueller Zustand", "Current state")
    .replaceAll("Warum dieser Schritt?", "Why this step?")
    .replaceAll("als Nächstes", "next")
    .replaceAll("(leer)", "(empty)");
}

function renderSubjectLearningArea(areaKey) {
  const area = getSubjectArea(areaKey);
  const refs = getSubjectRefs(areaKey);
  let topicKey = state[`${areaKey}Topic`] || area.defaultTopic;
  if (!area.topics[topicKey]) {
    topicKey = area.defaultTopic;
    state[`${areaKey}Topic`] = topicKey;
  }
  const mode = state[`${areaKey}Mode`] || "learn";
  const topic = area.topics[topicKey] || area.topics[area.defaultTopic];

  refs.nav.innerHTML = Object.entries(area.topics).map(([key, item]) => `
    <button class="topic-nav-btn${key === topicKey ? " is-active" : ""}" type="button" data-subject-topic="${key}" aria-pressed="${key === topicKey}">
      <strong>${item.nav}</strong>
      <span>${formatInlineMathLabel(item.copy || item.title)}</span>
    </button>
  `).join("");
  refs.modeNav.innerHTML = subjectModes.map((item) => `
    <button class="section-tab-btn${item.key === mode ? " is-active" : ""}" type="button" data-subject-mode="${item.key}" aria-pressed="${item.key === mode}">
      ${localized(item.label)}
    </button>
  `).join("");
  refs.title.textContent = topic.title;
  refs.copy.textContent = topic.copy;
  refs.learningGoals.innerHTML = (topic.learningGoals || []).map((goal) => `<li>${formatInlineMathLabel(goal)}</li>`).join("");
  refs.explanation.innerHTML = `
    <p>${formatInlineMathLabel(topic.explanation || topic.copy)}</p>
    <p><strong>${uiText("examHintLabel")}:</strong> ${formatInlineMathLabel(topic.examHint || uiText("defaultExamHint"))}</p>
  `;
  refs.concepts.innerHTML = topic.concepts.map(([label, text]) => `
    <article class="concept-card">
      <strong>${label}</strong>
      <p>${formatInlineMathLabel(text)}</p>
    </article>
  `).join("");
  renderSubjectVisualization(refs, topic.visualization);
  syncSubjectModeVisibility(refs, mode);
  createSubjectQuestion(areaKey);
}

function syncSubjectModeVisibility(refs, mode) {
  const overviewCard = refs.title.closest(".subject-overview-card");
  const visualCard = refs.visual.closest(".subject-visual-card");
  const taskCard = refs.question.closest(".subject-task-card");

  overviewCard?.classList.toggle("is-hidden", mode === "exam");
  visualCard?.classList.toggle("is-hidden", mode === "exam");
  taskCard?.classList.toggle("is-hidden", false);
  taskCard?.classList.toggle("is-exam-focus", mode === "exam");
  taskCard?.classList.toggle("is-guided-focus", mode === "guided");
}

function createSubjectQuestion(areaKey) {
  const area = getSubjectArea(areaKey);
  const refs = getSubjectRefs(areaKey);
  const topic = area.topics[state[`${areaKey}Topic`]] || area.topics[area.defaultTopic];
  const mode = state[`${areaKey}Mode`] || "learn";
  const pool = mode === "exam"
    ? (topic.examTasks || topic.questions || topic.guidedTasks)
    : (topic.guidedTasks || topic.questions || topic.examTasks);
  const questions = Array.isArray(pool) && pool.length ? pool : [{
    type: "text",
    level: 1,
    title: topic.title,
    question: topic.copy || topic.explanation || uiText("defaultSolution"),
    answer: [topic.title],
    hint: topic.explanation || topic.copy,
    explanation: topic.explanation || topic.copy,
    solution: topic.explanation || topic.copy,
  }];
  const question = sample(questions);
  state[`${areaKey}Question`] = question;

  refs.taskMeta.textContent = `${mode === "exam" ? uiText("examTask") : uiText("guidedPractice")} · Level ${question.level || 1} · ${subjectTaskTypeLabel(question.type)}`;
  refs.questionTitle.textContent = question.title;
  refs.question.innerHTML = formatInlineMathLabel(question.question);
  if (refs.snippet) {
    refs.snippet.classList.toggle("is-hidden", !question.snippet);
    refs.snippet.querySelector("code").textContent = question.snippet || "";
  }
  renderSubjectTaskInput(refs.options, subjectDomId(areaKey), question);
  refs.hint.classList.add("is-hidden");
  refs.hint.innerHTML = "";
  refs.solution.classList.add("is-hidden");
  refs.solution.innerHTML = "";
  setFeedback(refs.feedback, "");
}

function checkSubjectQuestion(areaKey) {
  const refs = getSubjectRefs(areaKey);
  const question = state[`${areaKey}Question`];
  const answer = getSubjectAnswer(subjectDomId(areaKey), question);
  if (!hasSubjectAnswer(answer, question)) {
    setFeedback(refs.feedback, uiText("answerFirst"), "wrong");
    return;
  }
  const result = evaluateSubjectAnswer(answer, question);
  if (result.correct) {
    setFeedback(refs.feedback, `${uiText("correct")} ${question.explanation || ""} ${question.examRelevance ? `${uiText("examTip")}: ${question.examRelevance}` : ""}`, "correct");
    return;
  }
  const mistake = subjectMistakeFeedback(answer, question);
  setFeedback(refs.feedback, `${uiText("notYet")} ${mistake}${question.explanation ? ` ${question.explanation}` : ""}`, "wrong");
}

function renderSubjectTaskInput(container, name, question) {
  container.innerHTML = "";
  if (question.type === "text" || question.type === "code") {
    container.innerHTML = `
      <label class="text-answer-label${question.type === "code" ? " code-answer-label" : ""}">
        <span>${question.type === "code" ? (isEnglish() ? "Code / solution sketch" : "Code / Lösungsskizze") : uiText("shortAnswer")}</span>
        <textarea name="${name}-text" rows="${question.type === "code" ? "7" : "4"}" placeholder="${question.type === "code" ? (isEnglish() ? "Write the relevant code fragment here." : "Schreibe hier den relevanten Codeausschnitt.") : uiText("shortAnswerPlaceholder")}"></textarea>
      </label>
    `;
    return;
  }

  const inputType = question.type === "multi" ? "checkbox" : "radio";
  shuffle(question.choices || []).forEach((choice) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="${inputType}" name="${name}-choice" value="${escapeAttribute(choice)}"><span>${formatInlineMathLabel(choice)}</span>`;
    container.appendChild(label);
  });
}

function getSubjectAnswer(name, question) {
  if (question.type === "text" || question.type === "code") {
    return document.querySelector(`[name="${name}-text"]`)?.value.trim() || "";
  }
  const selected = [...document.querySelectorAll(`input[name="${name}-choice"]:checked`)].map((input) => input.value);
  return question.type === "multi" ? selected : (selected[0] || "");
}

function hasSubjectAnswer(answer, question) {
  return question.type === "multi" ? answer.length > 0 : String(answer).trim().length > 0;
}

function evaluateSubjectAnswer(answer, question) {
  if (question.type === "multi") {
    const expected = [...question.answer].sort();
    const actual = [...answer].sort();
    return { correct: expected.length === actual.length && expected.every((item, index) => item === actual[index]) };
  }
  if (question.type === "text" || question.type === "code") {
    const normalized = normalizeFreeText(answer);
    const terms = Array.isArray(question.answer) ? question.answer : [question.answer];
    const hits = terms.filter((term) => normalized.includes(normalizeFreeText(term)));
    return { correct: hits.length >= Math.min(2, terms.length) };
  }
  return { correct: answer === question.answer };
}

function normalizeFreeText(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function subjectMistakeFeedback(answer, question) {
  if (question.type === "multi") {
    const expected = new Set(question.answer);
    const chosen = new Set(answer);
    const missing = [...expected].filter((item) => !chosen.has(item));
    const extra = [...chosen].filter((item) => !expected.has(item));
    return [
      missing.length ? `${uiText("missing")}: ${missing.join(", ")}.` : "",
      extra.length ? `${uiText("tooMuch")}: ${extra.join(", ")}.` : "",
      uiText("multiAdvice"),
    ].filter(Boolean).join(" ");
  }
  if (question.type === "text" || question.type === "code") {
    return question.type === "code"
      ? (isEnglish()
        ? "Your code sketch does not yet contain enough expected building blocks. Compare it with the model solution and check syntax, state changes and return value."
        : "Deine Code-Skizze enthält noch nicht genug erwartete Bausteine. Vergleiche sie mit der Musterlösung und prüfe Syntax, Zustandsänderung und Rückgabewert.")
      : uiText("textAdvice");
  }
  return question.commonMistakes?.[answer] || `${uiText("correctWouldBe")}: ${question.answer}. ${uiText("ruleAdvice")}`;
}

function showSubjectHint(areaKey) {
  const refs = getSubjectRefs(areaKey);
  const question = state[`${areaKey}Question`];
  refs.hint.classList.remove("is-hidden");
  refs.hint.innerHTML = formatInlineMathLabel(question.hint || uiText("defaultHint"));
}

function showSubjectSolution(areaKey) {
  const refs = getSubjectRefs(areaKey);
  const question = state[`${areaKey}Question`];
  refs.solution.classList.remove("is-hidden");
  refs.solution.innerHTML = `
    <strong>${uiText("modelSolution")}</strong>
    <p>${formatInlineMathLabel(question.solution || question.explanation || uiText("defaultSolution"))}</p>
  `;
}

function subjectTaskTypeLabel(type) {
  return {
    single: "Single Choice",
    multi: "Multiple Choice",
    truefalse: isEnglish() ? "True/False" : "Wahr/Falsch",
    text: isEnglish() ? "Short answer" : "Kurzantwort",
    code: isEnglish() ? "Code task" : "Code-Aufgabe",
  }[type] || (isEnglish() ? "Task" : "Aufgabe");
}

function renderSubjectVisualization(refs, visualization = {}) {
  refs.visualTitle.textContent = visualization.title || "Denkmodell";
  refs.visual.innerHTML = subjectVisualizationHtml(visualization);
}

function subjectVisualizationHtml(visualization = {}) {
  if (visualization.type === "pipeline") {
    return `<ol class="subject-pipeline">${visualization.steps.map((step) => `<li>${formatInlineMathLabel(step)}</li>`).join("")}</ol>`;
  }
  if (visualization.type === "table") {
    return `
      <div class="subject-table">
        <div class="subject-table-row subject-table-head">${visualization.headers.map((cell) => `<span>${cell}</span>`).join("")}</div>
        ${visualization.rows.map((row) => `<div class="subject-table-row">${row.map((cell) => `<span>${formatInlineMathLabel(cell)}</span>`).join("")}</div>`).join("")}
      </div>
    `;
  }
  if (visualization.type === "bit-grid") {
    return `
      <div class="bit-grid">${visualization.bits.split("").map((bit) => `<span>${bit}</span>`).join("")}</div>
      <ol class="subject-step-list">${visualization.rows.map(([label, text]) => `<li><strong>${label}</strong><span>${formatInlineMathLabel(text)}</span></li>`).join("")}</ol>
    `;
  }
  if (visualization.type === "reference") {
    return `
      <div class="reference-visual">
        <div><strong>Vorher</strong>${visualization.before.map((item) => `<span>${item}</span>`).join("")}</div>
        <div><strong>Nachher</strong>${visualization.after.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
    `;
  }
  if (visualization.type === "event-log") {
    return `<div class="event-log-visual">${visualization.events.map(([time, activity, object]) => `<p><strong>${time}</strong><span>${activity}</span><em>${object}</em></p>`).join("")}</div>`;
  }
  if (visualization.type === "layers") {
    return `<div class="layer-visual">${visualization.layers.map((layer) => `<span>${layer}</span>`).join("")}</div>`;
  }
  if (visualization.type === "uml" || visualization.type === "erd") {
    return `<div class="diagram-boxes">${visualization.boxes.map((box) => `<span>${formatInlineMathLabel(box)}</span>`).join("")}</div>`;
  }
  if (visualization.type === "automaton") {
    return `
      <div class="diagram-boxes">${visualization.states.map((stateLabel) => `<span>${stateLabel}</span>`).join("")}</div>
      <ol class="subject-step-list">${visualization.transitions.map((transition) => `<li><span>${transition}</span></li>`).join("")}</ol>
    `;
  }
  if (visualization.type === "logic-tree") {
    return `<div class="logic-tree">${visualization.nodes.map((node) => `<span>${node}</span>`).join("")}</div>`;
  }
  if (visualization.type === "array") {
    return `<div class="ds-list">${visualization.values.map((value) => `<span>${value}</span>`).join("")}</div>`;
  }
  if (visualization.type === "closure") {
    return `<ol class="subject-step-list">${visualization.steps.map((step) => `<li><span>${formatInlineMathLabel(step)}</span></li>`).join("")}</ol>`;
  }
  return `<p class="section-copy">Nutze die Erklärung und die Aufgabe als gedankliche Visualisierung. Eine spezifische Grafik wird für dieses Thema später ergänzt.</p>`;
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
  el.masterTitle.textContent = `${algorithmText("Klausuraufgabe")}: ${algorithmText(config.heading)}`;
  el.masterRecurrence.innerHTML = renderAnnotatedRecurrence(pattern, state.masterTrainingTopic);
  el.masterTask.innerHTML = algorithmHtml(config.task);
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
      isEnglish()
        ? `Completely correct. ${algorithmText(state.masterQuestion.explanation)} You derived the recurrence in an exam-ready order.`
        : `Vollständig richtig. ${state.masterQuestion.explanation} Du hast die Rekurrenz in einer klausurtauglichen Reihenfolge hergeleitet.`,
      "correct",
    );
  } else {
    setFeedback(
      el.masterFeedback,
      isEnglish()
        ? `The first incorrect calculation step is: ${firstError[1]}. Why: ${algorithmText(state.masterQuestion.explanation)} Compare your input with the derivation below and correct from this step onward.`
        : `Der erste fehlerhafte Rechenschritt ist: ${firstError[1]}. Warum: ${state.masterQuestion.explanation} Vergleiche deine Eingabe mit der Herleitung darunter und korrigiere ab diesem Schritt.`,
      "wrong",
    );
  }

  el.masterSolution.innerHTML = `
    <p class="tree-label">${algorithmText("Musterlösung")}</p>
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
    <p class="tree-label">${algorithmText(title)}</p>
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
    el.masterWorkflow.innerHTML = algorithmHtml(`
      <section class="master-work-step">
        <span>1</span>
        <div>
          <p class="tree-label">Parameter selbst ablesen</p>
          <div class="master-parameter-inputs">
            <label>${masterToken("a", "a")}<input id="master-input-a" type="number" min="1" inputmode="numeric"></label>
            <label>${masterToken("b", "b")}<input id="master-input-b" type="number" min="2" inputmode="numeric"></label>
            <label>${masterToken("c", "c")}<input id="master-input-c" type="number" min="1" inputmode="numeric"></label>
            <label>${masterToken("d", "d")}<input id="master-input-d" type="number" min="0" inputmode="numeric"></label>
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
    `);
    renderChoices(document.getElementById("master-comparison-options"), "master-comparison", [
      { value: "d<p", label: "d &lt; log<sub>b</sub>(a)<small>Rekursion dominiert → O(n<sup>log<sub>b</sub>(a)</sup>)</small>" },
      { value: "d=p", label: "d = log<sub>b</sub>(a)<small>Gleichgewicht → O(n<sup>d</sup> log n)</small>" },
      { value: "d>p", label: "d &gt; log<sub>b</sub>(a)<small>Zusatzarbeit dominiert → O(n<sup>d</sup>)</small>" },
    ]);
  } else if (topic === "Subtract and Conquer") {
    el.masterWorkflow.innerHTML = algorithmHtml(`
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
    `);
    renderChoices(document.getElementById("subtract-expansion-options"), "subtract-expansion", shuffle([
      state.masterQuestion.expansion,
      "1 + 1 + ... + 1 über n Ebenen",
      "n + n + ... + n über log n Ebenen",
      "n<sup>2</sup> + n + 1",
    ]).map((label) => ({ value: label, label })));
  } else {
    el.masterWorkflow.innerHTML = algorithmHtml(`
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
    `);
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
      [["a", "b", "c", "d"].every((key) => values[key] === state.masterQuestion[key]), algorithmText("Parameter a, b, c und d")],
      [Math.abs(values.p - state.masterQuestion.p) < 0.01, algorithmText("Vergleichsexponent")],
      [selectedComparison === state.masterQuestion.comparison, algorithmText("Vergleich von d und dem Vergleichsexponenten")],
      [selectedRuntime === state.masterQuestion.answer, algorithmText("Laufzeit")],
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
      [sameMathText(reduction, state.masterQuestion.reduction), algorithmText("Reduktion der Eingabe")],
      [sameMathText(depth, state.masterQuestion.depth), algorithmText("Rekursionstiefe")],
      [expansion === state.masterQuestion.expansion, algorithmText("entstehende Summe")],
      [selectedRuntime === state.masterQuestion.answer, algorithmText("Laufzeit")],
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
    [sameMathText(guess, state.masterQuestion.guess), algorithmText("vermutete Schranke")],
    [inserted === state.masterQuestion.inserted, algorithmText("eingesetzte Induktionsannahme")],
    [sameMathText(condition, state.masterQuestion.condition), algorithmText("Bedingung für die Konstante")],
    [selectedRuntime === state.masterQuestion.answer, algorithmText("Laufzeit")],
  ];
}

function renderMasterSolutionSteps() {
  if (state.masterTrainingTopic === "Divide and Conquer / Master-Theorem") {
    return `
      <li><strong>Parameter:</strong> a=${state.masterQuestion.a}, b=${state.masterQuestion.b}, c=${state.masterQuestion.c}, d=${state.masterQuestion.d}.</li>
      <li><strong>${isEnglish() ? "Calculate" : "Berechnen"}:</strong> log<sub>${state.masterQuestion.b}</sub>(${state.masterQuestion.a}) = ${state.masterQuestion.p}.</li>
      <li><strong>${isEnglish() ? "Case" : "Fall"}:</strong> ${formatMasterCaseLabel(state.masterQuestion.caseName)}.</li>
      <li><strong>${isEnglish() ? "Conclude" : "Folgern"}:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} ${isEnglish() ? "Therefore T(n) =" : "Also gilt T(n) ="} ${formatOrderLabel(state.masterQuestion.answer)}.</li>
    `;
  }

  if (state.masterTrainingTopic === "Subtract and Conquer") {
    return `
      <li><strong>${isEnglish() ? "Reduction" : "Reduktion"}:</strong> ${formatInlineMathLabel(state.masterQuestion.reduction)}; ${isEnglish() ? "this creates depth" : "dadurch entsteht Tiefe"} ${formatInlineMathLabel(state.masterQuestion.depth)}.</li>
      <li><strong>${isEnglish() ? "Expand" : "Entfalten"}:</strong> ${formatInlineMathLabel(state.masterQuestion.expansion)}.</li>
      <li><strong>${isEnglish() ? "Classify" : "Einordnen"}:</strong> ${formatMasterCaseLabel(state.masterQuestion.caseName)}.</li>
      <li><strong>${isEnglish() ? "Conclude" : "Folgern"}:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} ${isEnglish() ? "Therefore T(n) =" : "Also gilt T(n) ="} ${formatOrderLabel(state.masterQuestion.answer)}.</li>
    `;
  }

  return `
    <li><strong>${isEnglish() ? "Guess" : "Vermutung"}:</strong> ${formatInlineMathLabel(state.masterQuestion.guess)}.</li>
    <li><strong>${isEnglish() ? "Substitute" : "Einsetzen"}:</strong> ${formatInlineMathLabel(state.masterQuestion.inserted)}.</li>
    <li><strong>${isEnglish() ? "Condition" : "Bedingung"}:</strong> ${state.masterQuestion.condition}.</li>
    <li><strong>${isEnglish() ? "Conclude" : "Folgern"}:</strong> ${formatInlineMathLabel(state.masterQuestion.explanation)} ${isEnglish() ? "Therefore T(n) =" : "Also gilt T(n) ="} ${formatOrderLabel(state.masterQuestion.answer)}.</li>
  `;
}

function toggleMasterHelp() {
  state.showMasterHelp = !state.showMasterHelp;
  syncMasterHelpVisibility();
}

function syncMasterHelpVisibility() {
  el.masterHelp.classList.toggle("is-hidden", !state.showMasterHelp);
  el.masterHelpToggle.textContent = state.showMasterHelp ? algorithmText("Hilfestellung ausblenden") : algorithmText("Hilfestellung anzeigen");
}

function getMasterTrainingConfig() {
  return masterTrainingConfigs[state.masterTrainingTopic]
    || masterTrainingConfigs["Divide and Conquer / Master-Theorem"];
}

function syncMasterTrainingTopic() {
  const config = getMasterTrainingConfig();
  el.masterTrainingHeading.textContent = algorithmText(config.heading);
  el.masterTrainingCopy.innerHTML = algorithmHtml(config.copy);
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
  const activeTopicName = el.masterLearnCase.value;

  el.masterLearnOverview.innerHTML = `
    <p class="tree-label">${algorithmText("Grundidee")}</p>
    <p class="master-main-formula">${formatInlineMathLabel(topic.formula)}</p>
    ${el.masterLearnCase.value === "Divide and Conquer / Master-Theorem" ? renderFormulaLegend() : ""}
    <div class="master-parameter-grid">
      ${topic.tiles.map(([title, text]) => `<p><strong>${formatMasterParameterTitle(title)}</strong><span>${formatInlineMathLabel(text)}</span></p>`).join("")}
    </div>
    <p class="section-copy">${formatInlineMathLabel(topic.summary)}</p>
  `;
  el.masterLearnExample.innerHTML = `
    <p class="tree-label">${algorithmText("Beispiel auswählen")}</p>
    <div class="master-example-options">
      ${topic.lessons.map((lessonItem, index) => `
        <button class="master-example-option${index === state.masterLearnLesson ? " is-active" : ""}" type="button" data-master-lesson="${index}" aria-pressed="${index === state.masterLearnLesson}">
          <span>${algorithmText("Beispiel")} ${index + 1}</span>
          <strong>${formatInlineMathLabel(renderLearningRecurrence(lessonItem, activeTopicName))}</strong>
          <small>${formatInlineMathLabel(lessonItem.parameters)} · ${algorithmText("Ergebnis")}: ${formatInlineMathLabel(lessonItem.result)}</small>
        </button>
      `).join("")}
    </div>
    <p class="master-rule-hint">${algorithmText("Jedes Beispiel wird einzeln erklärt. Wechsel oben das Beispiel, wenn du eine andere Rekurrenz sehen willst.")}</p>
  `;
  el.masterLearnSteps.innerHTML = `
    <article class="master-focus-step">
      <div class="master-step-progress">
        ${lesson.steps.map((_, index) => `
          <button class="master-step-dot${index === state.masterLearnStep ? " is-active" : ""}${index < state.masterLearnStep ? " is-done" : ""}" type="button" data-master-step="${index}" aria-label="${isEnglish() ? "Step" : "Schritt"} ${index + 1}" aria-pressed="${index === state.masterLearnStep}">${index + 1}</button>
        `).join("")}
      </div>
      <div class="master-focus-content">
        <p class="step-example-label">${algorithmText("Beispiel")} ${state.masterLearnLesson + 1}: ${formatInlineMathLabel(renderLearningRecurrence(lesson, activeTopicName))}</p>
        <h3>${algorithmText(stepTitle)}</h3>
        <p>${formatInlineMathLabel(stepText)}</p>
      </div>
      ${renderMasterStepMemory(lesson, state.masterLearnStep)}
    </article>
  `;
  el.masterLearnCount.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.masterLearnStep + 1} / ${lesson.steps.length}`;
  el.masterLearnPrev.disabled = state.masterLearnStep === 0;
  el.masterLearnNext.disabled = state.masterLearnStep === lesson.steps.length - 1;
}

function renderFormulaLegend() {
  return `
    <div class="formula-legend">
      <span>${masterToken("a", "a")} ${isEnglish() ? "subproblems" : "Teilprobleme"}</span>
      <span>${masterToken("b", "b")} ${isEnglish() ? "shrink factor" : "Verkleinerung"}</span>
      <span>${masterToken("c", "c")} ${isEnglish() ? "factor" : "Faktor"}</span>
      <span>${masterToken("d", "d")} ${isEnglish() ? "exponent" : "Exponent"}</span>
    </div>
  `;
}

function masterToken(type, content) {
  return `<span class="math-token math-token-${type}">${content}</span>`;
}

function formatMasterParameterTitle(title) {
  return /^[abcd]$/.test(title) ? masterToken(title, title) : title;
}

function renderLearningRecurrence(lesson, topic) {
  if (topic === "Divide and Conquer / Master-Theorem" && Number.isFinite(lesson.a)) {
    return renderAnnotatedRecurrence(lesson, topic);
  }
  return lesson.formula;
}

function renderAnnotatedRecurrence(pattern, topic) {
  if (topic !== "Divide and Conquer / Master-Theorem" || !Number.isFinite(pattern.a)) {
    return pattern.recurrenceHtml;
  }

  const denominator = `<span class="frac"><span>n</span><span>${masterToken("b", pattern.b)}</span></span>`;
  const coefficient = pattern.c === 1 ? "" : masterToken("c", pattern.c);
  const work = pattern.d === 0
    ? masterToken("c", pattern.c)
    : `${coefficient}${pattern.d === 1 ? "n" : `n<sup>${masterToken("d", pattern.d)}</sup>`}`;
  return `T(n) = ${masterToken("a", pattern.a)}T(${denominator}) + ${work}`;
}

function renderMasterStepMemory(lesson, currentStep) {
  if (currentStep === 0) {
    return `
      <aside class="master-step-memory is-empty">
        <strong>${isEnglish() ? "Thread" : "Roter Faden"}</strong>
        <p>${isEnglish() ? "Start with this step. Insights will be collected here as soon as you move forward." : "Starte mit diesem Schritt. Die Erkenntnisse werden hier gesammelt, sobald du weitergehst."}</p>
      </aside>
    `;
  }

  const previousSteps = lesson.steps.slice(0, currentStep);
  return `
    <aside class="master-step-memory">
      <strong>${isEnglish() ? "So far" : "Bisher erkannt"}</strong>
      <ol>
        ${previousSteps.map(([title, text]) => `
          <li>
            <span>${algorithmText(title)}</span>
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

function activateMasterLesson(button) {
  state.masterLearnLesson = Number(button.dataset.masterLesson);
  state.masterLearnStep = 0;
  renderMasterLearning();
}

function activateMasterStep(button) {
  state.masterLearnStep = Number(button.dataset.masterStep);
  renderMasterLearning();
}

el.masterLearnExample.addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-lesson]");
  if (!button) {
    return;
  }
  activateMasterLesson(button);
});

el.masterLearnExample.addEventListener("pointerup", (event) => {
  if (event.pointerType === "mouse") {
    return;
  }
  const button = event.target.closest("[data-master-lesson]");
  if (!button) {
    return;
  }
  event.preventDefault();
  activateMasterLesson(button);
});

el.masterLearnSteps.addEventListener("click", (event) => {
  const button = event.target.closest("[data-master-step]");
  if (!button) {
    return;
  }
  activateMasterStep(button);
});

el.masterLearnSteps.addEventListener("pointerup", (event) => {
  if (event.pointerType === "mouse") {
    return;
  }
  const button = event.target.closest("[data-master-step]");
  if (!button) {
    return;
  }
  event.preventDefault();
  activateMasterStep(button);
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
  state.sortValues = generateUniqueNumbers(10, 0, 100);
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

  el.sortNote.textContent = algorithmText(step.note);
  el.sortStepCount.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.sortStepIndex + 1} / ${state.sortSteps.length}`;
  const algorithm = sortAlgorithms[el.sortAlgorithm.value];
  const activeValues = [...step.active].map((index) => step.array[index]);
  const activeText = activeValues.length
    ? (isEnglish()
      ? `Currently considered: ${activeValues.join(", ")}. Orange marks the involved values; green values are already marked as sorted.`
      : `Gerade betrachtet: ${activeValues.join(", ")}. Orange markiert die beteiligten Werte; grüne Werte sind bereits als sortiert markiert.`)
    : (isEnglish()
      ? "No single value is being compared right now. Green values are already considered sorted."
      : "Gerade wird kein einzelner Wert verglichen. Grün markierte Werte gelten bereits als sortiert.");
  el.sortStepDetail.innerHTML = algorithmHtml(`
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Was zeigen die Farben?</strong> ${activeText}</p>
    <p><strong>Warum ist das korrekt?</strong> ${algorithm.stepWhy}</p>
  `);
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
      <small>${algorithmText("Topologische Reihenfolge")}</small>
      <strong>${step.order.length ? step.order.join(" → ") : algorithmText("noch leer")}</strong>
    </div>
  `;
  el.sortNote.textContent = algorithmText(step.note);
  el.sortStepCount.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.sortStepIndex + 1} / ${state.sortSteps.length}`;
  el.sortStepDetail.innerHTML = algorithmHtml(`
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Verfügbar:</strong> ${step.available.length ? step.available.join(", ") : algorithmText("Kein Knoten mit Eingangsgrad 0.")}</p>
    <p><strong>Warum ist das korrekt?</strong> ${sortAlgorithms.topological.stepWhy}</p>
  `);
  el.sortPrev.disabled = state.sortStepIndex === 0;
  el.sortNext.disabled = state.sortStepIndex >= state.sortSteps.length - 1;
}

function renderSortInfo() {
  const algorithm = sortAlgorithms[el.sortAlgorithm.value];
  el.sortInfo.innerHTML = algorithmHtml(`
    <div><strong>Idee</strong><span>${algorithm.idea}</span></div>
    <div><strong>Stabil</strong><span>${algorithm.stable}</span></div>
    <div><strong>In-place</strong><span>${algorithm.inPlace}</span></div>
    <div><strong>Laufzeit</strong><span>Best ${formatInlineMathLabel(algorithm.runtimes.best)}, Average ${formatInlineMathLabel(algorithm.runtimes.average)}, Worst ${formatInlineMathLabel(algorithm.runtimes.worst)}</span></div>
  `);
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
  el.sortPlay.textContent = isEnglish() ? "Pause" : "Pause";
  state.sortTimer = window.setInterval(nextSortStep, sortPlaybackDelay);
}

function stopSortPlayback() {
  if (state.sortTimer) {
    window.clearInterval(state.sortTimer);
    state.sortTimer = null;
  }
  if (el.sortPlay) {
    el.sortPlay.textContent = isEnglish() ? "Play" : "Abspielen";
  }
}

function resetSearchValues() {
  stopSearchPlayback();
  state.searchValues = generateUniqueNumbers(9, 5, 90).sort((a, b) => a - b);
  el.searchTarget.innerHTML = [
    ...state.searchValues.map((value) => `<option value="${value}">${value}</option>`),
    `<option value="99">99 (${isEnglish() ? "not included" : "nicht enthalten"})</option>`,
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
  el.searchStepCount.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.searchStepIndex + 1} / ${state.searchSteps.length}`;
  el.searchNote.textContent = algorithmText(step.note);
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
      : `<span class="hash-empty">${isEnglish() ? "empty" : "leer"}</span>`;
    return `<div class="hash-bucket${active ? " is-active" : ""}"><small>Bucket ${index}</small><div>${content}</div></div>`;
  }).join("");
  el.searchStepCount.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.searchStepIndex + 1} / ${state.searchSteps.length}`;
  el.searchNote.textContent = algorithmText(step.note);
  el.searchPrev.disabled = state.searchStepIndex === 0;
  el.searchNext.disabled = state.searchStepIndex >= state.searchSteps.length - 1;
  renderSearchInfo();
}

function renderSearchInfo() {
  const info = isEnglish() ? {
    linear: ["Linear search", "Checks all elements one after another.", "Small or unsorted data.", "No sorting required.", "Best O(1), Average/Worst O(n)."],
    binary: ["Binary search", "Halves the search interval after every comparison.", "Many searches in sorted data.", "Sorting and direct index access are required.", "Best O(1), Average/Worst O(log n)."],
    interpolation: ["Interpolation search", "Estimates the position from the value distribution.", "Uniformly distributed, sorted numbers.", "Sorted numeric data that is as uniformly distributed as possible.", "Best O(1), Average O(log log n), Worst O(n)."],
    hash: ["Hash-based search", "Computes a bucket from the key and only checks that bucket's entries.", "Dictionaries, sets, caches and fast key lookups.", "A suitable hash function and collision handling are required.", "Best/Average O(1), Worst O(n) with many collisions."],
  } : {
    linear: ["Lineare Suche", "Prüft alle Elemente nacheinander.", "Kleine oder unsortierte Daten.", "Keine Sortierung erforderlich.", "Best O(1), Average/Worst O(n)."],
    binary: ["Binäre Suche", "Halbiert den Suchbereich nach jedem Vergleich.", "Viele Suchen in sortierten Daten.", "Sortierung und direkter Indexzugriff erforderlich.", "Best O(1), Average/Worst O(log n)."],
    interpolation: ["Interpolationssuche", "Schätzt die Position anhand der Werteverteilung.", "Gleichmäßig verteilte, sortierte Zahlen.", "Sortierte numerische und möglichst gleichmäßig verteilte Daten.", "Best O(1), Average O(log log n), Worst O(n)."],
    hash: ["Hash-basierte Suche", "Berechnet aus dem Schlüssel direkt einen Bucket und prüft nur dessen Einträge.", "Wörterbücher, Mengen, Caches und schnelle Schlüsselabfragen.", "Eine geeignete Hashfunktion und Kollisionsbehandlung sind erforderlich.", "Best/Average O(1), Worst O(n) bei vielen Kollisionen."],
  }[el.searchAlgorithm.value];
  el.searchInfo.innerHTML = algorithmHtml(`
    <div><strong>${info[0]}: Idee</strong><span>${info[1]}</span></div>
    <div><strong>Anwendungsfall</strong><span>${info[2]}</span></div>
    <div><strong>Voraussetzung</strong><span>${info[3]}</span></div>
    <div><strong>Laufzeit</strong><span>${formatInlineMathLabel(info[4])}</span></div>
  `);
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
  el.sortQuestionTitle.textContent = isEnglish()
    ? `What runtimes does ${algorithm.name} have?`
    : `Welche Laufzeiten hat ${algorithm.name}?`;
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
    setFeedback(
      el.sortFeedback,
      isEnglish()
        ? `Correct. ${state.sortQuestion.algorithm.name}: best ${runtimes.best}, average ${runtimes.average}, worst ${runtimes.worst}. Why: ${algorithmText(state.sortQuestion.algorithm.idea)}`
        : `Richtig. ${state.sortQuestion.algorithm.name}: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}. Warum: ${state.sortQuestion.algorithm.idea}`,
      "correct",
    );
    return;
  }
  setFeedback(
    el.sortFeedback,
    isEnglish()
      ? `Not yet. Correct is: best ${runtimes.best}, average ${runtimes.average}, worst ${runtimes.worst}. Why: ${algorithmText(state.sortQuestion.algorithm.idea)}`
      : `Noch nicht. Korrekt ist: Best ${runtimes.best}, Average ${runtimes.average}, Worst ${runtimes.worst}. Warum: ${state.sortQuestion.algorithm.idea}`,
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
    <p class="ds-topic">${algorithmText(question.topic)}</p>
    ${algorithmHtml(question.scenarioHtml)}
  `;
  el.dataStructureQuestion.textContent = algorithmText(question.question);
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
      topic === "Training" ? algorithmText("Datenstruktur-Training") : `${algorithmText(topic)}-${algorithmText("Training")}`;
    createDataStructureQuestion();
  } else if (showAVL) {
    createAVLQuestion();
    resetSandbox(true);
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
    el.treeFamilyNote.textContent = algorithmText("Gib bitte eine ganze Zahl ein.");
    return;
  }
  state.treeFamilyRoot = bstInsertOnly(state.treeFamilyRoot, value);
  refreshHeights(state.treeFamilyRoot);
  if (state.treeFamilyMode === "splay") {
    state.treeFamilyRoot = splayNode(state.treeFamilyRoot, value);
    el.treeFamilyNote.textContent = isEnglish()
      ? `${value} was inserted and then splayed to the root.`
      : `${value} wurde eingefügt und anschließend zur Wurzel gesplayt.`;
  } else {
    el.treeFamilyNote.textContent = isEnglish()
      ? `${value} was inserted according to the binary search tree order.`
      : `${value} wurde entsprechend der Suchbaumordnung eingefügt.`;
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
    el.treeFamilyNote.textContent = isEnglish()
      ? `Access ${value}: the node is moved to the root by zig, zig-zig or zig-zag rotations.`
      : `Zugriff auf ${value}: Der Knoten wird durch Zig-, Zig-Zig- oder Zig-Zag-Rotationen zur Wurzel bewegt.`;
    renderTreeFamily(true);
    return;
  }
  el.treeFamilyNote.textContent = isEnglish()
    ? `Node ${value} found. In the regular binary tree its position does not change.`
    : `Knoten ${value} gefunden. Im normalen Binärbaum bleibt seine Position unverändert.`;
}

function renderTreeFamily(replay = false) {
  const isSplay = state.treeFamilyMode === "splay";
  el.treeFamilyTitle.textContent = isSplay ? algorithmText("Splaybaum") : algorithmText("Normaler Binärbaum");
  el.treeFamilyIdea.innerHTML = isSplay
    ? algorithmHtml("<strong>Splaybaum</strong><span>Jeder Zugriff bewegt den verwendeten Knoten zur Wurzel. Häufig genutzte Werte werden dadurch mit der Zeit besonders schnell erreichbar; amortisiert kosten Operationen O(log n).</span>")
    : algorithmHtml("<strong>Binärer Suchbaum</strong><span>Links stehen kleinere, rechts größere Werte. Suchen, Einfügen und Löschen kosten im Mittel O(log n), bei starker Schieflage jedoch O(n).</span>");
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
    el.stackQueueNote.textContent = algorithmText("Gib zuerst einen Wert ein.");
    return;
  }
  state.stackQueueItems.push(value);
  el.stackQueueValue.value = "";
  el.stackQueueNote.textContent = state.stackQueueMode === "stack"
    ? (isEnglish() ? `${value} was pushed onto the top of the stack.` : `${value} wurde oben auf den Stack gelegt.`)
    : (isEnglish() ? `${value} was enqueued at the back of the queue.` : `${value} wurde hinten in die Queue eingereiht.`);
  renderStackQueue(false);
}

function removeStackQueueItem() {
  if (!state.stackQueueItems.length) {
    el.stackQueueNote.textContent = algorithmText("Die Struktur ist bereits leer.");
    return;
  }
  const index = state.stackQueueMode === "stack" ? state.stackQueueItems.length - 1 : 0;
  const [removed] = state.stackQueueItems.splice(index, 1);
  el.stackQueueNote.textContent = state.stackQueueMode === "stack"
    ? (isEnglish() ? `${removed} was removed by pop.` : `${removed} wurde per Pop entfernt.`)
    : (isEnglish() ? `${removed} was removed by dequeue.` : `${removed} wurde per Dequeue entfernt.`);
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
      return `<div class="sq-item${isNext ? " is-next" : ""}"><span>${escapeAttribute(item)}</span>${isNext ? `<small>${isEnglish() ? "next" : "als Nächstes"}</small>` : ""}</div>`;
    })
    .join("");
  if (!state.stackQueueItems.length) {
    el.stackQueueVisual.innerHTML = `<p class="tree-empty">${isEnglish() ? "(empty)" : "(leer)"}</p>`;
  }
  if (resetNote) {
    el.stackQueueNote.textContent = isStack
      ? algorithmText("LIFO: Das oberste Element wird zuerst entfernt.")
      : algorithmText("FIFO: Das vorderste Element wird zuerst entfernt.");
  }
  el.stackQueueDetail.innerHTML = isStack
    ? (isEnglish()
      ? `<p><strong>Stack (LIFO):</strong> Push places a new element on top. Pop removes exactly that top, most recently inserted element.</p>
       <p><strong>Current state:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[state.stackQueueItems.length - 1])} is on top and would be removed next.` : "The stack is empty; pop cannot return an element."}</p>`
      : `<p><strong>Stack (LIFO):</strong> Push legt ein neues Element oben ab. Pop entfernt genau dieses oberste und damit zuletzt eingefügte Element.</p>
       <p><strong>Aktueller Zustand:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[state.stackQueueItems.length - 1])} liegt oben und würde als Nächstes entfernt.` : "Der Stack ist leer; Pop kann kein Element liefern."}</p>`)
    : (isEnglish()
      ? `<p><strong>Queue (FIFO):</strong> Enqueue appends at the back, dequeue removes from the front. This preserves the chronological order of entries.</p>
       <p><strong>Current state:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[0])} is at the front and would be removed next.` : "The queue is empty; dequeue cannot return an element."}</p>`
      : `<p><strong>Queue (FIFO):</strong> Enqueue fügt hinten an, Dequeue entfernt vorne. So bleibt die zeitliche Reihenfolge der Einträge erhalten.</p>
       <p><strong>Aktueller Zustand:</strong> ${state.stackQueueItems.length ? `${escapeAttribute(state.stackQueueItems[0])} steht vorne und würde als Nächstes entfernt.` : "Die Queue ist leer; Dequeue kann kein Element liefern."}</p>`);
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
  el.graphNote.textContent = `${isEnglish() ? "Step" : "Schritt"} ${state.graphStepIndex + 1} ${isEnglish() ? "of" : "von"} ${steps.length}: ${algorithmText(step.note)}`;
  el.graphIdea.innerHTML = algorithmHtml(`<strong>${info.title}</strong><span>${info.text}</span>`);
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
  el.graphStepDetail.innerHTML = algorithmHtml(`
    <p><strong>Was passiert?</strong> ${step.note}</p>
    <p><strong>Aktueller Zustand:</strong> ${step.active} ist aktiv. ${visitedText}</p>
    <p><strong>Warum dieser Schritt?</strong> ${graphDetails[algorithm]}</p>
  `);
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
    el.heapNote.textContent = algorithmText("Gib zuerst eine Zahl ein.");
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
  el.heapNote.textContent = isEnglish()
    ? `${value} was inserted and ordered by bubble-up.`
    : `${value} wurde eingefügt und per Bubble-up einsortiert.`;
  renderHeap(false);
}

function extractHeapRoot() {
  if (!state.heapItems.length) {
    el.heapNote.textContent = algorithmText("Der Heap ist bereits leer.");
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
  el.heapNote.textContent = isEnglish()
    ? `${removed} was removed; the replacement value was ordered by bubble-down.`
    : `${removed} wurde entfernt; der Ersatzwert wurde per Bubble-down einsortiert.`;
  renderHeap(false);
}

function heapComesFirst(first, second) {
  return state.heapMode === "min" ? first < second : first > second;
}

function renderHeap(resetNote = true) {
  el.heapMode.value = state.heapMode;
  el.heapGoal.textContent = state.heapMode === "min"
    ? (isEnglish() ? "Min-heap: the smallest value is always at the root." : "Min-Heap: Der kleinste Wert steht immer an der Wurzel.")
    : (isEnglish() ? "Max-heap: the largest value is always at the root." : "Max-Heap: Der größte Wert steht immer an der Wurzel.");
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
    el.heapVisual.innerHTML = `<p class="tree-empty">${isEnglish() ? "(empty)" : "(leer)"}</p>`;
  }
  if (resetNote) {
    el.heapNote.textContent = algorithmText("Die Array-Indizes zeigen die interne Speicherung des vollständigen Binärbaums.");
  }
}

function checkDataStructureQuestion() {
  const selected = getSelectedValue("ds-choice");
  if (!selected) {
    setFeedback(el.dataStructureFeedback, "Wähle erst eine Antwort aus.", "wrong");
    return;
  }

  if (selected === state.dataStructureQuestion.answer) {
    setFeedback(
      el.dataStructureFeedback,
      isEnglish()
        ? `Correct. ${algorithmText(state.dataStructureQuestion.explanation)}`
        : `Richtig. ${state.dataStructureQuestion.explanation}`,
      "correct",
    );
    return;
  }

  setFeedback(
    el.dataStructureFeedback,
    isEnglish()
      ? `Not yet. Correct is: ${algorithmText(state.dataStructureQuestion.answer)}. ${algorithmText(state.dataStructureQuestion.explanation)}`
      : `Noch nicht. Korrekt ist: ${state.dataStructureQuestion.answer}. ${state.dataStructureQuestion.explanation}`,
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
      motionHint: isEnglish()
        ? `Correct: ${selected}. The starting tree was rotated into the balanced final state.`
        : `Richtig: ${selected}. Der Ausgangsbaum wurde in den balancierten Endzustand rotiert.`,
      replay: true,
      showStats: false,
    });
    if (state.showAVLPreview) {
      previewAVLRotation(true);
    }
    setFeedback(
      el.avlFeedback,
      isEnglish()
        ? `Correct: ${selected}. Exactly this rotation restores the AVL balance.`
        : `Richtig: ${selected}. Genau diese Rotation stellt die AVL-Balance wieder her.`,
      "correct",
    );
    return;
  }

  if (state.showAVLPreview) {
    previewAVLRotation(true);
  }
  setFeedback(
    el.avlFeedback,
    isEnglish()
      ? `Not quite. ${selected} does not lead to the correct AVL final state. Correct is ${state.avlQuestion.rotation}, because the rotation at the unbalanced node ${state.avlQuestion.pivot} brings the height difference back to at most 1.`
      : `Noch nicht richtig. ${selected} führt nicht zum korrekten AVL-Endzustand. Richtig ist ${state.avlQuestion.rotation}, weil die Rotation am unausgeglichenen Knoten ${state.avlQuestion.pivot} den Höhenunterschied wieder auf höchstens 1 bringt.`,
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
  return algorithmHtml(match ? match.label : value);
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
  const text = String(algorithmText(value));
  if (text.includes("<")) {
    return algorithmHtml(formatPlainFractions(text));
  }

  return algorithmHtml(formatPlainFractions(text)
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
    .replaceAll("*", " · "));
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

function bindDelegatedPress(container, selector, handler) {
  if (!container) {
    return;
  }

  let lastPointerPress = 0;

  function run(event, isPointerPress = false) {
    const button = event.target.closest(selector);
    if (!button || !container.contains(button)) {
      return;
    }
    if (isPointerPress) {
      lastPointerPress = Date.now();
      event.preventDefault();
    } else if (Date.now() - lastPointerPress < 450) {
      return;
    }
    handler(button, event);
  }

  container.addEventListener("pointerup", (event) => run(event, true));
  container.addEventListener("click", (event) => run(event));
}

function setMasterChoice(input, buttonSelector, value) {
  input.value = value;
  document.querySelectorAll(buttonSelector).forEach((button) => {
    const selected = button.dataset.masterLearnCase === value;
    button.classList.toggle("is-active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setMasterTrainingTopic(topic) {
  state.masterTrainingTopic = topic;
  el.masterTrainingTopic.value = state.masterTrainingTopic;
  syncMasterTrainingTopic();
  createMasterQuestion();
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
