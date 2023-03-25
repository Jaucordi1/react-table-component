import React from 'react';

function valueToString(value: unknown): string {
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

function getDotNotationValue<T extends {}, K extends keyof T>(obj: T, key: K | string) {
    const parts = (key as string).split('.');
    return parts.reduce((value, keyPart) => {
        return value[keyPart as keyof typeof value];
    }, obj as {}) as K[];
}

function extractColumns<T extends { [key: string]: unknown }, K extends keyof T>(obj: T): K[] {
    const keys = (Object.keys(obj) as K[]);
    return Array.from(
        keys.reduce(
            (allKeys, key) => {
                if (typeof obj[key] === 'object') {
                    extractColumns(
                        getDotNotationValue(obj, key) as {}
                    ).forEach(k => allKeys.add(`${key as string}.${k}` as K));
                } else {
                    allKeys.add(key);
                }
                return allKeys;
            },
            new Set<K>(),
        )
    );
}

export interface TableProps<T extends {}, K extends keyof T> {
    lines: T[];
    columns?: K[];
}

export default function Table<T extends {}, K extends keyof T>(props: TableProps<T, K>) {
    let {lines, columns, ...mainProps} = props;
    if (!columns) {
        columns = Array.from(
            lines.reduce((keys, line) => {
                extractColumns(line).forEach(key => keys.add(key as K));
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
                            {valueToString(getDotNotationValue(line, column))}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
