"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import { SearchInput } from "./search-input";
import { NameList } from "./name-list";
import type { Person, MyStory } from "@/lib/sanity/types";

const markdownComponents = {
  p: ({ children }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4">{children}</p>
  ),
  strong: ({ children }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic">{children}</em>
  ),
};

export function HomeClient({
  people,
  myStory,
}: {
  people: Person[];
  myStory: MyStory | null;
}) {
  const [search, setSearch] = useState("");

  const filteredNames = people.filter((item) =>
    item.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between py-16 px-4">
      <div className="w-full max-w-xl flex-1 flex flex-col items-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-normal mb-3 text-black lowercase">
            i should have told you.
          </h1>
          <p className="text-base text-gray-600 italic">
            i wrote what i never had the courage to say.
          </p>
        </div>

        <div className="w-full mb-12">
          <details className="w-full">
            <summary className="text-lg text-black lowercase cursor-pointer hover:text-gray-500 transition-colors mb-4">
              why i made this site
            </summary>
            <div className="text-left space-y-5 text-gray-800 leading-relaxed mt-6">
              <Markdown components={markdownComponents}>
                {myStory?.content || ""}
              </Markdown>
            </div>
          </details>
        </div>

        <div className="w-full max-w-600 mb-8">
          <SearchInput onSearchChange={setSearch} />
        </div>

        <div className="w-full space-y-4 mb-24">
          <NameList names={filteredNames} />
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-400 italic">
          i made this because i felt too much and said too little.
        </p>
      </div>
    </main>
  );
}
