import type { Conference } from "~/enums/conference";
import TeamStandings from "./TeamStandings";
import type { Division } from "~/enums/division";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface DivProps {
  conference: Conference;
  division: Division;
  teams: TiyDtoViewYear[];
  byeWeek: (weekId: number) => number | undefined;
}

const DivStandings = ({ conference, division, teams, byeWeek }: DivProps) => {
  const divTeams = teams.filter((team) => team.division == division);
  return (
    <>
      {divTeams.map((team) => (
        <TeamStandings key={`t${team.id}`} team={team} byeWeek={byeWeek} />
      ))}
    </>
  );
};

export default DivStandings;
