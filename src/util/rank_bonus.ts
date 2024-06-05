export function get_status_bonus(rank: number) {
  switch (rank) {
    case 1:
      return 30;
    case 2:
      return 20;
    case 3:
      return 10;
    default:
      return 0;
  }
}

export function get_rank_score(rank: number) {
  switch (rank) {
    case 1:
      return 1700;
    case 2:
      return 900;
    case 3:
      return 500;
    default:
      return 0; //TODO check value for rank 4 or 5
  }
}
