import { PositionalAudio, Vector3 } from "three";
import { rotationMap, MOVEMENT_MAP as movementMap } from "../config/content";
import createLaser from "./laser/laser";

const keyboardControls = (code, controls, model, cam, isMoving) => {
  if (!model) return;
  //look directions.
  if (code === "KeyR") {
    model.position.set(0, 0, 0);
    controls.reset();
  }
  if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(code)) {
    const { degree, isHorizantal } = rotationMap[code];
    controls.rotate(degree, isHorizantal);
    controls.update();
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
