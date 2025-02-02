import type { GameType } from "~/enums/gameType";

export interface GameDtoCreateWeeks {
  gid: string;
  gameType: GameType;
  awayTeamId: number | undefined;
  homeTeamId: number | undefined;
}
