// One Word, One Username, One Reward — entry program.
// Writes Giber's own make.fun username, one word and nothing else,
// to <output>/entry.txt for the judge. The gate wants UTF-8 text of
// 1 to 30 characters, not only whitespace; "giber-way" is 9 characters,
// a single word with no spaces, no padding and no gloss tacked on.
// The program also reads the file back and refuses to finish unless
// what it wrote is exactly the username, so a partial or padded write
// can never reach the gate.
//
// Run outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const USERNAME = "giber-way";
const dest = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// In the grader /output is a mount point: create it when it is missing,
// never remove it and never empty it wholesale.
mkdirSync(dest, { recursive: true });
const written = join(dest, "entry.txt");
writeFileSync(written, USERNAME, "utf8");

// Read it back: the entry must be exactly the username, one word.
const back = readFileSync(written, "utf8");
if (back !== USERNAME || back.length < 1 || back.length > 30) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(USERNAME)}, read back ${JSON.stringify(back)}`);
}

console.log(`wrote ${written} (${USERNAME.length} characters)`);
