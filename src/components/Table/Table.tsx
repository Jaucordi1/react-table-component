import React from 'react';

export interface TableProps<T extends {}, K extends keyof T> {
    lines: T[];
    columns?: K[];
}

function valueToString<T extends {}, K extends keyof T>(value: T[K]): string {
    if (value instanceof Date) {
        return value.toString();
    }
    switch (typeof value) {
        case "string":
            return value;
        case "number":
        case "bigint":
            return value.toString(10);
        case "object":
            return JSON.stringify(value);
        case "undefined":
            return "";
        case "boolean":
            return value ? 'TRUE' : 'FALSE';
        case "function":
        case "symbol":
            return String(value);
        default:
            return '';
    }
}

export default function Table<T extends {}, K extends keyof T>(props: TableProps<T,K>) {
    let {lines, columns, ...mainProps} = props;
    if (!columns) {
        columns = Array.from(
            lines.reduce((keys, line) => {
                (Object.keys(line) as K[]).forEach(key => keys.add(key));
                return keys;
            }, new Set<K>())
        );
    }

    return (
        <table {...mainProps}>
            {columns && (
                <thead>
                <tr>
                    {columns.map((column, idx) => (
                        <th key={idx}>{String(column)}</th>
                    ))}
                </tr>
                </thead>
            )}
            <tbody>
            {lines.map((line, lineIdx) => (
                <tr key={lineIdx}>
                    {columns!.map((column, columnIdx) => (
                        <td key={columnIdx}>
                            {valueToString(line[column])}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
