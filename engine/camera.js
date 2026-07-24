import { AnimationManager } from './animationManager.js';

const DEFAULT_OFFICE_VIEW = Object.freeze({ x: 0, y: 0, zoom: 1 });
const RIGHT_MONITOR_SELECTOR = '[data-overlay="RightMonitorOverlay"]';

/**
 * Camera manager for applying time-based cinematic pan and zoom to a stage element.
 */
export class CameraManager {
  constructor(stageElement, animationManager = new AnimationManager()) {
    if (!stageElement) throw new Error('CameraManager requires a stage element.');
    this.stageElement = stageElement;
    this.animationManager = animationManager;
    this.position = { x: DEFAULT_OFFICE_VIEW.x, y: DEFAULT_OFFICE_VIEW.y };
    this.zoom = DEFAULT_OFFICE_VIEW.zoom;
    this.applyTransform();
  }

  beginOfficeView() {
    this.set(DEFAULT_OFFICE_VIEW);
  }

  set({ x = this.position.x, y = this.position.y, zoom = this.zoom } = {}) {
    this.position = { x, y };
    this.zoom = zoom;
    this.applyTransform();
  }

  panTo(x, y, options = {}) {
    return this.animateTo({ x, y, zoom: this.zoom }, options);
  }

  zoomTo(zoom, options = {}) {
    return this.animateTo({ x: this.position.x, y: this.position.y, zoom }, options);
  }

  pushToRightMonitor(options = {}) {
    return this.animateTo(this.getRightMonitorView(options), options);
  }

  returnToOffice(options = {}) {
    return this.animateTo(DEFAULT_OFFICE_VIEW, options);
  }

  getRightMonitorView({ viewportFill = 0.94 } = {}) {
    this.beginOfficeView();

    const monitor = this.stageElement.querySelector(RIGHT_MONITOR_SELECTOR);
    if (!monitor) throw new Error('Cannot push camera: right monitor overlay is not mounted.');

    const monitorRect = monitor.getBoundingClientRect();
    const stageRect = this.stageElement.getBoundingClientRect();
    const monitorCenterX = monitorRect.left - stageRect.left + monitorRect.width / 2;
    const monitorCenterY = monitorRect.top - stageRect.top + monitorRect.height / 2;
    const viewportCenterX = stageRect.width / 2;
    const viewportCenterY = stageRect.height / 2;
    const zoom = Math.max(
      stageRect.width / monitorRect.width,
      stageRect.height / monitorRect.height,
    ) * viewportFill;

    return {
      x: viewportCenterX - monitorCenterX * zoom,
      y: viewportCenterY - monitorCenterY * zoom,
      zoom,
    };
  }

  animateTo({ x = this.position.x, y = this.position.y, zoom = this.zoom }, { duration = 1000, easing = AnimationManager.easings.easeInOutCubic } = {}) {
    const start = { x: this.position.x, y: this.position.y, zoom: this.zoom };
    const end = { x, y, zoom };
    let controller;
    const finished = new Promise((resolve) => {
      controller = this.animationManager.add({
        duration,
        easing,
        onUpdate: (progress) => {
          this.set({
            x: CameraManager.lerp(start.x, end.x, progress),
            y: CameraManager.lerp(start.y, end.y, progress),
            zoom: CameraManager.lerp(start.zoom, end.zoom, progress),
          });
        },
        onComplete: resolve,
      });
    });

    return { ...controller, finished };
  }

  applyTransform() {
    this.stageElement.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${this.zoom})`;
  }

  static lerp(start, end, progress) {
    return start + (end - start) * progress;
  }
}
