import { sanityFetch } from "./client";
import { Person, MyStory, Rack } from "@/sanity/types";

export async function getAllPeople(): Promise<Person[]> {
  try {
    const result = await sanityFetch<Person[]>({
      query: `*[_type == "person"] | order(rack._ref asc, position asc, slug.current asc) {
        "slug": slug.current,
        description,
        letter,
        opened,
        position,
        rack->{
          _id,
          title,
          description
        }
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
        letter,
        _updatedAt,
        accessCodeHash,
        opened,
        position,
        rack->{
          _id,
          title,
          description
        }
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

export async function getAllRacks(): Promise<Rack[]> {
  try {
    const result = await sanityFetch<Rack[]>({
      query: `*[_type == "rack"] | order(_createdAt asc) {
        _id,
        title,
        description
      }`,
      tags: ["rack"],
    });
    return result || [];
  } catch (error) {
    console.error("Error fetching racks:", error);
    return [];
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
