import { createClient } from "@sanity/client";
import { cache } from "react";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const sanityFetch = cache(
  async <T>({
    query,
    params = {},
    tags,
  }: {
    query: string;
    params?: Record<string, unknown>;
    tags?: string[];
  }): Promise<T> => {
    return client.fetch<T>(query, params, {
      next: {
        revalidate: 0,
        tags,
      },
    });
  }
);
