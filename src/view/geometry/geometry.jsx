import { Component, createRef } from 'react'
import { CanvasComponent } from '../../component/canvas.jsx'
import * as THREE from 'three'

import colorVertexShader from './colorVertexShader.glsl?raw'
import colorFragmentShader from './colorFragmentShader.glsl?raw'

import { resizeRendererToDisplaySize } from '../../utils.js'


import { Text } from './Text.jsx'
import css from './css.module.less'

export default class Geometry extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
  }
  componentDidMount() {
    this.renderScene()
  }
  renderScene() {
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
      fragmentShader: colorFragmentShader,
      vertexShader: colorVertexShader,
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
  render() {
    return (
      <div className={css.container}>
        <CanvasComponent ref={this.canvas} />
        <Text />
      </div>
    )
  }
}
