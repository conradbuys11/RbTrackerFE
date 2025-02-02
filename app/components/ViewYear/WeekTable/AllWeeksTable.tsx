import type { WeekDtoViewYear } from "~/classes/Week/WeekDtoViewYear";
import WeekTable from "./WeekTable";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface TableProps {
  weeks: WeekDtoViewYear[];
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
  getByes: (weekId: number) => TiyDtoViewYear[];
}

const AllWeeksTable = ({ weeks, getTeam, getByes }: TableProps) => {
  return (
    <>
      {weeks.map((week) => (
        <WeekTable
          key={`w${week.id}`}
          week={week}
          getTeam={getTeam}
          getByes={getByes}
        />
      ))}
    </>
  );
};

export default AllWeeksTable;
