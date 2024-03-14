import React from 'react'
import { MoveAction } from './constValue.js'


export function MoveContainer({ children, ...props }) {
  return React.cloneElement(children, {
    ...props,
    onMouseDown(downEvent) {
      const ele = downEvent.target
      if (ele && ele.getAttribute) {
        const action = ele.getAttribute('data-action')
        if (action === MoveAction) {
          const container = ele.parentElement
          createMoveAction(container, downEvent)
        }
      }
    },
  })
}

export function createMoveAction(element, downEvent) {
  const { left, top, } = element.getBoundingClientRect()
  const { clientX: startX, clientY: startY, } = downEvent

  function onMouseMove(e) {
    const { clientX, clientY, } = e
    element.style.left = left + clientX - startX + 'px'
    element.style.top = top + clientY - startY + 'px'
  }
  document.addEventListener('mousemove', onMouseMove)

  document.addEventListener('mouseup', mouseup)
  function removeMousemove() {
    document.removeEventListener('mousemove', onMouseMove)
  }
  function mouseup() {
    removeMousemove()
    document.removeEventListener('mouseup', mouseup)
  }
}
