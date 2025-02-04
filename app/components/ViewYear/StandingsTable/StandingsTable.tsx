import { Conference } from "~/enums/conference";
import ConfStandings from "./ConfStandings";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface TableProps {
  teams: TiyDtoViewYear[];
  byeWeek: (weekId: number) => number | undefined;
}

const StandingsTable = ({ teams, byeWeek }: TableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-2"></th>
            <th className="px-2">Team</th>
            <th className="px-2">OF</th>
            <th className="px-2">DF</th>
            <th className="px-2">Av</th>
            <th className="px-2">Record</th>
            <th className="px-2">Expected Record</th>
            <th className="px-2">Bye Week</th>
            <th className="px-2">Seed</th>
            <th className="px-2">Outcome</th>
          </tr>
        </thead>
        <ConfStandings
          conference={Conference.AFC}
          teams={teams}
          byeWeek={byeWeek}
        />
        <ConfStandings
          conference={Conference.NFC}
          teams={teams}
          byeWeek={byeWeek}
        />
      </table>
    </div>
  );
};

export default StandingsTable;
