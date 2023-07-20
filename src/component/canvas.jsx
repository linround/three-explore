import React from 'react'
import { Drag } from './drag.jsx'
import css from './canvas.module.less'

export const CanvasComponent = React.forwardRef((props, ref) => (
  <Drag>
    <div className={css.frame}>
      <canvas ref={ref} className={css.canvas}></canvas>
    </div>
  </Drag>
))
CanvasComponent.displayName = 'CanvasComponent'
