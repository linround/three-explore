import { ImgPageHeader } from '../../component/imgPageHeader.jsx'
import { MoveContainer } from '../../component/MoveContainer.jsx'
import css from '../BrightnessAndContrast/css.module.less'
import { MoveAction } from '../../component/constValue.js'
import  * as React from 'react'
import {
  useEffect, useRef, useState
} from 'react'
import {
  createImgTexture, getImageSizeByUrl, resizeRendererToDisplaySize
} from '../../utils.js'
import defaultUrl from '../../assets/sunset.jpg'
import * as THREE from 'three'
import fragmentShader from './fragmentShader.glsl?raw'
import vertexShader from '../../common/commonVertexShader.glsl?raw'
import { Text } from './Text.jsx'
import { ViewCanvas } from './ViewCanvas.jsx'

let renderer = null
let uniforms = null
let canvas = null

function setUniformValue(key, value) {
  const webglRenderingContext = renderer.getContext()
  const program = renderer.info.programs[0]
  const location = webglRenderingContext.getUniformLocation(program.program, key)
  webglRenderingContext.uniform1f(location, value)

}
export function Curves() {
  const [hue, setHue] = React.useState(0)
  const [saturation, setSaturation] = React.useState(0)
  const [width, setWidth] = useState(0)

  const [height, setHeight] = useState(0)
  const onChangeHue = (e) => {

    const value = +e.target.value
    setUniformValue('hue', value)
    setHue(value)
  }
  const onChangeSaturation = (e) => {
    const value = +e.target.value
    setUniformValue('saturation', value)
    setSaturation(value)
  }
  const updateCanvasSize = async (url) => {
    const { width, height, } = await getImageSizeByUrl(url)
    renderer.setSize(
      width, height, false
    )
    setWidth(width)
    setHeight(height)
  }

  const canvasRef = useRef(null)



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
        saturation: { value: saturation, },
        hue: { value: hue, },
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
        uniforms.saturation.value = saturation
        uniforms.hue.value = hue

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



  return  (
    <>
      <ImgPageHeader onSelect={onChangeTexture} />
      <MoveContainer>
        <div className={css.paramsTools}>
          <div className={css.moveIcon} data-action={MoveAction}>移动</div>
          <ViewCanvas/>
        </div>
      </MoveContainer>
      <div className={css.canvasContainer}>
        <canvas width={width} height={height} ref={canvasRef}></canvas>
      </div>
      <Text />
    </>
  )
}
