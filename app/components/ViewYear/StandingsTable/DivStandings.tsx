import { Conference } from "~/enums/conference";
import TeamStandings from "./TeamStandings";
import { Division } from "~/enums/division";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import { getEnumName } from "~/helpers";

interface DivProps {
  conference: Conference;
  division: Division;
  teams: TiyDtoViewYear[];
  byeWeek: (weekId: number) => number | undefined;
}

const DivStandings = ({ conference, division, teams, byeWeek }: DivProps) => {
  const divTeams = teams.filter((team) => team.division == division);
  return (
    <tbody className="border">
      {divTeams.map((team, i) => (
        <TeamStandings
          firstColumn={
            i == 0
              ? `${getEnumName(Conference, conference)} ${getEnumName(
                  Division,
                  division
                )}`
              : undefined
          }
          key={`t${team.id}`}
          team={team}
          byeWeek={byeWeek}
        />
      ))}
    </tbody>
  );
};

export default DivStandings;
