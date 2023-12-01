import React, { createRef } from 'react'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js'
import { NURBSSurface } from 'three/addons/curves/NURBSSurface.js'
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js'
import img from './avater.jpg?url'
import { DashedText } from './DashedText.jsx'


export class Dashed extends React.Component {
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
    this.renderLine()
  }
  renderLine() {
    const sceneSize = 100
    const { canvasWidth, canvasHeight, } = this.state
    const canvas = this.canvas.current
    const renderer = new THREE.WebGLRenderer({ canvas, })
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      1,
      500
    )
    camera.position.set(
      0, 0, sceneSize * 2
    )
    camera.lookAt(
      0, 0, 0
    )

    const controls = new OrbitControls(camera, canvas)
    controls.minDistance = 100
    controls.maxDistance = 5000
    controls.update()



    // 用于绘制曲线
    const group = new THREE.Group()


    const scene = new THREE.Scene()
    // 设置场景背景
    scene.background = new THREE.Color(0x00002f)
    scene.add(group)



    /************添加 nurbs 曲线******* start****/
    const nurbsPosition = sceneSize / 2
    // 定义了四个控制点
    const nurbsControlPoints = [
      new THREE.Vector4(
        -nurbsPosition, -nurbsPosition, -nurbsPosition, 1
      ),
      new THREE.Vector4(
        -nurbsPosition, nurbsPosition, -nurbsPosition, 1
      ),
      new THREE.Vector4(
        nurbsPosition, nurbsPosition, -nurbsPosition, 1
      ),
      new THREE.Vector4(
        nurbsPosition, nurbsPosition, nurbsPosition, 1
      )
    ]
    const nurbsKnots = []
    const nurbsDegree = 3
    for (let i = 0;i <= nurbsDegree;i++) {
      nurbsKnots.push(0)
    }
    for (let i = 0, j = 4;i < j;i++) {
      const knot = (i + 1) / (j - nurbsDegree)
      nurbsKnots.push(THREE.MathUtils.clamp(
        knot, 0, 1
      ))
    }
    // 得到该曲线
    const nurbsCurve = new NURBSCurve(
      nurbsDegree, nurbsKnots, nurbsControlPoints
    )
    const nurbsGeometry = new THREE.BufferGeometry()
    // 从曲线中获取 对应的点数，从而形成线的几何
    nurbsGeometry.setFromPoints(nurbsCurve.getPoints(200))
    // 设置材质
    const nurbsMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
    })
    // 使用材质和几何生成该线条
    const nurbsLine = new THREE.Line(nurbsGeometry, nurbsMaterial)
    group.add(nurbsLine)
    /************添加 nurbs 曲线******* end****/
    /************添加 nurbs 曲线控制点******* end****/
    const nurbsControlPointsGeometry = new THREE.BufferGeometry()
    nurbsControlPointsGeometry.setFromPoints(nurbsCurve.controlPoints)
    const nurbsControlPointsMaterial = new THREE.LineBasicMaterial({
      color: 0xff0000,
    })
    const nurbsControlPointsLine = new THREE.Line(nurbsControlPointsGeometry,
      nurbsControlPointsMaterial)
    nurbsControlPointsLine.position.copy(nurbsLine.position)
    group.add(nurbsControlPointsLine)
    /************添加 nurbs 曲线控制点******* end****/

    function createGeometry() {
      const size = sceneSize / 2
      const geometry = new THREE.BufferGeometry()

      const points = [
        -size, -size, -size,
        -size, size, -size,

        -size, size, -size,
        -size, size, size,

        -size, size, size,
        -size, -size, size,

        -size, -size, size,
        -size, -size, -size,

        -size, -size, -size,
        size, -size, -size,

        size, -size, -size,
        size, size, -size,

        size, size, -size,
        -size, size, -size,

        -size, -size, size,
        size, -size, size,

        size, -size, size,
        size, size, size,

        size, size, size,
        -size, size, size,

        size, size, size,
        size, size, -size,

        size, -size, -size,
        size, -size, size
      ]

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
      return geometry
    }

    const geometryBox = createGeometry()
    const lineMaterial = new THREE.LineDashedMaterial({
      color: 0xffaa00,
      dashSize: 10,
      gapSize: 10,
    })
    const lineSegments = new THREE.LineSegments(geometryBox, lineMaterial)
    lineSegments.computeLineDistances()
    scene.add(lineSegments)


    render()
    function render(time) {
      const rotation =  time * 0.0005
      scene.rotation.x = rotation
      scene.rotation.y = rotation
      // 渲染器渲染场景
      renderer.render(scene, camera)
      requestAnimationFrame(render)

    }
  }
  renderScene() {
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
        <DashedText />
      </>
    )
  }
}
