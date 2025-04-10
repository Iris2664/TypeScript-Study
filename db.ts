import { Database} from "bun:sqlite";
import type { Kind, Item } from "./types";

export function initalizeItemTable(db: Database) {
        const aueryString = `CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            content TEXT NOT NULL,
            kind TEXT NOT NULL
        )`;
        const query = db.prepare(aueryString);
        query.run();
}

export function createItem(db: Database, content: string, kind: Kind) {
    const queryString = `INSERT INTO items (content, kind) VALUES (?, ?)`;
    const query = db.prepare(queryString);
    query.run(content, kind);
}

export function getItems(db: Database): Item[] {
    const queryString = `SELECT * FROM item`;
    const query = db.prepare(queryString);
    return query.all() as Item[];
}
