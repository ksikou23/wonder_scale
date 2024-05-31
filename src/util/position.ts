const position_ipad_pro_13inch = {
  width: 2064,
  height: 2752,
  vocal: { x: 463, y: 2039 },
  dance: { x: 463, y: 2207 },
  visual: { x: 463, y: 2375 },
};

const positions = [position_ipad_pro_13inch];

export default function get_hard_coded_position(width: number, height: number) {
  for (const position of positions) {
    if (width === position.width && height === position.height) {
      return position;
    }
  }
  return null;
}
