import React from 'react'
import { ComponentWrapper } from '../ComponentWrapper/ComponentWrapper.jsx'
import css from './css.module.less'
import { stopPropagation } from '../layer/utils.js'
import { Output } from '../OutputNode/Output.jsx'
import PropTypes from 'prop-types'
import { NodeWrapper } from '../layer/NodeWrapper.js'

export class ObservationDirection extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSetTranslate = this.handleSetTranslate.bind(this)
    this.state = {
      translate: {
        x: 0,
        y: 0,
      },
    }
  }

  handleSetTranslate(translate) {
    this.setState((state) => state.translate = translate)
  }
  handleClick(event) {
    stopPropagation(event)
    console.log('click ObservationPoint')
  }
  render() {
    const { point, } = this.props
    const { translate, } = this.state
    return (
      <ComponentWrapper
        translate={translate}
        position={point.page.position}>
        <div
          onClick={this.handleClick}
          className={css.container}>

          <NodeWrapper setTranslate={this.handleSetTranslate}>
            <Output id={point.inPutNode} />
          </NodeWrapper>

          <div className={css.content}>
            ObservationDirection
          </div>
        </div>
      </ComponentWrapper>
    )
  }
}

ObservationDirection.propTypes = {
  point: PropTypes.object,
}
