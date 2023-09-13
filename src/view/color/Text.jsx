import { CodeText } from '../../component/codeText.jsx'
import hsbFragmentShader from './hsbFragmentShader.glsl?url'
import rectFragmentShader from './rectFragmentShader.glsl?url'
import shapesFragmentShader from './shapesFragmentShader.glsl?url'

export function Text() {
  return (
    <main>
      <h1>Color </h1>
      <p>
        色彩空间基础；
        <a href={'https://zhuanlan.zhihu.com/p/24214731'}>查看</a>
      </p>
      <ul>
        <p>
          这里包含了颜色空间的转换公式 、
          模拟了日落 、
          验证参数的引用传递 和 值传递。
          <a href={hsbFragmentShader}>查看</a>
        </p>
        <p>
          介绍了使用distance函数来创建 圆形；介绍了如何转换思想，以向量点积的方式来建立圆形；
          介绍了如何利用 fract 函数来创建距离场；
          <a href={shapesFragmentShader}>查看</a>
        </p>
        <p>这里介绍了如何利用 step函数 和 smoothstep函数 来构造矩形；
          step函数 的结果 从某些方面看来是特殊的 smoothstep函数 的结果；

          介绍了如何利用
        <a href={rectFragmentShader}> smoothstep 示例</a>与
        <a href={shapesFragmentShader}> step 示例</a>；
        </p>
        <p>在使用 smoothstep 构建边界时，还可以利用其实现边缘的模糊效果；</p>
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
      <li>色彩和波长</li>
      <p>如果反射光以低频为主，则为物体表现为红色。此时，可以说光谱中红色端有一个
      <a>主频率</a>或<a>主波长</a>。
      </p>
      <p>主频率也称为光的<a>色彩(hue)</a>,也就是颜色。</p>
      <li>颜色的心理学特征</li>
      <p>在观察光源时，眼睛对<a>颜色</a>和另外两个基本的感觉做出反应；
      其中之一是<a>亮度</a>，它对应于全部光能且可量化为光源亮度（参考图形学基础第四版17.3）;
      第三个感受的特征是光的<a>纯度即饱和度</a>，纯度表示光的颜色表现接近光谱色的程度，
        浅色或暗淡的颜色的纯度较低，他们比较接近白色。另一术语<a>色度</a>
        通常说明纯度和主频率这两种颜色特征。
        白色光源能量分布较均匀，红色光源会在红色主频率处的能量分布较高；
      </p>
      <li>颜色模型
        <ul>
          <li>基色</li>
          <p>当光由两个或多个不同主频率的光源混合而成时，可以通过改变各个光源的强度来生成一系列
          其他颜色的光。用来生成其他颜色的光源的色彩称为<a>基色</a>;通过基色可以产生的所有颜色的
            集合称为该颜色模型的颜色范围；如果两种基色混合称为白色光，那么就称其为互补色。互补色的例子：
            红色和青色、绿色和品红、蓝色和黄色；
          </p>
        </ul>
      </li>
    </main>
  )
}
