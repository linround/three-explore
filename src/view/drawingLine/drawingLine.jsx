import React, { createRef } from 'react'
import { Text } from './text.jsx'
import css from './css.module.less'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { Nurbs } from './Nurbs.jsx'
import { Dashed } from './Dashed.jsx'

export class DrawingLine extends React.Component {
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
    // this.renderScene()
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

    const scene = new THREE.Scene()

    /************添加一个立方体盒子******* start****/
    const boxGeometry = new THREE.BoxGeometry(
      sceneSize, sceneSize, sceneSize
    )
    const box = new THREE.Mesh(boxGeometry)
    const boxHelper = new THREE.BoxHelper(box)
    boxHelper.material.color.setHex(0x474747)
    boxHelper.material.blending = THREE.AdditiveBlending
    scene.add(boxHelper)
    /************添加一个立方体盒子******* end****/


    /************渲染一个线条******* start****/
    // 创建线条的材质
    const material = new THREE.LineBasicMaterial({
      color: 0xffff00,
      fog: true, // 材料是否受雾的影响
      linejoin: 'round', // 确定线条连接的外观
      linecap: '', // 定义线条末端的外观
    })

    const points = []
    points.push(new THREE.Vector3(
      0, 0, 0
    ))
    points.push(new THREE.Vector3(
      0, sceneSize / 2, 0
    ))
    points.push(new THREE.Vector3(
      0, 0, 0
    ))
    points.push(new THREE.Vector3(
      sceneSize / 2, 0, 0
    ))
    points.push(new THREE.Vector3(
      0, 0, 0
    ))
    points.push(new THREE.Vector3(
      0, 0, sceneSize / 2
    ))
    // 创建 几何的 顶点数据
    const geometry = new THREE.BufferGeometry()
      .setFromPoints(points) // 这里的本质是 setAttribute('position',···)
    // 使用顶点 和 材质 创建线条
    const line = new THREE.Line(geometry, material)
    // 将线条添加到场景种
    scene.add(line)
    /************渲染一个线条******* end****/




    /************渲染粒子系统******* start****/
    // 定义点的材质
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x0000ff,
      size: 8,
      sizeAttenuation: false, // 指定点的大小是否会因摄像机深度而衰减
    })
    // 定义粒子数
    const maxParticleCount = 300
    // 定义场景种渲染的粒子数目
    const particleCount = 200
    // 记录每一个粒子的位置索引
    const particlePositions = new Float32Array(maxParticleCount * 3)
    const particles = new THREE.BufferGeometry()
    for (let i = 0;i < maxParticleCount;i++) {
      const x = (Math.random() - 0.5) * sceneSize
      const y = (Math.random() - 0.5) * sceneSize
      const z = (Math.random() - 0.5) * sceneSize
      // 定义粒子系统的 顶点坐标索引
      particlePositions[i * 3] = x
      particlePositions[(i * 3) + 1] = y
      particlePositions[(i * 3) + 2] = z
    }

    particles.setDrawRange(0, particleCount)
    particles.setAttribute('position',
      new THREE.BufferAttribute(particlePositions, 3))
    // 定义一个点云
    const pointCloud = new THREE.Points(particles, pointsMaterial)
    scene.add(pointCloud)
    /************渲染粒子系统******* end****/


    /************渲染线条系统******* start****/
    // 定义线条快
    const segments = maxParticleCount * maxParticleCount
    // 线条的顶点位置索引
    const positions = new Float32Array(segments * 3)
    // 顶点颜色索引
    const colors = new Float32Array(segments * 3)

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position',
      new THREE.BufferAttribute(positions, 3))
    lineGeometry.setAttribute('color',
      new THREE.BufferAttribute(colors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: false, // 这个参数 会让线条 变得和背景色一致
    })
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lineMesh)

    function drawLines() {

      let vertexPos = 0
      let colorPos = 0
      let numConnected = 0

      // 利用粒子系统中的顶点
      // 测量每一个顶点和其后面的顶点之间的距离
      // 如果距离小于 某一个值的时候，这两个前后顶点即可形成一条线

      for (let i = 0;i < particleCount;i++) {

        for (let j = i + 1;j < particleCount;j++) {
          const dx = particlePositions[i * 3] - particlePositions[j * 3]
          const dy = particlePositions[(i * 3) + 1] - particlePositions[(j * 3) + 1]
          const dz = particlePositions[(i * 3) + 2] - particlePositions[(j * 3) + 2]
          const dist = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz))

          if (dist < sceneSize / 3) {
            positions[vertexPos] = particlePositions[i * 3]
            positions[vertexPos + 1] = particlePositions[(i * 3) + 1]
            positions[vertexPos + 2] = particlePositions[(i * 3) + 2]

            positions[vertexPos + 3] = particlePositions[j * 3]
            positions[vertexPos + 4] = particlePositions[(j * 3) + 1]
            positions[vertexPos + 5] = particlePositions[(j * 3) + 2]
            vertexPos += 6

            const alpha = 1.0 - (dist / sceneSize)
            colors[colorPos] = alpha
            colors[colorPos + 1] = alpha
            colors[colorPos + 2] = alpha

            colors[colorPos + 3] = 1 - alpha
            colors[colorPos + 4] = 1 - alpha
            colors[colorPos + 5] = 1 - alpha
            colorPos += 6
            numConnected += 1
          }
        }
      }
      lineMesh.geometry.setDrawRange(0, numConnected * 2)
      lineMesh.geometry.attributes.position.needsUpdate = true
      lineMesh.geometry.attributes.color.needsUpdate = true
    }
    /************渲染线条系统******* end****/




    drawLines()
    render()
    function render(time) {
      const rotation = time * 0.0005
      scene.rotation.x = rotation
      scene.rotation.y = rotation
      scene.rotation.z = rotation
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
        <Dashed />
        <Nurbs />
        <canvas
          className={css.canvas}
          height={canvasHeight}
          width={canvasWidth}
          ref={this.canvas}></canvas>
        <Text />
      </>
    )
  }
}
