import type { GameDtoCreateWeeks } from "../Game/GameDtoCreateWeeks";

export interface WeekDtoCreateWeeks {
  id: number | undefined;
  weekNo: number;
  yearId: number;
  games: GameDtoCreateWeeks[];
}
