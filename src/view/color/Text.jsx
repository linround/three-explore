import { CodeText } from '../../component/codeText.jsx'
import hsbFragmentShader from './hsbFragmentShader.glsl?url'

export function Text() {
  return (
    <main>
      <h1>Color</h1>
      <ul>
        <p>
          这里包含了颜色空间的转换公式 、
          模拟了日落 、
          验证参数的引用传递 和 值传递。
          <a href={hsbFragmentShader}>查看</a>
        </p>
        <li>HSB</li>
        <p>HSB 代表 hue(色调),saturation(饱和度),brightness(亮度)</p>
        <p>另外：</p>
        <p>HSV代表  hue(色调), saturation(饱和度), value(明度)</p>
        <p>HSL代表  hue(色调), saturation(饱和度), lightness(亮度)</p>
        <ul>
          <li>色调</li>
          <p>决定了颜色，例如：红色，蓝色</p>
          <li>饱和度</li>
          <p>决定了颜色的纯度，颜色越纯，饱和度越高</p>
          <li>亮度</li>
          <p>颜色的明亮程度</p>
        </ul>
        <li>mix 函数</li>
        <p>将值限制在两个值之间；</p>
        <CodeText>
          <>
            <p>float mix(float x, float y, float a)</p>
            <p>vec2 mix(vec2 x, vec2 y, vec2 a)</p>
            <p>······</p>
          </>
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
        <li>in、inout、out指定参数类型</li>
        <p>验证一下 in 类型 是引用传递还是值传递</p>
        <p>验证结果如下：</p>
        <p>使用 in 类型传递时 是值传递</p>
        <p>使用 inout 传递时 是引用传递</p>
        <p>使用 out 类型传递时 是引用传递</p>
        <p>不使用以上三种类型时  是值传递</p>
        <CodeText>
          <>
            <p> void inF(inout vec3 color){'{'}</p>
            <p> color = vec3(1.0,1.0,0.0);</p>
            <p> {'}'}</p>
            <p>  不使用以上三种类型时  是值传递</p>
            <p> vec3 inFD( vec3 color){'{'}</p>
            <p> color = vec3(1.0,0.0,1.0);</p>
            <p> return color;</p>
            <p> {'}'}</p>
            <p>   void testIn(){'{'}</p>
            <p>  vec3 color = vec3(1.0,0.0,0.0);</p>
            <p>  inF(color);</p>
            <p>  gl_FragColor = vec4(color,1.0);</p>
            <p> {'}'}</p>
          </>
        </CodeText>
      </ul>
    </main>
  )
}
