import { Component, createRef } from 'react'
import { Text } from './Text.jsx'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'

export default class Bump extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
  }
  render() {
    return (
      <div>
        <div className={css.container}>
          <CanvasComponent
            ref={this.canvas} >
            <div className={css.buttons}>
              <button>test</button>
            </div>
          </CanvasComponent>
          <Text />
        </div>

      </div>
    )
  }
}
