import { sceneData } from '../data.js'
export function paintSvg(container) {
  if (!container) return
  const observationPointOutPutNode =  container.querySelector('#' + sceneData.observationPoint.outPutNode)
  const observationDirectionInPutNode =  container.querySelector('#' + sceneData.observationDirection.inPutNode)
  console.log(observationPointOutPutNode)
  console.log(observationDirectionInPutNode)
}
