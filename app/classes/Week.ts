import type { Year } from "./Year";
import type { TeamInYear } from "./TeamInYear";

export interface Week {
  id: number | undefined;
  weekNo: number;
  yearId: number | undefined;
  year: Year;
  byes: TeamInYear[];
}
