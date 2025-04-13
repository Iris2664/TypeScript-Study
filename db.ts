import { Database} from "bun:sqlite";
import type { Kind, Item } from "./types";

export function initalizeItemTable(db: Database) {
        const aueryString = `CREATE TABLE IF NOT EXISTS item (
            id INTEGER PRIMARY KEY,
            content TEXT NOT NULL,
            kind TEXT NOT NULL,
            archived BOOLEAN DEFAULT FALSE
        )`;
        const query = db.prepare(aueryString);
        query.run();
}

export function createItem(db: Database, content: string, kind: Kind) {
    const queryString = `INSERT INTO item (content, kind) VALUES (?, ?)`;
    const query = db.prepare(queryString);
    query.run(content, kind);
}

export function getItems(db: Database): Item[] {
    const queryString = `SELECT * FROM item`;
    const query = db.prepare(queryString);
    return query.all() as Item[];
}

export function updateTodoToDone(db: Database, content: string) {
    const targetQueryString = `SELECT * FROM item WHERE content = ?`;
    const targetQuery = db.prepare(targetQueryString);
    const targetList = targetQuery.all(content) as Item[];
    const target = targetList.pop();

    if ( target === undefined) {
        throw new Error("対象の項目が見つかりませんでした．");
    } else if (target.kind === "memo") {
        throw new Error("メモは完了にできません．");
    }

    const queryString = `UPDATE item SET kind = "done" WHERE id = ?`;
    const query = db.prepare(queryString);
    query.run(target.id);
}

export function deleteItem(db: Database, content: string) {
    const queryString = `DELETE FROM item WHERE content = ?`;
    const query = db.prepare(queryString);
    query.run(content);
}

export function archiveItems(db: Database) {
    const queryString = `UPDATE item SET archived = TRUE WHERE kind = "memo" OR kind = "done"`;
    const query = db.prepare(queryString);
    query.run();
}