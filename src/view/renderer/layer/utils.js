export function stopPropagation(event) {
  event.stopPropagation()
  event.preventDefault()
  return event
}
