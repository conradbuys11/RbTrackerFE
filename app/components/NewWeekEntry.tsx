import NewGameEntry from "./NewGameEntry";
import type { GameDtoCreateWeeks } from "~/classes/Game/GameDtoCreateWeeks";
import type { TiyDtoCreateWeeksGet } from "~/classes/TeamInYear/TiyDtoCreateWeeksGet";

interface NWEProps {
  key: string;
  weekNo: number;
  games: GameDtoCreateWeeks[];
  teams: TiyDtoCreateWeeksGet[];
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
            key={game.gid}
            weekNo={weekNo}
            game={game}
            teams={teams}
            updateGames={updateGames}
          />
        );
      })}
      <hr />
    </div>
  );
};

export default NewWeekEntry;
