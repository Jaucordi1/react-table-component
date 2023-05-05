export type MediaType = 'image' | 'sound' | 'video';

export interface Media {
    id: string;
    type: MediaType;
    name: string;
    url: string;
}

export interface Post {
    id: string;
    active: boolean;
    title: string;
    description?: string;
    content: string;
    thumbnail?: Media;
    medias?: Media[];
    date: Date;
}

export const MEDIAS: Media[] = [
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

export const LINES: Post[] = [
    {
        id: "1",
        active: true,
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
        active: true,
        title: "Free article",
        content: 'Draft',
        date: new Date(),
    },
    {
        id: "3",
        active: true,
        title: "Article with thumbnail",
        content: 'Draft',
        thumbnail: MEDIAS.find(media => media.type === 'image'),
        date: new Date(),
    },
    {
        id: "4",
        active: false,
        title: "Test 1",
        content: 'Draft',
        date: new Date(),
    },
    {
        id: "5",
        active: false,
        title: "Test 2",
        content: 'Draft',
        date: new Date(),
    },
    {
        id: "6",
        active: false,
        title: "Test 3",
        content: 'Draft',
        date: new Date(),
    },
];
