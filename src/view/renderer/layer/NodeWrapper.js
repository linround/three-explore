import React from 'react'
import PropTypes from 'prop-types'
import { Selector } from './selector.js'


export class NodeWrapper extends React.Component {
  render() {
    const { children, setTranslate, setPosition, } = this.props
    const selector = new Selector()
    selector.on('selectEnd', (data) => {
      setPosition(data)
    })
    selector.on('selecting', (data) => {
      setTranslate(data)
    })
    return React.cloneElement(children, {
      onMouseDown(e) {
        selector.init(e)
      },
    })
  }
}
NodeWrapper.propTypes = {
  children: PropTypes.element,
  setTranslate: PropTypes.func,
  setPosition: PropTypes.func,
}
