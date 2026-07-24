/**
 * @deprecated Retained only for historical overlay-based prototypes.
 * The active film architecture uses full-frame office images and standalone
 * full-screen HTML presentations; do not import this module in new work.
 */
const toPercent = (value) => `${value}%`;

export const createOverlayStyle = ({ left, top, width, height, transform, zIndex }) => {
  const style = [
    `left: ${toPercent(left)}`,
    `top: ${toPercent(top)}`,
    `width: ${toPercent(width)}`,
    `height: ${toPercent(height)}`,
  ];

  if (transform) style.push(`transform: ${transform}`);
  if (zIndex !== undefined) style.push(`z-index: ${zIndex}`);

  return style.join('; ');
};
