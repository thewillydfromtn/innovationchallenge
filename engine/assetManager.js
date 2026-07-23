/**
 * Asset manager for preloading and reusing images, audio, and arbitrary files.
 */
export class AssetManager {
  constructor() {
    this.registry = new Map();
    this.cache = new Map();
  }

  register(key, src, type = AssetManager.inferType(src)) {
    this.registry.set(key, { src, type });
  }

  registerMany(assets = {}) {
    Object.entries(assets).forEach(([key, asset]) => {
      if (typeof asset === 'string') {
        this.register(key, asset);
        return;
      }

      this.register(key, asset.src, asset.type);
    });
  }

  async load(key) {
    if (this.cache.has(key)) return this.cache.get(key);

    const asset = this.registry.get(key);
    if (!asset) throw new Error(`Asset "${key}" has not been registered.`);

    const loadedAsset = await this.loadByType(asset);
    this.cache.set(key, loadedAsset);
    return loadedAsset;
  }

  async loadAll(keys = [...this.registry.keys()]) {
    const entries = await Promise.all(keys.map(async (key) => [key, await this.load(key)]));
    return Object.fromEntries(entries);
  }

  get(key) {
    return this.cache.get(key);
  }

  async loadByType({ src, type }) {
    if (type === 'image') return AssetManager.loadImage(src);
    if (type === 'audio') return AssetManager.loadAudio(src);
    return fetch(src).then((response) => response.text());
  }

  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load image: ${src}`));
      image.src = src;
    });
  }

  static loadAudio(src) {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('canplaythrough', () => resolve(audio), { once: true });
      audio.addEventListener('error', () => reject(new Error(`Unable to load audio: ${src}`)), { once: true });
      audio.src = src;
      audio.load();
    });
  }

  static inferType(src) {
    if (/\.(png|jpe?g|gif|webp|svg)$/i.test(src)) return 'image';
    if (/\.(mp3|wav|ogg|m4a)$/i.test(src)) return 'audio';
    return 'text';
  }
}
