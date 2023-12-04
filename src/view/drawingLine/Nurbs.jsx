import React, { createRef } from 'react'
import { NurbsText } from './NurbsText.jsx'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { NURBSCurve } from 'three/addons/curves/NURBSCurve.js'
import { NURBSSurface } from 'three/addons/curves/NURBSSurface.js'
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js'
import img from './avater.jpg?url'


export class Nurbs extends React.Component {
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
    const group1 = new THREE.Group()
    group1.position.x = (-sceneSize / 2) - 10
    // 用于绘制曲面
    const group2 = new THREE.Group()
    group2.position.x = sceneSize / 2


    const scene = new THREE.Scene()
    // 设置场景背景
    scene.background = new THREE.Color(0x00002f)
    scene.add(group1)
    scene.add(group2)

    /************添加立方体盒子******* start****/
    const boxGeometry = new THREE.BoxGeometry(
      sceneSize, sceneSize, sceneSize
    )
    const box = new THREE.Mesh(boxGeometry)
    const boxHelper = new THREE.BoxHelper(box)
    boxHelper.material.color.setHex(0x474747)
    boxHelper.material.blending = THREE.AdditiveBlending
    group1.add(boxHelper)


    const boxHelper2 = new THREE.BoxHelper(box)
    boxHelper2.material.color.setHex(0x474747)
    boxHelper2.material.blending = THREE.AdditiveBlending
    group2.add(boxHelper2)
    /************添加一个立方体盒子******* end****/


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
    group1.add(nurbsLine)
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
    group1.add(nurbsControlPointsLine)
    /************添加 nurbs 曲线控制点******* end****/


    /************添加 nurbs 曲面******* start****/
    const nsControlPoints = [
      [

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
      ],
      [

        new THREE.Vector4(
          -nurbsPosition, -nurbsPosition, -nurbsPosition, 1
        ),
        new THREE.Vector4(
          -nurbsPosition, -nurbsPosition, nurbsPosition, 1
        ),
        new THREE.Vector4(
          -nurbsPosition, nurbsPosition, nurbsPosition, 1
        ),
        new THREE.Vector4(
          nurbsPosition, nurbsPosition, nurbsPosition, 1
        )
      ],
      [

        new THREE.Vector4(
          -nurbsPosition, -nurbsPosition, -nurbsPosition, 1
        ),
        new THREE.Vector4(
          nurbsPosition, -nurbsPosition, -nurbsPosition, 1
        ),
        new THREE.Vector4(
          nurbsPosition, -nurbsPosition, nurbsPosition, 1
        ),
        new THREE.Vector4(
          nurbsPosition, nurbsPosition, nurbsPosition, 1
        )
      ]
    ]
    function getColor(index) {
      const colors = [0xff0000, 0x00ff00, 0x0000ff]
      return colors[index]
    }
    function visibleNSControlPoints() {
      nsControlPoints.map((points, index) => {
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.setFromPoints(points)
        const lineMaterial = new THREE.LineBasicMaterial({
          color: getColor(index),
        })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        group2.add(line)
      })
    }
    visibleNSControlPoints()
    const degree1 = 2
    const degree2 = 3
    const knots1 = [0, 0, 0, 1, 1, 1]
    const knots2 = [0, 0, 0, 0, 1, 1, 1, 1]
    const nurbsSurface = new NURBSSurface(
      degree1, // u方向 >=2
      degree2, // v方向 >=2
      knots1, // u 方向的控制点计数 >=degree1
      knots2, // v 方向的控制点计数 >=degree2
      nsControlPoints // 控制点的二维数组
    )
    const map  = new THREE.TextureLoader()
      .load(img)
    function getSurfacePoint(
      u, v, target
    ) {
      return nurbsSurface.getPoint(
        u, v, target
      )
    }
    const geometry = new ParametricGeometry(
      getSurfacePoint, 20, 20
    )
    const material = new THREE.MeshLambertMaterial({
      map: map,
      side: THREE.DoubleSide,
    })
    const imgMesh = new THREE.Mesh(geometry, material)
    const scaleValue = 1.
    imgMesh.scale.set(
      scaleValue, scaleValue, scaleValue
    )
    group2.add(imgMesh)
    /************添加 nurbs 曲面******* end****/

    /************添加 光线******* start****/
    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight)
    /************添加 光线******* end****/


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
        <NurbsText />
      </>
    )
  }
}
