import reverse_calc, {
  SCORE_A,
  SCORE_A_PLUS,
  SCORE_B,
  SCORE_B_PLUS,
  SCORE_S,
} from "../util/reverse_calc";

export default function ReverseCalc(props: {
  vocal: number;
  dance: number;
  visual: number;
  rank: number;
  before_exam: boolean;
}) {
  const reverse_calcs = [
    { rank: "S", calc_text: get_reverse_calc_text(props, SCORE_S) },
    { rank: "A+", calc_text: get_reverse_calc_text(props, SCORE_A_PLUS) },
    { rank: "A", calc_text: get_reverse_calc_text(props, SCORE_A) },
    { rank: "B+", calc_text: get_reverse_calc_text(props, SCORE_B_PLUS) },
    { rank: "B", calc_text: get_reverse_calc_text(props, SCORE_B) },
  ];
  return (
    <div className="ReverseCalc" style={{ paddingTop: "1em" }}>
      <h3>最終試験必要点数</h3>
      <table align="center">
        <thead>
          <tr>
            <th>評価</th>
            <th>点数</th>
          </tr>
        </thead>
        <tbody>
          {reverse_calcs.map((calc) => (
            <tr key={calc.rank}>
              <td>{calc.rank}</td>
              <td>{calc.calc_text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function get_reverse_calc_text(
  props: {
    vocal: number;
    dance: number;
    visual: number;
    rank: number;
    before_exam: boolean;
  },
  goal_score: number
) {
  const score = reverse_calc(
    props.vocal,
    props.dance,
    props.visual,
    props.rank,
    props.before_exam,
    goal_score
  );
  if (score <= 0) {
    return "クリア済み";
  } else {
    return score.toLocaleString() + "pt以上";
  }
}
