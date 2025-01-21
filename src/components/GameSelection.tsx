import { teams } from "../testdata/teams";

interface Props {
  key: number;
  gameNo: number;
}

const GameSelection: React.FC<Props> = ({ gameNo }) => {
  return (
    <div>
      Game {gameNo + 1}:{" "}
      <select name="awayTeam" required>
        <option value=""></option>
        {teams.map((element) => {
          return <option value={element.teamName}>{element.teamName}</option>;
        })}
      </select>{" "}
      vs.{" "}
      <select name="homeTeam" required>
        <option value=""></option>
        {teams.map((element) => {
          return <option value={element.teamName}>{element.teamName}</option>;
        })}
      </select>
    </div>
  );
};

export default GameSelection;
