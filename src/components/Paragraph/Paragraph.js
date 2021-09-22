import styles from "./p.module.css";

const Paragraph = () => (
  <p className={styles.p}>
    Shoot: Space
    <br />
    Move: Arrows, Q and E
    <br />
    Rotate cam: Left click
    <br />
    Pan cam: Right click
    <br />
    Zoom: Mouse wheel
    <br />
    Reset: R
  </p>
);
export default Paragraph;
