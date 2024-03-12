import css from './imageDialog.module.less'
import cat from '../assets/cat.jpg'
import face from '../assets/face.jpg'
import greyhound from '../assets/greyhound.jpg'
import leaf from '../assets/leaf.jpg'
import perspective from '../assets/perspective.jpg'
import sunset from '../assets/sunset.jpg'
import PropTypes from 'prop-types'


export function ImagesDialog(props) {
  const images = [
    cat, face, greyhound, leaf, perspective, sunset
  ]
  const { show, onClose, onSelect, } = props

  return (
    <>
      <div
        className={css.container}
        style={{ display: show ? '' : 'none', }}>
        <div className={css.title}>选择下列的一张图片或上传图片：</div>
        <div className={css.imgContainer}>
          {images.map((src, index) => (
            <img
              onClick={() => onSelect(src)}
              key={index}
              className={css.img}
              src={src}
              alt={'图片'} />
          ))}
        </div>

        <div>
          <button className={css.closeBtn} onClick={onClose}>关闭</button>
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
