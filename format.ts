import type { Item, Kind } from "./types";

export function symbolizeKind(kind: Kind): string {
    switch (kind) {
        case "memo":
            return "-";
        case "todo":
            return "o";
        case "done":
            return "x";
    }
}

export function formatToItem(item : Item): string {
    const symbol = symbolizeKind(item.kind);
    return `${symbol} ${item.content}`;
}