import PropTypes from 'prop-types'
import css from './rangeInput.module.less'

export function RangeInput({
  min = 0,
  max = 100,
  value = 0,
  step = 1,
  onChange = () => void 0,
}) {
  return (
    <input
      className={css.input}
      type={'range'}
      max={max}
      min={min}
      onChange={onChange}

      defaultValue={value}
      step={step}/>
  )
}
RangeInput.propTypes  = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
}
