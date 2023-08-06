import img from './img/img.png?url'
import img1 from './img/img_1.png?url'
import img2 from './img/img_2.png?url'
import img3 from './img/img_3.png?url'
import img4 from './img/img_4.png?url'
import img5 from './img/img_5.png?url'
export function Text() {
  return (
    <main>
      <h1>立方体的2D投影</h1>
      <p>实现将立方体投影线在2D平面上，并进行显示</p>
      <ul>
        <li>四元数的可视化；<a target={'_blank'} rel="noreferrer" href={'https://www.bilibili.com/video/BV1SW411y7W1/?vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff'}>（视频）</a></li>
        <li>四元数与三维旋转；<a target={'_blank'} rel="noreferrer" href={'https://krasjet.github.io/quaternion/quaternion.pdf'} >（pdf）29/73</a></li>
        <p>验证二维的复数乘法与旋转缩放的关系</p>
        <p>求得三维空间中，向量v绕向量u旋转 angle角度的通用公式</p>
        <p>求四元数的加减法，标量乘法，以及两个四元数相乘的通用公式</p>
        <p>求得了 四元数的逆 与 四元数的轭 的之间存在的联系</p>
        <p>四元数*四元数的轭，结果为四元数的模的平方</p>
        <p>四元数的轭*四元数，结果也是四元数模的平方</p>
        <p>最终确认呢四元数的逆为：四元数的共轭 除以  四元数的模的平方；
          <a>如果是一个单位四元数，则四元数的逆等于四元数的轭；</a>所以这里很轻松的就找到了四元数的逆</p>
        <p>证明四元数乘法可以获得向量旋转θ角后的向量</p>
        <p>利用三维空间中的旋转通用公式，带入所定义的四元数。<a>将三维空间的旋转变成了四元数的乘法公式</a></p>
        <p><a>最终的结果可知，三维空间的任意一个旋转，都可以用三个四元数相乘的形式表示</a></p>
        <img src={img1}/>
        <div />
        <img src={img2}/>
        <div />
        <img src={img}/>
        <div />


        <img src={img3}/>
        <div />
        <img src={img4}/>

        <li>q是任意四元数， q与-q旋转的结果是一样的</li>
        <img src={img5}/>


        <li>
          将一个向量V沿着一个单位向量U旋转θ度
        </li>
        <p>将向量V拆分为正交于旋转轴U的 向量 VT和平行于旋转轴U的向量VII</p>
        <p>V=VT+VII</p>
        <p>利用纯四元数（实部为0）来实现旋转</p>

        <li>构建立方体</li>
        <></>
      </ul>
    </main>
  )
}
