import React, { createRef } from 'react'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js'
import { GeometryConvexText } from './GeometryConvexText.jsx'
import { CubeText } from './CubeText.jsx'


export class Cube extends React.Component {
  constructor(prop) {
    super(prop)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.state = {
      canvasWidth: 500,
      canvasHeight: 300,
    }
  }
  componentDidMount() {
    this.renderScene()
  }
  renderScene() {
    const { canvasWidth, canvasHeight, } = this.state
    const canvas = this.canvas.current

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
    })
    renderer.setSize(canvasWidth, canvasHeight)
    const camera = new THREE.PerspectiveCamera(
      40,
      canvasWidth / canvasHeight,
      1,
      1000
    )
    camera.position.set(
      15, 20, 30
    )
    scene.add(camera)

    const controls = new OrbitControls(camera, canvas)
    controls.minDistance = 20
    controls.maxDistance = 50

    scene.add(new THREE.AmbientLight(0x666666))

    const light = new THREE.PointLight(
      0xffffff, 1, 0, 0
    )
    camera.add(light)


    const group = new THREE.Group()
    scene.add(group)

    // 十二面体几何
    // const dodecahedronGeometry = new THREE.DodecahedronGeometry(10)

    const size = 10
    const vertices = [
      new THREE.Vector3(
        0, 0, 0
      ),
      new THREE.Vector3(
        0, 0, size
      ),
      new THREE.Vector3(
        size, 0, size
      ),
      new THREE.Vector3(
        size, 0, 0
      ),
      new THREE.Vector3(
        0, size, 0
      ),
      new THREE.Vector3(
        0, size, size
      ),
      new THREE.Vector3(
        size, size, size
      ),
      new THREE.Vector3(
        size, size, 0
      )
    ]
    // const positionAttribute = dodecahedronGeometry.getAttribute('position')

    // for (let i = 0;i < positionAttribute.count;i++) {
    //   const vertex = new THREE.Vector3()
    //   vertex.fromBufferAttribute(positionAttribute, i)
    //   vertices.push(vertex)
    // }

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x0080ff,
      size: 2,
      alphaTest: 0.5,
    })
    const pointsGeometry = new THREE.BufferGeometry()
      .setFromPoints(vertices)

    const points = new THREE.Points(pointsGeometry, pointsMaterial)
    group.add(points)


    // 使用凸包 创建平面
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,

    })
    //
    const meshGeometry = new ConvexGeometry(vertices)
    const mesh = new THREE.Mesh(meshGeometry, meshMaterial)
    group.add(mesh)




    requestAnimationFrame(render)
    function render() {
      renderer.render(scene, camera)
      requestAnimationFrame(render)

    }
  }

  render() {

    const { canvasWidth, canvasHeight, } = this.state
    return (
      <>
        <canvas
          className={css.canvas}
          height={canvasHeight}
          width={canvasWidth}
          ref={this.canvas}></canvas>
        <CubeText />
      </>
    )
  }
}
