import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../../../components/Table/Table";
import React from "react";

export default {
    id: "1",
    title: "React Table Component/Features/Empty",
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    lines: [],
};

export const WithGivenColumns = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithGivenColumns.storyName = "With columns";
WithGivenColumns.args = {
    lines: [],
    columns: [
        "id",
        "title",
        "city",
        "date",
    ],
};
