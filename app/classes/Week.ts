import type { Year } from "./Year";
import type { TeamInYear } from "./TeamInYear";

export interface Week {
  id: number | undefined;
  weekNo: number;
  yearId: number | undefined;
  year: Year;
  byes: TeamInYear[];
}

export function createWeek(weekNo: number, year: Year) {
  const week: Week = {
    id: 0,
    weekNo: weekNo,
    yearId: year.id,
    year: year,
    byes: [],
  };
  return week;
}
