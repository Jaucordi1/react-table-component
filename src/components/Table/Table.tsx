import "./Table.component.css";
import React from "react";
import classNames from "classnames";
import type {Path} from "../../hooks/useDotNotation";
import {useTable} from "../../hooks/useTable";

export interface TableProps<
    T extends Record<string | number, any>,
    K extends Path<T>,
    LPPA extends number[],
    LPP extends LPPA[number]
> extends React.TableHTMLAttributes<HTMLTableElement> {
    lines: T[];
    columns?: K[] | Partial<Record<K, string>>;
    caseSensitiveSearch?: boolean;
    compactMode?: boolean;
    allowSelect?: boolean;
    linesPerPageOptions?: LPPA;
    linesPerPage?: LPP;
}

export default function Table<
    T extends Record<string | number, any>,
    K extends Path<T>,
    LPPA extends number[],
    LPP extends LPPA[number]
>(props: TableProps<T, K, LPPA, LPP>) {
    const {
        lines,
        columns,
        className,
        allowSelect = false,
        compactMode = true,
        linesPerPageOptions = [3, 5, 10],
        linesPerPage = 5,
        ...mainProps
    } = props;

    const [{
        cols,
        pages,
        actualPageLines,
        actualPage,
        linePerPageOptions,
        linePerPage,
        renderSorter,
        renderCellData,
        handleSearchChange,
        searchValue,
        sortByColumn,
        sortState,
        setPage,
        previousPage,
        nextPage,
        changeLinePerPage,
        getPaginationList,
        handleLinePerPageChange,
        sortedLines,
        getPageForLineIndex,
        valueToString,
        getDotNotationValue,
        getValueToSort,
        lineSorter,
        lineCount,
        defaultLinePerPage,
        searchInputRef,
    }] = useTable({lines, columns, linesPerPage, linesPerPageOptions});

    const hasHeadings = actualPageLines.length > 0 || (!!cols && Object.keys(cols).length > 0);

    // TODO Make the default value work correctly for LPP
    // console.debug(defaultLinePerPage, linePerPage);

    const TableComponent = () => (
        <div className={classNames("table-wrapper", {
            "empty": actualPageLines.length === 0,
        })}>
            <div className="table-top">
                <div>
                    Show&nbsp;
                    <select className="table-line-per-page-select" value={linePerPage} onChange={changeLinePerPage}>
                        {linePerPageOptions.map((linePerPageOption, idx) => (
                            <option key={idx} value={linePerPageOption}>{linePerPageOption}</option>
                        ))}
                    </select>
                    &nbsp;entries
                </div>
                <p className="table-sorting-state">
                    <span>Sorted on column <b>{cols[sortState.column]}</b></span>
                    <span>by order <b>{sortState.direction.toLocaleUpperCase()}</b></span>
                </p>
                <div>
                    <input type="search" name="table-search" className="table-search-input" ref={searchInputRef}
                           placeholder="Search…" onChange={handleSearchChange} value={searchValue} />
                </div>
            </div>
            <table {...mainProps} className={classNames("table", {
                "no-select": !allowSelect,
                "with-heading": hasHeadings,
                "compact": compactMode,
            }, className)}>
                {hasHeadings && (
                    <thead className="table-head">
                        <tr className="table-row">
                            {(Object.keys(cols) as K[]).map((column, idx) => {
                                const parts = String(cols[column]).split(".");
                                return (
                                    <th key={idx} className="table-cell table-head-cell table-sorting-cell"
                                        onClick={() => sortByColumn(column)}>
                                        {parts.join(" > ")}
                                        <div className="table-head-cell-sorter-container">
                                            {renderSorter(column, "asc")}
                                            {renderSorter(column, "desc")}
                                        </div>
                                    </th>
                                );
                            })}
                            <td className="table-cell table-sizing-cell"></td>
                        </tr>
                    </thead>
                )}
                <tbody className="table-body">
                    {actualPageLines.length === 0 ? (
                        <tr className="table-row table-nodata-row">
                            <td className="table-cell table-nodata-cell" colSpan={Object.keys(cols).length}>
                                No data available in table
                            </td>
                        </tr>
                    ) : (actualPageLines.map((line, lineIdx) => (
                        <tr key={lineIdx} className="table-row">
                            {(Object.keys(cols) as K[]).map((column, columnIdx) => (
                                <td key={columnIdx} className="table-cell table-data-cell">
                                    {renderCellData(line, column) || null}
                                </td>
                            ))}
                            <td className="table-cell table-sizing-cell"></td>
                        </tr>
                    )))}
                </tbody>
            </table>
            <div className="table-bottom no-select">
                <div className="table-pagination-state">
                    Showing&nbsp;
                    {lines.length === 0 ? 0 : ((actualPage - 1) * linePerPage) + 1}
                    &nbsp;to&nbsp;
                    {((actualPage - 1) * linePerPage) + actualPageLines.length}
                    &nbsp;of&nbsp;
                    {lines.length}
                    &nbsp;entries
                </div>
                <div className={classNames("table-pagination-controls", {
                    "no-pages": getPaginationList().length === 0,
                })}>
                    <button className={classNames("table-prev-page", {
                        "active": actualPage > 1,
                    })} onClick={previousPage}>Previous
                    </button>
                    {getPaginationList().map((page) => (
                        <button key={page} className={classNames("table-page", {
                            "current": page === actualPage,
                        })}
                                onClick={() => setPage(page)}
                                children={page} />
                    ))}
                    <button className={classNames("table-next-page", {
                        "active": actualPage < pages.length,
                    })} onClick={nextPage}>Next
                    </button>
                </div>
            </div>
        </div>
    )

    return <TableComponent />
}
