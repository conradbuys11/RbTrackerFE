import type { NewGame } from "~/classes/NewGame";
import type { TeamInYear } from "~/classes/TeamInYear";

interface NGEProps {
  key: string;
  weekNo: number;
  game: NewGame;
  teams: TeamInYear[];
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
          updateGames(game.id, weekNo, "awayTeam", +e.target.value)
        }
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
          updateGames(game.id, weekNo, "homeTeam", +e.target.value)
        }
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
