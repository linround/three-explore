import React, { createRef } from 'react'
import { Text } from './text.jsx'
import css from './css.module.less'
import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

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
      -0, 0, 0
    ))
    points.push(new THREE.Vector3(
      0, 10, 0
    ))
    points.push(new THREE.Vector3(
      10, 0, 0
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
      size: 10,
      sizeAttenuation: false, // 指定点的大小是否会因摄像机深度而衰减
    })
    // 定义粒子数
    const maxParticleCount = 300
    // 记录每一个粒子的位置索引
    const particlePositions = new Float32Array(maxParticleCount * 3)
    const particles = new THREE.BufferGeometry()
    for (let i = 0;i < maxParticleCount;i++) {

    }
    /************渲染粒子系统******* end****/

    render()
    function render() {
      // 渲染器渲染场景
      renderer.render(scene, camera)
      requestAnimationFrame(render)

    }
  }
  renderScene() {
    const maxParticleCount = 200
    const particleCount = 100
    const boxSize = 800
    const boxHalf = boxSize / 2
    const { canvasWidth, canvasHeight, } = this.state
    const canvas = this.canvas.current
    const camera = new THREE.PerspectiveCamera(
      45,
      canvasWidth / canvasHeight,
      1.,
      4000
    )
    camera.position.z = 1750
    const controls = new OrbitControls(camera, canvas)
    controls.minDistance = 1000
    controls.maxDistance = 3000

    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(
      boxSize, boxSize, boxSize
    )))
    helper.material.color.setHex(0x474747)
    helper.material.blending = THREE.AdditiveBlending
    helper.material.transparent = true
    group.add(helper)

    const segments = maxParticleCount * maxParticleCount
    // 存储点的三维坐标
    const positions = new Float32Array(segments * 3)
    // 存储点的 rgb 颜色信息
    const colors = new Float32Array(segments * 3)
    const pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false, // 是否根据摄像机深度减弱精灵的大小
    })
    const particles = new THREE.BufferGeometry()
    const particlesData = []
    const particlePositions = new Float32Array(maxParticleCount * 3)
    for (let i = 0;i < maxParticleCount;i++) {
      const x = (Math.random() * boxSize) - (boxSize / 2)
      const y = (Math.random() * boxSize) - (boxSize / 2)
      const z = (Math.random() * boxSize) - (boxSize / 2)

      // 设置几何索引
      particlePositions[i * 3] = x
      particlePositions[(i * 3) + 1] = y
      particlePositions[(i * 3) + 2] = z
      particlesData.push({
        velocity: new THREE.Vector3(
          - 1 + (Math.random() * 2),
          - 1 + (Math.random() * 2),
          - 1 + (Math.random() * 2)
        ),
        numConnections: 0,
      })
    }
    // 设置几何数据
    particles.setDrawRange(0, particleCount)
    particles.setAttribute('position',
      new THREE.BufferAttribute(particlePositions, 3)
        .setUsage(THREE.DynamicDrawUsage))

    // 定义点云，即粒子系统
    const pointCloud = new THREE.Points(particles, pMaterial)
    group.add(pointCloud)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)
      .setUsage(THREE.DynamicDrawUsage))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3)
      .setUsage(THREE.DynamicDrawUsage))
    geometry.computeBoundingSphere()
    geometry.setDrawRange(0, 0)

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })

    const lineMesh = new THREE.LineSegments(geometry, material)
    group.add(lineMesh)
    const renderer = new THREE.WebGL1Renderer({ canvas, antialias: true, })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvasWidth, canvasHeight)
    const stats = new Stats()

    const effectController = {
      showDots: true,
      showLine: true,
      minDistance: 10,
      limitConnections: false,
      maxConnections: 200,
      particleCount: 200,

    }
    animate()

    function animate() {
      let vertexpos = 0
      let colorpos = 0
      let numConnected = 0
      for (let i = 0;i < particleCount;i++) {
        particlesData[i].numConnections = 0
      }
      for (let i = 0;i < particleCount;i++) {
        const particleData = particlesData[i]
        particlePositions[(i * 3)] = particleData.velocity.x
        particlePositions[(i * 3) + 1] = particleData.velocity.y
        particlePositions[(i * 3) + 2] = particleData.velocity.z


        if (particlePositions[(i * 3) + 1] < -boxHalf || particlePositions[(i * 3) + 1] > boxHalf) {
          particleData.velocity.y = - particleData.velocity.y
        }
        if (particlePositions[(i * 3)] < -boxHalf || particlePositions[(i * 3)] > boxHalf) {
          particleData.velocity.x = - particleData.velocity.x
        }
        if (particlePositions[(i * 3) + 2] < -boxHalf || particlePositions[(i * 3) + 2] > boxHalf) {
          particleData.velocity.z = - particleData.velocity.z
        }
        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections) {
          continue
        }

        for (let j = i + 1;j < particleCount;j++) {
          const particleDataB = particlesData[j]
          if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections) {
            continue
          }
          const dx = particlePositions[i * 3] - particlePositions[j * 3]
          const dy = particlePositions[(i * 3) + 1] - particlePositions[(j * 3) + 1]
          const dz = particlePositions[(i * 3) + 2] - particlePositions[(j * 3) + 2]
          const dist = Math.sqrt((dx * dx) + (dy * dy) + (dz * dz))
          if (dist < effectController.minDistance) {
            particleData.numConnections++
            particleDataB.numConnections++

            const alpha = 1.0 - (dist / effectController.minDistance)

            positions[vertexpos++] = particlePositions[i * 3]
            positions[vertexpos++] = particlePositions[(i * 3) + 1]
            positions[vertexpos++] = particlePositions[(i * 3) + 2]


            positions[vertexpos++] = particlePositions[j * 3]
            positions[vertexpos++] = particlePositions[(j * 3) + 1]
            positions[vertexpos++] = particlePositions[(j * 3) + 2]

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha

            numConnected += 1

          }


        }

      }


      lineMesh.geometry.setDrawRange(0, numConnected * 2)
      lineMesh.geometry.attributes.position.needsUpdate = true
      lineMesh.geometry.attributes.color.needsUpdate = true


      pointCloud.geometry.attributes.position.needsUpdate = true

      requestAnimationFrame(animate)
      stats.update()
      render()
    }

    function render() {
      const time = Date.now() * 0.001
      group.rotation.y = time * 0.1
      renderer.render(scene, camera)
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
        <Text />
      </>
    )
  }
}
