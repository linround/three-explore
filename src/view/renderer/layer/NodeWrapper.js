import React from 'react'
import PropTypes from 'prop-types'


export class NodeWrapper extends React.Component {
  render() {
    const { children, setTranslate, } = this.props
    return React.cloneElement(children, {
      onMouseDown(e) {
        console.log(e)
        setTranslate()
      },
    })
  }
}
NodeWrapper.propTypes = {
  children: PropTypes.element,
  setTranslate: PropTypes.func,
}
