import { useEffect, useState } from "react";
import type { TeamInYear } from "../classes/TeamInYear";
import { getTeams } from "~/db/dbFuncs";
import type { Route } from "./+types/CreateYear";
import type { Year } from "~/classes/Year";
import { useNavigate } from "react-router";

interface NavState {
  year: Year;
  teams: TeamInYear[];
}

export async function clientLoader() {
  const teams = await getTeams();
  // const teamRatings = teams.map((team) => ({
  //   id: team.id,
  //   teamId: team.id,
  //   yearId: 0,
  //   ofRating: 0,
  //   dfRating: 0,
  //   wins: 0,
  //   losses: 0,
  //   ties: 0,
  //   likelyWins: 0,
  //   likelyLosses: 0,
  //   likelyTies: 0,
  //   byeId: undefined,
  // }));
  return { teams };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const CreateYear = ({ loaderData }: Route.ComponentProps) => {
  const URL = "https://localhost:7242/api/Rb";

  const { teams } = loaderData;
  const [yearNo, setYearNo] = useState<number>();
  const [teamRatings, setTeamRatings] = useState<TeamInYear[]>();
  const navigate = useNavigate();

  const setOfRating = (teamId: number, ofRating: number) => {
    setTeamRatings(
      teamRatings?.map((tr) =>
        tr.id != teamId ? tr : { ...tr, ofRating: ofRating }
      )
    );
  };

  const setDfRating = (teamId: number, dfRating: number) => {
    setTeamRatings(
      teamRatings?.map((tr) =>
        tr.id != teamId ? tr : { ...tr, dfRating: dfRating }
      )
    );
  };

  const postYear = async () => {
    let year: Year;
    let teams: TeamInYear[];
    await fetch(`${URL}/years`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yearNo: yearNo }),
    })
      .then((res) => res.json())
      .then((data) => {
        year = { id: data.id, yearNo: data.yearNo };
        const teamswyear = teamRatings?.map((tr) => ({
          ...tr,
          yearId: Number(data.id),
          id: 0,
        }));
        return fetch(`${URL}/teamsinyears/many`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(teamswyear),
        });
      })
      .then((res) => res.json())
      .then((data: TeamInYear[]) => (teams = data))
      .then((a) =>
        navigate("/createyearweeks", {
          state: { year: year, teams: teams } as NavState,
        })
      )
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    setTeamRatings(
      teams.map((team) => ({
        id: team.id,
        teamId: team.id,
        teamName: team.name,
        yearId: 0,
        ofRating: 0,
        dfRating: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        likelyWins: 0,
        likelyLosses: 0,
        likelyTies: 0,
        byeId: undefined,
      }))
    );
  }, [teams]);

  return (
    <div>
      <h1>Create Year</h1>
      <form>
        <div>
          <label htmlFor="yearNo">Year Number</label>
          <input
            type="number"
            name="yearNo"
            onChange={(e) => setYearNo(Number(e.target.value))}
          />
        </div>
        <br />
        <div>
          {teams.map((team) => (
            <div key={team.id}>
              <span>
                <strong>{team.name}</strong> Ratings:{" "}
              </span>
              <label htmlFor={team.name + "OfRating"}>Of. Rating</label>
              <input
                type="number"
                name={team.name + "OfRating"}
                onChange={(e) => setOfRating(team.id, Number(e.target.value))}
              />
              <label htmlFor={team.name + "DfRating"}>Df. Rating</label>
              <input
                type="number"
                name={team.name + "DfRating"}
                onChange={(e) => setDfRating(team.id, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
      </form>
      {/* TODO: can only submit if everything's filled in */}
      <button onClick={postYear}>Submit?</button>
    </div>
  );
};

export default CreateYear;
