import { ImagesDialog } from './imagesDialog.jsx'
import { useState } from 'react'
import css from './imgPageHeader.module.less'

export function ImgPageHeader() {
  const [visible, setVisible] = useState(false)
  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  const onSelect = (url) => {
    console.log(url)
  }
  return (
    <div className={css.container}>
      <button onClick={onOpen}>选择图片</button>
      <ImagesDialog show={visible} onSelect={onSelect} onClose={onClose}></ImagesDialog>
    </div>
  )

}
