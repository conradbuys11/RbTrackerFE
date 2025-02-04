import type { GameDtoViewYearGetPut } from "~/classes/Game/GameDtoViewYearGetPut";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import { avRating, makeRecord } from "~/helpers";

interface GameProps {
  game: GameDtoViewYearGetPut;
  getTeam: (teamId: number) => TiyDtoViewYear | undefined;
}

const GameInWeek = ({ game, getTeam }: GameProps) => {
  const av = (team: TiyDtoViewYear) => {
    return avRating(team.ofRating, team.dfRating);
  };

  const awayTeam = getTeam(game.awayTeamId)!;
  const homeTeam = getTeam(game.homeTeamId)!;

  const awayTeamAv = av(awayTeam);
  const homeTeamAv = av(homeTeam);

  const likelyWinner =
    awayTeamAv > homeTeamAv
      ? awayTeam.teamName
      : homeTeamAv > awayTeamAv
      ? homeTeam.teamName
      : "Tie";

  const isGameFinished =
    game.awayTeamScore != undefined && game.homeTeamScore != undefined;

  const actualWinner = isGameFinished
    ? game.awayTeamScore! > game.homeTeamScore!
      ? awayTeam.teamName
      : game.homeTeamScore! > game.awayTeamScore!
      ? homeTeam.teamName
      : "Tie"
    : null;

  return (
    <div className="w-5/12 mx-auto my-1 flex place-content-between bg-gray-500 border border-solid border-gray-50 rounded-sm">
      <div>
        <span className="text-lg">
          <span
            className={
              isGameFinished && actualWinner == awayTeam.teamName
                ? "font-bold underline"
                : ""
            }
          >
            ({makeRecord(awayTeam.wins, awayTeam.losses, awayTeam.ties)}){" "}
            {awayTeam.teamName}
            {isGameFinished && ` ${game.awayTeamScore}`}
          </span>{" "}
          @{" "}
          <span
            className={
              isGameFinished && actualWinner == homeTeam.teamName
                ? "font-bold underline"
                : ""
            }
          >
            {isGameFinished && `${game.homeTeamScore} `}
            {homeTeam.teamName} (
            {makeRecord(homeTeam.wins, homeTeam.losses, homeTeam.ties)})
          </span>
        </span>
      </div>
      <div>
        <span
          className={
            !isGameFinished
              ? ""
              : actualWinner == likelyWinner
              ? "text-green-400"
              : "text-red-400"
          }
        >
          LIKELY: {likelyWinner} (+{Math.abs(awayTeamAv - homeTeamAv)})
        </span>
      </div>
    </div>
  );
  {
    /* <p>
    {awayTeam.teamName} ({av(awayTeam)}) at {homeTeam.teamName} (
    {av(homeTeam)}). Expected Winner: {likelyWinner}
  </p> */
  }
};

export default GameInWeek;
