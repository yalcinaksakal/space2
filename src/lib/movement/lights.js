const moveLights = (p1, p2) => {
  p1.position.z--;

  p2.position.z--;

  if (p1.position.z < -250) p1.position.z = 350;

  if (p2.position.z < -250) p2.position.z = 350;
};
export default moveLights;
