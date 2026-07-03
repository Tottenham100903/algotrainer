export function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUniqueNumbers(count, min, max) {
  const values = new Set();
  while (values.size < count) {
    values.add(randomInt(min, max));
  }
  return [...values];
}

export function range(start, end) {
  return Array.from({ length: Math.max(0, end - start) }, (_, index) => start + index);
}

export function lerp(start, end, factor) {
  return start + ((end - start) * factor);
}
