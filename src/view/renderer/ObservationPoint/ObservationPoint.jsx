import React from 'react'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper.jsx'
import css from './css.module.less'
import { stopPropagation } from '../layer/utils.js'
import { Output } from '../OutputNode/Output.jsx'
import PropTypes from 'prop-types'
import { NodeWrapper } from '../layer/NodeWrapper.js'

export class ObservationPoint extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSetTranslate = this.handleSetTranslate.bind(this)
  }
  handleClick(event) {
    stopPropagation(event)
  }
  handleSetTranslate(translate) {
    this.props.handleSetPagePosition(translate)
  }
  render() {
    const { point, } = this.props

    return (
      <ComponentWrapper
        position={point.page.position}>
        <div
          onClick={this.handleClick}
          className={css.container}>
          <div className={css.content}>
            {point.outPutNode}
          </div>
          <NodeWrapper setTranslate={this.handleSetTranslate}>
            <Output id={point.outPutNode} />
          </NodeWrapper>
        </div>
      </ComponentWrapper>
    )
  }
}
ObservationPoint.propTypes = {
  point: PropTypes.object,
  handleSetPagePosition: PropTypes.func,
}
