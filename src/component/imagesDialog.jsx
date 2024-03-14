import css from './imageDialog.module.less'
import cat from '../assets/cat.jpg'
import face from '../assets/face.jpg'
import greyhound from '../assets/greyhound.jpg'
import leaf from '../assets/leaf.jpg'
import perspective from '../assets/perspective.jpg'
import sunset from '../assets/sunset.jpg'
import PropTypes from 'prop-types'
import { createRef, useState } from 'react'
const images = [
  cat, face, greyhound, leaf, perspective, sunset
]

export function ImagesDialog(props) {
  const [imgs, setImgs] = useState(images)

  const { show, onClose, onSelect, } = props

  const fileRef = createRef()

  const onUploadClick = () => {
    fileRef.current.click()
  }
  const onFileChange = (event) => {
    const files = event.target.files
    if (files.length === 0) return
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const src = e.target.result
      setImgs([...imgs, src])
    }
    reader.readAsDataURL(file)
  }
  return (
    <>
      <div
        className={css.container}
        style={{ display: show ? '' : 'none', }}>
        <div className={css.title}>选择下列的一张图片或上传图片：</div>
        <div className={css.imgContainer}>
          {imgs.map((src, index) => (
            <img
              onClick={() => onSelect(src)}
              key={index}
              className={css.img}
              src={src}
              alt={'图片'} />
          ))}
        </div>

        <div>
          <input type={'file'} ref={fileRef} onChange={onFileChange} hidden/>
          <button className={css.closeBtn} onClick={onClose}>关闭</button>
          <button className={css.uploadBtn} onClick={onUploadClick}>上传图片</button>
        </div>
      </div>
    </>
  )
}


ImagesDialog.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,

}
