
export const ObservationPoint = {
  x: -200,
  y: -200,
  z: 600,
}
export const TargetPoint = {
  x: -800,
  y: -800,
  z: -800,
}


export const FLOOR = {
  ID_FLOOR: 0.1,

  length: 400,
  height: 0,
  depth: 400,

  center: {
    x: -200,
    y: -400,
    z: -200,
  },

  color: {
    r: 0.2,
    g: 0.2,
    b: 0.2,
  },
}
export const CEILING = {
  ID_CEILING: 0.11,

  length: 400,
  height: 0,
  depth: 400,

  center: {
    x: -200,
    y: 0,
    z: -200,
  },

  color: {
    r: 0.4,
    g: 0.4,
    b: 0.4,
  },
}
export const WALL_BACK = {
  ID_WALL_BACK: 0.12,

  length: 400,
  height: 400,
  depth: 0,

  center: {
    x: -200,
    y: -200,
    z: -200,
  },

  color: {
    r: 0.2,
    g: 0.2,
    b: 0.2,
  },
}
export const WALL_RIGHT = {
  ID_WALL_RIGHT: 0.13,

  length: 0,
  height: 400,
  depth: 400,

  center: {
    x: -400,
    y: -200,
    z: -200,
  },

  color: {
    r: 0.1,
    g: 0.1,
    b: 0.1,
  },
}
export const WALL_LEFT = {
  ID_WALL_LEFT: 0.14,

  length: 0,
  height: 400,
  depth: 400,

  center: {
    x: 0,
    y: -200,
    z: -200,
  },

  color: {
    r: 0.1,
    g: 0.1,
    b: 0.1,
  },
}


export const LIGHT = {
  ID_LIGHT: 0.15,

  length: 40,
  height: 10,
  depth: 40,


  center: {
    x: -200,
    y: 0,
    z: -200,
  },
}
export const SPHERE_REFRACT = {
  ID_SPHERE_REFRACT: 0.16,

  radius: 40,


  center: {
    x: -100,
    y: -360,
    z: -100,
  },
}
export const SPHERE_REFLECT = {
  ID_SPHERE_REFLECT: 0.17,

  radius: 80,


  center: {
    x: -220,
    y: -320,
    z: -220,
  },
}
export default {
  LIGHT,
  FLOOR,
  CEILING,
  WALL_BACK,
  WALL_LEFT,
  WALL_RIGHT,
  TargetPoint,
  SPHERE_REFLECT,
  SPHERE_REFRACT,
  ObservationPoint,
}
