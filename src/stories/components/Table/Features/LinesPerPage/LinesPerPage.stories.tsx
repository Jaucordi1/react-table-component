import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../../../components/Table/Table";
import React from "react";
import {LINES} from "../../../dataset";

export default {
    id: "5",
    title: "React Table Component/Features/Lines Per Page",
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
    lines: LINES,
    columns: {
        "id": "#",
        "title": "Title",
        "description": "Description",
        "active": "Online",
        "date": "Creation Date",
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    lines: LINES,
    columns: {
        "id": "#",
        "title": "Title",
        "description": "Description",
        "active": "Online",
        "date": "Creation Date",
    },
    // linesPerPageOptions: [],
    linesPerPageOptions: [10],
};
