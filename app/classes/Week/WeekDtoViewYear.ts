import type { GameDtoViewYearGet } from "../Game/GameDtoViewYearGet";

export interface WeekDtoViewYear {
  id: number;
  weekNo: number;
  games: GameDtoViewYearGet[];
}
