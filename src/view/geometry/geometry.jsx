import { Component, createRef } from 'react'
import { CanvasComponent } from '../../component/canvas.jsx'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'

import colorVertexShader from './colorVertexShader.glsl?raw'
import colorFragmentShader from './colorFragmentShader.glsl?raw'

import { resizeRendererToDisplaySize } from '../../utils.js'

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

    const controls = new OrbitControls(camera, canvas)
    controls.update()
    const plane = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(), },
    }

    const material = new THREE.ShaderMaterial({
      fragmentShader: colorFragmentShader,
      vertexShader: colorVertexShader,
      uniforms,
    })
    scene.add(new THREE.Mesh(plane, material))
    const render = (t) => {
      const time = t * 0.001
      resizeRendererToDisplaySize(renderer)
      uniforms.iResolution.value.set(
        canvas.w, canvas.height, 1
      )
      uniforms.iTime.value = time
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

  }
  render() {
    return (
      <div>
        Geometry
        <CanvasComponent ref={this.canvas} />
      </div>
    )
  }
}