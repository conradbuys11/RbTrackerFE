import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "App.tsx"),
  route("/dataentryeweek", "./pages/DataEntryWeek.tsx"),
  route("/test", "./pages/Test.tsx"),
  route("/createyear", "./pages/CreateYear.tsx"),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
