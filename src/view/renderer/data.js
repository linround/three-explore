export const sceneData = {
  // 观察点数据
  observationPoint: {
    position: {
      x: -800,
      y: -800,
      z: -800,
    },
    outPutNode: 'observationPointOutPutNode',
    // 在页面中的信息
    page: {
      // 在页面中的位置
      position: {
        x: 100,
        y: 200,
      },
    },
  },
  // 目标点坐标
  targetPoint: {
    position: {
      x: -200,
      y: -200,
      z: 600,
    },
    outPutNode: 'targetPointOutPutNode',
  },
  // 目标点-观察点 得到观察方向向量
  observationDirection: {
    // 3D 模型中的位置
    position: {
      x: -1000,
      y: -1000,
      z: 1400,
    },
    // 输入节点
    inPutNode: 'observationDirectionInPutNode',
    // 在页面中的信息
    page: {
      // 在页面中的位置
      position: {
        x: 500,
        y: 500,
      },
    },
  },
}
