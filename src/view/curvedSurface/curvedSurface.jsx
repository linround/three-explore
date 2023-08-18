import { Component, createRef } from 'react'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import { Text } from './Text.jsx'

export class CurvedSurface extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
  }
  render() {
    return (
      <div className={css.container}>
        <CanvasComponent
          ref={this.canvas} >
          <div className={css.buttons}>
            <button>test</button>
          </div>
        </CanvasComponent>
        <Text />
      </div>
    )
  }
}
