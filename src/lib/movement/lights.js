const moveLights = (p1, p2) => {
  p1.position.z--;
  p2.position.z--;

  if (p1.position.z < -1000) p1.position.z = 1000;
  if (p2.position.z < -1000) p2.position.z = 1000;
};
export default moveLights;
