import type { WeekDtoViewYear } from "~/classes/Week/WeekDtoViewYear";
import GameInWeek from "./GameInWeek";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import CollapseTest from "~/components/CollapseTest";
import EnterGameScores from "~/components/EnterGameScores/EnterGameScore";

interface TableProps {
  week: WeekDtoViewYear;
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
  getByes: (weekId: number) => TiyDtoViewYear[];
  updateGames: (
    gameId: number,
    scoreType: "awayTeam" | "homeTeam",
    score: number
  ) => void;
  editGames: boolean;
}

const WeekTable = ({
  week,
  getTeam,
  getByes,
  updateGames,
  editGames,
}: TableProps) => {
  const byes = getByes(week.id);
  const byesText = byes.map((bye, i) =>
    i + 1 >= byes.length ? bye.teamName : bye.teamName + ", "
  );

  return (
    <div className="pb-1">
      <CollapseTest title={`WEEK #${week.weekNo}`}>
        {!editGames ? (
          <>
            {byes.length > 0 ? <p>Byes: {byesText}</p> : null}
            <div className="flex flex-wrap">
              {week.games.map((game) => (
                <GameInWeek key={`g${game.id}`} game={game} getTeam={getTeam} />
              ))}
            </div>
            <hr />
          </>
        ) : (
          <>
            {week.games.map((game) => (
              <EnterGameScores
                key={`ge${game.id}`}
                game={game}
                getTeam={getTeam}
                updateGames={updateGames}
              />
            ))}
            <button>Save (just this week)</button>
          </>
        )}
      </CollapseTest>
    </div>
  );
};

export default WeekTable;
