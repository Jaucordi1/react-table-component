import React from "react";
import {LINES} from "../../../dataset";
import {Table} from "../../../../../components";
import {ComponentMeta, ComponentStory} from "@storybook/react";

export default {
    id: "2",
    title: "React Table Component/Features/Columns",
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
    lines: LINES,
};

export const ColumnList = Template.bind({});
ColumnList.storyName = "Selecting visible columns (array)";
ColumnList.args = {
    lines: LINES,
    columns: [
        "id",
        "title",
        "description",
        "date",
    ],
};

export const RenamedColumns = Template.bind({});
RenamedColumns.storyName = "Renaming visible columns (object)";
RenamedColumns.args = {
    lines: LINES,
    columns: {
        id: "#",
        title: "Title",
        description: "Description",
        date: "Creation date",
    },
};

export const ArraysDotNotation = Template.bind({});
ArraysDotNotation.storyName = "Arrays dot notation";
ArraysDotNotation.args = {
    lines: LINES,
    columns: [
        "id",
        "title",
        "medias.0.id",
        "medias.0.type",
        "medias.0.name",
        "medias.0.url",
        "date",
    ],
};

export const ObjectsDotNotation = Template.bind({});
ObjectsDotNotation.storyName = "Objects dot notation";
ObjectsDotNotation.args = {
    lines: LINES,
    columns: [
        "id",
        "title",
        "thumbnail.id",
        "thumbnail.type",
        "thumbnail.name",
        "thumbnail.url",
        "date",
    ],
};
