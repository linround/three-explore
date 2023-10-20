import React from 'react'
import PropTypes from 'prop-types'

export class ComponentWrapper extends React.Component {

  render() {
    const { children, } = this.props
    return React.cloneElement(children, {
      style: {
        position: 'absolute',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#670404',
      },
    })
  }
}
ComponentWrapper.propTypes = {
  children: PropTypes.element,
}
