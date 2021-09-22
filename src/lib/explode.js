import {
  MeshBasicMaterial,
  SphereGeometry,
  Mesh,
  Object3D,
  PositionalAudio,
} from "three";
import { DEGREE } from "../config/content";

let particles = [];
const colors = ["red", "yellow", "orange"];
const radius = 20;
const separation = 15;

const createExplosion = (model, scene, sound, listener) => {
  const { x, y, z } = model.position;
  const group = new Object3D();

  for (let s = 0; s <= 180; s += separation) {
    if (Math.random() < 0.7) continue;
    const radianS = s * DEGREE;
    const pZ = radius * Math.cos(radianS);
    for (var t = 0; t < 360; t += separation) {
      if (Math.random() < 0.7) continue;
      const radianT = t * DEGREE;
      const pX = radius * Math.sin(radianS) * Math.cos(radianT);
      const pY = radius * Math.sin(radianS) * Math.sin(radianT);
      const geometory = new SphereGeometry(0.1, 8, 8);
      const material = new MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * 3)],
      });
      const mesh = new Mesh(geometory, material);
      mesh.position.x = pX;
      mesh.position.y = pY;
      mesh.position.z = pZ;
      group.add(mesh);
    }
  }
  group.position.set(x, y, z);
  particles.push({ explosion: group, life: 0 });

  const audio = new PositionalAudio(listener);
  audio.setBuffer(sound);
  audio.setRefDistance(200);
  group.add(audio);
  audio.loop = false;
  audio.play();

  scene.add(group);
  setTimeout(
    () =>
      model.position.set(
        Math.random() * 2000 - 1000,
        Math.random() * 900 - 500,
        10000
      ),
    500
  );
};

export const updateExplosion = scene => {
  if (!particles.length) return;

  for (const p of particles) {
    p.life++;
    p.explosion.scale.set(p.life / 2, p.life / 2, p.life / 3);
  }
  particles = [
    ...particles.filter(p => {
      if (p.life > 99) scene.remove(p.explosion);
      return p.life < 100;
    }),
  ];
};
export default createExplosion;
