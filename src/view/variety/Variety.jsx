import { Component, createRef } from 'react'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import { Text } from './Text.jsx'
import * as THREE from 'three'
import bayer from '../../assets/bayer.png'
import { resizeRendererToDisplaySize } from '../../utils.js'


import commonVertexShader from '../../common/commonVertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'
import patternsFragmentShader from './patternsFragmentShader.glsl?raw'
import randomness from './randomness.glsl?raw'
import noiseFragment from './noiseFragment.glsl?raw'
import cellFragment from './cellFragment.glsl?raw'
import fogFragment from  './fogFragment.glsl?raw'

export class Variety extends Component {

  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderTranslate = this.renderTranslate.bind(this)
    this.renderPatterns = this.renderPatterns.bind(this)
    this.renderRandom = this.renderRandom.bind(this)
    this.renderNoise = this.renderNoise.bind(this)
    this.renderCell = this.renderCell.bind(this)
    this.renderFog = this.renderFog.bind(this)
  }
  renderFog() {
    this.renderScene(fogFragment, commonVertexShader)
  }
  renderCell() {
    this.renderScene(cellFragment, commonVertexShader)
  }
  renderNoise() {
    this.renderScene(noiseFragment, commonVertexShader)
  }
  renderRandom() {
    this.renderScene(randomness, commonVertexShader)
  }
  renderPatterns() {
    this.renderScene(patternsFragmentShader, commonVertexShader)
  }
  renderTranslate() {
    this.renderScene(fragmentShader, commonVertexShader)
  }
  componentDidMount() {
    // this.renderTranslate()
    // this.renderPatterns()
    // this.renderRandom()
    // this.renderNoise()
    this.renderCell()
    // this.renderFog()
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
            <button onClick={this.renderTranslate}>Translate</button>
            <button onClick={this.renderPatterns}>Patterns</button>
            <button onClick={this.renderRandom}> Random</button>
            <button onClick={this.renderNoise}> Noise</button>
            <button onClick={this.renderCell}> Cell</button>
            <button onClick={this.renderFog}> Fog</button>
          </div>
        </CanvasComponent>
        <Text />
      </div>
    )
  }
}
