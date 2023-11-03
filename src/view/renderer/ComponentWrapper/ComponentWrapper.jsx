import React from 'react'
import PropTypes from 'prop-types'

export class ComponentWrapper extends React.Component {

  render() {
    const { children, } = this.props
    const style = children.props.style || {}
    return React.cloneElement(children, {
      style: {
        position: 'absolute',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
        background: '#230fbc',
        ...style,
      },
    })
  }
}
ComponentWrapper.propTypes = {
  children: PropTypes.element,
}
