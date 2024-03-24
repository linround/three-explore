import { useEffect, useRef } from 'react'

export function ViewCanvas() {
  const points = [
    [0, 0],
    [1, 1]
  ]

  const canvas = useRef()

  useEffect(() => {
    console.log(canvas.current, '======canvas dom=========')
  }, [canvas])

  return (
    <canvas width={200} height={200} ref={canvas}></canvas>
  )
}
