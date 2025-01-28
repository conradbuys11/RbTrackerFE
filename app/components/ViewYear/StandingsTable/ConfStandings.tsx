import type { Conference } from "~/enums/conference";
import DivStandings from "./DivStandings";
import { Division } from "~/enums/division";
import type { TeamInYear } from "~/classes/TeamInYear";

interface ConfProps {
  conference: Conference;
  teams: TeamInYear[];
}

const ConfStandings = ({ conference, teams }: ConfProps) => {
  return (
    <>
      <DivStandings
        conference={conference}
        division={Division.East}
        teams={teams}
      />
      <DivStandings
        conference={conference}
        division={Division.North}
        teams={teams}
      />
      <DivStandings
        conference={conference}
        division={Division.West}
        teams={teams}
      />
      <DivStandings
        conference={conference}
        division={Division.South}
        teams={teams}
      />
    </>
  );
};

export default ConfStandings;
