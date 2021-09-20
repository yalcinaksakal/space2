import { PositionalAudio, Vector3, Frustum, Matrix4 } from "three";
import { rotationMap, MOVEMENT_MAP as movementMap } from "../config/content";
import createLaser from "./laser/laser";

const keyboardControls = (code, controls, model, cam, isMoving) => {
  if (!model) return;
  //look directions.
  if (code === "KeyR") controls.reset();
  if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(code)) {
    const { degree, isHorizantal } = rotationMap[code];
    controls.rotate(degree, isHorizantal);
    controls.update();

    // const frustum = new Frustum();
    // frustum.setFromProjectionMatrix(
    //   new Matrix4().multiplyMatrices(
    //     cam.projectionMatrix,
    //     cam.matrixWorldInverse
    //   )
    // );
    // //check if object will be in frustum
    // if (!frustum.containsPoint(model.position)) {
    //   controls.rotate(-degree, isHorizantal);
    //   controls.update();
    // }

    return;
  }
  if (!movementMap[code]) return;
  // if (currentCode !== code) model.rotation.set(0, 0, 0);
  return { ...movementMap[code] };
};

export const fire = (
  pos = new Vector3(0, 0, 0),
  scene,
  buffer,
  listener,
  rotX
) => {
  const laser = createLaser(pos.x, pos.y, pos.z, scene, rotX);
  const audio = new PositionalAudio(listener);
  audio.setBuffer(buffer);
  audio.setRefDistance(10);
  laser.laser.add(audio);
  audio.loop = false;
  audio.play();
  return laser;
};

export default keyboardControls;
