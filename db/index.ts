import * as schema from "./schema.js";

let db;
if (process.env.NETLIFY_DB_URL) {
  const { drizzle } = await import("drizzle-orm/netlify-db");
  db = drizzle({ schema });
} else if (process.env.NODE_ENV === "test") {
  const { drizzle } = await import("drizzle-orm/sqlite-core");
  const Database = (await import("better-sqlite3")).default;
  const sqlite = new Database(":memory:");
  db = drizzle(sqlite, { schema });
} else {
  const { drizzle } = await import("drizzle-orm/netlify-db");
  db = drizzle({ schema });
}

export { db };