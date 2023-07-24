import { Component, createRef } from 'react'
import { CanvasComponent } from '../../component/canvas.jsx'
import * as THREE from 'three'

import colorFragmentShader from './colorFragmentShader.glsl?raw'

import straightLineFragmentShader from './straightLineFragmentShader.glsl?raw'

import smoothstepFragmentShader from './smoothstepFragmentShader.glsl?raw'

import curveFragmentShader from './curveFragmentShader.glsl?raw'

import commonVertexShader from '../../common/commonVertexShader.glsl?raw'

import squareFragmentShader from './squareFragmentShader.glsl?raw'
import animationFragmentShader from './animationFragmentShader.glsl?raw'


import { resizeRendererToDisplaySize } from '../../utils.js'


import { Text } from './Text.jsx'
import css from './css.module.less'

export default class Geometry extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderColor = this.renderColor.bind(this)
    this.renderStraightLine = this.renderStraightLine.bind(this)
    this.renderCurve = this.renderCurve.bind(this)
    this.renderSquare = this.renderSquare.bind(this)
    this.renderAnimate = this.renderAnimate.bind(this)
  }
  componentDidMount() {
    // this.renderColor()
    // this.renderStraightLine()
    // this.renderSoomthstep()
    // this.renderCurve()
    // this.renderSquare()
    this.renderAnimate()
  }
  renderScene(fragmentShader, vertexShader) {
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, -1, 1
    )
    const scene = new THREE.Scene()

    const plane = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(), },
      iMouse: { value: new THREE.Vector2(), },
    }

    const material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms,
    })
    scene.add(new THREE.Mesh(plane, material))
    let x = 0
    let y = 0
    const render = (t) => {
      const time = t * 0.001
      resizeRendererToDisplaySize(renderer)
      uniforms.iResolution.value.set(
        canvas.width, canvas.height, 1
      )
      uniforms.iMouse.value.set(x, y)
      uniforms.iTime.value = time

      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

    canvas.addEventListener('pointermove', (e) => {
      x = e.offsetX
      y = canvas.height - e.offsetY
    })
  }
  renderColor() {
    this.renderScene(colorFragmentShader, commonVertexShader)
  }
  renderStraightLine() {
    this.renderScene(straightLineFragmentShader, commonVertexShader)
  }
  renderCurve() {
    this.renderScene(curveFragmentShader, commonVertexShader)
  }
  renderSoomthstep () {
    this.renderScene(smoothstepFragmentShader, commonVertexShader)
  }
  renderSquare() {
    this.renderScene(squareFragmentShader, commonVertexShader)
  }
  renderAnimate() {
    this.renderScene(animationFragmentShader, commonVertexShader)
  }
  render() {
    return (
      <div className={css.container}>
        <CanvasComponent ref={this.canvas}>
          <div className={css.buttons}>
            <button onClick={this.renderStraightLine}>straightLine</button>
            <button onClick={this.renderCurve}>curve</button>
            <button onClick={this.renderSquare}>wave</button>
          </div>
        </CanvasComponent>
        <Text />
      </div>
    )
  }
}
