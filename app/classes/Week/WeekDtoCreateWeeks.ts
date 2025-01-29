import type { GameDtoCreateWeeks } from "../Game/GameDtoCreateWeeks";

export interface WeekDtoCreateWeeks {
  weekNo: number;
  yearId: number;
  games: GameDtoCreateWeeks[];
}
