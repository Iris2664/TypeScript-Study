import { Database } from "bun:sqlite";
import {
    archiveItems,
    createItem,
    deleteItem,
    getItems,
    initalizeItemTable,
    updateTodoToDone,
} from "./db.ts";
import { formatToItem } from "./format.ts";

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
      updateTodoToDone(db, content);
      break;
    case "drop":
        deleteItem(db, content);
        break;
    default:
      throw new Error("不正なコマンドです．");
  }
  //console.log(result);
} else if (Bun.argv.length === 3) {
    const command: string = Bun.argv.pop() ?? "";

    switch (command) {
        case "trim":
            archiveItems(db);
            break;
        default:
            throw new Error("不正なコマンドです．");
    }
} else if (Bun.argv.length === 2) {
  const items = getItems(db);
  items.forEach((item) => {
    console.log(formatToItem(item));
  });
} else {
  throw new Error("追加のコマンドライン引数の数が多すぎます．");
}

db.close();
