/// <reference types="react" />
interface TableProps<T extends {}, K extends keyof T> {
    lines: T[];
    columns?: K[];
}
declare function Table<T extends {}, K extends keyof T>(props: TableProps<T, K>): JSX.Element;

export { Table };
