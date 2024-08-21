export function parseLocation() {
  const { search, } = window.location
  const searchParams = new URLSearchParams(search)
  return searchParams
}
export const SUCCESS_CODE = 200
