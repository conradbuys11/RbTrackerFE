import type { GameDtoViewYearGet } from "~/classes/Game/GameDtoViewYearGet";
import type { TiyDtoViewYear } from "~/classes/TeamInYear/TiyDtoViewYear";
import { avRating } from "~/helpers";

interface GameProps {
  game: GameDtoViewYearGet;
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

  return (
    <>
      <p>
        {awayTeam.teamName} ({av(awayTeam)}) at {homeTeam.teamName} (
        {av(homeTeam)}). Expected Winner: {likelyWinner}
      </p>
    </>
  );
};

export default GameInWeek;
