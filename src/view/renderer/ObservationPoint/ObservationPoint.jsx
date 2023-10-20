import React from 'react'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper.jsx'
import css from './css.module.less'
import { stopPropagation } from '../layer/utils.js'

export class ObservationPoint extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(event) {
    stopPropagation(event)
  }
  render() {
    return (
      <ComponentWrapper>
        <div
          onClick={this.handleClick}
          className={css.container}>
          ObservationPoint</div>
      </ComponentWrapper>
    )
  }
}
