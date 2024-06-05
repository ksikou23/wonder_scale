export const vocal_color1 = { r: 242, g: 53, b: 132 };
export const vocal_color2 = { r: 223, g: 71, b: 131 };
export const vocal_colors = [vocal_color1, vocal_color2];

export const dance_color1 = { r: 28, g: 133, b: 237 };
export const dance_color2 = { r: 64, g: 131, b: 230 };
export const dance_colors = [dance_color1, dance_color2];

export const visual_color1 = { r: 247, g: 177, b: 46 };
export const visual_color2 = { r: 236, g: 180, b: 76 };
export const visual_colors = [visual_color1, visual_color2];

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

export function equal_colors(
  target_color: { r: number; g: number; b: number },
  colors: { r: number; g: number; b: number }[]
) {
  for (const color of colors) {
    if (equal_color(target_color, color)) {
      return true;
    }
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

export function near_colors(
  target_color: { r: number; g: number; b: number },
  colors: { r: number; g: number; b: number }[]
) {
  for (const color of colors) {
    if (near_color(target_color, color)) {
      return true;
    }
  }
  return false;
}
