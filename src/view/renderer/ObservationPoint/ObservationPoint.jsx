import React from 'react'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper.jsx'
import css from './css.module.less'
import { stopPropagation } from '../layer/utils.js'
import { Output } from '../OutputNode/Output.jsx'

export class ObservationPoint extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      position: {
        top: 100,
        left: 200,
      },
    }
  }
  handleClick(event) {
    stopPropagation(event)
  }
  render() {
    const inlineStyle = {
      top: this.state.position.top + 'px',
      left: this.state.position.left + 'px',
    }
    return (
      <ComponentWrapper>
        <div
          onClick={this.handleClick}
          style={inlineStyle}
          className={css.container}>
          <div className={css.content}>
            ObservationPoint
          </div>
          <Output />
        </div>
      </ComponentWrapper>
    )
  }
}
