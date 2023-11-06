import React from 'react'
import PropTypes from 'prop-types'

export class ComponentWrapper extends React.Component {

  render() {
    const { children, position, } = this.props

    return React.cloneElement(children, {
      style: {
        position: 'absolute',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
        background: '#230fbc',
        left: position.x,
        top: position.y,
      },
    })
  }
}
ComponentWrapper.propTypes = {
  children: PropTypes.element,
  position: PropTypes.object,
}
