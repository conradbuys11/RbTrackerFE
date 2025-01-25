import type { NewGame } from "./NewGame";
import type { Year } from "./Year";

export interface NewWeek {
  weekNo: number;
  yearId: number | undefined;
  year: Year;
  games: NewGame[];
}

export function newWeek(weekNo: number, year: Year, games: NewGame[]) {
  const newWeek: NewWeek = {
    weekNo: weekNo,
    yearId: year.id,
    year: year,
    games: games,
  };
  return newWeek;
}
