import { ImgPageHeader } from '../../component/imgPageHeader.jsx'
import { MoveContainer } from '../../component/MoveContainer.jsx'
import css from '../BrightnessAndContrast/css.module.less'
import { MoveAction } from '../../component/constValue.js'
import { RangeInput } from '../../component/RangeInput.jsx'
import  * as React from 'react'

export function HueSaturation() {
  const [hue, setHue] = React.useState(0)
  const [saturation, setSaturation] = React.useState(0)
  const onChangeHue = (e) => {
    setHue(+e.target.value)
  }
  const onChangeSaturation = (e) => {
    setSaturation(+e.target.value)
  }

  return  (
    <>
      <ImgPageHeader />
      <MoveContainer>
        <div className={css.paramsTools}>
          <div className={css.moveIcon} data-action={MoveAction}>移动</div>
          <div className={css.inputContainer}>
            <label className={css.label}>色调：{hue}</label>
            <RangeInput
              max={0.5}
              min={-0.5}
              step={0.01}
              onChange={onChangeHue}
              value={hue}/>
          </div>
          <div  className={css.inputContainer}>
            <label className={css.label}>饱和度：{saturation}</label>
            <RangeInput
              max={5}
              min={-5}
              step={0.01}
              onChange={onChangeSaturation}
              value={saturation}/>
          </div>
        </div>
      </MoveContainer>
    </>
  )
}
