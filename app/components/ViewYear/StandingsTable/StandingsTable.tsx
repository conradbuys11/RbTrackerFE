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
            <th></th>
            <th>Team</th>
            <th>OF</th>
            <th>DF</th>
            <th>Av</th>
            <th>Record</th>
            <th>Expected Record</th>
            <th>Bye Week</th>
          </tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
    </div>
  );
};

export default StandingsTable;
