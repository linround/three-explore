
// 三次样条插值
// https://math.ecnu.edu.cn/~sfzhu/course/NumerAnal/Interpolation5.pdf
export function SplineInterpolator(points) {
  const n = points.length
  this.xa = []
  this.ya = []
  this.u = []
  this.y2 = []

  // 按照x轴排序
  points.sort(function(a, b) {
    return a[0] - b[0]
  })

  // 分别得到x，y轴上的坐标
  for (let i = 0; i < n; i++) {
    this.xa.push(points[i][0])
    this.ya.push(points[i][1])
  }

  this.u[0] = 0
  this.y2[0] = 0

  for (let i = 1; i < n - 1; i++) {
    // 计算相邻横坐标的差值
    const wx = this.xa[i + 1] - this.xa[i - 1]

    const sig = (this.xa[i] - this.xa[i - 1]) / wx

    const p = (sig * this.y2[i - 1]) + 2

    this.y2[i] = (sig - 1) / p


    const ddydx = ((this.ya[i + 1] - this.ya[i]) / (this.xa[i + 1] - this.xa[i])) -
      ((this.ya[i] - this.ya[i - 1]) / (this.xa[i] - this.xa[i - 1]))

    this.u[i] = ((6 * ddydx / wx) - (sig * this.u[i - 1])) / p
  }

  this.y2[n - 1] = 0

  for (let i = n - 2; i >= 0; i--) {
    this.y2[i] = (this.y2[i] * this.y2[i + 1]) + this.u[i]
  }
}


SplineInterpolator.prototype.interpolate = function(x) {
  const n = this.ya.length
  let klo = 0
  let khi = n - 1

  while (khi - klo > 1) {
    const k = (khi + klo) >> 1
    if (this.xa[k] > x) {
      khi = k
    } else {
      klo = k
    }
  }

  const h = this.xa[khi] - this.xa[klo]
  const a = (this.xa[khi] - x) / h
  const b = (x - this.xa[klo]) / h

  // eslint-disable-next-line no-mixed-operators
  return a * this.ya[klo] + b * this.ya[khi] + ((a * a * a - a) * this.y2[klo] + (b * b * b - b) * this.y2[khi]) * (h * h) / 6
}




// 取得 在low 和 high 之间的值
function clamp(
  lo, value, hi
) {
  return Math.max(lo, Math.min(value, hi))

}

export function splineInterpolate(points) {
  const interpolator = new SplineInterpolator(points)
  const array = []
  for (let i = 0; i < 256; i++) {
    array.push(clamp(
      0, Math.floor(interpolator.interpolate(i / 255) * 256), 255
    ))
  }
  return array
}
