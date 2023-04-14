import {useTableSorting} from "./useTableSorting";
import {useStringify} from "./useStringify";
import {useTableColumns} from "./useTableColumns";
import {TableProps} from "../components/Table/Table";
import {useTablePagination} from "./useTablePagination";
import {useTableSearch} from "./useTableSearch";
import {Path, useDotNotation} from "./useDotNotation";

type UseTableProps<T extends Record<string, any>, K extends Path<T>, LPPA extends number[], LPP extends LPPA[number]> =
    Required<Pick<TableProps<T, K, LPPA, LPP>, 'lines' | 'linesPerPageOptions'>>
    & Pick<TableProps<T, K, LPPA, LPP>, 'caseSensitiveSearch' | 'allowSelect' | 'linesPerPage'>
    & {
    columns?: K[] | Partial<Record<K, string>>;
};

export function useTable<T extends Record<string, any>, K extends Path<T>, LPPA extends number[], LPP extends LPPA[number]>(props: UseTableProps<T, K, LPPA, LPP>) {
    const {
        lines,
        columns,
        caseSensitiveSearch,
        linesPerPageOptions,
        linesPerPage = linesPerPageOptions[Math.floor(linesPerPageOptions.length / 2)] as LPP,
    } = props;

    // Helpers
    const [getDotNotationValue] = useDotNotation();
    const [valueToString] = useStringify();

    // Columns management
    const [cols] = useTableColumns(lines, columns);

    // Search filter
    const [{
        searchValue,
        filteredLines,
        handleSearchChange,
        searchInputRef
    }] = useTableSearch(lines, cols, caseSensitiveSearch);

    // Columns Sorting management
    const [renderSorter, {
        sortByColumn,
        lineSorter,
        getValueToSort
    }, columnSorting] = useTableSorting<T, K, typeof cols>(cols);
    const sortedLines = [...filteredLines].sort(lineSorter);

    // Data access
    const renderCellData = (line: T, column: K) => valueToString(getDotNotationValue(line, column));

    // Pagination
    const [
        {
            pages, actualPageLines,
            linePerPageOptions, actualPage, linePerPage,
            lineCount, defaultLinePerPage,
            setPage, previousPage, nextPage, changeLinePerPage, getPageForLineIndex, getPaginationList,
        }
    ] = useTablePagination(
        sortedLines,
        linesPerPageOptions,
        // [10, 25, 50, 100],
        linesPerPage,
    );
    const handleLinePerPageChange: typeof changeLinePerPage = (event) => {
        const newLinePerPage = changeLinePerPage(event);
        if (newLinePerPage === null) return newLinePerPage;
        const lineCount = sortedLines.length;
        const newPageCount = Math.ceil(lineCount / newLinePerPage);
        const oldPageCount = pages.length;
        if (oldPageCount !== newPageCount) {
            const newLineIndexPage = getPageForLineIndex(0, lineCount, newLinePerPage);
            if (newLineIndexPage === null) return newLinePerPage;
            setPage(newLineIndexPage);
        }
        return newLinePerPage;
    };

    return [
        {
            // Helpers
            getDotNotationValue,
            valueToString,
            // Columns management
            cols,
            // Search filter
            searchValue,
            handleSearchChange,
            searchInputRef,
            // Columns sorting management
            renderSorter,
            sortByColumn,
            lineSorter,
            getValueToSort,
            sortState: columnSorting,
            // Data access
            renderCellData,
            // Pagination
            pages,
            actualPageLines,
            linePerPageOptions,
            defaultLinePerPage,
            actualPage,
            linePerPage,
            lineCount,
            setPage,
            previousPage,
            nextPage,
            changeLinePerPage,
            getPageForLineIndex,
            getPaginationList,
            sortedLines,
            handleLinePerPageChange,
        },
    ] as const;
}
