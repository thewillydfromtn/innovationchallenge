const OFFICE_BACKGROUND_KEY = 'masterOfficeReference';
const OFFICE_BACKGROUND_SRC = 'assets/master-office-reference.png';

const overlayComponent = (className, name, children = '') => `
  <div class="office-overlay ${className}" data-overlay="${name}" aria-label="${name}">${children}</div>
`;

/**
 * Permanent office scene architecture.
 *
 * The approved office is rendered as the single background image. HTML only
 * mounts reusable foreground overlays that can be animated independently.
 */
export const scene1 = {
  id: 'scene-1',
  async preload({ assetManager }) {
    assetManager.register(OFFICE_BACKGROUND_KEY, OFFICE_BACKGROUND_SRC, 'image');
    await assetManager.load(OFFICE_BACKGROUND_KEY);
  },
  mount() {
    const scene = document.createElement('section');
    scene.className = 'office-background-scene';
    scene.setAttribute('aria-label', 'Permanent Fortress AI office background with reusable animation overlays');
    scene.innerHTML = `
      <div class="cinematic-canvas office-canvas" role="img" aria-label="Approved master office reference with independently positioned overlays">
        <img
          class="office-background-image"
          src="${OFFICE_BACKGROUND_SRC}"
          alt="Approved Fortress AI luxury high-rise office reference"
          decoding="async"
        >
        <div class="overlay-layer" aria-label="Reusable animation overlay layer">
          ${overlayComponent('right-monitor-overlay', 'RightMonitor')}
          ${overlayComponent('portrait-overlay', 'PortraitOverlay')}
          ${overlayComponent('wall-art-overlay', 'WallArtOverlay')}
          ${overlayComponent('desk-candle-overlay', 'DeskCandle')}
          ${overlayComponent('desk-drink-overlay', 'DeskDrink')}
          ${overlayComponent('william-overlay', 'William')}
        </div>
      </div>`;
    return scene;
  },
};
