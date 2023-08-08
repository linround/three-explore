import { Component } from 'react'

export class Image extends Component {
  constructor(prop) {
    super(prop)
    this.renderScene = this.renderScene.bind(this)

  }
  renderScene() {}
  render() {
    return (
      <>
      Image
      </>
    )
  }
}
