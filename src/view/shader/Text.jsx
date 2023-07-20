import css from './css.module.less'
export function Text() {
  return (
    <main>
      <h1>关于shader</h1>
      <ul>
        <li>iResolutiond 是什么？</li>
        <p>iResolutiond 定义了视口的像素大小；</p>
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
        <p>sampler2D 绑定的是纹理单元。可以看作一个拥有纹理数据的采样器</p>
        <li>texture2D 是什么？</li>
        <p>从纹理中检索纹理像素；</p>
        <p>texture2D 函数返回一个纹理像素值。即给定坐标的纹理的颜色值</p>
        <div className={css.code}>
          <p>vec4 texture2D(sampler2D sampler, vec2 coord)</p>
          <p>vec4 texture2D(sampler2D sampler, vec2 coord, float bias)</p>
        </div>
        <p>sampler： 纹理绑定到的采样器；</p>
        <p>coord: 要检索的纹素的二维坐标；</p>
        <p>bias：指定计算时的可选偏差；在使用mipmap计算纹理的适当细节级别后，会在执行实际纹理查找操作之前添加偏差；</p>
      </ul>
    </main>
  )
}
