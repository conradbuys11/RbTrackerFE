import type { Conference } from "~/enums/conference";
import type { SeedChange } from "~/enums/seedChange";

export interface PlayoffStandingDtoViewYearGetPut {
  id: number;
  weekId: number;
  teamInYearId: number;
  conference: Conference;
  seed: number;
  record: string;
  change: SeedChange;
}
