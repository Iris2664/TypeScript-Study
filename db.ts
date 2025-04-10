import { Database} from "bun:sqlite";

export function initalizeItemTable(db: Database) {
        const aueryString = `CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            contest TEXT NOT NULL,
            kind TEXT NOT NULL
        )`;
        const query = db.prepare(aueryString);
        query.run();
}

type kind = "memo" | "todo" | "done";

export function createItem(db: Database, content: string, kind: string) {
    const queryString = `INSERT INTO items (content, kind) VALUES (?, ?)`;
    const query = db.prepare(queryString);
    query.run(content, kind);
}
