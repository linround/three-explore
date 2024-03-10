import { RangeInput } from '../../component/RangeInput.jsx'
import {
  useEffect, useRef, useState
} from 'react'

import * as THREE from 'three'
import leaf from '/src/assets/leaf.jpg'
import vertexShader from '/src/common/commonVertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'
import { resizeRendererToDisplaySize } from '../../utils.js'



export function BrightnessAndContrast() {
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(10)

  const onBrightnessChange = (e) => {
    const value = e.target.value
    setBrightness(+value)
  }
  const onContrastChange = (e) => {
    const value = e.target.value
    setContrast(+value)
  }


  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      const renderer = new THREE.WebGL1Renderer({ canvas, })
      const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, -1, 1
      )

      const scene = new THREE.Scene()

      const plane = new THREE.PlaneGeometry(
        2, 2, 1, 1
      )
      const loader = new THREE.TextureLoader()
      const texture = loader.load(leaf)

      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping

      const uniforms = {
        iTime: { value: 0, },
        iResolution: { value: new THREE.Vector3(), },
        iMouse: { value: new THREE.Vector2(), },
        iChannel0: { value: texture, },
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
        const time = t * 0.001
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
  }, [canvasRef])

  return (
    <div>
      <div>
        <label>Brightness</label>：<RangeInput onChange={onBrightnessChange} value={brightness}/>
      </div>
      <div>
        <label>Contrast</label>：<RangeInput onChange={onContrastChange} value={contrast}/>
      </div>
      <canvas width={640} height={480} ref={canvasRef}></canvas>
    </div>
  )
}
