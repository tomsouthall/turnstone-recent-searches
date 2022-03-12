import React from 'react'
import { describe, expect, test, beforeEach, afterAll } from 'vitest'
import { shallow, configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import RecentSearchesPlugin from './index'
import render from '../render'

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
      const componentProps = {plugins: [RecentSearchesPlugin]}

      return render(Container, componentProps, 0)
    }

    const hoc = shallow(<App />)
    const wrapper = shallow(hoc.get(0))

    expect(wrapper).not.toBeNull()
    expect(Array.isArray(wrapper.prop('defaultListbox'))).toBe(true)
    expect(typeof wrapper.prop('onSelect')).toBe('function')
  })

  test('Selected item is saved to localStorage', () => {
    const App = () => {
      const Container = ({onSelect}) => {
        if(onSelect) onSelect({name: 'foo'}, 'name')
        return <div>Foobar</div>
      }
      const plugins = [[RecentSearchesPlugin, {id: 'foobar', name: 'Recent'}]]
      const componentProps = {
        plugins,
        onSelect: () => null
      }

      return render(Container, componentProps, 0)
    }

    const hoc = shallow(<App />)
    const wrapper = shallow(hoc.get(0))

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

    const hoc2 = shallow(<App />)
    const wrapper2 = shallow(hoc2.get(0))

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
    const App = () => {
      const Container = ({onSelect}) => {
        if(onSelect) {
          onSelect({name: 'foo'}, 'name')
          onSelect({name: 'bar'}, 'name')
          onSelect({name: 'foobar'}, 'name')
        }
        return <div>Foobar</div>
      }
      const plugins = [[RecentSearchesPlugin, {limit: 2}]]
      const componentProps = {
        plugins,
        onSelect: () => null
      }

      return render(Container, componentProps, 0)
    }

    const hoc = shallow(<App />)
    const wrapper = shallow(hoc.get(0))

    wrapper.render()
    expect(localStorage.getItem('recentSearches')).toEqual(JSON.stringify([
      {name: 'foobar', _displayField: 'foobar'},
      {name: 'bar', _displayField: 'bar'}
    ]))
  })
})