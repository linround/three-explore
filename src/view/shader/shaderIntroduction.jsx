import { Component, createRef } from 'react'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


import fragmentShader from './fragmentShader.glsl?raw'
import vertexShader from './vertexShader.glsl?raw'

import normalFragmentShader from './normalFragmentShader.glsl?raw'
import normalVertexShader from './normalVertexShader.glsl?raw'

import planeTextureFragmentShader from './planeTextureFragmentShader.glsl?raw'
import planeTextureVertexShader from './planeTextureVertexShader.glsl?raw'


import bayer from './texture/bayer.png'
import { Text } from './Text.jsx'


export default class ShaderIntroduction extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderNormalScene = this.renderNormalScene.bind(this)
    this.renderPlaneTexture = this.renderPlaneTexture.bind(this)
  }
  renderPlaneTexture() {
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
      iChannel0: { value: texture, },
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader: planeTextureFragmentShader,
      vertexShader: planeTextureVertexShader,
      uniforms,
    })
    scene.add(new THREE.Mesh(plane, material))

    const render = (t) => {
      const time = t * 0.001
      this.resizeRendererToDisplaySize(renderer)
      uniforms.iResolution.value.set(
        canvas.width, canvas.height, 1
      )
      uniforms.iTime.value = time
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)

  }
  renderNormalScene() {
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    // 使用正交相机来投影平面
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, -1, 1
    )
    const scene = new THREE.Scene()
    const plane = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(), }, // 不传参数默认是0
    }
    const material = new THREE.ShaderMaterial({
      fragmentShader: normalFragmentShader,
      vertexShader: normalVertexShader,
      uniforms,
    })
    scene.add(new THREE.Mesh(plane, material))
    const render = (t) => {
      const time = t * 0.001
      this.resizeRendererToDisplaySize(renderer)
      uniforms.iResolution.value.set(
        canvas.width, canvas.height, 1
      )
      uniforms.iTime.value = time

      renderer.render(scene, camera)


      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }
  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(
        width, height, false
      )
    }
    return needResize
  }
  renderScene() {
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const fov = 75
    // 传入aspect原因
    // 因为在整个canvas中，使用的都是归一化之后的坐标
    // 所以只需要传入长宽比即可
    const aspect = 1
    const near = 0.1
    const far = 5
    // 这是一个 透视相机具有近大远小的效果
    const camera = new THREE.PerspectiveCamera(
      fov, aspect, near, far
    )
    camera.position.z = 2
    {
      const controls = new OrbitControls(camera, canvas)
      controls.target.set(
        0, 0, 0
      )
      controls.update()
    }
    const scene = new THREE.Scene()

    {
      const color = 0xffffff
      const intensity = 1
      const light = new THREE.DirectionalLight(color, intensity)
      light.position.set(
        -1, 2, 4
      )
      scene.add(light)
    }

    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(
      boxWidth, boxHeight, boxDepth
    )


    const loader = new THREE.TextureLoader()
    const texture = loader.load(bayer)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping

    const uniforms = {
      iTime: { value: 0, },
      iResolution: { value: new THREE.Vector3(
        1, 1, 1
      ), },
      iChannel0: { value: texture, },
    }
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })


    function makeInstance(geometry, x) {
      const cube = new THREE.Mesh(geometry, material)
      scene.add(cube)
      cube.position.x = x
      return cube
    }


    makeInstance(geometry, 0)

    function render(t) {
      const time = 0.001 * t

      uniforms.iTime.value = time
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)








  }
  componentDidMount() {
    this.renderNormalScene()
    // this.renderPlaneTexture()
    // this.renderScene()
  }

  render() {
    return (
      <div className={css.container}>
        <CanvasComponent
          ref={this.canvas} >
          <div className={css.buttons}>
            <button onClick={this.renderNormalScene}>normal</button>
            <button onClick={this.renderPlaneTexture}>planeTexture</button>
            <button onClick={this.renderScene}>complex</button>
          </div>
        </CanvasComponent>
        <Text />
      </div>
    )
  }
}
