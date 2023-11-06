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
    this.handleSetPosition = this.handleSetPosition.bind(this)
    this.handleClearTranslate = this.handleClearTranslate.bind(this)
    this.state = {
      translate: {
        x: 0, y: 0,
      },
    }
  }
  handleClick(event) {
    stopPropagation(event)
  }
  handleClearTranslate() {
    this.setState((state) => {
      state.translate = { x: 0, y: 0, }
      return state
    })
  }
  handleSetTranslate(translate) {
    this.setState((state) => {
      state.translate = translate
      return state
    })
  }

  handleSetPosition(translate) {
    const { point, } = this.props
    this.props.handleSetPagePosition({
      x: point.page.position.x + translate.x,
      y: point.page.position.y + translate.y,
    })
    this.handleClearTranslate()
  }
  render() {
    const { point, } = this.props
    const { translate, } = this.state

    return (
      <>
        <ComponentWrapper
          translate={translate}
          position={point.page.position}>
          <div
            onClick={this.handleClick}
            className={css.container}>
            <div className={css.content}>
              {point.outPutNode}
            </div>
            <NodeWrapper
              setPosition={this.handleSetPosition}
              setTranslate={this.handleSetTranslate}>
              <Output id={point.outPutNode} />
            </NodeWrapper>
          </div>
        </ComponentWrapper>
      </>
    )
  }
}
ObservationPoint.propTypes = {
  point: PropTypes.object,
  handleSetPagePosition: PropTypes.func,
}
