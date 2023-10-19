import { Component, createRef } from 'react'
import cornellBoxFragShader from './cornellBoxFragShader.glsl?raw'
import commonVertexShader from '../../common/commonVertexShader.glsl?raw'
import * as THREE from 'three'
import bayer from '../../assets/bayer.png'
import { resizeRendererToDisplaySize } from '../../utils.js'
import css from './css.module.less'
import { Layer } from './layer/layer.jsx'

export class Renderer extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderCornellBox = this.renderCornellBox.bind(this)
  }
  componentDidMount() {
    this.renderCornellBox()
  }

  renderCornellBox() {
    this.renderScene(cornellBoxFragShader, commonVertexShader)

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
      iFrame: 2,
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
        <canvas ref={this.canvas}className={css.canvas} />
        <Layer />
      </div>
    )
  }
}
