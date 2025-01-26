import type { Team } from "../classes/Team";

const URL = `https://localhost:7242/api/Rb`;

export const getTeams = async () => {
  const res = await fetch(`${URL}/teams`);
  const json = await res.json();
  return json as Team[];
};

export const submitYearGames = async () => {};
