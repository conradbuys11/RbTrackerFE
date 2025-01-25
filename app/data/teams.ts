class teamType {
  label: string;
  teamLocation: string;
  teamName: string;

  constructor(label: string, teamLocation: string, teamName: string) {
    this.label = label;
    this.teamLocation = teamLocation;
    this.teamName = teamName;
  }
}

export const teams = [
  new teamType("BUF", "Buffalo", "Bills"),
  new teamType("MIA", "Miami", "Dolphins"),
  new teamType("NYJ", "New York", "Jets"),
  new teamType("NE", "New England", "Patriots"),
  new teamType("CIN", "Cincinnati", "Bengals"),
  new teamType("CLE", "Cleveland", "Browns"),
  new teamType("BAL", "Baltimore", "Ravens"),
  new teamType("PIT", "Pittsberg", "Steelers"),
  new teamType("DEN", "Denver", "Broncos"),
  new teamType("LAC", "Los Angeles", "Chargers"),
  new teamType("KC", "Kansas City", "Chiefs"),
  new teamType("LV", "Las Vegas", "Raiders"),
  new teamType("IND", "Indianapolis", "Colts"),
  new teamType("JAX", "Jacksonville", "Jaguars"),
  new teamType("HOU", "Houston", "Texans"),
  new teamType("TEN", "Tennessee", "Titans"),
  new teamType("WAS", "Washington", "Commanders"),
  new teamType("DAL", "Dallas", "Cowboys"),
  new teamType("PHI", "Philadelphia", "Eagles"),
  new teamType("NYG", "New York", "Giants"),
  new teamType("CHI", "Chicago", "Bears"),
  new teamType("DET", "Detroit", "Lions"),
  new teamType("GB", "Green Bay", "Packers"),
  new teamType("MIN", "Minnesota", "Vikings"),
  new teamType("SF", "San Francisco", "49ers"),
  new teamType("ARI", "Arizona", "Cardinals"),
  new teamType("LAR", "Los Angeles", "Rams"),
  new teamType("SEA", "Seattle", "Seahawks"),
  new teamType("TB", "Tampa Bay", "Buccaneers"),
  new teamType("ATL", "Atlanta", "Falcons"),
  new teamType("CAR", "Carolina", "Panthers"),
  new teamType("NO", "New Orleans", "Saints"),
];
