import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../../../components/Table/Table";
import React from "react";
import {LINES} from "../../../dataset";

export default {
    id: '3',
    title: 'React Table Component/Features/Data Types',
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Primitive = Template.bind({});
Primitive.args = {
    lines: LINES,
    columns: {
        'id': '# (number)',
        'title': 'Title (string)',
        'active': 'Active (boolean)',
        'date': 'Date (Date)',
    },
};
