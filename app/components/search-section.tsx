"use client";

import { useState } from "react";
import { SearchInput } from "./search-input";
import { NameList } from "./name-list";
import type { Person } from "@/sanity/types";

export function SearchSection({ people }: { people: Person[] }) {
  const [search, setSearch] = useState("");

  const filteredNames = people.filter((item) =>
    item.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-600 mb-8">
        <SearchInput onSearchChange={setSearch} />
      </div>

      <div className="w-full space-y-4 mb-24">
        <NameList names={filteredNames} />
      </div>
    </>
  );
}
