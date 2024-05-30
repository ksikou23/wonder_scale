export const vocal_color = { r: 242, g: 53, b: 132 };
export const dance_color = { r: 28, g: 133, b: 237 };
export const visual_color = { r: 247, g: 177, b: 46 };
export const arrow_color = { r: 227, g: 224, b: 221 };
export const white_color = { r: 255, g: 255, b: 255 };
export const black_color = { r: 0, g: 0, b: 0 };

export function equal_color(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
) {
  if (color1.r === color2.r && color1.g === color2.g && color1.b === color2.b) {
    return true;
  }
  return false;
}

export function near_color(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number }
) {
  const rd = color1.r - color2.r;
  const gd = color1.g - color2.g;
  const bd = color1.b - color2.b;
  const dist = Math.sqrt(rd * rd + gd * gd + bd * bd);
  if (dist < 20) {
    return true;
  }
  return false;
}
