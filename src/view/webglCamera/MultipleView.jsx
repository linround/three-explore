import { MultipleViewText } from './MultipleViewText.jsx'
import React, { createRef } from 'react'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
export class MultipleView extends React.Component {
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
    const segments = 100
    const canvas = this.canvas.current
    const { canvasWidth, canvasHeight, } = this.state
    const aspect = canvasWidth / canvasHeight
    const scene = new THREE.Scene()

    // 一个透视相机
    const camera = new THREE.PerspectiveCamera(
      10,
      0.5 * aspect,
      1,
      1000
    )
    // 设置相机位置
    camera.position.z = 100
    const controls = new OrbitControls(camera, canvas)
    controls.minDistance = 100
    controls.maxDistance = 5000
    controls.update()

    // 一个透视相机
    const cameraPerspective = new THREE.PerspectiveCamera(
      50,
      0.5 * aspect,
      1,
      1000
    )
    scene.add(cameraPerspective)
    // 透视相机边界可视化
    const cameraPerspectiveHelper = new THREE.CameraHelper(cameraPerspective)
    scene.add(cameraPerspectiveHelper)
    cameraPerspective.rotation.y =  Math.PI


    const cameraRig = new THREE.Group()
    cameraRig.add(cameraPerspective)
    scene.add(cameraRig)



    const mesh = new THREE.Mesh(new THREE.SphereGeometry(
      2, segments, segments
    ),
    new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    }))
    scene.add(mesh)


    const mesh2 = new THREE.Mesh(new THREE.SphereGeometry(
      1, segments, segments
    ),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    }))
    mesh2.position.y = 2
    mesh.add(mesh2)

    const mesh3 = new THREE.Mesh(new THREE.SphereGeometry(
      1, segments, segments
    ),
    new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true,
    }))
    // mesh3 是透视相机的起始端
    mesh3.position.z = 0
    cameraRig.add(mesh3)


    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(canvasWidth, canvasHeight)

    renderer.autoClear = false // 这个需要设置，防止 多视角渲染时，会自动对场景清空

    function render() {
      const r = Date.now() * 0.0005
      mesh.position.x = 5 * Math.cos(r)
      mesh.position.z = 5 * Math.sin(r)
      mesh.position.y = 5 * Math.sin(r)
      // 设置月球的位置变化
      mesh.children[0].position.x = 2 * Math.cos(2 * r)
      mesh.children[0].position.z = 2 * Math.sin(r)
      cameraPerspective.fov = 40 + (20 * Math.sin(2 * r))
      cameraPerspective.far = mesh.position.length()
      cameraPerspective.updateProjectionMatrix()
      cameraPerspectiveHelper.update()
      cameraPerspectiveHelper.visible = true


      //
      cameraRig.lookAt(mesh.position)
      renderer.clear()


      cameraPerspectiveHelper.visible = false
      renderer.setViewport(
        0, 0, canvasWidth / 2, canvasHeight
      )
      renderer.render(scene, cameraPerspective)
      cameraPerspectiveHelper.visible = true

      renderer.setViewport(
        canvasWidth / 2, 0, canvasWidth / 2, canvasHeight
      )
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }


    requestAnimationFrame(render)




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
        <MultipleViewText />
      </>
    )
  }
}
