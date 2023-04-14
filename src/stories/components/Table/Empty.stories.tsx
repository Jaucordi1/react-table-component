import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../components/Table/Table";
import React from "react";

export default {
    id: '1',
    title: 'React Table Component/Empty',
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Empty = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Empty.args = {
    lines: [],
};

export const WithColumns = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithColumns.args = {
    lines: [],
    columns: [
        'id',
        'title',
        'city',
        'date',
    ],
};

export const WithRenamedColumn = Template.bind({});
WithRenamedColumn.args = {
    lines: [],
    columns: {
        id: '#',
        title: 'Title',
        city: 'City',
        date: 'Creation date',
    },
};
