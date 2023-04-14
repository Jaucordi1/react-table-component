import React from "react";
import {Path, useDotNotation} from "./useDotNotation";
import {useStringify} from "./useStringify";

export function useTableSearch<T extends Record<string, any>, K extends Path<T>>(
    lines: T[],
    cols: Partial<Record<K, string>>,
    caseSensitive: boolean = false
) {
    // helpers
    const [valueToString] = useStringify();
    const [getDotNotationValue] = useDotNotation();
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    // State
    const [currentSearch, setCurrentSearch] = React.useState<string>("");
    const [filteredLines, setFilteredLines] = React.useState<T[]>([...lines]);

    // Handlers
    const searchFilter = React.useCallback((line: T, currentSearch: string) => {
        const columns = (Object.keys(cols) as K[]);
        return columns.some(column => {
            const stringValue = valueToString(getDotNotationValue(line, column));
            return (
                caseSensitive
                    ? stringValue
                    : stringValue.toLocaleLowerCase()
            ).includes(
                caseSensitive
                    ? currentSearch
                    : currentSearch.toLocaleLowerCase()
            );
        });
    }, [currentSearch, cols, getDotNotationValue, valueToString]);
    const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newTerms = event.target.value;
        setCurrentSearch(newTerms);
        setFilteredLines(lines.filter(line => searchFilter(line, newTerms)));
    }, [lines, searchFilter]);

    return [{
        searchValue: currentSearch,
        filteredLines,
        handleSearchChange,
        searchInputRef,
    }] as const;
}
