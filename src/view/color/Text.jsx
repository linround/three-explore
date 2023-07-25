import { CodeText } from '../../component/codeText.jsx'

export function Text() {
  return (
    <main>
      <h1>Color</h1>
      <ul>
        <li>mix 函数</li>
        <p>将值限制在两个值之间；</p>
        <CodeText>
          <p>float mix(float x, float y, float a)</p>
          <p>vec2 mix(vec2 x, vec2 y, vec2 a)</p>
          <p>······</p>
        </CodeText>
        <p>x 指定了插值范围的起点</p>
        <p>y 指定了插值范围的末尾</p>
        <p>a 用于指定在x 和 y 之间插值的值</p>
        <p>等价于：</p>
        <CodeText>
          <>
            <p>mix(x,y,a)；</p>
            <p>x×(1−a)+y×a；</p>

            <p> {'//'} colorB可以看作是目标色；</p>
            <p> {'//'} colorA可以看作是底色；</p>
            <p>color = (1.0-pct)*colorA + (pct) * colorB;</p>
          </>
        </CodeText>
        <li>vec 向量</li>
        <CodeText>
          <>
            <p> vec3 red = vec3(1.0,0.0,0.0);</p>
            <p>red.x = 1.0;</p>
            <p>red.y = 0.0;</p>
            <p>red.z = 0.0;</p>
          </>
        </CodeText>
        <p>颜色可以使用 x,y,z 符号进行定义；</p>
        <p>同样也可以使用 r,g,b 和 s,t,p；</p>
        <p>不过 s,t,p 通常用作纹理空间坐标；</p>
        <p>如下所示：</p>
        <CodeText>
          <>
            <p>vec4 vector;</p>
            <p>vector[0] = vector.r = vector.x = vector.s;</p>
            <p>vector[1] = vector.g = vector.y = vector.t;</p>
            <p>vector[2] = vector.b = vector.z = vector.p;</p>
            <p>vector[3] = vector.a = vector.w = vector.q;</p>
          </>
        </CodeText>
      </ul>
    </main>
  )
}
