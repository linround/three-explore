import { RangeInput } from '../../component/RangeInput.jsx'
import {
  useEffect, useRef, useState
} from 'react'

import * as THREE from 'three'
import leaf from '/src/assets/leaf.jpg'
import vertexShader from '/src/common/commonVertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'
import { createImgTexture, resizeRendererToDisplaySize } from '../../utils.js'
import css from './css.module.less'
import { Text } from './Text.jsx'
import { ImgPageHeader } from '../../component/imgPageHeader.jsx'


let uniforms = null
export function BrightnessAndContrast() {
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0.5)

  const [webglRenderer, setWebglRenderer] = useState(null)

  const onBrightnessChange = (e) => {
    const value = e.target.value
    const webglRenderingContext = webglRenderer.getContext()
    const program = webglRenderer.info.programs[0]
    const location = webglRenderingContext.getUniformLocation(program.program, 'brightness')
    webglRenderingContext.uniform1f(location, value)
    setBrightness(+value)
  }
  const onContrastChange = (e) => {
    const value = e.target.value
    const webglRenderingContext = webglRenderer.getContext()
    const program = webglRenderer.info.programs[0]
    const location = webglRenderingContext.getUniformLocation(program.program, 'contrast')
    webglRenderingContext.uniform1f(location, value)
    setContrast(+value)
  }


  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas !== null) {
      const renderer = new THREE.WebGLRenderer({ canvas, })
      setWebglRenderer(renderer)
      window.renderer = renderer
      const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, -1, 1
      )

      const scene = new THREE.Scene()

      const plane = new THREE.PlaneGeometry(
        2, 2, 1, 1
      )
      const texture = createImgTexture(leaf)

      uniforms = {
        brightness: { value: brightness, },
        contrast: { value: contrast, },
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
        uniforms.contrast.value = contrast
        uniforms.brightness.value = brightness

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

  const onChangeTexture = (url) => {
    uniforms.iChannel0.value = createImgTexture(url)
  }
  return (
    <>
      <ImgPageHeader onSelect={onChangeTexture} />
      <div className={css.container}>
        <div className={css.left}>
          <div>
            <label>Brightness</label>：
            <RangeInput
              max={0.5}
              min={-0.5}
              step={0.01}
              onChange={onBrightnessChange}
              value={brightness}/>
          </div>
          <div>
            <label>Contrast</label>：
            <RangeInput
              max={1}
              min={0}
              step={0.01}
              onChange={onContrastChange}
              value={contrast}/>
          </div>
        </div>
        <div className={css.right}>
          <canvas width={640} height={480} ref={canvasRef}></canvas>
        </div>
      </div>
      <Text />
    </>
  )
}
