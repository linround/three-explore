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
          <li>length 函数</li>
          <CodeText>
            <>
              <p>float length(float x)</p>
              <p>float length(vec2 x)</p>
              <p>······</p>
            </>
          </CodeText>
          <p>length函数返回的是模的值</p>
          <li>step 函数；</li>
          <CodeText>
            <>
              <p>float step(float edge, float x)</p>
              <p>vec2 step(vec2 edge, vec2 x)</p>
              <p>······</p>
            </>
          </CodeText>
          <p>例如：</p>
          <p>x  &lt;= edge ; 返回 0；</p>
          <p>x  &gt; edge ; 返回 1；</p>
          <p>通过比较两个值生成阶跃函数；</p>
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
          <CodeText>

            <>
              <p> 这里计算的是比重</p>
              <p> 前半部分</p>
              <p>  st.y 的值越接近 value 比重越接近 1</p>
              <p>  st.y 的值 小于等于 value-0.01的都是 0</p>
              <p>  st.y 的值 大于等于 value 的 都是1</p>
              <p>  后半部分</p>
              <p>  st.y 的值越接近 value+0.01 比重越靠近1</p>
              <p>  st.y 的值 小于等于 value 的都是0</p>
              <p>  st.y 的值大于等于 value+0.01 的都是1</p>
              <p> 两者相减</p>
              <p> 越靠近 value 越接近1</p>
              <p>  st.y 的值 小于等于 value-0.01 都是0</p>
              <p>  st.y 的值 大于等于 value+0.01 都是 0</p>
              <p>  这里解释一下为什么</p>
              <p> 可以想象下 越靠近 value+0.01 两者相减的值 从 value {'=>'} value+0.01 越来越趋向0，最终成为 0</p>
              <p> 直接从前部分即可知道  越靠近 value-0.01 越趋向 0，最终成为 0；</p>
              <p>函数如下：</p>
              <p>float plot(vec2 st,float value) {'{'}</p>
              <p>   return smoothstep(value-0.01,value,st.y)</p>
              <p>   -smoothstep(value,value+0.01,st.y);</p>
              <p>{'}'}</p>
            </>
          </CodeText>

          <li>fract 函数;</li>
          <CodeText>
            <>
              <p>float fract(float x)</p>
              <p>vec2 fract(vec2 x) </p>
              <p>······</p>
            </>
          </CodeText>
          <p>计算x的小数部分 ( 注意x为负数时 )；</p>
          <p>等价于：</p>
          <CodeText>
            <p>x - floor(x)</p>
          </CodeText>
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
        </ul>
      </main>
    )
  }
}
