export class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

export class AVLTree {
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

export function height(node) {
  return node ? node.height : 0;
}

export function updateHeight(node) {
  if (!node) {
    return;
  }
  node.height = Math.max(height(node.left), height(node.right)) + 1;
}

export function getBalance(node) {
  return node ? height(node.left) - height(node.right) : 0;
}

export function rotateRight(y) {
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

export function rotateLeft(x) {
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

export function cloneNode(node) {
  if (!node) {
    return null;
  }
  const copy = new AVLNode(node.value);
  copy.height = node.height;
  copy.left = cloneNode(node.left);
  copy.right = cloneNode(node.right);
  return copy;
}

export function collectValues(node, acc = []) {
  if (!node) {
    return acc;
  }
  collectValues(node.left, acc);
  acc.push(node.value);
  collectValues(node.right, acc);
  return acc;
}

export function maxDepth(node) {
  if (!node) {
    return 0;
  }
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

export function applyBSTOnly(root, value, mode) {
  const clone = cloneNode(root);
  if (mode === "insert") {
    return bstInsertOnly(clone, value);
  }
  return bstDeleteOnly(clone, value);
}

export function refreshHeights(node) {
  if (!node) {
    return 0;
  }
  const leftHeight = refreshHeights(node.left);
  const rightHeight = refreshHeights(node.right);
  node.height = Math.max(leftHeight, rightHeight) + 1;
  return node.height;
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
