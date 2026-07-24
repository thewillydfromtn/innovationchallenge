import { AnimationManager } from './animationManager.js';

export const TIMELINE_SHOTS = Object.freeze({
  OfficeWide: 'OfficeWide',
  CameraPush: 'CameraPush',
  MonitorTakeover: 'MonitorTakeover',
  MonitorExperience: 'MonitorExperience',
  ReturnToOffice: 'ReturnToOffice',
  FadeToNextAct: 'FadeToNextAct',
});

const DEFAULT_DURATIONS = Object.freeze({
  [TIMELINE_SHOTS.OfficeWide]: 1200,
  [TIMELINE_SHOTS.CameraPush]: 4200,
  [TIMELINE_SHOTS.MonitorTakeover]: 600,
  [TIMELINE_SHOTS.MonitorExperience]: 1800,
  [TIMELINE_SHOTS.ReturnToOffice]: 3200,
  [TIMELINE_SHOTS.FadeToNextAct]: 900,
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
      case TIMELINE_SHOTS.OfficeWide:
        this.cameraManager.beginOfficeView();
        await wait(step.duration);
        break;
      case TIMELINE_SHOTS.CameraPush:
        this.currentController = this.cameraManager.pushToRightMonitor(step);
        await this.currentController.finished;
        break;
      case TIMELINE_SHOTS.MonitorTakeover:
        this.setMonitorExperienceState(true, context);
        await wait(step.duration);
        break;
      case TIMELINE_SHOTS.MonitorExperience:
        await wait(step.duration);
        break;
      case TIMELINE_SHOTS.ReturnToOffice:
        this.setMonitorExperienceState(false, context);
        this.currentController = this.cameraManager.returnToOffice(step);
        await this.currentController.finished;
        break;
      case TIMELINE_SHOTS.FadeToNextAct:
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
}
