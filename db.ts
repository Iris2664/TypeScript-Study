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