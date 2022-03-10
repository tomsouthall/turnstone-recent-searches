import React from 'react'
import { describe, expect, test, beforeEach, afterAll } from 'vitest'
import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import recentSearchesPlugin from './index'

configure({ adapter: new Adapter() })

describe('Turnstone Recent Searches Plugin', () => {
  const clearLocalStorage = () => {
    localStorage.clear()
  }

  beforeEach(clearLocalStorage)
  afterAll(clearLocalStorage)

  test('Basic no props test', () => {
    const App = () => {
      const Container = () => <div>Foobar</div>
      const [ContainerWithPlugin, containerProps] = recentSearchesPlugin(Container)
      return <ContainerWithPlugin {...containerProps} />
    }

    const wrapper = shallow(
      <App />
    )

    expect(wrapper).not.toBeNull()
    expect(Array.isArray(wrapper.prop('defaultListbox'))).toBe(true)
    expect(typeof wrapper.prop('onSelect')).toBe('function')
  })

  test('Selected item is saved to localStorage', () => {
    const App = (props) => {
      const Container = ({onSelect}) => {
        if(onSelect) onSelect({name: 'foo'}, 'name')
        return <div>Foobar</div>
      }
      const [ContainerWithPlugin, containerProps] = recentSearchesPlugin(Container, props, {id: 'foobar', name: 'Recent'})
      return <ContainerWithPlugin {...containerProps} />
    }

    const wrapper = shallow(
      <App onSelect={() => null} />
    )

    expect(wrapper.prop('defaultListbox')).toEqual([
      {
        id: 'foobar',
        name: 'Recent',
        displayField: '_displayField',
        data: expect.any(Function),
        ratio: 1
      }
    ])
    expect(typeof wrapper.prop('onSelect')).toBe('function')
    wrapper.render()
    expect(localStorage.getItem('recentSearches')).toEqual(JSON.stringify([{
      name: 'foo',
      _displayField: 'foo'
    }]))

    const wrapper2 = shallow(
      <App />
    )

    expect(wrapper2.prop('defaultListbox')).toEqual([
      {
        id: 'foobar',
        name: 'Recent',
        displayField: '_displayField',
        data: expect.any(Function),
        ratio: 1
      }
    ])
  })

  test('Stored items are limited', () => {
    const App = (props) => {
      const Container = ({onSelect}) => {
        if(onSelect) {
          onSelect({name: 'foo'}, 'name')
          onSelect({name: 'bar'}, 'name')
          onSelect({name: 'foobar'}, 'name')
        }
        return <div>Foobar</div>
      }
      const [ContainerWithPlugin, containerProps] = recentSearchesPlugin(
        Container, props, { limit: 2 }
      )
      return <ContainerWithPlugin {...containerProps} />
    }

    const wrapper = shallow(
      <App onSelect={() => null} />
    )
    wrapper.render()
    expect(localStorage.getItem('recentSearches')).toEqual(JSON.stringify([
      {name: 'foobar', _displayField: 'foobar'},
      {name: 'bar', _displayField: 'bar'}
    ]))
  })
})