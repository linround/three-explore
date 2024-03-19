import { CodeText } from '../../component/codeText.jsx'

export function Text() {

  return (
    <main>
      <h1>图片的色调/饱和度</h1>


      <h2>调节色调</h2>
      <CodeText>
        <>
          <p> vec4 adjustHue(vec4 color, float angle) {'{'}</p>
          <p>float s = sin(angle), c = cos(angle);</p>
          <p>vec3 weights = (vec3(2.0 * c, -sqrt(3.0) * s - c, sqrt(3.0) * s - c) + 1.0) / 3.0;</p>
          <p>float len = length(color.rgb);</p>
          <p> color.rgb = vec3(</p>
          <p>dot(color.rgb, weights.xyz),</p>
          <p>dot(color.rgb, weights.zxy),</p>
          <p> dot(color.rgb, weights.yzx)</p>
          <p>);</p>
          <p> return color;</p>
          <p>{'}'}</p>
        </>
      </CodeText>

      <h2>饱和度调节</h2>
      <CodeText>
        <>
          <p>vec4 adjustSaturation(vec4 color, float saturation) {'{'}</p>
          <p>float average = (color.r + color.g + color.b) / 3.0;</p>
          <p>if (saturation &gt; 0.0) { '{'}</p>
          <p>color.rgb += (average - color.rgb) * (1.0 - 1.0 / (1.001 - saturation));</p>
          <p>{'}'} else { '{'}</p>
          <p>color.rgb += (average - color.rgb) * (-saturation);</p>
          <p>{'}'}</p>
          <p>return color;</p>
          <p>{'}'}</p>
        </>
      </CodeText>
    </main>
  )
}
