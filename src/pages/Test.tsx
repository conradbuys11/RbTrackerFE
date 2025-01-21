import { useEffect, useState } from "react";
import { Team } from "../classes/Team";
import { TeamInYear } from "../classes/TeamInYear";

const Test = () => {
  const [teams, setTeams] = useState<Team[]>([]);

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

  useEffect(() => {
    fetch("https://localhost:7242/api/Rb/teams")
      .then((res) => res.json())
      .then((teams) => {
        console.log(teams);
        setTeams(teams);
      });

    setTeamRatings(
      teams.map((team) => ({
        id: team.id,
        team: team.id,
        year: 0,
        ofRating: 0,
        dfRating: 0,
        avRating: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        record: "0-0",
        likelyWins: 0,
        likelyLosses: 0,
        likelyTies: 0,
        likelyRecord: "0-0",
        bye: undefined,
      }))
    );
  }, []);

  return (
    <div>
      <h1>Create Year</h1>
      <form>
        <div>
          <label htmlFor="yearNo">Year Number</label>
          <input type="number" name="yearNo" />
        </div>

        <div>
          {teams.map((team) => (
            <div key={team.id}>
              <span>{team.name} Ratings: </span>
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
    </div>

    // <div>
    //   <h1>List of teams in DB:</h1>
    //   {teams.map((team) => (
    //     <div key={team.id}>
    //       <p>
    //         {team.location} {team.name} ({team.code}). {team.conference}{" "}
    //         {team.division}.
    //       </p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Test;
