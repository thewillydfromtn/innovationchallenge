/**
 * Scene manager for mounting, switching, and cleaning up film scenes.
 */
export class SceneManager {
  constructor(rootElement, sharedContext = {}) {
    if (!rootElement) throw new Error('SceneManager requires a root element.');
    this.rootElement = rootElement;
    this.sharedContext = sharedContext;
    this.scenes = new Map();
    this.currentScene = null;
  }

  register(scene) {
    if (!scene?.id) throw new Error('Scenes must include a unique id.');
    this.scenes.set(scene.id, scene);
  }

  async goTo(sceneId, sceneContext = {}) {
    const nextScene = this.scenes.get(sceneId);
    if (!nextScene) throw new Error(`Scene "${sceneId}" is not registered.`);

    if (this.currentScene?.destroy) {
      await this.currentScene.destroy();
    }

    this.rootElement.replaceChildren();
    this.currentScene = nextScene;

    if (nextScene.preload) {
      await nextScene.preload(this.sharedContext, sceneContext);
    }

    const mounted = await nextScene.mount(this.rootElement, {
      ...this.sharedContext,
      ...sceneContext,
    });

    if (mounted instanceof HTMLElement) {
      this.rootElement.append(mounted);
    }

    return nextScene;
  }
}
