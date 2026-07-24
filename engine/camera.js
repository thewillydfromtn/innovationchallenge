/**
 * @deprecated Retained only for historical overlay/monitor-alignment prototypes.
 * The production film no longer moves a camera to match monitor geometry. Use
 * full-frame office images with a subtle whole-image push instead.
 */
export class CameraManager {
  constructor(stageElement) {
    if (!stageElement) throw new Error('CameraManager requires a stage element.');
    this.stageElement = stageElement;
  }

  beginOfficeView() {
    this.stageElement.style.transform = 'none';
  }
}
