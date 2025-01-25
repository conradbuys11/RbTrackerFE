import type { Team } from "../classes/Team";

const getTeams = async () => {
  const res = await fetch(`https:/localhost:7242/api/Rb/teams`);
  const json = await res.json();
  return json as Team[];
};

export default getTeams;
