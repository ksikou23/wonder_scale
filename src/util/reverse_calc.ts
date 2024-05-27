import {
  get_rank_score,
  get_status_bonus as get_status_bonus_max,
} from "./rank_bonus";

export const SCORE_C = 3000;
export const SCORE_C_PLUS = 4500;
export const SCORE_B = 6000;
export const SCORE_B_PLUS = 8000;
export const SCORE_A = 10000;
export const SCORE_A_PLUS = 11500;
export const SCORE_S = 13000;

function get_status_bonus(status: number, rank: number) {
  const status_bonus = get_status_bonus_max(rank);
  const max_status = 1500;
  if (status + status_bonus <= max_status) {
    // not overflow
    return status_bonus;
  } else {
    // overflow
    return max_status - status;
  }
}

export default function reverse_calc(
  vocal: number,
  dance: number,
  visual: number,
  rank: number,
  before_exam: boolean,
  goal_score: number
) {
  let status_sum = vocal + dance + visual;

  if (before_exam) {
    status_sum += get_status_bonus(vocal, rank);
    status_sum += get_status_bonus(dance, rank);
    status_sum += get_status_bonus(visual, rank);
  }
  const status_score = Math.floor(status_sum * 2.3);
  const exam_score = goal_score - get_rank_score(rank) - status_score;

  console.log("status_sum", status_sum);
  console.log("status_score", status_score);
  console.log("exam_score", exam_score);

  const threshold = [
    5000 * 0.3, // 1500
    5000 * 0.3 + 5000 * 0.15, // 2250
    5000 * 0.3 + 5000 * 0.15 + 10000 * 0.08, // 3050
    5000 * 0.3 + 5000 * 0.15 + 10000 * 0.08 + 10000 * 0.04, // 3450
    5000 * 0.3 + 5000 * 0.15 + 10000 * 0.08 + 10000 * 0.04 + 10000 * 0.02, // 3650
  ];

  if (exam_score <= threshold[0]) {
    // 1pt-5000pt
    return Math.ceil(exam_score / 0.3);
  } else if (exam_score <= threshold[1]) {
    // 5001pt-10000pt
    return Math.ceil((exam_score - threshold[0]) / 0.15) + 5000;
  } else if (exam_score <= threshold[2]) {
    // 10001pt-20000pt
    return Math.ceil((exam_score - threshold[1]) / 0.08) + 10000;
  } else if (exam_score <= threshold[3]) {
    // 20001pt-30000pt
    return Math.ceil((exam_score - threshold[2]) / 0.04) + 20000;
  } else if (exam_score <= threshold[4]) {
    // 30001pt-40000pt
    return Math.ceil((exam_score - threshold[3]) / 0.02) + 30000;
  } else {
    // 40001pt-
    return Math.ceil((exam_score - threshold[4]) / 0.01) + 40000;
  }
}
