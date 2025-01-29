import type { TeamInYear } from "~/classes/TeamInYear";
import type { TiyDtoCreateYear } from "~/classes/TeamInYear/TiyDtoCreateYear";

interface TR {
  teamId: number;
  ofRating: number;
  dfRating: number;
}

enum t {
  NE = 1,
  MIA,
  BUF,
  NYJ,
  BAL,
  PIT,
  CIN,
  CLE,
  DEN,
  LAC,
  KC,
  LV,
  IND,
  JAX,
  HOU,
  TEN,
  WAS,
  DAL,
  PHI,
  NYG,
  CHI,
  DET,
  GB,
  MIN,
  SF,
  ARI,
  LAR,
  SEA,
  TB,
  ATL,
  CAR,
  NO,
}

const trs: TR[] = [
  { teamId: t.NE, ofRating: 3.5, dfRating: 5 },
  { teamId: t.MIA, ofRating: 4.5, dfRating: 5 },
  { teamId: t.BUF, ofRating: 4, dfRating: 5 },
  { teamId: t.NYJ, ofRating: 5, dfRating: 2.5 },
  { teamId: t.BAL, ofRating: 1.5, dfRating: 3.5 },
  { teamId: t.PIT, ofRating: 1.5, dfRating: 4 },
  { teamId: t.CIN, ofRating: 3, dfRating: 3.5 },
  { teamId: t.CLE, ofRating: 4.5, dfRating: 2 },
  { teamId: t.DEN, ofRating: 5, dfRating: 5 },
  { teamId: t.LAC, ofRating: 3.5, dfRating: 2.5 },
  { teamId: t.KC, ofRating: 3.5, dfRating: 3.5 },
  { teamId: t.LV, ofRating: 2, dfRating: 2.5 },
  { teamId: t.IND, ofRating: 1.5, dfRating: 2.5 },
  { teamId: t.JAX, ofRating: 3.5, dfRating: 4.5 },
  { teamId: t.HOU, ofRating: 1, dfRating: 3.5 },
  { teamId: t.TEN, ofRating: 1.5, dfRating: 2 },
  { teamId: t.WAS, ofRating: 5, dfRating: 2.5 },
  { teamId: t.DAL, ofRating: 4.5, dfRating: 5 },
  { teamId: t.PHI, ofRating: 3.5, dfRating: 5 },
  { teamId: t.NYG, ofRating: 4, dfRating: 4.5 },
  { teamId: t.CHI, ofRating: 2.5, dfRating: 4.5 },
  { teamId: t.DET, ofRating: 3, dfRating: 2 },
  { teamId: t.GB, ofRating: 1.5, dfRating: 5 },
  { teamId: t.MIN, ofRating: 3, dfRating: 1.5 },
  { teamId: t.SF, ofRating: 1, dfRating: 4.5 },
  { teamId: t.ARI, ofRating: 3.5, dfRating: 3 },
  { teamId: t.LAR, ofRating: 4, dfRating: 4 },
  { teamId: t.SEA, ofRating: 1.5, dfRating: 4.5 },
  { teamId: t.TB, ofRating: 3, dfRating: 1.5 },
  { teamId: t.ATL, ofRating: 3, dfRating: 1 },
  { teamId: t.CAR, ofRating: 2, dfRating: 1.5 },
  { teamId: t.NO, ofRating: 5, dfRating: 4 },
];

const testRatings = (teams: TiyDtoCreateYear[]) => {
  return teams.map((team) => {
    let tr = trs.find((tr) => tr.teamId == team.teamId);
    return {
      ...team,
      ofRating: tr ? tr.ofRating : 0,
      dfRating: tr ? tr.dfRating : 0,
    };
  });
};

export default testRatings;
