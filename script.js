import { AssetManager } from './engine/assetManager.js';
import { FilmPlayer } from './engine/filmPlayer.js';
import { FILM_SEQUENCE, loadOfficeBeat } from './sceneConfig.js';

const bootFilm = async () => {
  const app = document.querySelector('#app');
  const assetManager = new AssetManager();
  const officeBeats = FILM_SEQUENCE.filter((step) => step.type === 'office').map((step) => loadOfficeBeat(step.id));

  officeBeats.forEach((beat) => assetManager.register(`office:${beat.id}`, beat.image, 'image'));
  await Promise.all(officeBeats.map((beat) => assetManager.load(`office:${beat.id}`)));

  const filmPlayer = new FilmPlayer(app, {
    sequence: FILM_SEQUENCE,
    loadOfficeBeat,
  });

  document.body.classList.add('film-ready');
  await filmPlayer.play();
};

document.addEventListener('DOMContentLoaded', () => {
  bootFilm().catch((error) => {
    console.error('Unable to start film playback.', error);
  });
});
