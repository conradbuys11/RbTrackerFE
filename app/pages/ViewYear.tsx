import type { Year } from "~/classes/Year";
import type { Route } from "./+types/ViewYear";
import { getTeamsOfYear, getYear, viewYearGetYear } from "~/db/dbFuncs";
import StandingsTable from "~/components/ViewYear/StandingsTable/StandingsTable";

export async function clientLoader({ params }: Route.LoaderArgs) {
  let year = await viewYearGetYear(params.yearId);
  return { year };
  // let teams = await getTeamsOfYear(params.yearId);
  // return { year, teams };
}

const ViewYear = ({ loaderData }: Route.ComponentProps) => {
  const { year } = loaderData;
  // const { year, teams } = loaderData;
  return (
    <div>
      <h1>Year {year.yearNo}</h1>
      <div>
        <h2>Table of Divisions & Teams: Under construction</h2>
        <StandingsTable teams={year.teams} />
        {/* 
        structure probably looks like: 
        StandingsTable
            Conference x2
                Division x4
                    Team x4
        */}
      </div>
      <div>
        <h2>Week info: Under construction</h2>
      </div>
    </div>
  );
};

export default ViewYear;
