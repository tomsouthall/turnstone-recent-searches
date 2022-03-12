import React from 'react'

const render = (Component, componentProps, pluginIndex) => {
  const p = Array.isArray(componentProps.plugins) && componentProps.plugins[pluginIndex]
  if(p) {
    const [Plugin, pluginProps] = Array.isArray(p) ? p : [p]

    return <Plugin {...{
      ...pluginProps,
      Component,
      componentProps,
      pluginIndex,
      render
    }} />
  }
  return <Component {...componentProps} />
}

export default render