import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createConnection } from './paint.js'

export function SvgComponent({ connections, }) {

  useEffect(() => {
    connections.map((connection) => {
      createConnection(connection[0], connection[1])
    })

  }, [connections])
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" >
      {/*<path d="M10 10"/>*/}
      {/*<path d="M 0 0 C 100 0, 100 200, 200 200" stroke="red" fill="none" strokeWidth="6px"/>*/}
      {/*/!*Points*!/*/}
      {/*<circle cx="100" cy="0" r="10" fill="red"/>*/}
      {/*<circle cx="200" cy="0" r="10" fill="red"/>*/}
      {/*<circle cx="200" cy="0" r="10" fill="red"/>*/}
    </svg>
  )
}
SvgComponent.propTypes = {
  connections: PropTypes.array,
}
