import normalVertexShader from './normalVertexShader.glsl?url'
import normalFragmentShader from './normalFragmentShader.glsl?url'
import bayer from './texture/bayer.png?url'
import { CodeText } from '../../component/codeText.jsx'

export function Text() {
  return (
    <main>
      <h1>关于shader</h1>
      <ul>
        <li>uniform 是什么？</li>
        <p>GPU中所有的并行线程都是互相独立的；</p>
        <p>uniform 有些类似 CPU 和 GPU 之间的桥梁</p>
        <p>能够将一些输入从 CPU 发送给所有的线程，且这些输入对所有GPU线程来说都是一样的，并且是只读的 uniform 变量；</p>
        <li>gl_FragCoord 是什么？</li>
        <p>这是 glsl 默认提供的输入；</p>
        <p>表示当前正在处理的片元（像素）或 屏幕片段（dpr有关） 相对于窗口的坐标信息；是一个vec4类型的变量(x,y,z,1/w)；</p>
        <p>x,y默认是像素的中心而非整数。例如当viewport范围是（0,0,800,600）时；(x,y)的坐标范围(0.5,0.5,799.5,599.5)；</p>
        <p></p>
        <li>gl_FragColor 是什么？</li>
        <p>这是 glsl 默认给出的输出；</p>
        <p>片元（像素）颜色，包含四个分量RGBA,每个分量的范围在[0,1]之间。</p>
        <li>gl_Position 是什么？</li>
        <p>顶点的裁剪坐标系坐标，顶点着色器接收到该坐标后，对齐进行变换，并转化为NDC坐标[-1,1]，GPU使用的是NDC坐标进行绘制</p>
        <p>一个四维的向量。四维的齐次矩阵便于表示在三维空间中的相关变换。</p>
        <p>通常把表示顶点的位置数据的变量 position 赋值给 gl_Postion;</p>
        <p></p>
        <li>iResolutiond 是什么？</li>
        <p>iResolutiond 定义了视口的像素大小，即分辨率；</p>
        <p>通常也是指 canvas 的像素大小；</p>
        <p>注意：iResolutiond 被定义为了一个三维向量，通常只会用到 x 和 y； </p>
        <li>uv 是什么？</li>
        <p>所有的图像文件都是一个二维平面，水平方向是 u,垂直方向是 v；</p>
        <p>通过二维 uv 坐标系，可以定位图像上的任意一个像素 ;</p>
        <p>在shader中，片段的像素位置除以视口大小即可获得 片段在视口内的相对位置；</p>
        <li>如何把这个二维的平面贴到三维的 <a href={'https://zh.wikipedia.org/zh-cn/非均匀有理B样条'}>NURBUS表面</a> ？</li>
        <p>对于NURBUS表面，由于他本身具有 UV 参数并且也是二维的，所以可以通过换算把表面上的点和平面图像上的像素对应起来；</p>
        <p>对于多边形模型来说，为了贴图而额外的引进了一个UV坐标，以便把多边形的顶点和图像文件上的像素进行对应，从而通过这样的方式在多边形表面上定位纹理；</p>
        <p>所以多边形的顶点除了具有三维空间坐标外，还具有二维的 UV 坐标</p>
        <p>uv 的总结：uv 就是将图像上的每一个点精确对应到模型表面，在点与点之间的间隙位置由软件进行图像光滑差值处理。</p>
        <li>sampler2D 是什么？</li>
        <p>sampler2D 绑定的是纹理单元。可以看作一个拥有纹理数据的采样器;</p>
        <p>纹理坐标范围也会被归一化，范围是[0,1];左下角为(0,0)，右上角为(1,1);</p>
        <li>texture2D 是什么？</li>
        <p>从纹理中检索纹理像素；</p>
        <p>texture2D 函数返回一个纹理像素值。即给定坐标的纹理的颜色值</p>
        <CodeText>
          <p>vec4 texture2D(sampler2D sampler, vec2 coord)</p>
          <p>vec4 texture2D(sampler2D sampler, vec2 coord, float bias)</p>
        </CodeText>
        <p>sampler： 纹理绑定到的采样器；</p>
        <p>coord: 要检索的纹素的二维坐标；</p>
        <p>bias：指定计算时的可选偏差；在使用mipmap计算纹理的适当细节级别后，会在执行实际纹理查找操作之前添加偏差；</p>
      </ul>

      <h1>方案 normal</h1>
      <ul>
        <li>从方案 normal 可以知道什么？</li>
        <p>在 <a href={normalVertexShader}>normalVertexShader</a> 中使用 sin函数 和 iTime 重新定义了顶点 Y 的坐标；</p>
        <p>在 <a href={normalFragmentShader}>normalFragmentShader</a> 中使用像素点的坐标值来表示颜色。canvas的左下角坐标是(0,0)；右上角坐标是(1,1)；</p>
        <p> 所以Y的范围呈现一个规律得变化，颜色从左下角(0,0,0)到(1,1,0)；</p>
      </ul>
      <h1>方案 planeTexture</h1>
      <ul>
        <li>从方案 planeTexture 可以知道什么？</li>
        <p>在 planeTexture 中将一个8*8的图片<a href={bayer}>bayer</a> 纹理通过采样的方式渲染在了600*600的画布上</p>
        <p>在这个方案中验证了 texture2D 的实际功能就是通过 提供的坐标点，来对目标纹理进行采样，最终得到该坐标点的像素颜色值；</p>
      </ul>

      <h1>疑问</h1>
      <ul>
        <li>为什么在planeTexture 使用采样的方式渲染图片的结果会与实际图片有差别？</li>
        <CodeText>
          <p>texture.minFilter = THREE.NearestFilter</p>
          <p>texture.magFilter = THREE.NearestFilter</p>
          <p>texture.wrapS = THREE.RepeatWrapping</p>
          <p>texture.wrapT = THREE.RepeatWrapping</p>
        </CodeText>
        <p>纹理采样上的一些参数；以上的参数会影响到纹理采样的结果，从而造成采样结果失真的问题；</p>
      </ul>
    </main>
  )
}
