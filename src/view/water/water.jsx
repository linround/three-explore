import { Component, createRef } from 'react'
import css from './css.module.less'
import { CanvasComponent } from '../../component/canvas.jsx'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import fragmentShader from './fragmentShader.glsl?raw'
import vertexShader from './vertexShader.glsl?raw'
import image from './texture/bayer.png'

export default class Water extends Component {
  constructor(props) {
    super(props)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
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
    const texture = loader.load(image)
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

    const cubes = [
      makeInstance(geometry, 0),
      makeInstance(geometry, -2),
      makeInstance(geometry, 2)
    ]

    function render(t) {
      const time = 0.001 * t
      cubes.forEach((cube, index) => {
        const speed = 1 + (index * .1)
        const rot = time * speed
        cube.rotation.x = rot
        cube.rotation.y = rot
      })

      uniforms.iTime.value = time
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)








  }
  componentDidMount() {
    this.renderScene()
  }

  render() {
    return (
      <div className={css.container}>
        <CanvasComponent
          ref={this.canvas} />
        <main>
          <h1>如何生成水？</h1>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </main>
      </div>
    )
  }
}
