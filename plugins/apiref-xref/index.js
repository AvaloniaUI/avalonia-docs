const fs = require("fs");
const path = require("path");

function normalizeUid(value) {
  let decoded;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    decoded = value;
  }

  const queryIndex = decoded.indexOf("?");
  return (queryIndex >= 0 ? decoded.slice(0, queryIndex) : decoded).trim();
}

function loadEntries(indexPath) {
  const absolutePath = path.resolve(process.cwd(), indexPath || "./.apiref/generated/xref-index.json");
  if (!fs.existsSync(absolutePath)) {
    return new Map();
  }

  const payload = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  const entries = Array.isArray(payload) ? payload : payload.entries || [];
  return new Map(entries.map((entry) => [entry.uid, entry]));
}

function buildLinkNode(entry, text) {
  return {
    type: "link",
    url: entry.href,
    children: [{ type: "text", value: text || entry.name || entry.uid }],
  };
}

function replaceTextNode(node, entryMap, enableAtShorthand) {
  const pattern = enableAtShorthand
    ? /<xref:([^>]+)>|@([A-Za-z_][A-Za-z0-9_.\-`#(),:]+)/g
    : /<xref:([^>]+)>/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(node.value)) !== null) {
    const rawUid = normalizeUid(match[1] || match[2] || "");
    const entry = entryMap.get(rawUid);
    if (!entry) {
      continue;
    }

    if (match.index > lastIndex) {
      parts.push({ type: "text", value: node.value.slice(lastIndex, match.index) });
    }

    parts.push(buildLinkNode(entry, entry.name || rawUid));
    lastIndex = match.index + match[0].length;
  }

  if (parts.length === 0) {
    return null;
  }

  if (lastIndex < node.value.length) {
    parts.push({ type: "text", value: node.value.slice(lastIndex) });
  }

  return parts;
}

function visit(node, parent, index, entryMap, enableAtShorthand) {
  if (node.type === "link" && typeof node.url === "string" && node.url.startsWith("xref:")) {
    const entry = entryMap.get(normalizeUid(node.url.slice("xref:".length)));
    if (entry) {
      node.url = entry.href;
    }
  }

  if (node.type === "text" && parent && Array.isArray(parent.children)) {
    const replacement = replaceTextNode(node, entryMap, enableAtShorthand);
    if (replacement) {
      parent.children.splice(index, 1, ...replacement);
      return;
    }
  }

  if (!node.children || !Array.isArray(node.children)) {
    return;
  }

  for (let childIndex = 0; childIndex < node.children.length; childIndex += 1) {
    visit(node.children[childIndex], node, childIndex, entryMap, enableAtShorthand);
  }
}

module.exports = function apirefXrefPlugin(options = {}) {
  const entryMap = loadEntries(options.indexPath);
  const enableAtShorthand = options.enableAtShorthand !== false;

  return function transformer(tree) {
    visit(tree, null, -1, entryMap, enableAtShorthand);
    return tree;
  };
};