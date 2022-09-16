export type CellTypes = "code" | "text";
export type Directions = "up" | "down";

export interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}
