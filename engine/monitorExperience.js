/**
 * @deprecated Retained only for historical overlay-based prototypes.
 * The active film architecture uses full-frame office images and standalone
 * full-screen HTML presentations; do not import this module in new work.
 */
/**
 * Opening cinematic monitor surface.
 *
 * This contains only the opening title card. Act I content, narration, and
 * music are intentionally excluded from this milestone.
 */
export const renderMonitorExperiencePlaceholder = () => `
  <div class="monitor-experience" data-monitor-experience data-active="false" aria-hidden="true">
    <div class="opening-title-card" data-opening-title data-active="false" aria-label="Opening title card">
      <p class="opening-title-card__kicker">FORTRESS KNOWLEDGE</p>
      <p class="opening-title-card__subtitle">A Short Film</p>
      <p class="opening-title-card__challenge">AI Innovation Challenge 2026</p>
    </div>
  </div>
`;
