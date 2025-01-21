import { Year } from "./Year";
import { TeamInYear } from "./TeamInYear";

export interface Week {
  id: number | undefined;
  weekNo: number;
  year: Year;
  byes: TeamInYear[];
}
