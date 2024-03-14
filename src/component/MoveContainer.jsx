import React from 'react'

export function MoveContainer({ children, ...props }) {
  return React.cloneElement(children, {
    ...props,
    onMouseDown(e) {
      console.log(e)
    },
  })
}
