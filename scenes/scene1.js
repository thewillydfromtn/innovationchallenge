/**
 * Placeholder scene proving the architecture is wired together.
 * Future tasks will replace this with the first cinematic office scene.
 */
export const scene1 = {
  id: 'scene-1',

  mount() {
    const title = document.createElement('section');
    title.className = 'title-card';
    title.setAttribute('aria-label', 'Opening title');

    title.innerHTML = `
      <p class="eyebrow">Fortress AI Innovation Challenge</p>
      <h1>Cinematic Short Film Engine</h1>
      <p class="subtitle">Reusable architecture ready for future scenes.</p>
    `;

    return title;
  },
};
