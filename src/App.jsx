import React from 'react'
import recentSearchesPlugin from './lib'

const App = () => {
  const Container = () => {
    return (<div>Foobar</div>)
  }

  const r = recentSearchesPlugin(Container)
  const ContainerWithPlugin = r[0]
  const containerProps = r[1]

  return (
    <ContainerWithPlugin {...containerProps} />
  )
}

export default App
