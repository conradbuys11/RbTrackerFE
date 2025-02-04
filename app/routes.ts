import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/createyear", "pages/CreateYear.tsx"),
  route("/createyearweeks", "pages/CreateYearWeeks.tsx"),
  route("/year/:yearId", "pages/ViewYear.tsx"),
  route("/week/:weekId", "pages/ViewWeek.tsx"),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
