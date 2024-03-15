import { CodeText } from '../../component/codeText.jsx'
import css from './css.module.less'
export function Text() {

  return (
    <main>
      <h1>图片的明度/对比度</h1>
      <ul>
        <p>附录：</p>
        <li>
          <a href={'https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-data-textures.html'}>
            WebGL 数据纹理
          </a>
        </li>
      </ul>
      <section>
        <p>调节图像的亮度和对比度（深浅部分之间的差异）。</p>
        <p>如果减弱对比度，则深浅部分之间的差异会减少并产生软和的图像。</p>
        <p>反之，如果增强对比度，则深浅部分之间的差异会增加并产生锐利的图像。</p>
        <p>在webgl中，支持的纹理类型如下：</p>
        <table className={css.table}>
          <thead>
            <tr>
              <th>格式</th>
              <th>数据类型</th>
              <th>通道数</th>
              <th>单像素字节数</th>
            </tr>
          </thead>
          <tbody className={css.table}>
            <tr>
              <td>RGBA	</td>
              <td>UNSIGNED_BYTE</td>
              <td>4</td>
              <td>4</td>
            </tr>
            <tr>
              <td>RGB	</td>
              <td>UNSIGNED_BYTE</td>
              <td>3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>RGBA	</td>
              <td>UNSIGNED_SHORT_4_4_4_4</td>
              <td>4</td>
              <td>2</td>
            </tr>

            <tr>
              <td>RGBA	</td>
              <td>UNSIGNED_SHORT_5_5_5_1</td>
              <td>4</td>
              <td>2</td>
            </tr>

            <tr>
              <td>RGB	</td>
              <td>UNSIGNED_SHORT_5_6_5</td>
              <td>3</td>
              <td>2</td>
            </tr>

            <tr>
              <td>LUMINANCE_ALPHA	</td>
              <td>UNSIGNED_BYTE</td>
              <td>2</td>
              <td>2</td>
            </tr>


            <tr>
              <td>LUMINANCE	</td>
              <td>UNSIGNED_BYTE</td>
              <td>1</td>
              <td>1</td>
            </tr>

            <tr>
              <td>ALPHA	</td>
              <td>UNSIGNED_BYTE</td>
              <td>1</td>
              <td>1</td>
            </tr>



          </tbody>

        </table>
        <p>在threejs 中，纹理默认的格式如下：</p>
        <CodeText>
          <>

            <p>format = RGBAFormat </p>
            <p>type = UnsignedByteType</p>
          </>
        </CodeText>
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
