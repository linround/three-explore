import { RangeInput } from '../../component/RangeInput.jsx'
import {
  useEffect, useRef, useState
} from 'react'

import * as THREE from 'three'
import defaultUrl from '/src/assets/leaf.jpg'
import vertexShader from '/src/common/commonVertexShader.glsl?raw'
import fragmentShader from './fragmentShader.glsl?raw'
import {
  createImgTexture, getImageSizeByUrl, resizeRendererToDisplaySize
} from '../../utils.js'
import css from './css.module.less'
import { Text } from './Text.jsx'
import { ImgPageHeader } from '../../component/imgPageHeader.jsx'
import { MoveContainer } from '../../component/MoveContainer.jsx'
import { MoveAction } from '../../component/constValue.js'

let renderer = null
let uniforms = null
let canvas = null


export function BrightnessAndContrast() {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0.5)




  const onBrightnessChange = (e) => {
    const value = +e.target.value
    const webglRenderingContext = renderer.getContext()
    const program = renderer.info.programs[0]
    const location = webglRenderingContext.getUniformLocation(program.program, 'brightness')
    webglRenderingContext.uniform1f(location, value)
    setBrightness(value)
  }
  const onContrastChange = (e) => {
    const value = +e.target.value
    const webglRenderingContext = renderer.getContext()
    const program = renderer.info.programs[0]
    const location = webglRenderingContext.getUniformLocation(program.program, 'contrast')
    webglRenderingContext.uniform1f(location, value)
    setContrast(value)
  }


  const canvasRef = useRef(null)

  const updateCanvasSize = async (url) => {
    const { width, height, } = await getImageSizeByUrl(url)
    renderer.setSize(
      width, height, false
    )
    setWidth(width)
    setHeight(height)
  }


  useEffect(() => {
    canvas = canvasRef.current
    if (canvas !== null) {

      (async function () {
        await updateCanvasSize(defaultUrl)
      })()
      renderer = new THREE.WebGLRenderer({ canvas, })
      const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, -1, 1
      )

      const scene = new THREE.Scene()

      const plane = new THREE.PlaneGeometry(
        2, 2, 1, 1
      )
      const texture = createImgTexture(defaultUrl)

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

  const onChangeTexture = async (url) => {
    uniforms.iChannel0.value = createImgTexture(url)
    await updateCanvasSize(url)
  }

  return (
    <>
      <ImgPageHeader onSelect={onChangeTexture} />
      <MoveContainer>
        <div className={css.paramsTools}>
          <div className={css.moveIcon} data-action={MoveAction}>移动</div>
          <div>
            <label className={css.label}>Brightness：{brightness}</label>
            <RangeInput
              max={0.5}
              min={-0.5}
              step={0.01}
              onChange={onBrightnessChange}
              value={brightness}/>
          </div>
          <div>
            <label className={css.label}>Contrast：{contrast}</label>
            <RangeInput
              max={5}
              min={-5}
              step={0.01}
              onChange={onContrastChange}
              value={contrast}/>
          </div>
        </div>
      </MoveContainer>
      <div className={css.canvasContainer}>
        <canvas width={width} height={height} ref={canvasRef}></canvas>
      </div>
      <Text />
    </>
  )
}
