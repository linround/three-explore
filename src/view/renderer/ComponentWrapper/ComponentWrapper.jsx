import React from 'react'
import PropTypes from 'prop-types'

export class ComponentWrapper extends React.Component {

  render() {
    const { children, position, translate, } = this.props
    const transform = `translate(${translate.x}px, ${translate.y}px)`

    return React.cloneElement(children, {
      style: {
        position: 'absolute',
        borderRadius: '12px',
        padding: '12px',
        overflow: 'hidden',
        background: '#230fbc',
        left: position.x,
        top: position.y,
        transform,
      },
    })
  }
}
ComponentWrapper.propTypes = {
  children: PropTypes.element,
  position: PropTypes.object,
  translate: PropTypes.object,
}
