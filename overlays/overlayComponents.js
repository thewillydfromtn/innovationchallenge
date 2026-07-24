import { OVERLAY_MAP } from '../overlayMap.js';
import { createOverlayStyle } from './overlayStyles.js';

const overlayElement = (key, className, label) => `
  <div
    class="office-overlay ${className}"
    data-overlay="${label}"
    aria-label="${label}"
    style="${createOverlayStyle(OVERLAY_MAP[key])}"
  ></div>
`;

export const RightMonitorOverlay = () => overlayElement('rightMonitor', 'right-monitor-overlay', 'RightMonitorOverlay');

export const PortraitOverlay = () => overlayElement('portrait', 'portrait-overlay', 'PortraitOverlay');

export const WallArtOverlay = () => overlayElement('wallArt', 'wall-art-overlay', 'WallArtOverlay');

export const DeskCandleOverlay = () => overlayElement('candle', 'desk-candle-overlay', 'DeskCandleOverlay');

export const DeskDrinkOverlay = () => overlayElement('drink', 'desk-drink-overlay', 'DeskDrinkOverlay');

export const renderOfficeOverlays = () => [
  RightMonitorOverlay(),
  PortraitOverlay(),
  WallArtOverlay(),
  DeskCandleOverlay(),
  DeskDrinkOverlay(),
].join('');
