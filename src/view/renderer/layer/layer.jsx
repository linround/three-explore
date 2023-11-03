import React, { createRef } from 'react'
import css from './css.module.less'
import { LayerWrapper } from './layerWrapper.js'
import items from './items.js'
import { ObservationPoint } from '../ObservationPoint/ObservationPoint.jsx'
import { ObservationDirection } from '../ObservationDirection/ObservationPoint.jsx'
import { paintSvg } from './paint.js'

export class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeObservationPoint = this.handleChangeObservationPoint.bind(this)
    this.state = { ...items, }
    this.layerContainer = createRef()
    this.svgContainer = createRef()
  }
  componentDidMount() {
    paintSvg(this.layerContainer.current, this.svgContainer.current)
  }

  handleChangeObservationPoint() {

  }

  render() {
    return (
      <LayerWrapper>
        <div className={css.container} ref={this.layerContainer}>
          <ObservationPoint />
          <ObservationDirection />
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" ref={this.svgContainer}>

            {/*<path d="M10 10"/>*/}
            {/*<path d="M 0 0 C 100 0, 100 200, 200 200" stroke="red" fill="none" strokeWidth="6px"/>*/}

            {/*/!*Points*!/*/}
            {/*<circle cx="100" cy="0" r="10" fill="red"/>*/}
            {/*<circle cx="200" cy="0" r="10" fill="red"/>*/}
            {/*<circle cx="200" cy="0" r="10" fill="red"/>*/}

          </svg>
        </div>
      </LayerWrapper>
    )
  }
}
