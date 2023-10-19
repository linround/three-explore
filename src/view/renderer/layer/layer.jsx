import React from 'react'
import css from './css.module.less'
import { LayerWrapper } from './layerWrapper.js'
import items from './items.js'
export class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.handleChangeObservationPoint = this.handleChangeObservationPoint.bind(this)
    this.state = { ...items, }
  }
  handleChangeObservationPoint() {

  }

  render() {
    return (
      <LayerWrapper>
        <div className={css.container}>

        </div>
      </LayerWrapper>
    )
  }
}
