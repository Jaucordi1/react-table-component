import React from "react";
import classNames from "classnames";
import {Path, useDotNotation} from "./useDotNotation";
import {useGetSortableValue} from "./useGetSortableValue";

export function useTableSorting<T extends Record<string | number, any>, K extends Path<T>, C extends Partial<Record<K, string>>>(columns: C) {
    const [getValueToSort] = useGetSortableValue();
    const [getDotNotationValue] = useDotNotation();
    const [sorting, setSorting] = React.useState<{
        column: K;
        direction: 'asc' | 'desc';
    }>({
        column: Object.keys(columns)[0] as K,
        direction: 'asc',
    });
    const sortByColumn = (column: K) => setSorting((sorting) => ({
        column: column,
        direction: column === sorting.column
            ? sorting.direction === 'asc' ? 'desc' : 'asc'
            : 'asc',
    }));
    const renderColumnSorter = (column: K, direction: 'asc' | 'desc') => (
        <div key={[column, direction].join('-')} className={classNames("table-head-cell-sorter", direction, {
            "enabled": column === sorting.column && direction === sorting.direction,
            "disabled": column === sorting.column && direction !== sorting.direction,
        })} />
    );

    const sortAsc = (a: string | number, b: string | number) => {
        if (a < b) return -1;
        return Number(a > b);
    };
    const sortDesc = (a: string | number, b: string | number) => {
        if (a > b) return -1;
        return Number(a < b);
    };
    const lineSorter = (a: T, b: T) => {
        const valueA = getValueToSort(getDotNotationValue(a, sorting.column));
        const valueB = getValueToSort(getDotNotationValue(b, sorting.column));
        if (sorting.direction === 'asc') {
            return sortAsc(valueA, valueB);
        } else {
            return sortDesc(valueA, valueB);
        }
    };

    return [renderColumnSorter, {sortByColumn, lineSorter, getValueToSort}, sorting] as const;
}
