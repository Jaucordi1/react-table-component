import React from "react";
import {render, screen} from "@testing-library/react";
import {LINES} from "../../stories/components/dataset";
import Table from "./Table";

const now = new Date();

describe("Table component", function () {
    describe("Data types", function () {
        test("Date", function () {
            render(<Table lines={LINES} columns={["date"]} />);
            const elements = screen.getAllByText(now.toLocaleDateString());
            expect(elements).toHaveLength(3);
        });
    });
});
