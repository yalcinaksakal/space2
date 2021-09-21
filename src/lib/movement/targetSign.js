const moveTargetSign = (target, model) => {
  if (!model) return;
  let { x, y, z } = model.position;
  // const rotX = model.rotation.x;

  z += 5000;
  // const factor = Math.abs(rotX) < 3 * DEGREE ? 0 : -Math.tan(rotX);
  // y += 5200 * factor;

  // if (rotX === 0) z += 825;

  target.position.set(x, y, z);

  // target.rotateX(rotX - target.rotation.x);
};
export default moveTargetSign;
