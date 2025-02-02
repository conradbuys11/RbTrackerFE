import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { getYears } from "~/db/dbFuncs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function clientLoader() {
  const years = await getYears();
  return { years };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { years } = loaderData;
  return <Welcome years={years} />;
}
