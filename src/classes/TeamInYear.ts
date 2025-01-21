import { Team } from "./Team";
import { Year } from "./Year";
import { Week } from "./Week";

export interface TeamInYear {
  id: number;
  team: Team | number;
  year: Year | number;
  ofRating: number;
  dfRating: number;
  avRating: number;
  wins: number;
  losses: number;
  ties: number;
  record: string;
  likelyWins: number;
  likelyLosses: number;
  likelyTies: number;
  likelyRecord: string;
  bye: Week | undefined;
}
