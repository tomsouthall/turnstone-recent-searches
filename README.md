# turnstone-recent-searches

This is a plugin for the [Turnstone autocomplete component](https://github.com/tomsouthall/turnstone).

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

const App = () => {
  return (
    <Turnstone
      clearButton={true}
      listbox={listbox}
      listboxIsImmutable={true}
      placeholder="Type something fruity"
      plugins={[recentSearchesPlugin]}
    />
  )
}

export default App
```

Note that if you are already passing a `defaultListbox` prop, the recent searches will be added as the first group and can be specified with a `ratio` value etc, just like any other group.

The `defaultListboxIsImmutable` prop will be set to `false` given that recently selected items change upon each user selection.

The following is an example of a `defaultListbox` prop being supplied alongside the recent searches plugin. Here, ideally the recent searches will take up to 6 of the 10 available slots and the popular items will take up 4.

```jsx
import React from 'react'
import Turnstone from 'turnstone'
import recentSearchesPlugin from 'turnstone-recent-searches'
import { fruits, vegetables, popular } from './data'

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

const defaultListbox = [
  {
    data: popular,
    id: 'popular',
    name: 'Popular Fruits & Veg'
    ratio: 4
  }
]

const plugins = [
  [
    recentSearchesPlugin,
    {
      id: 'recent'
      name: 'Recent Selections',
      ratio: 6
    }
  ]
]

const App = () => {
  return (
    <Turnstone
      clearButton={true}
      defaultListbox={defaultListbox}
      listbox={listbox}
      listboxIsImmutable={true}
      maxItems={10}
      placeholder="Type something fruity"
      plugins={plugins}
    />
  )
}

export default App
```

## License

MIT © [tomsouthall](https://github.com/tomsouthall)
