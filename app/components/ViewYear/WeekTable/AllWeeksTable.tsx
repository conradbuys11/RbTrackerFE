import type { WeekDtoViewYear } from "~/classes/Week/WeekDtoViewYear";
import WeekTable from "./WeekTable";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface TableProps {
  weeks: WeekDtoViewYear[];
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
  getByes: (weekId: number) => TiyDtoViewYear[];
  updateGames: (
    gameId: number,
    scoreType: "awayTeam" | "homeTeam",
    score: number
  ) => void;
  editGames: boolean;
}

const AllWeeksTable = ({
  weeks,
  getTeam,
  getByes,
  updateGames,
  editGames,
}: TableProps) => {
  return (
    <>
      {weeks.map((week) => (
        <WeekTable
          key={`w${week.id}`}
          week={week}
          getTeam={getTeam}
          getByes={getByes}
          updateGames={updateGames}
          editGames={editGames}
        />
      ))}
    </>
  );
};

export default AllWeeksTable;
