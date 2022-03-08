# turnstone-recent-searches

In development

<!-- This is a plugin for the Turnstone autocomplete component.

It displays the user's most recent searches when the search input receives focus and before
any value is entered.

## Installation

To install:

```bash
$ npm install turnstone turnstone-recent-searches
```

## Usage

```jsx
import React from 'react'
import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'
import { fruits, vegetables } from './data'

const listbox = [
  {
    data: fruits,
    searchType: 'startswith',
    name: 'Fruits'
  },
  {
    data: vegetables,
    searchType: 'contains',
    name: 'Vegetables'
  }
]

const plugins = [
  [
    recentSearchesPlugin,
    {
      name: 'Recent'
    }
  ]
]

const App = () => {
  return (
    <Turnstone
      clearButton={true}
      listbox={listbox}
      listboxIsImmutable={true}
      placeholder="Type something fruity"
      plugins={plugins}
    />
  )
}

export default App
```

## License

MIT © [tomsouthall](https://github.com/tomsouthall) -->
