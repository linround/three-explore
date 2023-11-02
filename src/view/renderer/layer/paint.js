import { sceneData } from '../data.js'
export function paintSvg(container) {
  if (!container) return
  const observationPointOutPutNode =  container.querySelector('#' + sceneData.observationPoint.outPutNode)
  const observationDirectionInPutNode =  container.querySelector('#' + sceneData.observationDirection.inPutNode)
  createConnection(
    observationDirectionInPutNode,
    observationPointOutPutNode,
    container
  )
}
export function createConnection(
  input, output, container
) {
  const inputRect = input.getBoundingClientRect()
  const outputRect = output.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  console.log(inputRect)
  console.log(outputRect)
  console.log(containerRect)
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
