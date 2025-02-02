import type { WeekDtoViewYear } from "~/classes/Week/WeekDtoViewYear";
import GameInWeek from "./GameInWeek";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";

interface TableProps {
  week: WeekDtoViewYear;
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
  getByes: (weekId: number) => TiyDtoViewYear[];
}

const WeekTable = ({ week, getTeam, getByes }: TableProps) => {
  const byes = getByes(week.id);
  const byesText = byes.map((bye, i) =>
    i + 1 >= byes.length ? bye.teamName : bye.teamName + ", "
  );

  return (
    <>
      <h2>Week #{week.weekNo}</h2>
      {byes.length > 0 ? <p>Byes: {byesText}</p> : null}
      {week.games.map((game) => (
        <GameInWeek key={`g${game.id}`} game={game} getTeam={getTeam} />
      ))}
      <hr />
    </>
  );
};

export default WeekTable;
