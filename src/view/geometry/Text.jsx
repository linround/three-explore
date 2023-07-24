import { Component } from 'react'
import { CodeText } from '../../component/codeText.jsx'
import straightLineFragmentShader from './straightLineFragmentShader.glsl?url'
import curveFragmentShader from './curveFragmentShader.glsl?url'

export class Text extends Component {
  render() {
    return (
      <main>
        <h1>关于 Geometry</h1>
        <ul>
          <li>smoothstep 函数</li>
          <CodeText>
            <>
              <p>float smoothstep(float edge0, float edge1, float x) </p>
              <p>vec2 smoothstep(vec2 edge0, vec2 edge1, vec2 x) </p>
              <p>······</p>
            </>
          </CodeText>
          <p>在两个值之间进行<a href={'https://zhuanlan.zhihu.com/p/64855561'}>差值</a></p>
          <p>edge0 指定了插值函数的下边界；edge1 指定了插值函数的上边界；x 指定了差值的源值；</p>
          <p>等价于：</p>
          <CodeText>
            <>
              <p>genType t;</p>
              <p>t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);</p>
              <p>return t * t * (3.0 - 2.0 * t);</p>
            </>
          </CodeText>
          <p>( x - edge0 ) / ( edge1 - edge0 ) &lt; 0; edg0 时 ,t 为0，差值结果为 0；</p>
          <p>( x - edge0 ) / ( edge1 - edge0 ) &gt; 1; 时 ,t 为1，差值结果为 1；</p>
          <p>
            详情查看，
            <a href={straightLineFragmentShader}> shader 线性差值1</a>，
            <a href={curveFragmentShader}>shader 线性差值2</a>
          </p>

          <li>fract 函数;</li>
          <CodeText>
            <>
              <p>float fract(float x)</p>
              <p>vec2 fract(vec2 x) </p>
              <p>······</p>
            </>
          </CodeText>
          <p>计算x的小数部分；</p>
          <li>clamp 函数;</li>
          <CodeText>
            <>
              <p>float clamp(float x, float minVal, float maxVal)</p>
              <p>vec2 clamp(vec2 x, vec2 minVal, vec2 maxVal)</p>
              <p>······</p>
            </>
          </CodeText>
          <p>等价于：</p>
          <CodeText>
            <p>
              min(max(x, minVal), maxVal)
            </p>
          </CodeText>
          <p>将 x 指限定在 [ minVal, maxVal ] 范围</p>
          <li>绘制一条直线</li>
        </ul>
      </main>
    )
  }
}
