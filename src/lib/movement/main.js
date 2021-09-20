import { DEGREE } from "../../config/content";
import { Frustum, Matrix4 } from "three";
const moveShip = (model, movement, p1, p2, camera, controls) => {
  if (!model) return;

  const canMove = () => {
    const frustum = new Frustum();
    frustum.setFromProjectionMatrix(
      new Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    );
    //check if object will be in frustum
    const limit = movement.axis === "x" ? 5 : 3;
    model.position[movement.axis] += movement.speed * limit;
    const canM = frustum.containsPoint(model.position);
    model.position[movement.axis] -= limit * movement.speed;
    return canM;
  };

  const move = () => {
    model.position[movement.axis] += movement.speed;
    p1.position[movement.axis] += movement.speed;
    p2.position[movement.axis] += movement.speed;
    // const { x, y, z } = model.position;
    // camera.position.set(x, y + 300, z - 1200);
    // controls.target.set(x, y, z);
    if (!movement.rotationAxis) return;

    if (movement.notRotAxis) {
      let notAxisAngle = model.rotation[movement.notRotAxis];
      const notAxisdirection = notAxisAngle > 0 ? 1 : -1;
      if (Math.abs(notAxisAngle) < 2 * DEGREE)
        model.rotation[movement.notRotAxis] = 0;
      else
        model.rotation[movement.notRotAxis] += DEGREE * notAxisdirection * -1;
    }

    if (Math.abs(angle) < 50 * DEGREE)
      model.rotation[movement.rotationAxis] += DEGREE * movement.rotDirection;
  };

  const normalize = () => {
    movement.speed += movement.speed > 0 ? -1 : 1;
    if (Math.abs(angle) < 4 * DEGREE) model.rotation[movement.rotationAxis] = 0;
    else
      model.rotation[movement.rotationAxis] +=
        DEGREE * movement.rotDirection * -1 * 6;
  };

  if (Math.abs(movement.speed) < 1) return;
  const angle = model.rotation[movement.rotationAxis];
  if (!movement.isMoving) {
    normalize();
    return;
  }

  canMove() && move();
};
export default moveShip;
