import React, { useState } from 'react'
import { stopPropagation } from './utils.js'

export function LayerWrapper(props) {
  const [show, setShow] = useState(true)
  const onContextMenu = (event) => {
    stopPropagation(event)
  }
  const onClick = () => {
    // setShow(!show)
  }



  return React.cloneElement(props.children, {
    style: {
      opacity: show ? 0.95 : 0,
    },
    onContextMenu,
    onClick,
  })
}
