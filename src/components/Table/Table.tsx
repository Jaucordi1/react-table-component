import './Table.component.css';
import classNames from 'classnames';
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
                if (typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
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

export interface TableProps<T extends {}, K extends keyof T> extends React.TableHTMLAttributes<HTMLTableElement> {
    lines: T[];
    columns?: K[] | { K?: string };
}

export default function Table<T extends Record<string, any>, K extends keyof T>(props: TableProps<T, K>) {
    let {lines, columns, className, ...mainProps} = props;
    if (!columns) {
        columns = lines.reduce(
            (obj, line) => {
                extractColumns(line).forEach(key => obj[key as K] = key as string);
                return obj;
            },
            {} as Record<K, string>,
        );
    } else if (Array.isArray(columns)) {
        columns = columns.reduce((obj, column) => {
            obj[column as K] = column as string;
            return obj;
        }, {} as Record<K, string>);
    }
    const cols = columns satisfies { K?: string };

    return (
        <table {...mainProps} className={classNames('table', className)}>
            {columns && (
                <thead className="table-head">
                <tr className="table-row">
                    {(Object.keys(cols) as (keyof typeof cols)[]).map((column, idx) => {
                        const parts = String(cols[column]).split('.');
                        return (
                            <th key={idx} className="table-head-cell">
                                {parts.map((part, i) => {
                                    return (
                                        <>
                                            {part}
                                            <br />
                                        </>
                                    )
                                })}
                            </th>
                        );
                    })}
                </tr>
                </thead>
            )}
            <tbody className="table-body">
            {lines.map((line, lineIdx) => (
                <tr key={lineIdx} className="table-row">
                    {(Object.keys(cols) as (keyof typeof cols)[]).map((column, columnIdx) => (
                        <td key={columnIdx} className="table-data-cell">
                            {valueToString(getDotNotationValue(line, column))}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}
