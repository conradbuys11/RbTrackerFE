import type { NewWeek } from "~/classes/NewWeek";
import type { Team } from "../classes/Team";
import type { NewGame } from "~/classes/NewGame";
import { newGameToDto, type GameDto } from "~/classes/GameDto";
import type { TeamInYear } from "~/classes/TeamInYear";
import type { Year } from "~/classes/Year";
import type { TeamDtoCreateYear } from "~/classes/Team/TeamDtoCreateYear";
import type { YearDtoCreateYear } from "~/classes/Year/YearDtoCreateYear";
import type { TiyDtoCreateYear } from "~/classes/TeamInYear/TiyDtoCreateYear";
import type { YearDtoCreateWeeks } from "~/classes/Year/YearDtoCreateWeeks";
import type { TiyDtoCreateWeeksGet } from "~/classes/TeamInYear/TiyDtoCreateWeeksGet";
import type { WeekDtoCreateWeeks } from "~/classes/Week/WeekDtoCreateWeeks";
import type { GameDtoCreateWeeks } from "~/classes/Game/GameDtoCreateWeeks";
import type { TiyDtoCreateWeeksPut } from "~/classes/TeamInYear/TiyDtoCreateWeeksPut";
import type { YearDtoViewYear } from "~/classes/Year/YearDtoViewYear";

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
  weeks: WeekDtoCreateWeeks[],
  teams: TiyDtoCreateWeeksGet[]
) => {
  // first, add the week
  // we get back just the id from the week, which we then feed to
  // then, make all games in that week's game array have the id that's been returned via data
  // then, submit all the games in that week's game array
  let teamsPut: TiyDtoCreateWeeksPut[] = teams.map((team) => ({
    id: team.id,
    byeId: undefined,
  }));
  for await (const week of weeks) {
    let games: GameDtoCreateWeeks[];
    const thing = await fetch(`${URL}/createweeks/weeks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weekNo: week.weekNo,
        yearId: week.yearId,
      }),
    })
      .then((res) => res.json())
      // when we post to this route, we just get a number back as a response, the week id
      .then((weekId: number) => {
        week.id = weekId;

        games = week.games.map((game) => ({ ...game, weekId: weekId }));
        return fetch(`${URL}/createweeks/games`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(games),
        });
      })
      .then((res) => res.json())
      .then(() => {
        console.log(`Success!`);
        teamsPut = checkWeekByes(week, teamsPut);
      })
      .catch((e) => console.log(`Error when submitting weeks & games: ${e}`));
  }
  console.log(JSON.stringify(teamsPut));
  const byesResponse = await fetch(`${URL}/createweeks/teaminyears`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teamsPut),
  });
};

const checkWeekByes = (
  week: WeekDtoCreateWeeks,
  teams: TiyDtoCreateWeeksPut[]
) => {
  // if a week has 16 games, then there are no byes that week.
  if (week.games.length >= 16) return teams;

  /* 
  TODO: probably an easier way to do this.
  instead of looping through every week's games with every team, we could:
  start by building a second/parallel array with each team/their id.
  run through each game in a week, remove both teams in that game from that parallel array
  at the end will only remain teams that have a bye that week.
  update the first array, adding the bye id of this week to any teams left in the parallel array
  */

  // let teamsWithByes = [...teams];
  // for(var game of week.games){
  //   teamsWithByes = teamsWithByes.filter(team => team.id !== game.awayTeamId && team.id !== game.homeTeamId);
  // }
  // return teams.map(team => teamsWithByes.some(twb => twb.id === team.id) ? ({...team, byeId: week.id}) : team)

  return teams.map((team) => {
    // if the team already has a bye assigned from a previous week, skip this team
    if (team.byeId != undefined) return team;

    for (let j = 0; j < week.games.length; j++) {
      // cycle through each game in a week.
      // if there is any game during the week that has the team in it, this isn't their bye week, so go to the next team.
      // if we get through every game in a week and don't find the team, it's their bye week. assign it to them then stop looking.
      const game = week.games[j];
      if (game.awayTeamId === team.id || game.homeTeamId === team.id) {
        break;
      }
      if (j + 1 == week.games.length) {
        team.byeId = week.id;
        console.log(
          `${team.id} has their bye on week ${week.weekNo}. Week ID is ${week.id}.`
        );
      }
    }
    return team;
  });
};

//
//
//

export const createYearGetTeams = async () => {
  const res = await fetch(`${URL}/createyear/teams`);
  const json = await res.json();
  return json as TeamDtoCreateYear[];
};

export const createYearPostYearAndTeams = async (
  year: YearDtoCreateYear,
  teams: TiyDtoCreateYear[]
) => {
  const yearRes = await fetch(`${URL}/createyear/years`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(year),
  });
  const yearJson = (await yearRes.json()) as YearDtoCreateWeeks;

  teams = teams.map((team) => ({ ...team, yearId: yearJson.id }));

  const teamsRes = await fetch(`${URL}/createyear/teaminyears`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teams),
  });
  const teamsJson = (await teamsRes.json()) as TiyDtoCreateWeeksGet[];
  return { yearJson, teamsJson };
};

export const viewYearGetYear = async (id: string) => {
  const res = await fetch(`${URL}/viewyear/years/${id}`);
  const json = await res.json();
  return json as YearDtoViewYear;
};
