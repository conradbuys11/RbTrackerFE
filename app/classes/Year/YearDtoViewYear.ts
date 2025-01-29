import type { TiyDtoViewYear } from "../TeamInYear/TiyDtoViewYear";
import type { WeekDtoViewYear } from "../Week/WeekDtoViewYear";

export interface YearDtoViewYear {
  id: number;
  yearNo: number;
  weeks: WeekDtoViewYear[];
  teams: TiyDtoViewYear[];
}
