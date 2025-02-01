import type { Conference } from "~/enums/conference";
import TeamStandings from "./TeamStandings";
import type { Division } from "~/enums/division";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface DivProps {
  conference: Conference;
  division: Division;
  teams: TiyDtoViewYear[];
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
