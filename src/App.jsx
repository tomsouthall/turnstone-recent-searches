import React from 'react'
import RecentSearchesPlugin from './lib'
import render from './render'

const App = () => {
  const Container = () => <div>Foobar</div>
  const componentProps = {plugins: [RecentSearchesPlugin]}

  return render(Container, componentProps, [RecentSearchesPlugin], 0)
}

export default App
