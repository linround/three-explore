import { ImgPageHeader } from '../../component/imgPageHeader.jsx'
import { MoveContainer } from '../../component/MoveContainer.jsx'
import css from '../BrightnessAndContrast/css.module.less'
import { MoveAction } from '../../component/constValue.js'

export function HueSaturation() {
  return  (
    <>
      <ImgPageHeader />
      <MoveContainer>
        <div className={css.paramsTools}>
          <div className={css.moveIcon} data-action={MoveAction}>移动</div>
        </div>
      </MoveContainer>
    </>
  )
}
