export const NUMBER_OF_CONTENTS_TO_LOAD = 3;
export const DEGREE = Math.PI / 180;
export const MOVEMENT_MAP = {
  ArrowUp: {
    code: "ArrowUp",
    isMoving: true,
    axis: "y",
    speed: 10,
    rotationAxis: "x",
    rotDirection: -1,
    notRotAxis: "z",
  },
  ArrowDown: {
    code: "ArrowDown",
    isMoving: true,
    axis: "y",
    speed: -10,
    rotationAxis: "x",
    rotDirection: 1,
    notRotAxis: "z",
  },
  ArrowRight: {
    code: "ArrowRight",
    isMoving: true,
    axis: "x",
    speed: -10,
    rotationAxis: "z",
    rotDirection: 1,
    notRotAxis: "x",
  },
  ArrowLeft: {
    code: "ArrowLeft",
    isMoving: true,
    axis: "x",
    speed: 10,
    rotationAxis: "z",
    rotDirection: -1,
    notRotAxis: "x",
  },
  KeyQ: {
    code: "KeyQ",
    isMoving: true,
    axis: "z",
    speed: -10,
    rotationAxis: null,
    rotDirection: 0,
    notRotAxis: null,
  },
  KeyE: {
    code: "KeyE",
    isMoving: true,
    axis: "z",
    speed: 10,
    rotationAxis: null,
    rotDirection: 0,
    notRotAxis: null,
  },
};

export const rotationMap = {
  KeyW: { degree: 90 * DEGREE, isHorizantal: false },
  KeyS: { degree: -90 * DEGREE, isHorizantal: false },
  KeyA: { degree: 90 * DEGREE, isHorizantal: true },
  KeyD: { degree: -90 * DEGREE, isHorizantal: true },
};
