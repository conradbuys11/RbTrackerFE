import type { TeamInYear } from "./TeamInYear";
import type { Week } from "./Week";

export interface NewGame {
  id: string;
  gameNo: number;
  gameType: number;
  weekNo: number;
  awayTeam: TeamInYear | undefined;
  homeTeam: TeamInYear | undefined;
}

export function newGame(
  gameNo: number,
  gameType: number,
  weekNo: number
): NewGame {
  return {
    id: "w" + weekNo.toString() + "g" + gameNo.toString(),
    gameNo: gameNo,
    gameType: gameType,
    weekNo: weekNo,
    awayTeam: undefined,
    homeTeam: undefined,
  };
}
