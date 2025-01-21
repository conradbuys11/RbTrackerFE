import { Week } from "./Week";
import { TeamInYear } from "./TeamInYear";

export interface Game {
  id: number;
  gameType: number;
  week: Week;
  awayTeam: TeamInYear;
  homeTeam: TeamInYear;
  awayTeamScore: number | undefined;
  homeTeamScore: number | undefined;
  isTie: boolean | undefined;
  likelyWinner: TeamInYear | "Tie";
  winner: TeamInYear | "Tie" | undefined;
  loser: TeamInYear | "Tie" | undefined;
}
