import { forward_calc, get_rank } from "../util/score_calc";

export default function ForwardCalc(props: {
  vocal: number;
  dance: number;
  visual: number;
  rank: number;
  before_exam: boolean;
  exam_point: number;
}) {
  const score = forward_calc(
    props.vocal,
    props.dance,
    props.visual,
    props.rank,
    props.before_exam,
    props.exam_point
  );
  return (
    <div className="ForwardCalc" style={{ paddingTop: "1em" }}>
      <div>
        <b>{get_rank(score)}</b> 評価
      </div>
      <div>{score.toLocaleString()}pt</div>
    </div>
  );
}
