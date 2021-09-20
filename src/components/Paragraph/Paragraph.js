import styles from "./p.module.css";

const Paragraph = () => (
  <p className={styles.p}>
    Move: Arrow keys, Q and E
    <br />
    Rotate cam: WASD, left click
    <br />
    Pan cam: Right click
    <br />
    Zoom: Mouse wheel
    <br />
    Reset: R
  </p>
);
export default Paragraph;
