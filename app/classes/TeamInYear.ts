export interface TeamInYear {
  id: number;
  teamId: number;
  teamName: string;
  yearId: number;
  ofRating: number;
  dfRating: number;
  wins: number;
  losses: number;
  ties: number;
  likelyWins: number;
  likelyLosses: number;
  likelyTies: number;
  byeId: number | undefined;
}
