import { Component } from 'react'
import PropTypes from 'prop-types'
import css from './css.module.less'

export class CodeText extends Component {
  render() {
    const { children, } = this.props
    return (
      <div className={css.code}>
        {children}
      </div>
    )
  }
}

CodeText.propTypes = { children: PropTypes.any, }
CodeText.prototypes = {
  children: PropTypes.element,
}
