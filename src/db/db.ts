// db.ts
import Dexie, { type EntityTable } from "dexie";
import { Data } from "../types";

const db = new Dexie("ConsoleDatabase") as Dexie & {
  console: EntityTable<
    Data,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  console: "++id, messages",
});

export { db };
