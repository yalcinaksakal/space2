import { Box3 } from "three";

import createExplosion from "./explode";

const hitChecker = (lasers, others, scene, sound, listener) => {
  for (let i = 0; i < lasers.length; i++) {
    const item = lasers[i];
    const box1 = new Box3().setFromObject(item.laser);
    const box2 = new Box3().setFromObject(others[0]);
    if (box1.intersectsBox(box2)) {
      createExplosion(others[0], scene, sound, listener);
      return i;
    }
  }
  return -1;
};

export default hitChecker;
