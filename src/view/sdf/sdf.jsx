import { Component, createRef } from 'react'
import { Text } from './Text.jsx'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import * as THREE from 'three'
import bayer from '../../assets/bayer.png'
import { resizeRendererToDisplaySize } from '../../utils.js'

import sdfFragmentShader from './sdfFragmentShader.glsl?raw'
import commonVertexShader from '../../common/commonVertexShader.glsl?raw'

export default class SDF extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderSDF = this.renderSDF.bind(this)
  }
  renderSDF() {
    this.renderScene(sdfFragmentShader, commonVertexShader)
  }
  componentDidMount() {
    this.renderSDF()
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
