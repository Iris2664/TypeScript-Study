import { expect, test } from "bun:test";
import { formatToItem } from "./format";

const itemMemo = {
    id: 1,
    content: "メモ",
    kind: "memo",
    archived: false,
} as const;

const itemTodo = {
    id: 2,
    content: "Todo",
    kind: "todo",
    archived: false,
}   as const;

test("formatToItem", () => {
    expect(formatToItem(itemMemo)).toBe("- メモ");
    expect(formatToItem(itemTodo)).toBe("o Todo");
});