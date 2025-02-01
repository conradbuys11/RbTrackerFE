import { byesPerWeek } from "~/data/byesPerWeek";
import { GameType } from "~/enums/gameType";
import { useEffect, useState } from "react";
import NewWeekEntry from "~/components/NewWeekEntry";
import { useLocation } from "react-router";
import { submitYearGames } from "~/db/dbFuncs";
import testPopulate from "~/db/testPopulate";
import { useNavigate } from "react-router";
import type { YearDtoCreateWeeks } from "~/classes/Year/YearDtoCreateWeeks";
import type { TiyDtoCreateWeeksGet } from "~/classes/TeamInYear/TiyDtoCreateWeeksGet";
import type { WeekDtoCreateWeeks } from "~/classes/Week/WeekDtoCreateWeeks";
import type { GameDtoCreateWeeks } from "~/classes/Game/GameDtoCreateWeeks";

interface NavState {
  year: YearDtoCreateWeeks;
  teams: TiyDtoCreateWeeksGet[];
}

const makeRegSeasonWeeks = (yearId: number) => {
  const weeks: WeekDtoCreateWeeks[] = [];
  // create 18 regular season weeks
  for (let i = 0; i < 18; i++) {
    const games: GameDtoCreateWeeks[] = [];
    const noOfGames = 16 - byesPerWeek[i] / 2; // for every two teams with a bye in a week, the number of games in that week is reduced by 1
    for (let j = 0; j < noOfGames; j++) {
      games.push({
        gid: `w${i + 1}g${j + 1}`,
        gameType: GameType.RegularSeason,
        weekId: 0,
        awayTeamId: undefined,
        homeTeamId: undefined,
      });
    }
    weeks.push({ id: undefined, weekNo: i + 1, yearId: yearId, games: games });
  }
  return weeks;
};

// const makePlayoffWeeks = (year: Year) => {
//   // create 6 wild card games
//   const wildCardGames = [...Array(6).keys()].map((i) =>
//     newGame(i + 1, GameType.WildCard, 19)
//   );
//   const wildCardWeek = newWeek(19, year, wildCardGames);

//   //create 4 divisional round games
//   const divGames = [...Array(4).keys()].map((i) =>
//     newGame(i + 1, GameType.Divisional, 20)
//   );
//   const divWeek = newWeek(20, year, divGames);

//   // create 2 conference championship games
//   const confGames = [...Array(2).keys()].map((i) =>
//     newGame(i + 1, GameType.ConfChamps, 21)
//   );
//   const confWeek = newWeek(21, year, confGames);

//   // create super bowl game
//   const superBowl = newWeek(22, year, [newGame(1, GameType.SuperBowl, 22)]);

//   return [wildCardWeek, divWeek, confWeek, superBowl];
// };

const CreateYearWeeks = () => {
  const location = useLocation();
  const state = location.state as NavState;
  const { year, teams } = state || {};
  const [weeks, setWeeks] = useState<WeekDtoCreateWeeks[]>([]);
  const navigate = useNavigate();

  const submit = () => {
    submitYearGames(weeks, teams).then(() => navigate(`/year/${year.id}`));
  };

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
                game.gid == gameId ? { ...game, [teamType]: team } : game
              ),
            }
          : week
      )
    );
  };

  useEffect(() => {
    setWeeks(makeRegSeasonWeeks(year.id));
  }, []);

  return (
    <div>
      <button onClick={() => setWeeks(testPopulate(weeks, teams))}>
        Test Populate
      </button>
      <hr />
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
      {/* TODO: can only submit if everything's filled in */}
      <button onClick={submit}>Submit?</button>
    </div>
  );
};

export default CreateYearWeeks;
