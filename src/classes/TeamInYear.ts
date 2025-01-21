import { Team } from "./Team";
import { Year } from "./Year";
import { Week } from "./Week";

export interface TeamInYear {
  id: number;
  team: Team | number;
  year: Year | number;
  ofRating: number;
  dfRating: number;
  wins: number;
  losses: number;
  ties: number;
  likelyWins: number;
  likelyLosses: number;
  likelyTies: number;
  bye: Week | undefined;
}
