import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import { YearResult } from "~/enums/yearResult";
import { avRating, getEnumName, makeRecord } from "~/helpers";

interface TeamProps {
  team: TiyDtoViewYear;
  firstColumn: string | undefined;
  byeWeek: (weekId: number) => number | undefined;
}

const TeamStandings = ({ team, firstColumn, byeWeek }: TeamProps) => {
  return (
    <tr>
      <th className="px-2">{firstColumn ?? ""}</th>
      <td className="px-2">{team.teamName}</td>
      <td className="px-2">{team.ofRating}</td>
      <td className="px-2">{team.dfRating}</td>
      <td className="px-2">{avRating(team.ofRating, team.dfRating)}</td>
      <td className="px-2">{makeRecord(team.wins, team.losses, team.ties)}</td>
      <td className="px-2">
        {makeRecord(team.likelyWins, team.likelyLosses, team.likelyTies)}
      </td>
      <td className="px-2">{byeWeek(team.byeId)}</td>
      <td className="px-2">{team.seed > 0 ? team.seed : null}</td>
      <td className="px-2">
        {team.result == YearResult.None
          ? null
          : getEnumName(YearResult, team.result)}
      </td>
    </tr>
  );
};

export default TeamStandings;
