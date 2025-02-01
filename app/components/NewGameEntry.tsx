import type { GameDtoCreateWeeks } from "~/classes/Game/GameDtoCreateWeeks";
import type { TiyDtoCreateWeeksGet } from "~/classes/TeamInYear/TiyDtoCreateWeeksGet";

interface NGEProps {
  key: string;
  weekNo: number;
  game: GameDtoCreateWeeks;
  teams: TiyDtoCreateWeeksGet[];
  updateGames: (
    gameId: string,
    weekNo: number,
    teamType: "awayTeam" | "homeTeam",
    teamId: number | undefined
  ) => void;
}

const NewGameEntry = ({ weekNo, game, teams, updateGames }: NGEProps) => {
  return (
    <div>
      <select
        name="awayTeam"
        onChange={(e) =>
          updateGames(game.gid, weekNo, "awayTeam", +e.target.value)
        }
        value={game.awayTeamId}
        required
      >
        <option value={undefined}></option>
        {teams.map((team) => {
          return <option value={team.id}>{team.teamName}</option>;
        })}
      </select>
      {" vs. "}
      <select
        name="homeTeam"
        onChange={(e) =>
          updateGames(game.gid, weekNo, "homeTeam", +e.target.value)
        }
        value={game.homeTeamId}
        required
      >
        <option value={undefined}></option>
        {teams.map((team) => {
          return <option value={team.id}>{team.teamName}</option>;
        })}
      </select>
    </div>
  );
};

export default NewGameEntry;
