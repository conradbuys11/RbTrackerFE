import { Conference } from "~/enums/conference";
import ConfStandings from "./ConfStandings";
import type { TeamInYear } from "~/classes/TeamInYear";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface TableProps {
  teams: TiyDtoViewYear[];
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
