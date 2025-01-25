import { Form } from "react-router";
import type { NewGame } from "~/classes/NewGame";
import type { TeamInYear } from "~/classes/TeamInYear";
import NewGameEntry from "./NewGameEntry";

interface NWEProps {
  key: string;
  weekNo: number;
  games: NewGame[];
  teams: TeamInYear[];
  updateGames: (
    gameId: string,
    weekNo: number,
    teamType: "awayTeam" | "homeTeam",
    teamId: number | undefined
  ) => void; // weekPos is the element of the array the current week is (weekNo - 1), gamePos is the element of the array the current game is
}

const NewWeekEntry = ({ weekNo, games, teams, updateGames }: NWEProps) => {
  return (
    <div>
      <h1>Week #{weekNo}</h1>
      {games.map((game) => {
        return (
          <NewGameEntry
            key={game.id}
            weekNo={weekNo}
            game={game}
            teams={teams}
            updateGames={updateGames}
          />
        );
      })}
    </div>
  );
};

export default NewWeekEntry;
