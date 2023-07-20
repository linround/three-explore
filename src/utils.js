
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
