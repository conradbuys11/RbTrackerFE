import type { GameType } from "~/enums/gameType";
import type { NewGame } from "./NewGame";

export interface GameDto {
  id: number;
  gameType: GameType;
  weekId: number;
  awayTeamId: number;
  homeTeamId: number;
  awayTeamScore: number | null;
  homeTeamScore: number | null;
}

export function newGameToDto(newGame: NewGame, weekId: number): GameDto {
  if (newGame.awayTeam == undefined || newGame.homeTeam == undefined) {
    throw new Error("Can't have null away team or home team.");
  }
  return {
    id: 0,
    gameType: newGame.gameType,
    weekId: weekId,
    awayTeamId: newGame.awayTeam.id,
    homeTeamId: newGame.homeTeam.id,
    awayTeamScore: null,
    homeTeamScore: null,
  };
}
