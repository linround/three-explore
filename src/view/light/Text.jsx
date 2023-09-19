import { CodeText } from '../../component/codeText.jsx'

import renderNormal from './renderNormal.png?url'
import renderTBN from './renderTBN.png?url'
import { ImageComponent } from '../../component/Image.jsx'



function Normal() {
  return (
    <a href={'https://www.bilibili.com/video/BV1uZ4y1L7bB/?vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff'}>
      方向导数和梯度的直观理解；(视频)
    </a>
  )
}

function TBN() {
  return (
    <a href={'https://www.cnblogs.com/HDDDDDD/p/15335800.html'}>
      计算机图形学：凹凸贴图、法线贴图、切线空间、TBN矩阵
    </a>
  )
}
export function Text() {
  const refractUrl = 'https://www.cnblogs.com/theWhisper/p/10269574.html'
  const reflectUrl = 'https://blog.csdn.net/yinhun2012/article/details/79466517'
  const blinnPhongUrl = 'https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_reflection_model'
  const whisperUrl = 'https://www.cnblogs.com/theWhisper/p/10269574.html'
  return (
    <>
      <main>
        <h1>光照在模型中的实现</h1>
        <p>附录：</p>
        <ul>
          <li>
            SSAO
            <ul>
              <li>
                <a href={'https://zhuanlan.zhihu.com/p/367443771'}>
                  Screen Space Ambient Occlusion(屏幕空间环境光遮蔽)
                </a>
              </li>
              <li>
                <a href={'http://frederikaalund.com/a-comparative-study-of-screen-space-ambient-occlusion-methods/'}>
                  A Comparative Study of Screen-Space Ambient Occlusion Methods
                </a>
              </li>
              <li>
                <a href={'https://zhuanlan.zhihu.com/p/28489928'}>延迟渲染(Deferred Rendering)的前生今世</a>
              </li>
              <li>
                <a href={'https://learnopengl-cn.github.io/05%20Advanced%20Lighting/09%20SSAO/'}>
                  learnopengl-SSAO
                </a>
              </li>
              <li>
                <a href={'https://zhuanlan.zhihu.com/p/145339736'}>
                  UE4 Mobile GTAO 实现(HBAO续)
                </a>
              </li>
              <li>
                <TBN />
              </li>
            </ul>
          </li>
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
        <li>关于梯度、变化速率、法向量之间的联系</li>
        <CodeText>
          <>
            <p>对于直线ax+by+c=0,其法线:(a,b);要求直线的法线，直接求偏导即可；
            对于面 ax+by+cz+d=0,其法线：(a,b,c),要求面的法线，直接求偏导即可；
              偏导描述的是沿着某一轴的变化率，即使用ΔVx/Δx,ΔVy/Δy,ΔVz/Δz即可得到每一轴的变化率；
              例如在平面0*x+0*y+c*z+d = 0中，在X,Y轴的变化率始终是0，在z轴的变化率是c,其法向量即为（0，0，c）,
              可以认为该平面在沿着其法向量的方向变化最大；例如在平面x+y+z+d=0中，在X,Y,Z轴的变化率都是1，其法向量为（1,1,1）。
            </p>
            <p>同样，根据以上的示例，在已知平面某个点P和该点的法向量Rd，求该点的切线空间TBN(T切线，B副切线，N法向量)，
            只需要找到一个与法线不共线的向量V1，通过叉乘RdxV1即可确定T，通过叉乘TxN即可确定B。从而确定该点的切向空间。当然也可以参考平面三点求切向空间；同样也可以利用平面方程求切线空间；</p>
          </>
        </CodeText>
        <li>关于环境光遮蔽的一些理解</li>
        <CodeText>
          <>
            <p>
              环境光遮蔽因子的计算，通过构建从表面上的一点，朝其法线所在的上半球所有方向发出射线，然后检查他们是否与其他对象相交
              来计算环境光遮蔽因子；
              这个遮蔽因子用来估算环境光照分量的大小，遮蔽因子越大，环境光分量越小，反之环境光越大；
            </p>
            <p>首先创建一个正交基，切线每一次都会根据随机出来的法线向量值变动。根据
              <a>TBN</a>矩阵的正交性,可以求出副法线，以此构造出来的TBN矩阵用作后面将随机转动的向量转出空间。
              然后检查样本的深度值是否大于存储的深度值，如果大于就添加到最终的遮蔽因子上；
            </p>
            <p>这里参见<TBN /> 的推到结果：最终推导除了TBN三个新的基地向量；T对应U，B对应V，N属于TB平面和UV平面共同的法向量；
              最终的[Xobject,Yobject,Zobject],分别假设[U,0,0],
              [0,V,0],[0,0,1],即可得到TBN的三个对应分量
            U*[Tx,Tb,Ty],V*[Bx,Bb,By],1*[Nx,Nb,Ny],进而更好的理解模型空间向切线空间的坐标变换</p>
          </>
        </CodeText>
        <p>假设一个场景：一个点光源，一个镜面球，一个玻璃球，一个普通材质的立方体盒子（即不发生折射，也不发生反射）</p>
        <p>从观察点指向像素平面中的像素点，此时构成一条投射射线；该射线击中了第一个相交物体，若该物体是是普通材质，则直接计算该点的在
          光照模型中的颜色即可；若该物体击中的是反射球体，此时产生反射射线1，继续计算射线1击中的材质，如果射线1击中了普通材质，
          那么最终的颜色就是改普通材质；如果射线1击中了玻璃材质，此时玻璃材质会产生折射射线2和反射射线3，此时改玻璃材质交点处
        的颜色组成由：玻璃自身的颜色+折射线2击中物体的颜色+反射线3击中物体的颜色，注意（不考虑折射线2的投射对自身的击中）,
        递归计算折射线击中的颜色和反射线击中的颜色</p>
        <li style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <ImageComponent url={renderTBN} name='TBN' />
          <ImageComponent url={renderNormal} name='Normal' />
        </li>


        <li>关于延迟渲染的一些理解</li>
        <p>渲染方式：</p>
        <p>1.几何处理阶段：渲染所有的几何、颜色数据到G-Buffer</p>
        <p>2.光照处理阶段：使用G-Buffer计算场景中的光照</p>
        <p>G-Buffer用于存储每个像素对应的位置(Position)，法线(Normal)，漫反射颜色（Diffuse Color，可以认为是一种材质参数）等</p>
        <p>传统渲染方式，先对物体进行着色（考虑多光源的着色），再在渲染过程中进行深度测试；</p>
        <p>延迟渲染可以理解为先将物体渲染到屏幕空间，再逐光源对该缓冲进行着色，从而避免了因计算
        被深度测试丢弃的片元而产生不必要的开销；基本思想是：先执行深度测试，在进行着色计算。</p>

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
            <li><a>为什么在玻璃材质中，玻璃材质所产生的折射光线，在计算该折射光线与场景物体相交时却忽略了折射球呢</a></li>
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
        <li>全反射</li>
        <p>当介质确定时，也就是介质的折射率确定；此时要发生全反射对入射角大小有一定的要求，我们把折射角为90°时的入射角称为临界角，此时的折射光线无法进入折射介质中，会发生全反射；</p>
        <p>例如：光从某种介质折射率为n的介质中像空气或真空时的入射角恰好是临界角C，此时折射角R=90°。由折射率sinC*n = 1*sinR = 1*sin90° = 1；sinC =1/n</p>

        <p>当折射率之比确定时，1/n,如折射角为R，入射角为C；即1/n = sinC/sinR;发生全反射，R=90°，此时入射角sinC = 1/n </p>
        <li>关于refract 函数</li>
        <p>计算入射矢量的折射方向，<a href={refractUrl}>查看；</a></p>
        <CodeText>
          <>
            <p>float refract(float I, float N, float eta)</p>
            <p>vec2 refract(vec2 I, vec2 N, float eta)</p>
            <p>I指定了入射矢量</p>
            <p>N指定了法向量</p>
            <p>eta指定了折射率之比（入射矢量所在空间的折射率/折射矢量所在空间的折射率）</p>
            <p>k = 1.0-eta*eta*(1.0-dot(N,I)*dot(N,I))</p>
            <p>K&lt;0时，发生全反射，无折射效应.返回
              <a href={'https://stackoverflow.com/questions/23824374/what-does-the-term-gentype-mean-in-opengl-glsl'}>
                genType</a>(0)</p>
            <p>K&gt;0时，应用折射公式：折射向量=eta*I-(eta*dot(N,I)+sqrt(k))*N</p>
            <p></p>
          </>
        </CodeText>
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
