import type { Conference } from "~/enums/conference";
import type { Division } from "~/enums/division";

export interface TiyDtoViewYear {
  id: number;
  teamName: string;
  conference: Conference;
  division: Division;
  ofRating: number;
  dfRating: number;
  wins: number;
  losses: number;
  ties: number;
  likelyWins: number;
  likelyLosses: number;
  likelyTies: number;
  byeId: number;
}
