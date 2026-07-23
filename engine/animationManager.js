/**
 * Timeline-based animation manager.
 *
 * The manager keeps animation concerns centralized so scenes can describe
 * transitions declaratively with durations, easing, and update callbacks.
 */
export class AnimationManager {
  constructor() {
    this.animations = new Set();
    this.isRunning = false;
    this.frameId = null;
    this.lastTimestamp = 0;
  }

  /**
   * Add an animation to the timeline.
   * @param {object} options
   * @param {number} options.duration Duration in milliseconds.
   * @param {(progress:number)=>void} options.onUpdate Called each frame with eased progress from 0 to 1.
   * @param {()=>void} [options.onComplete] Called when the animation completes.
   * @param {(t:number)=>number} [options.easing] Easing function that receives linear progress.
   * @param {number} [options.delay=0] Delay in milliseconds before starting.
   * @returns {object} Animation controller with a cancel method.
   */
  add({ duration, onUpdate, onComplete, easing = AnimationManager.easings.linear, delay = 0 }) {
    if (typeof onUpdate !== 'function') {
      throw new TypeError('AnimationManager.add requires an onUpdate callback.');
    }

    const animation = {
      duration: Math.max(0, duration),
      delay: Math.max(0, delay),
      easing,
      onUpdate,
      onComplete,
      elapsed: 0,
      complete: false,
    };

    this.animations.add(animation);
    this.start();

    return {
      cancel: () => this.animations.delete(animation),
    };
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.isRunning = false;
    if (this.frameId) cancelAnimationFrame(this.frameId);
    this.frameId = null;
  }

  clear() {
    this.animations.clear();
    this.stop();
  }

  tick = (timestamp) => {
    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    for (const animation of this.animations) {
      animation.elapsed += delta;

      if (animation.elapsed < animation.delay) continue;

      const localElapsed = animation.elapsed - animation.delay;
      const linearProgress = animation.duration === 0 ? 1 : Math.min(localElapsed / animation.duration, 1);
      animation.onUpdate(animation.easing(linearProgress));

      if (linearProgress >= 1) {
        animation.complete = true;
        animation.onComplete?.();
      }
    }

    for (const animation of this.animations) {
      if (animation.complete) this.animations.delete(animation);
    }

    if (this.animations.size > 0) {
      this.frameId = requestAnimationFrame(this.tick);
    } else {
      this.stop();
    }
  };

  static easings = {
    linear: (t) => t,
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2),
  };
}
