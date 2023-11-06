import css from './css.module.less'
import PropTypes from 'prop-types'
export function Output(props) {
  return (
    <div
      {...props}
      style={props.style}
      className={css.container}>
      <div id={props.id}></div>
    </div>
  )
}
Output.propTypes = {
  style: PropTypes.object,
  id: PropTypes.string,
}
