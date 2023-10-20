import css from './css.module.less'
import PropTypes from 'prop-types'
export function Output(props) {
  return (
    <div
      style={props.style}
      className={css.container}></div>
  )
}
Output.propTypes = {
  style: PropTypes.object,
}
