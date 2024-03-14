import { ImagesDialog } from './imagesDialog.jsx'
import { useState } from 'react'
import css from './imgPageHeader.module.less'
import PropTypes from 'prop-types'

export function ImgPageHeader(props) {
  const { onSelect, } = props
  const [visible, setVisible] = useState(false)
  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }


  return (
    <div className={css.container}>
      <button onClick={onOpen}>选择图片</button>
      <ImagesDialog show={visible} onSelect={onSelect} onClose={onClose}></ImagesDialog>
    </div>
  )

}

ImgPageHeader.propTypes = {
  onSelect: PropTypes.func,
}
