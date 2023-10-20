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
      transform: {
        translateX: 100,
        translateY: 200,
      },
      position: {
        last: { x: 0, y: 0, },
        next: { x: 0, y: 0, },
      },
    }
  }
  handleClick(event) {
    stopPropagation(event)
    console.log('click ObservationPoint')
  }
  render() {
    const inlineStyle = {
      translate: `${this.state.transform.translateX}px ${this.state.transform.translateY}px`,
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
