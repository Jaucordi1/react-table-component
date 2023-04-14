import {ComponentMeta, ComponentStory} from "@storybook/react";
import Table from "../../../components/Table/Table";
import React from "react";

export default {
    id: '2',
    title: 'React Table Component/Columns',
    component: Table,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

type MediaType = 'image' | 'sound' | 'video';
type Media = { id: string, type: MediaType, name: string, url: string };
type Post = { id: string, title: string, description?: string, content: string, medias?: Media[], date: Date };
const MEDIAS: Media[] = [
    {
        id: '1',
        type: 'sound',
        name: 'The 4 Seasons, Op. 8/4, RV 297, "Winter"',
        url: 'https://music.youtube.com/watch?v=6RuXDDIC3PU',
    },
    {
        id: '2',
        type: 'image',
        name: '31Ob89vnESs1421519sUT8B1KSDwrYgDiRdij1dWXiaicigssilSMR7OaWvGzFRj9WOkdtlYDIW_Sxlqtg',
        url: 'https://lh3.googleusercontent.com/31Ob89vnESs1421519sUT8B1KSDwrYgDiRdij1dWXiaicigssilSMR7OaWvGzFRj9WOkdtlYDIW_Sxlqtg=w544-h544-l90-rj',
    },
    {
        id: '3',
        type: 'video',
        name: 'Les Quatre Saisons de Antonio Vivaldi',
        url: 'https://youtu.be/C243DQBfjho?t=1868',
    },
];
const LINES: Post[] = [
    {
        id: "1",
        title: "Winter from 4 seasons by Antiono Vivaldi!",
        medias: MEDIAS,
        description: 'Just listen to it!',
        content: 'Cum armarium crescere, omnes absolutioes fallere raptus, flavum detriuses.\n' +
            'Pol, historia!Velox, salvus calcarias una amor de clemens, peritus castor.\n' +
            'Urbs, genetrix, et ratione.',
        date: new Date(),
    },
    {
        id: "2",
        title: "Free article",
        content: 'Draft',
        date: new Date(),
    },
];

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

export const ColumnsDotNotation = Template.bind({});
ColumnsDotNotation.args = {
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
