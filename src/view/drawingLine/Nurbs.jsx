import React, { createRef } from 'react'
import { NurbsText } from './NurbsText.jsx'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export class Nurbs extends React.Component {
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
    // this.renderScene()
    this.renderLine()
  }
  renderLine() {
    const sceneSize = 100
    const { canvasWidth, canvasHeight, } = this.state
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      1,
      500
    )
    camera.position.set(
      0, 0, sceneSize * 2
    )
    camera.lookAt(
      0, 0, 0
    )

    const controls = new OrbitControls(camera, canvas)
    controls.minDistance = 100
    controls.maxDistance = 5000
    controls.update()

    const scene = new THREE.Scene()

    /************添加一个立方体盒子******* start****/
    const boxGeometry = new THREE.BoxGeometry(
      sceneSize, sceneSize, sceneSize
    )
    const box = new THREE.Mesh(boxGeometry)
    const boxHelper = new THREE.BoxHelper(box)
    boxHelper.material.color.setHex(0x474747)
    boxHelper.material.blending = THREE.AdditiveBlending
    scene.add(boxHelper)
    /************添加一个立方体盒子******* end****/






    render()
    function render(time) {
      const rotation = time * 0.0005
      scene.rotation.x = rotation
      scene.rotation.y = rotation
      scene.rotation.z = rotation
      // 渲染器渲染场景
      renderer.render(scene, camera)
      requestAnimationFrame(render)

    }
  }
  renderScene() {
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
        <NurbsText />
      </>
    )
  }
}
