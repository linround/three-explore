import { cloneElement, useState } from 'react'
import { Selector } from '../utils.js'

export function Drag(props) {
  const selector = new Selector()
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const initInfo = {
    coordinate: null,
    offsetX: offsetX,
    offsetY: offsetY,
  }
  selector.on('beforeSelect', (coordinate) => {
    initInfo.coordinate = coordinate
  })
  selector.on('selecting', (coordinate) => {
    if (!initInfo.coordinate) return
    const { clientX, clientY, } = initInfo.coordinate
    const offsetX1 = coordinate.clientX - clientX + offsetX
    const offsetY1 = coordinate.clientY - clientY + offsetY
    setOffsetX(offsetX1)
    setOffsetY(offsetY1)
  })
  selector.on('select', () => {
    initInfo.coordinate = null
  })


  return cloneElement(props.children, {
    style: {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    },
    onPointerDown(e) {
      selector.handleInitialEvent(e)
    },
    onPointerMove() {},
  })
}
