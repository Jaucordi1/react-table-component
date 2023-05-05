import React from "react";
import {render, screen} from "@testing-library/react";
import {LINES} from "../../stories/components/dataset";
import Table from "./Table";

const now = new Date();

describe("Table component", function () {
    describe("Pagination", function () {
        describe("Lines Per Page", function () {
            test("", function () {
                render(<Table lines={LINES} linesPerPage={5} />);
                const element = screen.getByText("Showing 1 to 5 of 6 entries");
                expect(element).not.toBeFalsy();
            });
        });
    });
    describe("Data types", function () {
        test("Date", function () {
            render(<Table lines={LINES} columns={["date"]} />);
            const elements = screen.getAllByText(now.toLocaleDateString());
            expect(elements).toHaveLength(4);
        });
    });
});
