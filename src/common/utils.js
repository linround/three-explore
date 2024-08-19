export function parseLocation() {
  const { search, } = window.location
  const searchParams = new URLSearchParams(search)
  return searchParams
}
