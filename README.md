<!-- TOC -->
* [What is it](#what-is-it)
* [How to install](#how-to-install)
* [How to use](#how-to-use)
<!-- TOC -->

# What is it

This is a study project.

# How to install

```shell
# npm
npm install --save smart-react-table
```

# How to use
Import Table component
```tsx
import {Table} from "smart-react-table"
```

Examples below use the following lines array
```tsx
const lines = [
    {
        id: 1, data: { name: "Example", date: new Date() }
    },
    {
        id: 2, data: { name: "Example 2", date: new Date() }
    },
    {
        id: 3, data: { name: "Example 3", date: new Date() }
    },
]
```

Automatic version
```tsx
// Automatically get all available columns from given lines
<Table lines={lines} />
```

Specify columns to display
```tsx
// Only display specified columns, accepting dot notation
<Table lines={lines} columns={[
    "id",
    "data.name",
    "data.date",
]} />

// You can also rename columns by giving a original/renamed object
<Table lines={lines} columns={{
    "id": "#",
    "data.name": "Name",
    "data.date": "Date",
}} />
```

Lines per page settings
```tsx
// Choose wich lines per page options are available
// (default to [3, 5, 10])
<Table lines={lines} linesPerPageOptions={[10, 20, 50, 100]} />

// Choose default lines per page
// (needs to be one of linesPerPageOptions item)
// (default to linesPerPageOptions array middle value
<Table lines={lines} linesPerPageOptions={[10, 20, 50, 100]} />

// Disable lines per page dropdown by giving component only 1 option
<Table lines={lines} linesPerPageOptions={[10]} />
```
Please check [the storybook on the github pages](https://jaucordi1.github.io/react-table-component/) to see more examples.
