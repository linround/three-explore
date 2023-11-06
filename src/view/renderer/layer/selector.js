function addDocEventListener(type, fn) {
  document.addEventListener(type, fn)
  return () => {
    document.removeEventListener(type, fn)
  }
}

export class Selector {
  constructor() {
    this.init = this.init.bind(this)
    this.handleTerminatingEvent = this.handleTerminatingEvent.bind(this)
    this.listeners = Object.create(null)

    this.initialState = {
      position: {
        clientX: 0,
        clientY: 0,
      },
    }
  }
  removeEndListener() {
    return
  }
  removeMoveListener() {
    return
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
    if (handlers) {
      handlers.forEach((fn) => {
        if (result === undefined) {
          result = fn(...args)
        }
      })
      return result
    }
  }
  init(e) {
    const { clientX, clientY, } = e
    this.initialState.position.clientX = clientX
    this.initialState.position.clientY = clientY
    const stop = this.emit('beforeSelect')

    if (stop) return
    switch (e.type) {
    case 'mousedown':{
      this.removeMoveListener = addDocEventListener('mousemove', (e) => {
        this.handleMoveEvent(e)
      })
      this.removeEndListener = addDocEventListener('mouseup', (e) => {
        this.handleTerminatingEvent(e)
      })
    }
    }
  }
  handleMoveEvent(e) {
    const { clientX, clientY, } = e
    const x = clientX - this.initialState.position.clientX
    const y = clientY - this.initialState.position.clientY
    this.emit('selecting', {
      x, y,
    })
  }
  handleTerminatingEvent(e) {
    this.removeMoveListener()
    this.removeEndListener()
    const { clientX, clientY, } = e
    const x = clientX - this.initialState.position.clientX
    const y = clientY - this.initialState.position.clientY
    this.emit('select', {
      x, y,
    })
  }
}
