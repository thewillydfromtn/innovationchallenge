export const BACKGROUND_IMAGES = {
  office: 'assets/master-office-reference.png',
  finalAct: 'assets/master-final-act-reference.png',
};

export const OVERLAY_MAP = {
  portrait: {
    component: 'PortraitOverlay',
    left: 54,
    top: 17,
    width: 12,
    height: 27,
  },
  wallArt: {
    component: 'WallArtOverlay',
    left: 86,
    top: 17,
    width: 12,
    height: 30,
    transform: 'skewY(-5deg)',
  },
  rightMonitor: {
    component: 'RightMonitorOverlay',
    left: 51.6,
    top: 58.9,
    width: 26.5,
    height: 20.6,
    transform: 'perspective(40rem) rotateY(-5deg)',
  },
  leftMonitor: {
    component: 'LeftMonitorOverlay',
    left: 30.6,
    top: 58.7,
    width: 18.2,
    height: 18.7,
    transform: 'perspective(40rem) rotateY(5deg)',
  },
  candle: {
    component: 'DeskCandleOverlay',
    left: 58,
    top: 72,
    width: 3,
    height: 8,
    zIndex: 30,
  },
  drink: {
    component: 'DeskDrinkOverlay',
    left: 67,
    top: 72,
    width: 3.2,
    height: 8,
    zIndex: 30,
  },
};
