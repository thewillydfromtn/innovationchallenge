const FADE_DURATION = 900;

const wait = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, Math.max(0, duration));
});

export class FilmPlayer {
  constructor(rootElement, { sequence, loadOfficeBeat }) {
    if (!rootElement) throw new Error('FilmPlayer requires a root element.');
    this.rootElement = rootElement;
    this.sequence = sequence;
    this.loadOfficeBeat = loadOfficeBeat;
  }

  async play() {
    for (const step of this.sequence) {
      if (step.enabled === false) continue;

      if (step.type === 'office') {
        await this.playOfficeBeat(this.loadOfficeBeat(step.id), step);
      } else if (step.type === 'presentation') {
        await this.playPresentation(step);
      } else if (step.type === 'credits') {
        await this.playCredits(step);
      }
    }
  }

  async playOfficeBeat(beat, step) {
    const scene = document.createElement('section');
    scene.className = 'film-frame office-frame';
    scene.setAttribute('aria-label', step.label ?? 'Cinematic office image');
    scene.style.setProperty('--office-push-scale', beat.pushScale ?? 1.06);
    scene.innerHTML = `
      <img
        class="office-frame__image"
        src="${beat.image}"
        alt="${step.label ?? 'Cinematic office image'}"
        decoding="async"
      >
    `;

    await this.showFrame(scene);
    scene.classList.add('office-frame--push');
    await wait(step.duration ?? beat.duration);
    await this.fadeOut(scene);
  }

  async playPresentation(step) {
    const frame = document.createElement('section');
    frame.className = 'film-frame presentation-frame';
    frame.setAttribute('aria-label', `${step.id} full-screen HTML presentation`);
    frame.innerHTML = `
      <iframe
        class="presentation-frame__viewport"
        src="${step.path}"
        title="${step.id} presentation"
        loading="eager"
      ></iframe>
    `;

    await this.showFrame(frame);
    await wait(step.duration);
    await this.fadeOut(frame);
  }

  async playCredits(step) {
    const frame = document.createElement('section');
    frame.className = 'film-frame credits-frame';
    frame.setAttribute('aria-label', 'End credits');
    frame.innerHTML = '<p>Fortress Knowledge</p>';

    await this.showFrame(frame);
    await wait(step.duration);
  }

  async showFrame(frame) {
    this.rootElement.replaceChildren(frame);
    await wait(50);
    frame.setAttribute('data-visible', 'true');
    await wait(FADE_DURATION);
  }

  async fadeOut(frame) {
    frame.setAttribute('data-visible', 'false');
    await wait(FADE_DURATION);
  }
}
