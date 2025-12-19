import { getAllPeople, getMyStory } from "@/sanity/queries";
import { HomeClient } from "./home-client";

export default async function Home() {
  const [people, myStory] = await Promise.all([
    getAllPeople(),
    getMyStory(),
  ]);

  return <HomeClient people={people} myStory={myStory} />;
}
