import PropTypes from 'prop-types'
import { Component } from 'react'

export class Demo extends Component {
  render() {
    const { head, } = this.props
    return (
      <>
        <h1>Demo</h1>
        {head}
      </>
    )
  }
}

Demo.propTypes = { head: PropTypes.element, }
