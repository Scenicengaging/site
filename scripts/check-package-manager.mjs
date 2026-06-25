// Cross-platform replacement for the sh-based preinstall check.
// Runs on Node.js (no shell required) so it works on Windows cmd / PowerShell.
const agent = process.env.npm_config_user_agent ?? "";
if (!agent.startsWith("pnpm/")) {
  console.error("Error: please use pnpm instead of npm or yarn.");
  process.exit(1);
}
// Also remove stray lock files if present (best-effort, non-fatal)
import { unlink } from "fs/promises";
for (const f of ["package-lock.json", "yarn.lock"]) {
  await unlink(f).catch(() => {});
}
