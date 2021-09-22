import { Scene, AudioListener } from "three";
import { NUMBER_OF_CONTENTS_TO_LOAD } from "../config/content";

import myCam from "./camera";
import cubeTexture from "./cubeTexture";
import { updateExplosion } from "./explode";

import hitChecker from "./hitCheck";
import keyboardControls, { fire } from "./keyboardControls";
import { createTargetSign } from "./laser/laser";
import createLights from "./lights";
import modelLoader from "./modelLoader";
import moveLasers from "./movement/lasers";
import moveLights from "./movement/lights";
import moveShip from "./movement/main";
import moveOthers from "./movement/others";
import moveTargetSign from "./movement/targetSign";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";
import soundLoader, { explosionSound, laserSound } from "./sounds/soundLoader";
import setStars, { animateStars } from "./stars";

const setScene = (appenderFunc, dispatch, actions) => {
  const loadedContent = [];
  let lasersInGame = [];
  const models = { main: null, others: [] };
  let movement = {
    code: "",
    isMoving: false,
    axis: "",
    speed: 0,
    rotDirection: 0,
    rotationAxis: "",
    notRotAxis: "",
  };
  let canFire = true;
  let isFiring = false;
  //renderer
  const renderer = createR();
  //camera
  const camera = myCam();
  //scene
  const scene = new Scene();
  //lights
  const lights = createLights();
  const { p1, p2 } = lights;
  Object.values(lights).forEach(light => scene.add(light));

  //domEL
  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //Add stars
  const stars = setStars(scene);

  //Add targetSign
  const targetSign = createTargetSign();
  scene.add(targetSign);

  const addLaser = () => {
    if (models.main) {
      lasersInGame.push(
        fire(
          models.main.position,
          scene,
          laserS,
          listener,
          models.main.rotation.x
        )
      );
      canFire = false;
      setTimeout(() => (canFire = true), 200);
    }
  };

  //animate
  const animate = () => {
    if (isFiring && canFire) addLaser();
    if (lasersInGame.length && models.others.length) {
      const result = hitChecker(
        lasersInGame,
        models.others,
        scene,
        explodeSound,
        listener
      );

      if (result !== -1) {
        scene.remove(lasersInGame[result].laser);
        lasersInGame = [...lasersInGame.filter((l, i) => i !== result)];
      }
    }
    updateExplosion(scene);
    moveLights(p1, p2);
    moveTargetSign(targetSign, models.main, models.others[0]);
    moveLasers(lasersInGame, scene);
    moveShip(models.main, movement, p1, p2, camera, controls);

    moveOthers(models.others);
    animateStars(stars);
    renderer.render(scene, camera);
    controls.update();
  };

  //background, texture onLoad calls appender
  dispatch(actions.setMsg("Loading textures"));
  scene.background = cubeTexture(
    appenderFunc,
    loadedContent,
    dispatch,
    actions
  );

  //sounds
  const listener = new AudioListener();
  camera.add(listener);
  let laserS;
  const onLSound = b => (laserS = b);
  laserSound(onLSound);
  let explodeSound;
  const onExpSound = b => (explodeSound = b);
  explosionSound(onExpSound);

  const onSound = soundBuf => {
    dispatch(actions.setMsg("Sounds done"));
    loadedContent.push("sounds");
    //GLTF model
    dispatch(actions.setMsg("Loading model"));
    camera.add(listener);
    modelLoader(
      scene,
      appenderFunc,
      loadedContent,
      dispatch,
      actions,
      models,
      listener,
      soundBuf
    );

    if (loadedContent.length > NUMBER_OF_CONTENTS_TO_LOAD - 1) appenderFunc();
  };

  dispatch(actions.setMsg("Loading sounds"));
  soundLoader(onSound);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  const keyDownHandler = ({ code }) => {
    if (code === "Space") {
      isFiring = true;
      return;
    }

    if (code === movement.code && movement.isMoving) return;
    const result = keyboardControls(
      code,
      controls,
      models.main,
      camera,
      movement.isMoving
    );
    if (result) movement = result;
  };
  const keyUpHandler = ({ code }) => {
    if (code === "Space") isFiring = false;
    if (movement.isMoving && code === movement.code) movement.isMoving = false;
  };

  return {
    animate,
    domElement,
    onResize,
    keyDownHandler,
    keyUpHandler,
  };
};

export default setScene;
