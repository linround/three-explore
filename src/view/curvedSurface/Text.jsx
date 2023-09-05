export function Text() {
  return (
    <main>
      <h1>关于如何构建曲面</h1>
      <p>附录：</p>

      <li><a href={'https://learnopengl-cn.github.io/05%20Advanced%20Lighting/02%20Gamma%20Correction/'}>
        Gamma校正</a></li>
      <li><a href={'https://www.bilibili.com/video/BV1uZ4y1L7bB/'}>方向导数和梯度的直观理解</a></li>
      <li><a href={'https://zhuanlan.zhihu.com/p/267722955'}>平面方程求解公式</a></li>
      <li><a href={'https://zh.wikipedia.org/zh-cn/%E6%A2%AF%E5%BA%A6'}>梯度</a></li>
      <li><a href={'https://zhuanlan.zhihu.com/p/586364840'}>彻底理解投影矩阵</a></li>
      <li><a href={'https://feiqi3.cn/blog/74'}>Ray Marching和SDF</a></li>
      <li><a href={'https://en.wikipedia.org/wiki/Directional_derivative'}>Directional_derivative</a></li>
      <p>对于偏导,梯度,法向量之间的联系</p>
      <p>方程求<a>偏导</a>，即可得到在方程中的每一点处的最大变化速率</p>
      <p>多元函数的偏导，组合成了梯度，即得到具有方向性的最大变化速率</p>
      <p>梯度描述了脱离该平面最快的方向，其就是该平面法向量的方向</p>
      <iframe width="640" height="360" frameBorder="0" src="https://www.shadertoy.com/embed/DlSBzz?gui=true&t=10&paused=true&muted=false"
        allowFullScreen></iframe>
      <ul>
        <li>多边形绘制算法</li>
        <p>Gouraud表面绘制（强度插值表面绘制）</p>
        <ul>
          <li>1.每个多边形顶点处的平均法向量</li>
          <li>2.对于每个顶点根据光照模型来计算其光强度</li>
          <li>3.在多边形投影区域对顶点进行线性插值</li>
        </ul>
        <li>phong明暗处理</li>
        <ul>
          <li>1.确定每个多边形顶点处的法向量</li>
          <li>2.在多边形投影区域上对顶点法向量进行线性插值</li>
          <li>3.根据光照模型，使用插值的法向量，沿每条扫描线计算投影像素的光强度</li>
        </ul>
        <li>关于半色调技术</li>
        <p>即将多个像素单元组合起来，表示一种强度值</p>
        <li>关于gamma矫正</li>
        <p>我们计算出来的颜色A，由于每种显示设备都有自己的Gamma值；设备最终的输出值实际是 A 的
        Gamma次幂（对于CTR，Gamma通常为1.7到2.2之间）；所以在计算出结果B后，通常对B需要进行gamma矫正；即将B转换为
          B的 1/gamma 次幂；这样再显示到设备上时，实际才是B的值
        </p>
        <p>在考虑光的衰减方程时，不进行gamma矫正会产生更加强烈的衰减</p>
        <li>直线方程 f(x,y)</li>
        <p>例如：2x-y =0,求得偏导为矢量(2,-1),该矢量与直线垂直 </p>
        <p>例如圆：x²+y²-1=0，求得偏导为（2x,2y）;
        点P（1/2，√<ruby>3<rp>(</rp><rt>—</rt><rp>)</rp></ruby>/2）,偏导值为
          (1，√<ruby>3<rp>(</rp><rt>—</rt><rp>)</rp></ruby>)；故在点P处的法向量为
          (1，√<ruby>3<rp>(</rp><rt>—</rt><rp>)</rp></ruby>)

        </p>
        <p>例如，在三维度平面坐标系中；点A(1,0,1),点B(3,0,1),点C(2,1,1)构成的平面中，该平面可表示为z-1=0;
          对该平面方程求偏导得到矢量(0,0,1),该矢量为该平面的法向量；同理观察平面方程的求解公式，最终得到的方程求偏导，得到的矢量即为该平面的法向量；
        </p>
        <p>例如在三维球体中，x²+y²+z²-1 = 0，求偏导得到（2x,2y,2z）;
        在点（1/2,1/2,√<ruby>2<rp>(</rp><rt>—</rt><rp>)</rp></ruby>/2）处；
          偏导值为（1,1,√<ruby>2<rp>(</rp><rt>—</rt><rp>)</rp></ruby>）；故该点处的法向量为
          （1,1,√<ruby>2<rp>(</rp><rt>—</rt><rp>)</rp></ruby>）
        </p>
        <li>求三维平面的法向量</li>
        <p>假设某个平面方程为：ax+by+cz+d = 0，且点P(r,g,b)是位于平面上的点;</p>
        <p>根据之前由任意不共线三点得到的平面方程的性质：</p>
        <p>向量（a,b,c）为该平面的法向量，那么就只需要求得a,b,c即可知道该平面法向量；</p>
        <p>d的实质作用就是可以构造无数个平行的面；或者可以认为d=0时，截距在各轴为0，通过不断地移动d，会形成无数个平行的平面</p>


      </ul>
      <p>在渲染立方体的过程中，目前介绍了两种方式</p>
      <li>从观察点出发，对立方体顶点，在平面上进行投影，使用投影的顶点构成立方体的面</li>
      <li>从观察点出发，连接投影面上的点和观察点，找到其与立方体的交点位置；交点坐标的属性作为投影点的属性；
      在寻找交点坐标的过程中，使用迭代法找寻该坐标；
      </li>
    </main>
  )
}
