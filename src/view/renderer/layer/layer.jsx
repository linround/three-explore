import React  from 'react'
import css from './css.module.less'
import { LayerWrapper } from './layerWrapper.js'
import { ObservationPoint } from '../ObservationPoint/ObservationPoint.jsx'
import { ObservationDirection } from '../ObservationDirection/ObservationPoint.jsx'
import { sceneData } from '../data.js'
import { SvgComponent } from './SvgComponent.jsx'

export class Layer extends React.Component {
  constructor(props) {
    super(props)
    this.handleSetObservationPointPagePosition = this.handleSetObservationPointPagePosition.bind(this)
    this.handleSetObservationDirectionPagePosition = this.handleSetObservationDirectionPagePosition.bind(this)

    this.state = {
      sceneData,
    }

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
        <div className={css.container}>
          <ObservationPoint
            point={sceneData.observationPoint}
            handleSetPagePosition={this.handleSetObservationPointPagePosition} />
          <ObservationDirection
            point={sceneData.observationDirection}
            handleSetPagePosition={this.handleSetObservationDirectionPagePosition} />
          <SvgComponent
            connections={sceneData.connections}
          />
        </div>
      </LayerWrapper>
    )
  }
}
