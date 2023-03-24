type ColumnValue = string | number | boolean | Date;
import React from 'react';

export interface TableProps<C extends string, T extends Record<C, ColumnValue>> {
    lines: T[];
    columns?: (keyof T)[];
}

function valueToString(value: ColumnValue): string {
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
    }
}

export default function Table<C extends string, T extends Record<C, ColumnValue>>(props: TableProps<C, T>) {
    let {lines, columns, ...mainProps} = props;
    if (!columns) {
        columns = Array.from(
            lines.reduce((keys, line) => {
                Object.keys(line).forEach(key => keys.add(key));
                return keys;
            }, new Set<string>())
        ) as (keyof T)[];
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
                            {valueToString(line[column as keyof T])}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
