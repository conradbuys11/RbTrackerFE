import { byesPerWeek } from "../data/byesPerWeek";
import GameSelection from "../components/GameSelection";
import ByeSelection from "../components/ByeSelection";
import { useEffect, useState } from "react";

interface GameEntry {
  gameNo: number;
  teamOne: string;
  teamTwo: string;
}

const DataEntryWeek = () => {
  const weekNo = 9; // dummy data
  const byes = byesPerWeek[weekNo - 1];
  const noOfGames = 16 - byes / 2; // 16 games with no byes

  const [games, setGames] = useState<GameEntry[]>([]);

  useEffect(() => {
    setGames(
      [...Array(noOfGames).keys()].map<GameEntry>((num) => ({
        gameNo: num,
        teamOne: "",
        teamTwo: "",
      }))
    );
  }, []);

  return (
    <div>
      <h1>
        Week {weekNo}. {byes} byes. Select what teams are facing off against
        each other.
      </h1>
      <form>
        {[...Array(noOfGames).keys()].map((key) => (
          <GameSelection key={key} gameNo={key} />
        ))}
        <hr />
        {byes > 0 ? (
          <div>
            <h3>Select teams with byes.</h3>
            {[...Array(byes).keys()].map((key) => (
              <ByeSelection key={key} />
            ))}
          </div>
        ) : (
          <span>Less than 0 byes.</span>
        )}
      </form>
    </div>
  );
};

export default DataEntryWeek;
