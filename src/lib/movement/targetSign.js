const moveTargetSign = (target, model, enemy) => {
  if (!model || !enemy) return;
  let { x, y, z } = model.position;
  // const rotX = model.rotation.x;
  const { x: ex, y: ey, z: ez } = enemy.position;
  if (
    Math.abs(x - ex) < 250 &&
    Math.abs(y - ey) < 50 &&
    ez > z &&
    ez - z < 5700
  )
    z = ez - 250 + Math.abs(x - ex) * 1.2;
  else z += 5000;
  // const factor = Math.abs(rotX) < 3 * DEGREE ? 0 : -Math.tan(rotX);
  // y += 5200 * factor;

  // if (rotX === 0) z += 825;

  target.position.set(x, y, z);

  // target.rotateX(rotX - target.rotation.x);
};
export default moveTargetSign;
