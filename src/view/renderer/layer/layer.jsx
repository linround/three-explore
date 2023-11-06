import React, { createRef } from 'react'
import css from './css.module.less'
import { LayerWrapper } from './layerWrapper.js'
import { ObservationPoint } from '../ObservationPoint/ObservationPoint.jsx'
import { ObservationDirection } from '../ObservationDirection/ObservationPoint.jsx'
import { paintSvg } from './paint.js'
import { sceneData } from '../data.js'

export class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeObservationPoint = this.handleChangeObservationPoint.bind(this)
    this.handlePaintSvg = this.handlePaintSvg.bind(this)
    this.handleSetObservationPointPagePosition = this.handleSetObservationPointPagePosition.bind(this)
    this.handleSetObservationDirectionPagePosition = this.handleSetObservationDirectionPagePosition.bind(this)


    this.state = {  sceneData, }
    this.layerContainer = createRef()
    this.svgContainer = createRef()
  }
  componentDidMount() {
    this.handlePaintSvg()
  }

  handleChangeObservationPoint() {

  }
  handlePaintSvg() {
    paintSvg(this.layerContainer.current, this.svgContainer.current)
  }
  handleSetObservationPointPagePosition(position) {
    this.setState(({ sceneData, }) => {
      sceneData.observationPoint.page.position = position
      return sceneData
    })
  }

  handleSetObservationDirectionPagePosition(position) {
    this.setState(({ sceneData, }) => {
      sceneData.observationDirection.page.position = position
      return sceneData
    })
  }

  render() {
    const { sceneData, } = this.state
    return (
      <LayerWrapper>
        <div className={css.container} ref={this.layerContainer}>
          <ObservationPoint point={sceneData.observationPoint} handleSetPagePosition={this.handleSetObservationPointPagePosition} />
          <ObservationDirection point={sceneData.observationDirection} handleSetPagePosition={this.handleSetObservationDirectionPagePosition} />
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
