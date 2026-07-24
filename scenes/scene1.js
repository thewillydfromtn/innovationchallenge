/** Permanent luxury office set assembled from reusable HTML/CSS components. */
const component = (className, name, children = '') => `
  <div class="set-component ${className}" data-component="${name}" aria-label="${name}">${children}</div>
`;

const books = () => Array.from({ length: 92 }, (_, index) => `<span class="book book-${['oxblood', 'charcoal', 'walnut', 'copper', 'linen'][index % 5]}"></span>`).join('');
const shelfRows = () => Array.from({ length: 5 }, (_, index) => `<div class="book-row book-row-${index + 1}">${books()}</div>`).join('');
const dashboardRows = () => ['Nashville Alive', 'CMA Strategy', 'Loan Review', 'AI Factory'].map((name, index) => `
  <div class="dashboard-row"><span>${name}</span><span>${index % 2 ? 'Planned' : 'Active'}</span><span>${87 + index}%</span></div>
`).join('');

export const scene1 = {
  id: 'scene-1',
  mount() {
    const scene = document.createElement('section');
    scene.className = 'apartment-set-scene';
    scene.setAttribute('aria-label', 'Permanent Fortress AI luxury high-rise office set');
    scene.innerHTML = `
      <div class="cinematic-canvas apartment-canvas" role="img" aria-label="Moody high-rise apartment workspace matching the approved master office reference">
        <div class="office-set">
          ${component('background-component', 'Background')}
          ${component('left-wall-component', 'Left wall')}
          ${component('back-wall-component', 'Back wall')}
          ${component('right-wall-component', 'Right wall')}
          ${component('floor-component', 'Floor')}
          ${component('ambient-lighting-component', 'Ambient lighting', '<span class="track-light light-one"></span><span class="track-light light-two"></span><span class="track-light light-three"></span><span class="pink-accent-light"></span>')}
          ${component('window-component', 'Floor-to-ceiling window', `
            <div class="window-glass"></div><span class="mullion m1"></span><span class="mullion m2"></span><span class="mullion m3"></span>
            <div class="skyline-component" data-component="Nashville skyline"><span class="batman-building"></span><span class="spire spire-one"></span><span class="spire spire-two"></span><span class="tower t1"></span><span class="tower t2"></span><span class="tower t3"></span><span class="river-glow"></span></div>
          `)}
          ${component('bookshelf-component', 'Built-in bookshelf', `
            <div class="shelf-lights"></div><div class="books-component" data-component="Books">${shelfRows()}</div>
            <div class="emmett-kelly-component" data-component="Emmett Kelly clown"><span class="clown-hat"></span><span class="clown-face"></span><span class="clown-suit"></span></div>
            <div class="durham-quote-component" data-component="William Durham quote frame"><p>“I could be wrong...<br>but I doubt it.”</p><small>— William Durham</small></div>
          `)}
          ${component('portrait-component', 'Portrait frame', '<div class="portrait-frame"><div class="portrait-artwork" data-component="Portrait artwork"></div></div>')}
          ${component('wall-art-component', 'Wall art frame', '<div class="wall-art-frame"><div class="wall-art-text" data-component="Wall art text"></div></div>')}
          ${component('couch-component', 'Couch', '<span class="couch-back"></span><span class="couch-seat"></span><span class="couch-arm left"></span><span class="couch-arm right"></span><span class="couch-tufts"></span>')}
          ${component('side-table-component', 'Side table', '<span class="side-table-top"></span><span class="side-table-body"></span>')}
          ${component('lamp-component', 'Lamp', '<span class="lamp-shade"></span><span class="lamp-stem"></span><span class="lamp-base"></span>')}
          ${component('desk-component', 'Desk', '<div class="desk-surface" data-component="Desk surface"></div><div class="desk-front"></div><div class="keyboard"></div><div class="mouse"></div>')}
          ${component('monitors-component', 'Monitor assembly', `
            <div class="monitor left-monitor" data-component="Left monitor"><div class="monitor-bezel" data-component="Monitor bezels"><div class="dashboard"><strong>FORTRESS</strong><div class="cards"><span>60.6%</span><span>91.1%</span><span>$1,030,555</span><span>976</span></div>${dashboardRows()}</div></div></div>
            <div class="monitor right-monitor" data-component="Right monitor"><div class="monitor-bezel empty-screen" data-component="Monitor bezels"></div></div>
          `)}
          ${component('desk-candle-component', 'DeskCandle', '<div class="desk-candle-placeholder"></div>')}
          ${component('desk-drink-component', 'DeskDrink')}
          ${component('william-character-component', 'William character')}
        </div>
      </div>`;
    return scene;
  },
};
