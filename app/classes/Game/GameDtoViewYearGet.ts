export interface GameDtoViewYearGet {
  id: number;
  weekId: number;
  awayTeamId: number;
  homeTeamId: number;
  awayTeamScore: number | undefined;
  homeTeamScore: number | undefined;
}
