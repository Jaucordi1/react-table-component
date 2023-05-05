import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../components/Table/Table";
import React from "react";
import {LINES} from "../dataset";

export default {
    id: '2',
    title: 'React Table Component/Columns',
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const DefaultColumns = Template.bind({});
DefaultColumns.args = {
    lines: LINES,
};

export const WithColumnList = Template.bind({});
WithColumnList.args = {
    lines: LINES,
    columns: [
        'id',
        'title',
        'description',
        'date',
    ],
};

export const Arrays = Template.bind({});
Arrays.args = {
    lines: LINES,
    columns: [
        'id',
        'title',
        'medias.0.id',
        'medias.0.type',
        'medias.0.name',
        'medias.0.url',
        'date',
    ],
};

export const Objects = Template.bind({});
Objects.args = {
    lines: LINES,
    columns: [
        'id',
        'title',
        'thumbnail.id',
        'thumbnail.type',
        'thumbnail.name',
        'thumbnail.url',
        'date',
    ],
};

export const WithRenamedColumn = Template.bind({});
WithRenamedColumn.args = {
    lines: LINES,
    columns: {
        id: '#',
        title: 'Title',
        description: 'Description',
        'medias.0.id': 'Media',
        'medias.0.type': 'Media type',
        'medias.0.name': 'Media name',
        'medias.0.url': 'Media URL',
        date: 'Creation date',
    },
};
