import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const confession =
  "Confession: I don't procrastinate, I delegate to subagents and call the waiting 'orchestration'.";

// Mirror the gate: UTF-8 text, 1-200 characters, single line, not only white space.
function assertValidConfession(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidConfession(confession);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, confession, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
