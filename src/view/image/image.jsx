import { Component, createRef } from 'react'
import * as THREE from 'three'
import { Text } from './Text.jsx'
import css from './css.module.less'

import { resizeRendererToDisplaySize } from '../../utils.js'
import { CanvasComponent } from '../../component/canvas.jsx'


import commonVertexShader from '../../common/commonVertexShader.glsl?raw'
import imageShader from './imageShader.glsl?raw'
import people from './img/people.jpg'
import energyFragmentShader from './energyFragmentShader.glsl?raw'

import { kernels } from './kernels.js'

export class Image extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      type: 'normal',
    }
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderImageScene = this.renderImageScene.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.renderEnergy = this.renderEnergy.bind(this)

  }
  renderEnergy() {
    this.renderScene(energyFragmentShader, commonVertexShader)
  }
  componentDidMount() {
    // this.renderImageScene()
    this.renderEnergy()
  }

  renderImageScene() {
    this.renderScene(imageShader, commonVertexShader)
  }


  renderScene(fragmentShader, vertexShader) {
    const type = this.state.type
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, -1, 1
    )
    const scene = new THREE.Scene()
    const plane = new THREE.PlaneGeometry(2, 2)
    const loader = new THREE.TextureLoader()
    const texture = loader.load(people)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(), },
      iMouse: { value: new THREE.Vector2(), },
      iChannel0: { value: texture, },
      iKernel: { value: kernels[type], },
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
  handleSelect({ target, }) {
    this.setState({
      type: target.value,
    }, () => {
      this.renderImageScene()
    })
  }
  render() {
    return (
      <div className={css.container}>
        <CanvasComponent
          ref={this.canvas} >
          <div className={css.buttons}>
            <select onChange={this.handleSelect}>
              <option value={'normal'}>normal</option>
              <option value={'gaussianBlur'}>gaussianBlur</option>
              <option value={'gaussianBlur2'}>gaussianBlur2</option>
              <option value={'gaussianBlur3'}>gaussianBlur3</option>
              <option value={'unsharpen'}>unsharpen</option>
              <option value={'sharpness'}>sharpness</option>
              <option value={'sharpen'}>sharpen</option>
              <option value={'edgeDetect'}>edgeDetect</option>
              <option value={'edgeDetect2'}>edgeDetect2</option>
              <option value={'edgeDetect3'}>edgeDetect3</option>
              <option value={'edgeDetect4'}>edgeDetect4</option>
              <option value={'edgeDetect5'}>edgeDetect5</option>
              <option value={'edgeDetect6'}>edgeDetect6</option>
              <option value={'sobelHorizontal'}>sobelHorizontal</option>
              <option value={'sobelVertical'}>sobelVertical</option>
              <option value={'previtHorizontal'}>previtHorizontal</option>
              <option value={'previtVertical'}>previtVertical</option>
              <option value={'boxBlur'}>boxBlur</option>
              <option value={'triangleBlur'}>triangleBlur</option>
              <option value={'emboss'}>emboss</option>
            </select>
            <button onClick={this.renderImageScene}>确认</button>
            <button onClick={ this.renderEnergy}> 能级渲染</button>
          </div>
        </CanvasComponent>
        <Text />
      </div>
    )
  }
}
