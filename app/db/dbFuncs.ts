import type { NewWeek } from "~/classes/NewWeek";
import type { Team } from "../classes/Team";
import type { NewGame } from "~/classes/NewGame";
import { newGameToDto, type GameDto } from "~/classes/GameDto";
import type { TeamInYear } from "~/classes/TeamInYear";
import type { Year } from "~/classes/Year";

const URL = `https://localhost:7242/api/Rb`;

export const getTeams = async () => {
  const res = await fetch(`${URL}/teams`);
  const json = await res.json();
  return json as Team[];
};

export const getYear = async (yearId: string) => {
  const res = await fetch(`${URL}/years/${yearId}/full`);
  const json = await res.json();
  return json as Year;
};

export const getTeamsOfYear = async (yearId: string) => {
  const res = await fetch(`${URL}/teamsinyears/many/${yearId}`);
  const json = await res.json();
  return json as TeamInYear[];
};

export const submitYearGames = async (
  weeks: NewWeek[],
  teams: TeamInYear[]
) => {
  // first, add the week
  // then, make all games in that week's game array have the id that's been returned via data
  // then, submit all the games in that week's game array
  for await (const week of weeks) {
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
        week.id = data.id;
        weekId = data.id;

        games = week.games.map((game) => newGameToDto(game, weekId));
        return fetch(`${URL}/games/many`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(games),
        });
      })
      .then((res) => res.json())
      .then(() => {
        console.log(`Success!`);
        teams = checkWeekByes(week, teams);
      })
      .catch((e) => console.log(`Error when submitting weeks & games: ${e}`));
  }
  console.log(JSON.stringify(teams));
  const byesResponse = await fetch(`${URL}/teaminyears/many`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teams),
  });
};

const checkWeekByes = (week: NewWeek, teams: TeamInYear[]) => {
  return teams.map((team) => {
    if (team.byeId != undefined) return team;
    for (let j = 0; j < week.games.length; j++) {
      // cycle through each game in a week.
      // if there is any game during the week that has the team in it, this isn't their bye week, so go to the next week.
      // if we get through every game in a week and don't find the team, it's their bye week. assign it to them then stop looking.
      const game = week.games[j];
      if (game.awayTeam == team || game.homeTeam == team) {
        break;
      }
      if (j + 1 == week.games.length) {
        team.byeId = week.id;
        console.log(
          `${team.teamName} has their bye on week ${week.weekNo}. Week ID is ${week.id}.`
        );
      }
    }
    return team;
  });
};
