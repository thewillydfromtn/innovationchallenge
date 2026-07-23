import { AnimationManager } from './animationManager.js';

/**
 * Camera manager for applying cinematic pan and zoom to a stage element.
 */
export class CameraManager {
  constructor(stageElement, animationManager = new AnimationManager()) {
    if (!stageElement) throw new Error('CameraManager requires a stage element.');
    this.stageElement = stageElement;
    this.animationManager = animationManager;
    this.position = { x: 0, y: 0 };
    this.zoom = 1;
    this.applyTransform();
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

  animateTo({ x = this.position.x, y = this.position.y, zoom = this.zoom }, { duration = 1000, easing = AnimationManager.easings.easeInOutCubic } = {}) {
    const start = { x: this.position.x, y: this.position.y, zoom: this.zoom };
    const end = { x, y, zoom };

    return this.animationManager.add({
      duration,
      easing,
      onUpdate: (progress) => {
        this.set({
          x: CameraManager.lerp(start.x, end.x, progress),
          y: CameraManager.lerp(start.y, end.y, progress),
          zoom: CameraManager.lerp(start.zoom, end.zoom, progress),
        });
      },
    });
  }

  applyTransform() {
    this.stageElement.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${this.zoom})`;
  }

  static lerp(start, end, progress) {
    return start + (end - start) * progress;
  }
}
