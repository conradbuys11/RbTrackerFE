import type { Conference } from "~/enums/conference";
import DivStandings from "./DivStandings";
import { Division } from "~/enums/division";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface ConfProps {
  conference: Conference;
  teams: TiyDtoViewYear[];
  byeWeek: (weekId: number) => number | undefined;
}

const ConfStandings = ({ conference, teams, byeWeek }: ConfProps) => {
  const confTeams = teams.filter((team) => team.conference == conference);
  return (
    <>
      <DivStandings
        key={"d0"}
        conference={conference}
        division={Division.East}
        teams={confTeams}
        byeWeek={byeWeek}
      />
      <DivStandings
        key={"d1"}
        conference={conference}
        division={Division.North}
        teams={confTeams}
        byeWeek={byeWeek}
      />
      <DivStandings
        key={"d2"}
        conference={conference}
        division={Division.West}
        teams={confTeams}
        byeWeek={byeWeek}
      />
      <DivStandings
        key={"d3"}
        conference={conference}
        division={Division.South}
        teams={confTeams}
        byeWeek={byeWeek}
      />
    </>
  );
};

export default ConfStandings;
