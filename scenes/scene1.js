import { loadAct } from '../sceneConfig.js';
import { renderOfficeOverlays } from '../overlays/overlayComponents.js';
import { renderMonitorExperiencePlaceholder } from '../engine/monitorExperience.js';

const DEFAULT_ACT_NUMBER = 1;
const assetKeyForAct = (actNumber) => `act${actNumber}Background`;

/**
 * Permanent office scene architecture.
 *
 * The approved office is rendered as the single background image. HTML only
 * mounts reusable foreground overlays that can be animated independently.
 */
export const scene1 = {
  id: 'scene-1',
  async preload({ assetManager }, { actNumber = DEFAULT_ACT_NUMBER } = {}) {
    const actConfig = loadAct(actNumber);
    assetManager.register(assetKeyForAct(actConfig.actNumber), actConfig.backgroundImage, 'image');
    await assetManager.load(assetKeyForAct(actConfig.actNumber));
  },
  mount(rootElement, { actNumber = DEFAULT_ACT_NUMBER } = {}) {
    const actConfig = loadAct(actNumber);
    const scene = document.createElement('section');
    scene.className = 'office-background-scene';
    scene.setAttribute('aria-label', 'Permanent Fortress AI office background with reusable animation overlays');
    scene.innerHTML = `
      <div class="cinematic-canvas office-canvas" role="img" aria-label="Approved master office reference with independently positioned overlays">
        <img
          class="office-background-image"
          src="${actConfig.backgroundImage}"
          alt="Act ${actConfig.actNumber} Fortress AI office reference"
          decoding="async"
        >
        <div class="overlay-layer" aria-label="Reusable animation overlay layer">
          ${renderOfficeOverlays(actConfig)}
        </div>
        ${renderMonitorExperiencePlaceholder()}
      </div>`;
    return scene;
  },
  async enter({ timelineEngine }, { actNumber = DEFAULT_ACT_NUMBER, rootElement } = {}) {
    const actConfig = loadAct(actNumber);
    await timelineEngine.play(actConfig.timeline, { rootElement });
  },
};
