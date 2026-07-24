import { AnimationManager } from './engine/animationManager.js';
import { AssetManager } from './engine/assetManager.js';
import { CameraManager } from './engine/camera.js';
import { SceneManager } from './engine/sceneManager.js';
import { TimelineEngine } from './engine/timelineEngine.js';
import { scene1 } from './scenes/scene1.js';

const bootFilm = async () => {
  const app = document.querySelector('#app');
  const cameraStage = document.querySelector('#camera-stage');

  const animationManager = new AnimationManager();
  const assetManager = new AssetManager();
  const cameraManager = new CameraManager(cameraStage, animationManager);
  const timelineEngine = new TimelineEngine({
    animationManager,
    cameraManager,
    rootElement: app,
  });
  const sceneManager = new SceneManager(app, {
    animationManager,
    assetManager,
    cameraManager,
    timelineEngine,
  });

  sceneManager.register(scene1);
  await sceneManager.goTo('scene-1');

  document.body.classList.add('film-ready');
};

document.addEventListener('DOMContentLoaded', bootFilm);
