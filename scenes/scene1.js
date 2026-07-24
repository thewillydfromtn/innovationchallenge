/**
 * Scene 1 establishes the permanent luxury apartment set for the film.
 * Every major set piece is kept as its own layer/component so future acts can
 * animate or replace props, screens, portrait art, wall art, and lighting
 * without redesigning the room or changing the camera composition.
 */
const createLayer = (className, label, children = '') => `
  <div class="set-layer ${className}" data-layer="${label}" aria-label="${label}">
    ${children}
  </div>
`;

const createBooks = () => Array.from({ length: 64 }, (_, index) => {
  const tone = ['umber', 'charcoal', 'wine', 'sand', 'copper'][index % 5];
  return `<span class="book book-${tone}" aria-hidden="true"></span>`;
}).join('');

const createShelfRows = () => Array.from({ length: 4 }, (_, index) => `
  <div class="book-row book-row-${index + 1}" aria-hidden="true">
    ${createBooks()}
  </div>
`).join('');

export const scene1 = {
  id: 'scene-1',

  mount() {
    const scene = document.createElement('section');
    scene.className = 'apartment-set-scene';
    scene.setAttribute('aria-label', 'Permanent luxury high-rise apartment film set');

    scene.innerHTML = `
      <div class="cinematic-canvas apartment-canvas" role="img" aria-label="Wide cinematic view of a warm moody luxury high-rise apartment workspace at night">
        <div class="room room-layer" data-layer="Room">
          <div class="ceiling-glow" aria-hidden="true"></div>
          <div class="back-wall" aria-hidden="true"></div>
          <div class="right-wall" aria-hidden="true"></div>
          <div class="floor" aria-hidden="true"></div>

          ${createLayer('window-layer', 'Window', `
            <div class="window-frame">
              <div class="skyline-layer" data-layer="Skyline" aria-label="Nighttime city skyline">
                <div class="city-glow" aria-hidden="true"></div>
                <div class="tower tower-one" aria-hidden="true"></div>
                <div class="tower tower-two" aria-hidden="true"></div>
                <div class="tower tower-three" aria-hidden="true"></div>
                <div class="tower tower-four" aria-hidden="true"></div>
              </div>
              <span class="window-mullion mullion-one" aria-hidden="true"></span>
              <span class="window-mullion mullion-two" aria-hidden="true"></span>
              <span class="window-mullion mullion-three" aria-hidden="true"></span>
            </div>
          `)}

          ${createLayer('bookshelf-layer', 'Bookshelf', `
            <div class="books-layer" data-layer="Books" aria-label="Full shelves of books">
              ${createShelfRows()}
            </div>
            <div class="clown-layer" data-layer="Clown" aria-label="Clown figure on top shelf">
              <span class="clown-hat" aria-hidden="true"></span>
              <span class="clown-head" aria-hidden="true"></span>
              <span class="clown-body" aria-hidden="true"></span>
            </div>
            <div class="quote-frame-layer" data-layer="Quote Frame" aria-label="Framed William Durham quote">
              <p>I could be wrong...<br>but I doubt it.</p>
              <small>— William Durham</small>
            </div>
          `)}

          ${createLayer('portrait-layer', 'Portrait', `
            <div class="portrait-frame">
              <div class="replaceable-portrait-art" aria-hidden="true"></div>
            </div>
          `)}

          ${createLayer('couch-layer', 'Couch', `
            <div class="couch-back" aria-hidden="true"></div>
            <div class="couch-seat" aria-hidden="true"></div>
            <div class="couch-arm couch-arm-left" aria-hidden="true"></div>
            <div class="couch-arm couch-arm-right" aria-hidden="true"></div>
            <div class="couch-tufts" aria-hidden="true"></div>
          `)}

          ${createLayer('side-table-layer', 'Side Table', `
            <div class="side-table-top" aria-hidden="true"></div>
            <div class="side-table-base" aria-hidden="true"></div>
          `)}

          ${createLayer('lamp-layer', 'Lamp', `
            <div class="lamp-shade" aria-hidden="true"></div>
            <div class="lamp-stem" aria-hidden="true"></div>
            <div class="lamp-pool" aria-hidden="true"></div>
          `)}

          ${createLayer('side-table-candle-layer', 'Side Table Candle', `
            <div class="candle side-candle" aria-hidden="true"><span></span></div>
          `)}

          ${createLayer('wall-art-layer', 'Wall Art', `
            <div class="wall-art-frame"><span>FORTRESS</span></div>
          `)}

          ${createLayer('desk-layer', 'Desk', `
            <div class="desk-back" aria-hidden="true"></div>
            <div class="desk-top" aria-hidden="true"></div>
            <div class="desk-front" aria-hidden="true"></div>
            <div class="desk-mat" data-layer="Desk Mat" aria-label="Desk mat"></div>
            <div class="keyboard" data-layer="Keyboard" aria-label="Keyboard"></div>
            <div class="mouse" data-layer="Mouse" aria-label="Mouse"></div>
          `)}

          ${createLayer('monitors-layer', 'Monitors', `
            <div class="monitor monitor-left" aria-label="Left widescreen monitor"></div>
            <div class="monitor monitor-right" aria-label="Right primary storytelling monitor"></div>
            <div class="monitor-glow" aria-hidden="true"></div>
          `)}

          ${createLayer('desk-candle-layer', 'Desk Candle', `
            <div class="candle desk-candle" aria-hidden="true"><span></span></div>
          `)}
        </div>
      </div>
    `;

    return scene;
  },
};
