import React from 'react'
import { Drag } from './drag.jsx'
import css from './canvas.module.less'
import PropTypes from 'prop-types'

export const CanvasComponent = React.forwardRef(({ children, }, ref) => (
  <Drag>
    <div className={css.frame}>
      {children}
      <canvas ref={ref} className={css.canvas}></canvas>
    </div>
  </Drag>
))


CanvasComponent.displayName = 'CanvasComponent'
CanvasComponent.propTypes = {
  children: PropTypes.element,
}
