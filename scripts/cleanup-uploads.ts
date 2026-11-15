/**
 * Remove orphaned files from the uploads folder.
 *
 * A file is an orphan when no database row references it. Files are uploaded
 * the moment they are picked in the dashboard, so one that is never saved (or
 * was replaced or deleted later) stays on disk until this script removes it.
 *
 * Usage:
 *   npm run uploads:cleanup                    dry run: list what would be deleted
 *   npm run uploads:cleanup -- --apply         actually delete
 *   npm run uploads:cleanup -- --min-age-hours=1   only consider files older than 1h (default 24)
 *
 * The age limit protects uploads that were just picked but whose form has not
 * been saved yet.
 */
import "dotenv/config";
import { promises as fs } from "fs";
import path from "path";
import { Pool } from "pg";

const SAFE_NAME = /^[a-f0-9-]{36}\.(png|jpg|jpeg)$/i;
const REFERENCE = /[a-f0-9-]{36}\.(?:png|jpe?g)/gi;

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  return hit?.includes("=") ? hit.split("=")[1] : hit ? "true" : undefined;
}

async function referencedFilenames(pool: Pool): Promise<Set<string>> {
  // Look in every text-like column, so new tables and fields (including rich
  // text HTML and array/JSON columns) are covered without maintaining a list.
  const { rows: columns } = await pool.query<{ table_name: string; column_name: string }>(`
    select c.table_name, c.column_name
    from information_schema.columns c
    join information_schema.tables t
      on t.table_schema = c.table_schema and t.table_name = c.table_name
    where c.table_schema = 'public'
      and t.table_type = 'BASE TABLE'
      and c.table_name <> '_prisma_migrations'
      and c.data_type in ('text', 'character varying', 'ARRAY', 'json', 'jsonb')
  `);

  const found = new Set<string>();
  for (const { table_name, column_name } of columns) {
    const { rows } = await pool.query<{ v: string }>(
      `select "${column_name}"::text as v from "${table_name}" where "${column_name}"::text like '%/uploads/%'`,
    );
    for (const { v } of rows) {
      for (const m of v.match(REFERENCE) ?? []) found.add(m.toLowerCase());
    }
  }
  return found;
}

async function main() {
  const apply = arg("apply") === "true";
  const minAgeHours = Number(arg("min-age-hours") ?? 24);
  if (!Number.isFinite(minAgeHours) || minAgeHours < 0) throw new Error("Invalid --min-age-hours");

  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const dir = path.join(process.cwd(), (process.env.UPLOAD_DIR || "/public/uploads").replace(/^[/\\]+/, ""));

  let names: string[];
  try {
    names = (await fs.readdir(dir)).filter((n) => SAFE_NAME.test(n));
  } catch {
    console.log(`Nothing to do: ${dir} does not exist.`);
    return;
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const referenced = await referencedFilenames(pool);
    const cutoff = Date.now() - minAgeHours * 3600 * 1000;

    let kept = 0;
    let tooNew = 0;
    let freed = 0;
    const orphans: { name: string; size: number }[] = [];

    for (const name of names) {
      const stat = await fs.stat(path.join(dir, name));
      if (referenced.has(name.toLowerCase())) kept++;
      else if (stat.mtimeMs > cutoff) tooNew++;
      else orphans.push({ name, size: stat.size });
    }

    console.log(`${apply ? "APPLY" : "DRY RUN"}  dir=${dir}`);
    console.log(`files=${names.length}  referenced=${kept}  orphaned=${orphans.length}  too new to touch (<${minAgeHours}h)=${tooNew}`);

    for (const o of orphans) {
      if (apply) await fs.unlink(path.join(dir, o.name));
      freed += o.size;
      console.log(`${apply ? "deleted" : "would delete"}  ${o.name}  (${(o.size / 1024).toFixed(1)} KB)`);
    }
    console.log(`${apply ? "Freed" : "Would free"} ${(freed / 1024).toFixed(1)} KB`);
    if (!apply && orphans.length) console.log("Re-run with --apply to delete.");
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
