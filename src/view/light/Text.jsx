import { CodeText } from '../../component/codeText.jsx'

function Normal() {
  return (
    <a href={'https://www.bilibili.com/video/BV1uZ4y1L7bB/?vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff'}>
      方向导数和梯度的直观理解；(视频)
    </a>
  )
}
export function Text() {
  const reflectUrl = 'https://blog.csdn.net/yinhun2012/article/details/79466517'
  const blinnPhongUrl = 'https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model'
  const whisperUrl = 'https://www.cnblogs.com/theWhisper/p/10269574.html'
  return (
    <>
      <main>
        <h1>光照在模型中的实现</h1>
        <p>附录：</p>
        <ul>
          <li><a href={'https://zhuanlan.zhihu.com/p/357142662'}>
            光线追踪基本原理分享（网易雷火）
          </a></li>
          <li>
            <a href={'https://github.com/StellarYan/My-RayTracer/issues/2'}>
              BSP树，类似空间二叉搜索树
            </a>
          </li>
          <li><a href={'https://zh.wikipedia.org/wiki/%E6%96%AF%E6%B6%85%E5%B0%94%E5%AE%9A%E5%BE%8B'}>斯涅尔定律</a></li>
          <li>
            <Normal />
          </li>
          <li><a href={'https://zhuanlan.zhihu.com/p/104765641'}>观察矩阵的推导</a></li>
          <li><a href={blinnPhongUrl}>Blinn–Phong reflection model</a></li>
          <li><a href={whisperUrl}>折射方向的推导</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/41269520'}>一篇光线追踪入门</a> </li>
          <li><a href={'https://www.scratchapixel.com/lessons/3d-basic-rendering/introduction-to-ray-tracing/implementing-the-raytracing-algorithm.html'}>
            光线追踪的实现
          </a></li>
          <li><a href={'https://blog.csdn.net/islittlehappy/article/details/81533090'}>求三角形内心，外心，重心，垂心</a></li>
          <li><a href={'https://yilingui.xyz/attachments/spatial_ds--bsp_tree-octree-kd-tree.pdf'}>
          四叉树、八叉树、bsp树、kd树；
          </a></li>
          <li><a href={'https://kirisamer.github.io/2022/11/05/Ch4-COMP37111/'}>渲染方程介绍；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/636749237'}>Lambert模型；</a></li>
          <li><a href={'https://www.liaomz.top/2022/03/12/tu-xing-xue-ji-chu-chuan-tong-de-jing-yan-guang-zhao-mo-xing/'}>传统光照模型；</a> </li>

          <li><a href={'https://blog.51cto.com/u_12485075/4801140'}>相机投影；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/122411512'}>推导投影矩阵；</a></li>
          <li><a href={reflectUrl}>已知入射光线推反射；</a></li>
          <li><a href={'https://zhuanlan.zhihu.com/p/338223153'}>光线投射算法；</a></li>
        </ul>
        <iframe width="640" height="360" frameBorder="0"
          src="https://www.shadertoy.com/embed/DtsfRB?gui=true&t=10&paused=true&muted=false"
          allowFullScreen></iframe>
        <li>关于法向量mvp中的一些理解</li>
        <p>传统的方式：已知三点可得平面方程：平面方程ax+by+cz+d = 0，求取a,b,c即可得到法向量（a,b,c）</p>
        <p>在使用mvp进行投射时，例如对于使用sdf表示的立方体表面，要找到投射射线与立方体表面的相交点，在对射线使用迭代的过程
        中，逐步判断改射线端点与球体是否相交，从而找到该相交的点。在此，如何确定该交点的法向量呢？参考：
        <Normal /></p>
        <li>关于光线求交的一些记录
          <ul>
            <li>BVH算法，即对场景进行划分，划分完成后，利用划分的数据进行加速求交
            。如果一条射线为与大包围盒相交，那么它肯定不会与包围盒内部的各个小块模型
            的三角形面相交，这样的排除算法可以加速交点检测</li>
          </ul>
        </li>
        <li>观察坐标系的建立和推导</li>
        <p>前提假设：相机到目标的向量 作为Vz；</p>
        在几乎所有的推导过程中，均使用世界坐标系的y轴作为相机的up方向，其作用是默认Vz和y轴形成的平面与 Vz和Vy形成的是同一个平面。
        <li>实现光线追踪过程的一些理解</li>
        <ul>
          <li>在计算平面表面点的法向量时，例如可以把立方体sdf当作其表面方程，通过在各个轴上进行轻微的偏移，并利用SDF方程计算出最终的偏移量
          ，通过对各轴偏移的计算即可算出在该点处的方向变化率，从而确定该点的法向量。
          </li>
        </ul>

        <li>可见对象的颜色和光照模型建模</li>
        <p>即用一个表示场景对象表面电磁能量相互作用的模型来描述光照效果；</p>
        <p>物理上的光照模型包含很多因素，如材质，对象相对于光源及其他对象的位置以及场景中光源的属性；</p>
        <p>对于某些特殊材质（图17.16），例如玻璃、金、银，可以根据入射角度来模拟材质的反射系数变化；</p>
        <p>对于镜面反射，镜面反射的结果除了与材质的镜面反射系数有关，还和（观察方向与反射方向的夹角）有关;
          （需要考虑）特殊情况，观察方向与光源方向位于法向量同一侧或者光源在表面的后面时，没有镜面反射；
        </p>
        <p>
          <a>在Blinn–Phong reflection model反射模型中，观察方向与反射方向的夹角使用了半角向量与法线的夹角来替代；
            这里的替代可以消除计算反射方向向量的计算量
          </a>
        </p>
        <ul>
          <li>点光源；</li>
          <li>无穷远光；</li>
          <li>辐射强度衰减；17.1.3</li>
          <p>例如，当两个具有相同光学参数的平行表面互相遮挡时，如果忽略他们离光源的相对距离，将无法区分这两个平行表面；</p>
          <p>使用一个线性项的二次函数的倒数来衰减光强度；</p>
          <p>对于无穷远点光源不能使用强度衰减来计算，因为离光源的的距离是不确定的（17.1.3-17.2式）</p>
          <li>方向光源和投射效果；17.1.4</li>
          <p>方向光源类似一个圆锥体；即光锥；</p>
          <li>角强度衰减；</li>
          <p>光锥在存在角强队衰减；（17.1.5-17.5式）</p>
          <p></p>
          <li>扩散光源和warn模型；</li>
          <p>提供了一种模拟立体光照效果的方法，它通过使用一组多参数的点发光器模拟挡光板、快门和照相用聚光灯控制；</p>
          <p>聚光灯用圆锥体实现，而快门和挡光板提供了另外的方向控制，例如为x，y，z方向中的每一个建立两个快门来进一步限制发射光线</p>
        </ul>
        <li>深度缓存与光线投射有区别吗？以立方体为例：</li>
        <ul>
          <li>
            <p>首先会得到所有的的二维坐标像素段；</p>
            <p>然后遍历立方体的所有三角形面，从投影点连接三角形面的顶点，该连接线穿过观察面，并将其该三角形面进行投影；</p>
            <p>判断三角形面投影后是否会包含该坐标点；对于包含该二维像素点的三角形面，需要计算出对应的二维坐标点深度值；</p>
            <p>如果下一个三角形投影也包含了该像素点，就需要比较该像素点在两个三角形面中的深度值；</p>
            <p>如果深度值在前面，那么就以前面的三角形颜色代表该二维像素点的颜色值；</p>
          </li>
          <li>
            <p>光线追踪的渲染方程中，某个点的颜色包含了：自发光；其他光线（光源，别平面的反射光）与材质综合作用的结果；</p>
            <p>在光线追踪算法中，会从投影点（相机位置）连接观察平面上的像素点，从而形成一个光线；</p>
          </li>
        </ul>
        <li>关于 reflect 函数</li>
        <p> 计算入射矢量的反射方向，<a href={reflectUrl}>查看；</a></p>
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
        <li>关于光斑变化规律需要注意到的点</li>
        <CodeText>
          <>
            <p>这里需要理解一个现象</p>
            <p> 光泽度越大，光斑就越小</p>
            <p>假设光源位置与观察位置的坐标一样；</p>
            <p>dot(reflectDir,view)   = |reflectDir||view|*cosΘ；</p>
            <p>当越靠近入射点时 反射向量与 观察方向之间的夹角越小；</p>
            <p>cosθ的值越接近 1 ；此时反射光的值越大，所以越靠近入射点，高光效果越大；</p>
            <p>随着 向周围坐标扩散，方向的变化速率也越来越大，所以 高光变小的速率也越来越大；</p>
            <p>所以在较为平缓的 坐标范围中，该区域形成了一个光斑；</p>
            <p>比如之前时 1-x²</p>
            <p>随着 x 变大 变化速率上升的越快</p>
            <p><a>注意：变化速率 尽量使用整数;不要验证[0-1]范围内的变化速率，这一块的相差都不大,对光斑影响很小</a> </p>
            <p> 变化速率绝对值 [0,8] 的区域形成光斑内圈</p>
            <p>对于1-x²。变化速率为-2x，当x为[0,4] 形成光斑内圈</p>
            <p> 对于1-x³。变化速率-3x²，当x为[0，1.6] 形成光斑内圈</p>
          </>
        </CodeText>
      </main>
    </>
  )
}
