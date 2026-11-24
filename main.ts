// The One-Line Cat Joke That Lands — make.fun entry.
//
// Writes exactly one joke about cats, one line, to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
//
// The joke: a setup with a rule ("only bites people he respects") and a
// turn that lands on the teller ("never bitten me"), no pun, no padding,
// short enough to retell in one breath.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Every path in this entry resolves from this file's directory, never
// from the process working directory (the grader runs from elsewhere).
const ENTRY_DIR =
  typeof import.meta.dirname === "string"
    ? import.meta.dirname
    : dirname(fileURLToPath(import.meta.url));

// The entry text itself. Keep it a single line, well under 200 chars.
const JOKE =
  "My cat only bites people he respects — which is why he's never bitten me.";

// The harness fixes the artifact path; it is absolute by design.
const OUT_FILE = join("/output", "entry.txt");

function buildEntry(): string {
  const text = JOKE.trim();
  // Count characters as code points, the way the gate counts them.
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  if (!/cat/i.test(text)) {
    throw new Error("entry must be a joke about cats");
  }
  return text;
}

function main(): void {
  const text = buildEntry();
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  // No trailing newline: the file holds the joke and nothing else.
  writeFileSync(OUT_FILE, text, "utf8");
  console.log(`entry dir: ${ENTRY_DIR}`);
  console.log(`wrote ${[...text].length} chars to ${OUT_FILE}`);
  console.log(text);
}

main();
