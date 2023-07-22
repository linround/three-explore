import { Component } from 'react'
import { CodeText } from '../../component/codeText.jsx'

export class Text extends Component {
  render() {
    return (
      <main>
        <h1>关于 Geometry</h1>
        <ul>
          <li>fract 函数;</li>
          <CodeText>
            <p>float fract(float x)</p>
            <p>vec2 fract(vec2 x) </p>
            <p>······</p>
          </CodeText>
          <p>计算x的小数部分；</p>
          <li>clamp 函数;</li>
          <CodeText>
            <p>float clamp(float x, float minVal, float maxVal)</p>
            <p>vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)</p>
            <p>······</p>
          </CodeText>
          <p>将 x 指限定在 [ minVal, maxVal ] 范围</p>
        </ul>
      </main>
    )
  }
}
