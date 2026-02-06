import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: any = null;

export const db = new Proxy({} as any, {
  get(target, prop) {
    if (!_db) {
      const url = process.env.DATABASE_URL;
      if (!url) {
        if (process.env.NODE_ENV === "production") {
          console.warn("DATABASE_URL is missing. DB access will fail at runtime.");
        }
        // Return dummy if accessed during build
        return (() => { throw new Error("Database accessed during build time or without DATABASE_URL"); }) as any;
      }
      const sql = neon(url);
      _db = drizzle(sql, { schema });
    }
    return _db[prop];
  },
});
