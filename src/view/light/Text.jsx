import { CodeText } from '../../component/codeText.jsx'

export function Text() {
  return (
    <>
      <main>
        <h1>光照在模型中的实现</h1>
        <p>附录：</p>
        <ul>
          <li><a href={'https://zhuanlan.zhihu.com/p/56265851'}>已知入射光线推反射；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/338223153'}>光线投射算法；</a></li>
          <p>深度缓存算法中，每次处理一个表面，并对表面上的每个投影点计算深度值，计算出来的值与之前保存的深度值进行比较，从而确定每个像素所对应的可见表面</p>
          <p>在光线投射算法中，每次处理一个像素，并沿光线的投射路径计算出该像素所对应的所有表面的深度值</p>
          <p>深度缓存首先进行了顶点投影，然后计算投影区域内的像素的深度值；光线投射是直接处理每一个像素，并计算该像素在所有表面的深度值；</p>
          <li><a href={'https://yilingui.xyz/attachments/spatial_ds--bsp_tree-octree-kd-tree.pdf'}>
            四叉树、八叉树、bsp树、kd树；
          </a></li>
          <li><a href={'https://kirisamer.github.io/2022/11/05/Ch4-COMP37111/'}>渲染方程介绍；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/636749237'}>Lambert模型；</a></li>
          <li><a href={'https://www.liaomz.top/2022/03/12/tu-xing-xue-ji-chu-chuan-tong-de-jing-yan-guang-zhao-mo-xing/'}>传统光照模型；</a> </li>
        </ul>
        <li>关于 reflect 函数</li>
        <p> 计算入射矢量的反射方向，<a href={'https://zhuanlan.zhihu.com/p/56265851'}>查看；</a></p>
        <CodeText>
          <>
            <p>float reflect(float I, float N)</p>
            <p>vec2 reflect(vec2 I, vec2 N)  </p>
            <p>I 指定了入射矢量</p>
            <p>N 指定了法向量</p>
            <p> 即 r = I-2.0*dot(N,I)*N</p>
            <p>······ </p>
          </>
        </CodeText>
        <p></p>
      </main>
    </>
  )
}
