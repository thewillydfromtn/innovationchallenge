/**
 * Scene 1 establishes the permanent grayscale office layout.
 * It intentionally contains only labeled placeholders: no props, character,
 * lighting effects, camera movement, textures, or animations.
 */
export const scene1 = {
  id: 'scene-1',

  mount() {
    const scene = document.createElement('section');
    scene.className = 'office-layout-scene';
    scene.setAttribute('aria-label', 'Grayscale office layout placeholder scene');

    scene.innerHTML = `
      <div class="cinematic-canvas" role="img" aria-label="Widescreen grayscale office framework with labeled layout placeholders">
        <div class="room-shell">
          <div class="wall wall-left" aria-hidden="true"></div>
          <div class="wall wall-back">
            <div class="placeholder window-placeholder">Window</div>
            <div class="placeholder portrait-placeholder">Portrait</div>
            <div class="placeholder wall-art wall-art-one">Wall Art 1</div>
            <div class="placeholder wall-art wall-art-two">Wall Art 2</div>
            <div class="placeholder wall-art wall-art-three">Wall Art 3</div>
          </div>
          <div class="wall wall-right" aria-hidden="true"></div>
          <div class="floor-plane">
            <div class="placeholder desk-placeholder">Desk</div>
            <div class="placeholder monitors-placeholder">Dual Monitors</div>
            <div class="placeholder couch-placeholder">Couch</div>
            <div class="placeholder tv-placeholder">TV</div>
            <div class="placeholder bookshelf-placeholder">Bookshelf</div>
            <div class="placeholder side-table-placeholder">Side Table</div>
          </div>
        </div>
      </div>
    `;

    return scene;
  },
};
