const position_ipad_pro_13inch = {
  width: 2064,
  height: 2752,
  vocal: { x: 463, y: 2039 },
  dance: { x: 463, y: 2207 },
  visual: { x: 463, y: 2375 },
};

const position_ipad_pro_12dot9inch = {
  width: 2048,
  height: 2732,
  vocal: { x: 460, y: 2024 },
  dance: { x: 460, y: 2190 },
  visual: { x: 460, y: 2357 },
};

const position_iphone_se2 = {
  width: 750,
  height: 1334,
  vocal: { x: 92, y: 1001 },
  dance: { x: 92, y: 1084 },
  visual: { x: 92, y: 1166 },
};

const positions = [
  position_ipad_pro_13inch,
  position_ipad_pro_12dot9inch,
  position_iphone_se2,
];

export default function get_hard_coded_position(width: number, height: number) {
  for (const position of positions) {
    if (width === position.width && height === position.height) {
      return position;
    }
  }
  return null;
}
