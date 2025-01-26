import type { TeamInYear } from "~/classes/TeamInYear";
import type { Year } from "~/classes/Year";
import { newGame, type NewGame } from "~/classes/NewGame";
import { byesPerWeek } from "~/data/byesPerWeek";
import { GameType } from "~/enums/gameType";
import { useEffect, useState } from "react";
import { newWeek, type NewWeek } from "~/classes/NewWeek";
import NewWeekEntry from "~/components/NewWeekEntry";
import { useLocation } from "react-router";

interface NavState {
  year: Year;
  teams: TeamInYear[];
}

const makeRegSeasonWeeks = (year: Year) => {
  const weeks: NewWeek[] = [];
  // create 18 regular season weeks
  for (let i = 0; i < 18; i++) {
    weeks.push(newWeek(i + 1, year, makeGamesForWeek(i + 1)));
  }
  return weeks;
};

const makeGamesForWeek = (weekNo: number) => {
  const games: NewGame[] = [];
  const noOfGames = 16 - byesPerWeek[weekNo - 1] / 2; // for every two teams with a bye in a week, the number of games in that week is reduced by 1
  for (let i = 0; i < noOfGames; i++) {
    games.push(newGame(i + 1, GameType.RegularSeason, weekNo));
  }
  return games;
};

const CreateYearWeeks = () => {
  const location = useLocation();
  const state = location.state as NavState;
  const { year, teams } = state || {};
  const [weeks, setWeeks] = useState<NewWeek[]>([]);

  const updateGames = (
    gameId: string,
    weekNo: number,
    teamType: "awayTeam" | "homeTeam",
    teamId: number | undefined
  ) => {
    const team =
      teamId == undefined
        ? undefined
        : teams.find((team) => team.id === teamId);
    setWeeks((prevWeeks) =>
      prevWeeks.map((week) =>
        week.weekNo === weekNo
          ? {
              ...week,
              games: week.games.map((game) =>
                game.id == gameId ? { ...game, [teamType]: team } : game
              ),
            }
          : week
      )
    );
  };

  useEffect(() => {
    setWeeks(makeRegSeasonWeeks(year));
  }, []);

  return (
    <div>
      {weeks.map((week) => {
        return (
          <NewWeekEntry
            key={"w" + week.weekNo.toString()}
            weekNo={week.weekNo}
            games={week.games}
            teams={teams}
            updateGames={updateGames}
          />
        );
      })}
    </div>
  );
};

export default CreateYearWeeks;
