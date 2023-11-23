import React from 'react'
import { Text } from './text.jsx'
import css from './css.module.less'

export class DrawingLine extends React.Component {
  render() {
    return (
      <>
        <canvas className={css.canvas}></canvas>
        <Text />
      </>
    )
  }
}
