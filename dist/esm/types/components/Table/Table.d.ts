/// <reference types="react" />
export interface TableProps<T extends {}, K extends keyof T> {
    lines: T[];
    columns?: K[];
}
export default function Table<T extends {}, K extends keyof T>(props: TableProps<T, K>): JSX.Element;
