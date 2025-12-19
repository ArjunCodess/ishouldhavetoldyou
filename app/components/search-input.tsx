"use client";

import { useState } from "react";

export function SearchInput({
  onSearchChange,
}: {
  onSearchChange: (value: string) => void;
}) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <input
      type="text"
      placeholder="search names..."
      value={search}
      onChange={handleChange}
      className="w-full px-4 py-2 border-b border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
    />
  );
}
