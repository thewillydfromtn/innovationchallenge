import { AnimationManager } from './animationManager.js';

export const TIMELINE_SHOTS = Object.freeze({
  OpeningOffice: 'OpeningOffice',
  CameraPush: 'CameraPush',
  MonitorTakeover: 'MonitorTakeover',
  OpeningTitle: 'OpeningTitle',
});

const DEFAULT_DURATIONS = Object.freeze({
  [TIMELINE_SHOTS.OpeningOffice]: 1800,
  [TIMELINE_SHOTS.CameraPush]: 5200,
  [TIMELINE_SHOTS.MonitorTakeover]: 1800,
  [TIMELINE_SHOTS.OpeningTitle]: 3000,
});

const wait = (duration) => new Promise((resolve) => {
  window.setTimeout(resolve, Math.max(0, duration));
});

/**
 * Timeline-driven cinematic playback engine.
 *
 * Acts provide declarative shot lists. The engine owns sequencing and delegates
 * reusable camera moves to the camera controller, keeping act-specific content
 * separate from cinematic grammar.
 */
export class TimelineEngine {
  constructor({ cameraManager, animationManager = new AnimationManager(), rootElement } = {}) {
    if (!cameraManager) throw new Error('TimelineEngine requires a camera manager.');
    this.cameraManager = cameraManager;
    this.animationManager = animationManager;
    this.rootElement = rootElement;
    this.isPlaying = false;
    this.currentController = null;
  }

  async play(timeline = [], context = {}) {
    if (this.isPlaying) this.stop();
    this.isPlaying = true;

    for (const step of timeline) {
      if (!this.isPlaying) break;
      await this.playStep(this.normalizeStep(step), context);
    }

    this.isPlaying = false;
  }

  stop() {
    this.isPlaying = false;
    this.currentController?.cancel?.();
    this.currentController = null;
  }

  async playStep(step, context) {
    switch (step.shot) {
      case TIMELINE_SHOTS.OpeningOffice:
        this.cameraManager.beginOfficeView();
        this.setMonitorExperienceState(false, context);
        this.setOpeningTitleState(false, context);
        await wait(step.duration);
        break;
      case TIMELINE_SHOTS.CameraPush:
        this.currentController = this.cameraManager.pushToRightMonitor(step);
        await this.currentController.finished;
        break;
      case TIMELINE_SHOTS.MonitorTakeover:
        this.setMonitorExperienceState(true, context);
        this.currentController = this.cameraManager.pushToRightMonitor(step);
        await this.currentController.finished;
        break;
      case TIMELINE_SHOTS.OpeningTitle:
        this.setOpeningTitleState(true, context);
        await wait(step.duration);
        break;
      default:
        throw new Error(`Unknown timeline shot: ${step.shot}`);
    }
  }

  normalizeStep(step) {
    const shot = typeof step === 'string' ? step : step?.shot;
    if (!shot) throw new Error('Timeline steps must provide a shot name.');

    return {
      ...(typeof step === 'object' ? step : {}),
      shot,
      duration: step?.duration ?? DEFAULT_DURATIONS[shot] ?? 1000,
    };
  }

  setMonitorExperienceState(isActive, context) {
    const root = context.rootElement ?? this.rootElement ?? document;
    root.querySelector('[data-monitor-experience]')?.setAttribute('data-active', String(isActive));
  }

  setOpeningTitleState(isActive, context) {
    const root = context.rootElement ?? this.rootElement ?? document;
    root.querySelector('[data-opening-title]')?.setAttribute('data-active', String(isActive));
  }
}
