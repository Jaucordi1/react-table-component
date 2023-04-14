import React from "react";
import {DOTNotationUtils, Path} from "../utils/DotNotationUtils";

function extractColumns<T extends { [key: string]: unknown }, K extends Path<T>>(obj: T): K[] {
    const keys = (Object.keys(obj) as K[]);
    return Array.from(
        keys.reduce(
            (allKeys, rootKey) => {
                if (typeof obj[rootKey] === 'object' && !(obj[rootKey] instanceof Date)) {
                    extractColumns(
                        DOTNotationUtils.getObjectValue(obj, rootKey) as {},
                    ).forEach(k => allKeys.add(`${rootKey as string}.${k}` as K));
                } else {
                    allKeys.add(rootKey);
                }
                return allKeys;
            },
            new Set<K>(),
        )
    );
}

function columnArray2columnObject<K extends string>(columns: K[]) {
    return columns.reduce(
        (obj, column) => {
            obj[column] = column;
            return obj;
        },
        {} as Record<K, string>,
    );
}

export function useTableColumns<T extends Record<string | number, any>, K extends Path<T>>(lines: T[], columns?: K[] | Partial<Record<K, string>>) {
    const cols = React.useMemo<Partial<Record<K, string>>>(() => {
        if (!columns) {
            // Get columns from lines
            return lines.reduce(
                (obj, line) => {
                    extractColumns(line).forEach(key => obj[key as K] = key as string);
                    return obj;
                },
                {} as Record<K, string>,
            );
        } else if (Array.isArray(columns)) {
            return columnArray2columnObject(columns);
        }
        return columns satisfies Partial<Record<K, string>>;
    }, [lines, columns]);
    return [cols] as const;
}
