import type { Year } from "~/classes/Year";
import type { Route } from "./+types/ViewYear";
import {
  getTeamsOfYear,
  getYear,
  updateGamesOfYear,
  viewYearGetYear,
} from "~/db/dbFuncs";
import StandingsTable from "~/components/ViewYear/StandingsTable/StandingsTable";
import AllWeeksTable from "~/components/ViewYear/WeekTable/AllWeeksTable";
import CollapseTest from "~/components/CollapseTest";
import { useState } from "react";

export async function clientLoader({ params }: Route.LoaderArgs) {
  let year = await viewYearGetYear(params.yearId);
  return { year };
  // let teams = await getTeamsOfYear(params.yearId);
  // return { year, teams };
}

const ViewYear = ({ loaderData }: Route.ComponentProps) => {
  const { year } = loaderData;
  const [games, setGames] = useState(
    year.weeks.map((week) => week.games).flat()
  );
  const [editGames, setEditGames] = useState(false);

  const updateGames = (
    gameId: number,
    scoreType: "awayTeam" | "homeTeam",
    score: number
  ) => {
    setGames((prevGames) =>
      prevGames.map((prevGame) =>
        prevGame.id !== gameId
          ? prevGame
          : scoreType == "awayTeam"
          ? { ...prevGame, awayTeamScore: score }
          : { ...prevGame, homeTeamScore: score }
      )
    );
  };

  const getByeWeekNumber = (weekId: number) => {
    const week = year.weeks.find((week) => week.id === weekId);
    return week?.weekNo;
  };

  const getTeamFromId = (teamId: number) => {
    const team = year.teams.find((team) => team.id === teamId);
    return team;
  };

  const getByesForWeek = (weekId: number) => {
    const teams = year.teams.filter((team) => team.byeId === weekId);
    return teams;
  };

  const updateSingleWeek = (weekId: number) => {
    const weekGames = games.filter((game) => game.weekId === weekId);
    updateGamesOfYear(year.id, weekGames);
  };

  const updateAllWeeks = () => {
    updateGamesOfYear(year.id, games);
  };

  // const { year, teams } = loaderData;
  return (
    <div>
      <h1>Year {year.yearNo}</h1>
      <div>
        <CollapseTest title={"Table of Divisions & Teams: Under construction"}>
          <StandingsTable
            key={"st"}
            teams={year.teams}
            byeWeek={getByeWeekNumber}
          />
        </CollapseTest>
      </div>
      <br />
      <div>
        <h2>Week info: Under construction</h2>
        <span>Edit Games?</span>{" "}
        <input
          type="checkbox"
          checked={editGames}
          onChange={() => setEditGames(!editGames)}
        />
        {editGames && (
          <>
            {" "}
            <button>Save (all weeks)</button>
          </>
        )}
        <AllWeeksTable
          key={"awt"}
          weeks={year.weeks}
          getTeam={getTeamFromId}
          getByes={getByesForWeek}
          updateGames={updateGames}
          editGames={editGames}
        />
      </div>
    </div>
  );
};

export default ViewYear;
