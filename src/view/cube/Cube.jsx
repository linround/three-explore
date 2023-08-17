import { Component, createRef } from 'react'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import { Text } from './Text.jsx'
import { Plane } from './Plane.jsx'
import * as THREE from 'three'
import bayer from '../../assets/bayer.png'
import { resizeRendererToDisplaySize } from '../../utils.js'


import cubeShader from './cubeShader.glsl?raw'
import commonVertexShader from '../../common/commonVertexShader.glsl?raw'
import cubePlaneShader from './cubePlaneShader.glsl?raw'
import randomCube from './randomCube.glsl?raw'

export class Cube extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderCube = this.renderCube.bind(this)
    this.renderCubePlane = this.renderCubePlane.bind(this)
    this.renderRandomCube = this.renderRandomCube.bind(this)
  }
  componentDidMount() {
    // this.renderCube()
    // this.renderCubePlane()
    this.renderRandomCube()
  }
  renderRandomCube() {
    this.renderScene(randomCube, commonVertexShader)
  }
  renderCubePlane() {
    this.renderScene(cubePlaneShader, commonVertexShader)
  }
  renderCube() {
    this.renderScene(cubeShader, commonVertexShader)
  }
  renderScene(fragmentShader, vertexShader) {
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, -1, 1
    )
    const scene = new THREE.Scene()
    const plane = new THREE.PlaneGeometry(2, 2)
    const loader = new THREE.TextureLoader()
    const texture = loader.load(bayer)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(), },
      iMouse: { value: new THREE.Vector2(), },
      iChannel0: { value: texture, },
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
      const time = 0.001 * t
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
        <CanvasComponent
          ref={this.canvas} >
          <div className={css.buttons}>
            <button onClick={this.renderCube}>Cube</button>
            <button onClick={this.renderCubePlane}>CubePlane</button>
            <button onClick={this.renderRandomCube}>RandomCube</button>
          </div>
        </CanvasComponent>
        <Plane />
        <Text />
      </div>
    )
  }
}
