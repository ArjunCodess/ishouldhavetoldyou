import { sanityFetch } from "./client";
import { Person, MyStory } from "./types";

export async function getAllPeople(): Promise<Person[]> {
  try {
    const result = await sanityFetch<Person[]>({
      query: `*[_type == "person"] | order(slug.current asc) {
        "slug": slug.current,
        description,
        letter
      }`,
      tags: ["person"],
    });
    return result || [];
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
}

export async function getPersonBySlug(slug: string): Promise<Person | null> {
  try {
    const result = await sanityFetch<Person | null>({
      query: `*[_type == "person" && slug.current == $slug][0] {
        "slug": slug.current,
        description,
        letter
      }`,
      params: { slug },
      tags: ["person"],
    });

    return result || null;
  } catch (error) {
    console.error("Error fetching person by slug:", slug, error);
    return null;
  }
}

export async function getMyStory(): Promise<MyStory | null> {
  try {
    const result = await sanityFetch<MyStory | null>({
      query: `*[_type == "myStory"][0] {
        content
      }`,
      tags: ["myStory"],
    });

    return result || null;
  } catch (error) {
    console.error("Error fetching myStory:", error);
    return null;
  }
}
