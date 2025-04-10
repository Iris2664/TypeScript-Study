export type Kind = "memo" | "todo" | "done";

export interface Item {
    id: number;
    content: string;
    kind: Kind;
}
