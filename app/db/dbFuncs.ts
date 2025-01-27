import type { NewWeek } from "~/classes/NewWeek";
import type { Team } from "../classes/Team";
import type { NewGame } from "~/classes/NewGame";
import { newGameToDto, type GameDto } from "~/classes/GameDto";

const URL = `https://localhost:7242/api/Rb`;

export const getTeams = async () => {
  const res = await fetch(`${URL}/teams`);
  const json = await res.json();
  return json as Team[];
};

export const submitYearGames = async (weeks: NewWeek[]) => {
  // first, add the week
  // then, make all games in that week's game array have the id that's been returned via data
  // then, submit all the games in that week's game array
  weeks.forEach(async (week) => {
    let games: GameDto[];
    let weekId: number;
    const thing = await fetch(`${URL}/weeks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: 0,
        weekNo: week.weekNo,
        yearId: week.yearId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        weekId = data.id;
        games = week.games.map((game) => newGameToDto(game, data.id));
        return fetch(`${URL}/games/many`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(games),
        });
      })
      .then((res) => res.json())
      .then((data) => console.log(`Success!`))
      .catch((e) => console.log(`Error when submitting weeks & games: ${e}`));
    return thing;
  });
};

// TODO: logic to figure out byes as well
