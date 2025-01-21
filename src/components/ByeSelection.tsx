import { teams } from "../testdata/teams";

interface Props {
  key: number;
}

const ByeSelection: React.FC<Props> = () => {
  return (
    <div>
      <select name="byeTeam" required>
        <option value=""></option>
        {teams.map((element) => {
          return <option value={element.teamName}>{element.teamName}</option>;
        })}
      </select>
    </div>
  );
};

export default ByeSelection;
