import {
  CylinderGeometry,
  MeshLambertMaterial,
  Mesh,
  RingBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
import { DEGREE } from "../../config/content";

const createLaser = (x, y, z, scene, rotX) => {
  z += 110;
  const factor = Math.abs(rotX) < 3 * DEGREE ? 0 : -Math.tan(rotX);
  y += 130 * factor;

  const geometry = new CylinderGeometry(2, 2, 50, 32, 50);
  const material = new MeshLambertMaterial({
    color: "white",
    emissive: "white",
  });
  const cylinder = new Mesh(geometry, material);
  cylinder.position.set(x, y, z);
  cylinder.rotateX(90 * DEGREE + rotX);
  scene.add(cylinder);

  return { laser: cylinder, factor };
};

export const createTargetSign = (x = 0, y = 0, z = 0, rotX = 0) => {
  z += 5000;
  // const factor = Math.abs(rotX) < 3 * DEGREE ? 0 : -Math.tan(rotX);
  // y += 5200 * factor;

  const geometry = new RingBufferGeometry(20, 30, 32);
  const material = new MeshBasicMaterial({ color: "red", side: DoubleSide });
  const target = new Mesh(geometry, material);
  target.position.set(x, y, z);
  // target.rotateX(rotX);
  return target;
};

export default createLaser;
