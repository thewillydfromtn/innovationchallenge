import { BACKGROUND_IMAGES } from './overlayMap.js';
import { TIMELINE_SHOTS } from './engine/timelineEngine.js';

export const ACT_COUNT = 7;

const PLACEHOLDER_ASSET = null;

export const DEFAULT_ACT_TIMELINE = Object.freeze([
  { shot: TIMELINE_SHOTS.OfficeWide, duration: 1200 },
  { shot: TIMELINE_SHOTS.CameraPush, duration: 4200 },
  { shot: TIMELINE_SHOTS.MonitorTakeover, duration: 600 },
  { shot: TIMELINE_SHOTS.MonitorExperience, duration: 1800 },
  { shot: TIMELINE_SHOTS.ReturnToOffice, duration: 3200 },
  { shot: TIMELINE_SHOTS.FadeToNextAct, duration: 900 },
]);

const createActConfig = (actNumber, overrides = {}) => ({
  actNumber,
  backgroundImage: BACKGROUND_IMAGES.office,
  portraitImage: PLACEHOLDER_ASSET,
  wallArtImage: PLACEHOLDER_ASSET,
  rightMonitorContent: PLACEHOLDER_ASSET,
  candleState: 'idle',
  drinkState: 'idle',
  timeline: DEFAULT_ACT_TIMELINE,
  ...overrides,
});

export const SCENE_CONFIG = Object.freeze({
  1: createActConfig(1),
  2: createActConfig(2),
  3: createActConfig(3),
  4: createActConfig(4),
  5: createActConfig(5),
  6: createActConfig(6),
  7: createActConfig(7, {
    backgroundImage: BACKGROUND_IMAGES.finalAct,
  }),
});

export const loadAct = (actNumber) => {
  const normalizedActNumber = Number(actNumber);
  const actConfig = SCENE_CONFIG[normalizedActNumber];

  if (!actConfig) {
    throw new Error(`Act ${actNumber} is not configured. Expected an act between 1 and ${ACT_COUNT}.`);
  }

  return {
    ...actConfig,
    timeline: actConfig.timeline.map((step) => ({ ...step })),
  };
};
