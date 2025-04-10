import { Database } from "bun:sqlite";
import { createItem, initalizeItemTable } from "./db.ts";

const db = new Database("sqlite.db");

initalizeItemTable(db);

if (Bun.argv.length === 4) {
    //コマンドライン引数の最後の文字列を取得する
    const content: string = Bun.argv.pop() ?? "";
    const command: string = Bun.argv.pop() ?? "";

    switch (command) {
        case "memo":
           createItem(db, content, "memo");
            break;
        case "todo":
            createItem(db, content, "todo");
            break;
        case "done":
            createItem(db, content, "done");
            break;
        default:
            throw new Error("不正なコマンドです．");
    }
    //console.log(result);
} else if (Bun.argv.length === 2) {
    //console.log(source);
} else {
    throw new Error("追加のコマンドライン引数の数が多すぎます．");
}

db.close();