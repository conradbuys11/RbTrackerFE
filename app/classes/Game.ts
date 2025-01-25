import type { Week } from "./Week";
import type { TeamInYear } from "./TeamInYear";

export interface Game {
  id: number;
  gameType: number;
  weekId: number | undefined;
  week: Week;
  awayTeam: TeamInYear | undefined;
  homeTeam: TeamInYear | undefined;
  awayTeamScore: number | undefined;
  homeTeamScore: number | undefined;
  isTie: boolean | undefined;
  likelyWinner: TeamInYear | "Tie" | undefined;
  winner: TeamInYear | "Tie" | undefined;
  loser: TeamInYear | "Tie" | undefined;
}
