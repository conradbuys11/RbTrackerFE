import type { Year } from "./Year";
import type { TeamInYear } from "./TeamInYear";

export interface Week {
  id: number | undefined;
  weekNo: number;
  year: Year;
  byes: TeamInYear[];
}
