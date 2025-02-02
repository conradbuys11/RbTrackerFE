import type { GameDtoViewYearGet } from "../Game/GameDtoViewYearGet";
import type { PlayoffStandingDtoViewYearGetPut } from "../PlayoffStanding/PlayoffStandingDtoViewYearGetPut";

export interface WeekDtoViewYear {
  id: number;
  weekNo: number;
  games: GameDtoViewYearGet[];
  standings: PlayoffStandingDtoViewYearGetPut[];
}
