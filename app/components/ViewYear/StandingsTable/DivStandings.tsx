import type { Conference } from "~/enums/conference";
import TeamStandings from "./TeamStandings";
import type { Division } from "~/enums/division";
import type { TeamInYear } from "~/classes/TeamInYear";

interface DivProps {
  conference: Conference;
  division: Division;
  teams: TeamInYear[];
}

const DivStandings = ({ conference, division, teams }: DivProps) => {
  return (
    <>
      <TeamStandings />
      <TeamStandings />
      <TeamStandings />
      <TeamStandings />
    </>
  );
};

export default DivStandings;
