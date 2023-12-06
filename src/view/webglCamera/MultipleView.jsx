import { MultipleViewText } from './MultipleViewText.jsx'
import React, { createRef } from 'react'
import css from './css.module.less'
import * as THREE from 'three'
export class MultipleView extends React.Component {
  constructor(prop) {
    super(prop)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.state = {
      canvasWidth: 500,
      canvasHeight: 300,
    }
  }
  componentDidMount() {
    this.renderScene()
  }
  renderScene() {
    const { canvasWidth, canvasHeight, } = this.state
    const aspect = canvasWidth / canvasHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      0.5 * aspect,
      1,
      1000
    )
    camera.position.z = 2500
    const cameraPerspective = new THREE.PerspectiveCamera(
      50,
      0.5 * aspect,
      150,
      1000
    )
    scene.add(cameraPerspective)
    const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)
    scene.add(cameraPerspectiveHelper)

  }

  render() {
    const { canvasWidth, canvasHeight, } = this.state
    return (
      <>

        <canvas
          className={css.canvas}
          height={canvasHeight}
          width={canvasWidth}
          ref={this.canvas}></canvas>
        <MultipleViewText />
      </>
    )
  }
}
