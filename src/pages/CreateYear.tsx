import { useEffect, useState } from "react";
import { Team } from "../classes/Team";
import { TeamInYear } from "../classes/TeamInYear";

const CreateYear = () => {
  const URL = "https://localhost:7242/api/Rb";

  const [teams, setTeams] = useState<Team[]>([]);
  const [yearNo, setYearNo] = useState<number>();
  const [teamRatings, setTeamRatings] = useState<TeamInYear[]>();

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

  const postYear = () => {
    fetch(`${URL}/years`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ yearNo: yearNo }),
    })
      .then((res) => res.json())
      .then((data) => {
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
      .then((data) => console.log(`Succeeded? ${data}`))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetch(`${URL}/teams`)
      .then((res) => res.json())
      .then((teams) => {
        console.log(teams);
        setTeams(teams);
      });

    // setTeamRatings(
    //   teams.map((team) => ({
    //     id: team.id,
    //     team: team.id,
    //     year: 0,
    //     ofRating: 0,
    //     dfRating: 0,
    //     avRating: 0,
    //     wins: 0,
    //     losses: 0,
    //     ties: 0,
    //     record: "0-0",
    //     likelyWins: 0,
    //     likelyLosses: 0,
    //     likelyTies: 0,
    //     likelyRecord: "0-0",
    //     bye: undefined,
    //   }))
    // );
  }, []);

  useEffect(() => {
    setTeamRatings(
      teams.map((team) => ({
        id: team.id,
        teamId: team.id,
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
      <button onClick={postYear}></button>
    </div>
  );
};

export default CreateYear;
