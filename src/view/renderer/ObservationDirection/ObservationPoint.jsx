import React from 'react'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper.jsx'
import css from './css.module.less'
import { stopPropagation } from '../layer/utils.js'
import { Output } from '../OutputNode/Output.jsx'
import { sceneData } from '../data.js'

export class ObservationDirection extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      transform: {
        translateX: 500,
        translateY: 500,
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
          <Output id={sceneData.observationDirection.inPutNode} />
          <div className={css.content}>
            ObservationDirection
          </div>
        </div>
      </ComponentWrapper>
    )
  }
}
