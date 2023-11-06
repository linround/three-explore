
export function createConnection(inputID, outputID) {
  const input = document.getElementById(inputID)
  const output = document.getElementById(outputID)
  const inputRect = input.getBoundingClientRect()
  const outputRect = output.getBoundingClientRect()
  const startX = inputRect.x
  const startY = inputRect.y
  const endX = outputRect.x
  const endY = outputRect.y
  const curve = createCurve(
    startX, startY, endX, endY
  )
  return  createPath(curve)
}
export function createSvg(ele) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.appendChild(ele)
  return svg
}
export function createPath(d) {
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttributeNS(
    null, 'd', d
  )
  path.setAttributeNS(
    null, 'stroke-width', '5px'
  )

  path.setAttributeNS(
    null, 'stroke', 'red'
  )

  path.setAttributeNS(
    null, 'fill', 'none'
  )

  return path
}
export function createCurve(
  startX, startY, endX, endY
) {
  const x1 = (startX + endX) / 2.
  const y1 = startY
  const x2 = (startX + endX) / 2.
  const y2 = endY
  return `M ${startX} ${startY} C ${x1} ${y1} ${x2} ${y2} ${endX} ${endY}`
}
