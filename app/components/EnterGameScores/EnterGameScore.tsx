import type { GameDtoViewYearGetPut } from "~/classes/Game/GameDtoViewYearGetPut";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface GameProps {
  game: GameDtoViewYearGetPut;
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
  updateGames: (
    gameId: number,
    scoreType: "awayTeam" | "homeTeam",
    score: number
  ) => void;
}

const EnterGameScores = ({ game, getTeam, updateGames }: GameProps) => {
  const awayTeam = getTeam(game.awayTeamId)!;
  const homeTeam = getTeam(game.homeTeamId)!;
  return (
    <div>
      <span>
        {awayTeam.teamName}{" "}
        <input
          name="awayTeam"
          type="number"
          onChange={(e) => updateGames(game.id, "awayTeam", +e.target.value)}
        />{" "}
        @ {homeTeam.teamName}{" "}
        <input
          name="homeTeam"
          type="number"
          onChange={(e) => updateGames(game.id, "homeTeam", +e.target.value)}
        />
      </span>
    </div>
  );
};

export default EnterGameScores;
