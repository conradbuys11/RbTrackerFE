import type { Year } from "~/classes/Year";
import type { Route } from "./+types/ViewYear";
import { getTeamsOfYear, getYear, viewYearGetYear } from "~/db/dbFuncs";
import StandingsTable from "~/components/ViewYear/StandingsTable/StandingsTable";
import AllWeeksTable from "~/components/ViewYear/WeekTable/AllWeeksTable";

export async function clientLoader({ params }: Route.LoaderArgs) {
  let year = await viewYearGetYear(params.yearId);
  return { year };
  // let teams = await getTeamsOfYear(params.yearId);
  // return { year, teams };
}

const ViewYear = ({ loaderData }: Route.ComponentProps) => {
  const { year } = loaderData;

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

  // const { year, teams } = loaderData;
  return (
    <div>
      <h1>Year {year.yearNo}</h1>
      <div>
        <h2>Table of Divisions & Teams: Under construction</h2>
        <StandingsTable
          key={"st"}
          teams={year.teams}
          byeWeek={getByeWeekNumber}
        />
      </div>
      <br />
      <div>
        <h2>Week info: Under construction</h2>
        <AllWeeksTable
          key={"awt"}
          weeks={year.weeks}
          getTeam={getTeamFromId}
          getByes={getByesForWeek}
        />
      </div>
    </div>
  );
};

export default ViewYear;
