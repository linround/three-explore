import { useRef } from 'react'

export function ViewCanvas() {

  const canvas = useRef()
  return (
    <canvas width={200} height={200} ref={canvas}></canvas>
  )
}
