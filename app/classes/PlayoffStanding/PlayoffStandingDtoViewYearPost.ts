import type { Conference } from "~/enums/conference";
import type { SeedChange } from "~/enums/seedChange";

export interface PlayoffStandingDtoViewYearPost {
  weekId: number;
  teamInYearId: number;
  conference: Conference;
  seed: number;
  record: string;
  change: SeedChange;
}
