import * as THREE from 'three'


export function createImgTexture(url) {

  const loader = new THREE.TextureLoader()

  const texture = loader.load(url)

  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  return texture
}

export function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement

  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height

  if (needResize) {

    renderer.setSize(
      width, height, false
    )
  }
  return needResize
}

export function addDocEventListener(type, fn) {
  document.addEventListener(type, fn)
  return () => {
    document.removeEventListener(type, fn)
  }
}
export function getEventCoordinates(event) {
  const target = event
  return {
    clientX: target.clientX,
    clientY: target.clientY,
    pageX: target.pageX,
    pageY: target.pageY,
  }
}
export class Selector {
  constructor() {
    this.listeners = {}
  }
  handleInitialEvent(e) {
    const initCoordinate = getEventCoordinates(e)
    this.emit('beforeSelect', initCoordinate)
    switch (e.type) {
    case 'pointerdown':{
      this.removeMoveListener = addDocEventListener('pointermove', (e) => {
        this.handleMoveEvent(e)
      })
      this.removeEndListener = addDocEventListener('pointerup', (e) => {
        this.handleTerminatingEvent(e)
      })
    }
    }
  }
  handleTerminatingEvent(e) {
    this.removeMoveListener()
    this.removeEndListener()
    const endCoordinates = getEventCoordinates(e)
    this.emit('select', endCoordinates)
  }
  handleMoveEvent(e) {
    const selectingCoordinates = getEventCoordinates(e)
    this.emit('selecting', selectingCoordinates)
  }
  on(type, handler) {
    const handlers = this.listeners[type]
    if (handlers) {
      handlers.push(handler)
      return
    }
    this.listeners[type] = [handler]
  }
  emit(type, ...args) {
    let result
    const handlers = this.listeners[type]
    handlers.forEach((fn) => {
      if (result === undefined) {
        result = fn(...args)
      }
    })
    return result
  }
}
