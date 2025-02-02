import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import { avRating, makeRecord } from "~/helpers";

interface TeamProps {
  team: TiyDtoViewYear;
  byeWeek: (weekId: number) => number | undefined;
}

const TeamStandings = ({ team, byeWeek }: TeamProps) => {
  return (
    <tr>
      <td></td>
      <td>{team.teamName}</td>
      <td>{team.ofRating}</td>
      <td>{team.dfRating}</td>
      <td>{avRating(team.ofRating, team.dfRating)}</td>
      <td>{makeRecord(team.wins, team.losses, team.ties)}</td>
      <td>{makeRecord(team.likelyWins, team.likelyLosses, team.likelyTies)}</td>
      <td>{byeWeek(team.byeId)}</td>
      {/* {team.teamName}. OfRating {team.ofRating}. DfRating {team.dfRating}.
      AvRating {(team.ofRating + team.dfRating) / 2}. Record{" "}
      {makeRecord(team.wins, team.losses, team.ties)}. Likely Record{" "}
      {makeRecord(team.likelyWins, team.likelyLosses, team.likelyTies)}. Bye on
      Week {byeWeek(team.byeId)}. */}
    </tr>
  );
};

export default TeamStandings;
