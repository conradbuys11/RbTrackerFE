import { Conference } from "~/enums/conference";
import ConfStandings from "./ConfStandings";
import type { TeamInYear } from "~/classes/TeamInYear";

interface TableProps {
  teams: TeamInYear[];
}

const StandingsTable = ({ teams }: TableProps) => {
  return (
    <>
      <ConfStandings conference={Conference.AFC} teams={teams} />
      <ConfStandings conference={Conference.NFC} teams={teams} />
    </>
  );
};

export default StandingsTable;
