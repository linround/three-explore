import { useState } from 'react'
import PropTypes from 'prop-types'

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
}

export default function TLink({ page, children, }) {
  const [status, setStatus] = useState(STATUS.NORMAL)

  const onMouseEnter = () => {
    setStatus(STATUS.HOVERED)
  }

  const onMouseLeave = () => {
    setStatus(STATUS.NORMAL)
  }

  return (
    <a
      className={status}
      href={page || '#'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}
TLink.propTypes  = {
  page: PropTypes.string,
  children: PropTypes.elementType,
}
