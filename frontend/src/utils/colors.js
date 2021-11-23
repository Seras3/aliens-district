
// color => hex color string
// alpha => 0 to 1 number
const addAlphaToHex = (color, alpha) => color + Math.trunc(alpha * 255).toString(16);

export {
  addAlphaToHex
};