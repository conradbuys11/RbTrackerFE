import type { GameType } from "~/enums/gameType";

export interface GameDtoCreateWeeks {
  gid: string;
  gameType: GameType;
  weekId: number;
  awayTeamId: number | undefined;
  homeTeamId: number | undefined;
}
