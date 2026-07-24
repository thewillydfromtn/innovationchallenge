import { OVERLAY_MAP } from '../overlayMap.js';
import { createOverlayStyle } from './overlayStyles.js';

const renderOverlayContent = (content, className) => {
  if (!content) return '';

  return `
    <img class="${className}" src="${content}" alt="" aria-hidden="true" decoding="async">
  `;
};

const overlayElement = (key, className, label, { content = null, state = null } = {}) => `
  <div
    class="office-overlay ${className}"
    data-overlay="${label}"
    ${state ? `data-state="${state}"` : ''}
    aria-label="${label}"
    style="${createOverlayStyle(OVERLAY_MAP[key])}"
  >${renderOverlayContent(content, `${className}__asset`)}</div>
`;

export const RightMonitorOverlay = (content) => overlayElement('rightMonitor', 'right-monitor-overlay', 'RightMonitorOverlay', { content });

export const PortraitOverlay = (content) => overlayElement('portrait', 'portrait-overlay', 'PortraitOverlay', { content });

export const WallArtOverlay = (content) => overlayElement('wallArt', 'wall-art-overlay', 'WallArtOverlay', { content });

export const DeskCandleOverlay = (state) => overlayElement('candle', 'desk-candle-overlay', 'DeskCandleOverlay', { state });

export const DeskDrinkOverlay = (state) => overlayElement('drink', 'desk-drink-overlay', 'DeskDrinkOverlay', { state });

export const renderOfficeOverlays = (actConfig) => [
  RightMonitorOverlay(actConfig.rightMonitorContent),
  PortraitOverlay(actConfig.portraitImage),
  WallArtOverlay(actConfig.wallArtImage),
  DeskCandleOverlay(actConfig.candleState),
  DeskDrinkOverlay(actConfig.drinkState),
].join('');
