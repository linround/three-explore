import { CodeText } from '../../component/codeText.jsx'

export function Text() {

  return (
    <main>
      <h1>图片的明度/对比度</h1>
      <section>
        <p>调节图像的亮度和对比度（深浅部分之间的差异）。如果减弱对比度，则深浅部分之间的差异会减少并产生软和的图像。</p>
        <p>反之，如果增强对比度，则深浅部分之间的差异会增加并产生锐利的图像。</p>
        <p>像素点的亮度计算公式：</p>
        <CodeText>
          <>
            <p>{'// '}在RGB模式下:</p>
            <p>L=R*0.30+G*0.59+B*0.11</p>
          </>
        </CodeText>
        <h2>亮度调节</h2>
        <CodeText>
          <>
            <p>
                vec3 adjustBrightness(vec3 color, float brightness){'{'}
            </p>
            <p>
                return color + vec3(brightness);
            </p>
            <p>
              {'}'}
            </p>
          </>
        </CodeText>
        <h2>对比度调节</h2>
        <CodeText>
          <>
            <p>
              vec3 adjustContrast(vec3 color, float contrast){'{'}
            </p>

            <p>
              if(contrast &gt; 0.){'{'}
            </p>

            <p>
              color.rgb = (color.rgb-0.5)/(1.-contrast) + 0.5;
            </p>

            <p>
              {'}'} else{'{'}
            </p>

            <p>
              color.rgb = (color.rgb-0.5)/(1.+contrast) + 0.5;
            </p>

            <p>
              {'}'}
            </p>
            <p>
              return color;
            </p>
          </>
        </CodeText>
      </section>
    </main>
  )
}
