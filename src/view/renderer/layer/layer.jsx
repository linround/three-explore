import React from 'react'
import css from './css.module.less'
import { LayerWrapper } from './layerWrapper.js'
export class Layer extends React.Component {

  render() {
    return (
      <LayerWrapper>
        <div className={css.container}>
          layer
        </div>
      </LayerWrapper>
    )
  }
}
