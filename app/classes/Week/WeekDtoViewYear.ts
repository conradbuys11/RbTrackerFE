import type { GameDtoViewYearGetPut } from "../Game/GameDtoViewYearGetPut";
import type { PlayoffStandingDtoViewYearGetPut } from "../PlayoffStanding/PlayoffStandingDtoViewYearGetPut";

export interface WeekDtoViewYear {
  id: number;
  weekNo: number;
  games: GameDtoViewYearGetPut[];
  standings: PlayoffStandingDtoViewYearGetPut[];
}
