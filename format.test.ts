import { expect, test } from "bun:test";
import { formatToItem } from "./format";

test("formatToItem", () => {
    expect(formatToItem("メモ")).toBe("- メモ");
});