export function get_status_bonus(rank: number) {
  switch (rank) {
    case 1:
      return 30;
    case 2:
      return 0; //TODO
    case 3:
      return 0; //TODO
    case 4:
      return 0; //TODO
    case 5:
      return 0; //TODO
    case 6:
      return 0; //TODO
    default:
      return null as unknown as number;
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
