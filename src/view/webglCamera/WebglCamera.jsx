import React, { createRef } from 'react'
import css from './css.module.less'
import * as THREE from 'three'
import { WebglCameraText } from './WebglCameraText.jsx'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { MultipleView } from './MultipleView.jsx'

export class WebglCamera extends React.Component {
  constructor(prop) {
    super(prop)
    this.canvas = createRef()
    this.renderScene = this.renderScene.bind(this)
    this.renderLine = this.renderLine.bind(this)
    this.state = {
      canvasWidth: 500,
      canvasHeight: 300,
    }
  }
  componentDidMount() {
    this.renderLine()
  }
  renderLine() {
    const canvas = document.createElement('canvas')
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗锯齿
      canvas,
      alpha: true, // 元素背景透明
    })

    const sceneElements = []
    function addScene(elem, fn) {
      const ctx = document.createElement('canvas')
        .getContext('2d')
      elem.append(ctx.canvas)
      sceneElements.push({ elem, ctx, fn, })

    }
    function makeScene(elem) {
      const scene = new THREE.Scene()
      const fov = 45
      const aspect = 2
      const near = 0.1
      const far = 5
      const camera = new THREE.PerspectiveCamera(
        fov, aspect, near, far
      )
      camera.position.set(
        0, 1, 2
      )
      camera.lookAt(
        0, 0, 0
      )
      const controls = new TrackballControls(camera, elem)
      controls.noPan = true
      controls.noZoom = true

      {
        const color = 0xff00ff
        const intensity = 3
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(
          -1, 2, 4
        )
        camera.add(light)
      }
      return {
        scene, camera, controls,
      }


    }
    const sceneInitFunctionsByName = {
      box: (elem) => {
        const { scene, camera, controls, } = makeScene(elem)
        const geometry = new THREE.BoxGeometry(
          1, 1, 1
        )
        const material = new THREE.MeshBasicMaterial({
          color: 0xf0000f,
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        return (time, rect) => {
          camera.aspect = rect.width / rect.height
          camera.updateProjectionMatrix()
          controls.handleResize()
          controls.update()
          renderer.render(scene, camera)
        }
      },
      pyramid: (elem) => {

        const { scene, camera, controls, } = makeScene(elem)
        const radius = .8
        const widthSegments = 4
        const heightSegments = 2
        const geometry = new THREE.SphereGeometry(
          radius, widthSegments, heightSegments
        )
        const material = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        })
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
        return (time, rect) => {

          mesh.rotation.y = time * .1
          camera.aspect = rect.width / rect.height
          camera.updateProjectionMatrix()
          controls.handleResize()
          controls.update()
          renderer.render(scene, camera)

        }

      },
    }
    document.querySelectorAll('[data-diagram]')
      .forEach((elem) => {
        // 获取函数名
        const sceneName = elem.dataset.diagram
        // 获取函数
        const sceneInitFunction = sceneInitFunctionsByName[sceneName]
        // 调用函数并传入elem，返回的函数关键是渲染和设置比例
        const sceneRenderFunction = sceneInitFunction(elem)
        // 收集创建得场景
        addScene(elem, sceneRenderFunction)
      })

    function render(t) {
      const time = t * 0.001
      // 在render 过程中
      for (const { elem, fn, ctx, } of sceneElements) {
        const rect = elem.getBoundingClientRect()
        const {
          left, right, top,
          bottom, width, height,
        } = rect
        const rendererCanvas = renderer.domElement
        const isOffScreen = bottom < 0 ||
          top > window.innerHeight ||
          right < 0 ||
          left > window.innerWidth
        if (!isOffScreen) {
          if (rendererCanvas.width < width || rendererCanvas.height < height) {

            renderer.setSize(
              width, height, false
            )
          }

          if (ctx.canvas.width !== width || ctx.canvas.height !== height) {

            ctx.canvas.width = width
            ctx.canvas.height = height

          }

          // 裁剪
          renderer.setScissor(
            0, 0, width, height
          )

          // 设置视口
          renderer.setViewport(
            0, 0, width, height
          )

          fn(time, rect)

          // 在2d 上下文中渲染3d 场景中的区域
          ctx.globalCompositeOperation = 'copy'
          ctx.drawImage(
            rendererCanvas,
            0, rendererCanvas.height - height, width, height, // src rect
            0, 0, width, height // dst rect
          )
        }
      }
      requestAnimationFrame(render)

    }
    requestAnimationFrame(render)
  }
  renderScene() {
  }

  render() {

    return (
      <>
        <MultipleView />
        <p>
          渲染一个立方体。
          <span data-diagram="box" className={css.dataDiagram}></span>

        </p>
        <p>
          渲染一个四面体。
          <span data-diagram="pyramid" className={css.dataDiagram}></span>

        </p>
        <WebglCameraText />
      </>
    )
  }
}
