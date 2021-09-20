import { PositionalAudio, Vector3 } from "three";
import { rotationMap, MOVEMENT_MAP as movementMap } from "../config/content";
import createLaser from "./laser/laser";

const keyboardControls = (code, controls, model, cam, isMoving) => {
  if (!model) return;
  //look directions.
  if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(code)) {
    const { x, y, z } = model.position;
    cam.position.set(x, y + 300, z - 1200);
    controls.target.set(x, y, z);
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
