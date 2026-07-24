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
