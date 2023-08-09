import img from './img/img.png?url'
import img1 from './img/img_1.png?url'
import img2 from './img/img_2.png?url'
import img3 from './img/img_3.png?url'
import img4 from './img/img_4.png?url'
import img5 from './img/img_5.png?url'
import img6 from './img/img_6.png?url'
export function Text() {
  return (
    <main>
      <h1>立方体的2D投影</h1>
      <p>实现将立方体投影线在2D平面上，并进行显示</p>
      <ul>
        <li>投影方案</li>
        <ul>
          <li>选定观察点P</li>
          <li>通过空间坐标变换，将原来的的空间坐标转换为一贯差点为原点，PO为z轴的空间坐标系</li>
          <p>一开始在世界空间中的做标可以认为是模型的坐标，将模型的坐标转化到观察坐标中，以方便进行在观察平面中进行投影；</p>
          <p>将模型坐标转化为观察坐标的方式，即将原先所在的坐标系的原点与观察点重合，将原先所在坐标系的轴与观察坐标系的轴进行重合；</p>
          <li>通过投影将三维空间坐标映射到平行于xoy平面的画布上</li>
        </ul>
        <li><a href={'https://www.shadertoy.com/view/4dG3RK'}>立方体示例1</a></li>
        <li>四元数的可视化；<a target={'_blank'} rel="noreferrer" href={'https://www.bilibili.com/video/BV1SW411y7W1/?vd_source=2fbc276c906dcfb63eeb8b5cf37bd9ff'}>（视频）</a></li>
        <li>四元数与三维旋转；<a target={'_blank'} rel="noreferrer" href={'https://krasjet.github.io/quaternion/quaternion.pdf'} >（pdf）29/73</a></li>

        <p>图形学基础中与pdf中关于旋转矩阵的最终化简结果如下：</p>
        <div />
        <img src={img6}/>

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

        <li>构建立方体  <a>计算机图形学第四版  10.3.1</a></li>
        <ul>
          <li>模型坐标 MC</li>
          <li>建模变换</li>
          <li>世界坐标 WC</li>
          <li>观察变换</li>
          <ul>
            <li>平移观察坐标系原点到世界坐标系原点</li>
            <li>进行旋转，分别让Xview,Yview,Zview轴对应到世界坐标系的Xw,Yw,Zw</li>
          </ul>
          <p>建立一个观察坐标系；确认观察点(也可称为视点)，定义<a>向上向量以及另外两个坐标轴</a>,</p>
          <p>观察方向通常用<a>Zview</a>来实现</p>
          <p>观察平面的也称投影平面，一般认为与Zview垂直；观察平面的方向及Zview轴可定义为观察平面的法向量</p>
          <p>以上定义的观察平面总是垂直于 <a>( Xview,Yview )</a> 平面</p>
          <p>向量N(观察平面法向量)  的两种定义方法：</p>
          <ul>
            <li>世界坐标系的原点到选定点的连线的方向</li>
            <li>参考点到观察原点的方向（此时，参考点称为场景中的注视点，观察方向为N的反方向）</li>
          </ul>
          <li>观察坐标 VC</li>
          <li>投影变换</li>
          <li>平面投影坐标 PC</li>
          <li>规范化变换和裁剪</li>
          <li>规范化坐标 NC</li>
          <li>视口变换</li>
          <li>视口坐标 DC</li>
        </ul>
        模型坐标
        <></>
      </ul>
    </main>
  )
}
