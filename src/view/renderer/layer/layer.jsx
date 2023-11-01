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
  }
  componentDidMount() {
    paintSvg(this.layerContainer.current)
  }

  handleChangeObservationPoint() {

  }

  render() {
    return (
      <LayerWrapper>
        <div className={css.container} ref={this.layerContainer}>
          <ObservationPoint />
          <ObservationDirection />
        </div>
      </LayerWrapper>
    )
  }
}
