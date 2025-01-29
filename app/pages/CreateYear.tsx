import { useEffect, useState } from "react";
import type { TeamInYear } from "../classes/TeamInYear";
import {
  createYearGetTeams,
  createYearPostYearAndTeams,
  getTeams,
} from "~/db/dbFuncs";
import type { Route } from "./+types/CreateYear";
import type { Year } from "~/classes/Year";
import { useNavigate } from "react-router";
import testRatings from "~/db/testRatings";
import type { TiyDtoCreateYear } from "~/classes/TeamInYear/TiyDtoCreateYear";
import type { YearDtoCreateWeeks } from "~/classes/Year/YearDtoCreateWeeks";
import type { TiyDtoCreateWeeksGet } from "~/classes/TeamInYear/TiyDtoCreateWeeksGet";

interface NavState {
  year: YearDtoCreateWeeks;
  teams: TiyDtoCreateWeeksGet[];
}

export async function clientLoader() {
  const teams = await createYearGetTeams();
  return { teams };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const CreateYear = ({ loaderData }: Route.ComponentProps) => {
  const URL = "https://localhost:7242/api/Rb";

  const { teams } = loaderData;
  const [yearNo, setYearNo] = useState<number>();
  const [teamRatings, setTeamRatings] = useState<TiyDtoCreateYear[]>([]);
  const navigate = useNavigate();

  const setOfRating = (teamId: number, ofRating: number) => {
    setTeamRatings(
      teamRatings?.map((tr) =>
        tr.teamId != teamId ? tr : { ...tr, ofRating: ofRating }
      )
    );
  };

  const setDfRating = (teamId: number, dfRating: number) => {
    setTeamRatings(
      teamRatings?.map((tr) =>
        tr.teamId != teamId ? tr : { ...tr, dfRating: dfRating }
      )
    );
  };

  const postYear = async () => {
    const { yearJson, teamsJson } = await createYearPostYearAndTeams(
      { yearNo: yearNo ?? 0 },
      teamRatings
    );
    navigate("/createyearweeks", {
      state: { year: yearJson, teams: teamsJson } as NavState,
    });
  };

  useEffect(() => {
    setTeamRatings(
      teams.map((team) => ({
        teamId: team.id,
        teamName: team.name,
        yearId: 0,
        ofRating: 0,
        dfRating: 0,
      }))
    );
  }, [teams]);

  return (
    <div>
      <h1>Create Year</h1>
      <div>
        <label htmlFor="yearNo">Year Number</label>
        <input
          type="number"
          name="yearNo"
          onChange={(e) => setYearNo(Number(e.target.value))}
        />
      </div>
      <hr />
      <button onClick={() => setTeamRatings(testRatings(teamRatings))}>
        Test Assign Ratings
      </button>
      <hr />
      <div>
        {teamRatings.map((team) => (
          <div key={team.teamId}>
            <span>
              <strong>{team.teamName}</strong> Ratings:{" "}
            </span>
            <label htmlFor={team.teamName + "OfRating"}>Of. Rating</label>
            <input
              type="number"
              name={team.teamName + "OfRating"}
              onChange={(e) => setOfRating(team.teamId, Number(e.target.value))}
              value={team.ofRating}
            />
            <label htmlFor={team.teamName + "DfRating"}>Df. Rating</label>
            <input
              type="number"
              name={team.teamName + "DfRating"}
              onChange={(e) => setDfRating(team.teamId, Number(e.target.value))}
              value={team.dfRating}
            />
          </div>
        ))}
      </div>
      {/* TODO: can only submit if everything's filled in */}
      <button onClick={postYear}>Submit?</button>
    </div>
  );
};

export default CreateYear;
