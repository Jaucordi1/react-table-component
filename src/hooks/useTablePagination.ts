import React from "react";
import {useSelect} from "./useSelect";

const chunk = <T>(array: T[], size: number): T[][] => {
    const result: T[][] = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
};

export function useTablePagination<LINE extends Record<string, any>, COLUMN extends keyof LINE, LPPA extends number[], LPP extends LPPA[number]>(
    lines: LINE[],
    linesPerPage: LPPA,
    defaultLinePerPage: LPP,
) {
    // Pagination
    const [linePerPage, changeLinePerPage, linePerPageOptions] = useSelect(linesPerPage);
    const [pageCursor, setPageCursor] = React.useState(1);
    const lineCount = React.useMemo(() => lines.length, [lines]);
    const pageCount = React.useMemo(() => Math.ceil(lines.length / linePerPage), [lines, linePerPage]);
    const pages = React.useMemo(() => {
        const pages = chunk(lines, linePerPage);
        if (pages.length === 0) pages.push([]);
        return pages;
    }, [lines, linePerPage]);

    // Helpers
    const getPageForLineIndex = (lineIndex: number, lineCount: number, linePerPage: number) => {
        if (lineIndex < 0 || lineIndex >= lineCount) {
            return null;
        }

        const pageCount = Math.ceil(lineCount / linePerPage);
        const pageNumber = Math.ceil((lineIndex + 1) / linePerPage);

        if (pageNumber < 1 || pageNumber > pageCount) {
            return null;
        }

        return pageNumber;
    };
    const getPaginationList = React.useCallback((): number[] => {
        const paginationList: number[] = [1];

        if (pageCount <= 1) {
            return paginationList;
        }

        let start = Math.max(2, pageCursor - 2);
        let end = Math.min(pageCount, pageCursor + 2);

        if (start === 2) {
            end = Math.min(pageCount, start + 4);
        }

        if (end === pageCount) {
            start = Math.max(2, end - 4);
        }

        for (let i = start; i <= end; i++) {
            paginationList.push(i);
        }

        return paginationList;
    }, [pageCount, pageCursor]);
    const setPage = React.useCallback((page: number) => setPageCursor(Math.min(Math.max(page, 1), pageCount)), [pageCount]);
    const nextPage = React.useCallback(() => setPageCursor(page => Math.min(page + 1, pageCount)), [pageCount]);
    const previousPage = () => setPageCursor(page => Math.max(page - 1, 1));

    return [
        {
            setPage,
            previousPage,
            nextPage,
            getPageForLineIndex,
            getPaginationList,
            changeLinePerPage,
            pages,
            actualPage: pageCursor,
            lineCount,
            actualPageLines: pages[Math.max(pageCursor - 1, 0)],
            linePerPageOptions,
            linePerPage,
            defaultLinePerPage,
        },
    ] as const;
}
