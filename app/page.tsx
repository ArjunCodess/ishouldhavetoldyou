"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import { people, myStory } from "./data";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredNames = useMemo(() => {
    return people.filter((item) =>
      item.slug.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
              <Markdown
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                }}
              >
                {myStory}
              </Markdown>
            </div>
          </details>
        </div>

        <div className="w-full max-w-600 mb-8">
          <input
            type="text"
            placeholder="search names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border-b border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
          />
        </div>

        <div className="w-full space-y-4 mb-24">
          {filteredNames.length > 0 ? (
            filteredNames.map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="block text-lg text-black lowercase hover:text-gray-500 transition-colors duration-200"
              >
                {item.slug}
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 lowercase">
              no names found
            </p>
          )}
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
