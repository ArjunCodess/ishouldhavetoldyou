"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Person } from "@/sanity/types";

interface RackSectionProps {
  rack: NonNullable<Person["rack"]>;
  people: Person[];
  openedBoxesSet: Set<string>;
}

export function RackSection({
  rack,
  people,
  openedBoxesSet,
}: RackSectionProps) {
  // Create array of 5 positions, fill with people by their position, leave empty slots
  const rackPositions = useMemo(() => {
    const positions: (Person | null)[] = new Array(5).fill(null);

    people.forEach((person) => {
      const position = person.position;
      if (position >= 1 && position <= 5) {
        positions[position - 1] = person; // position 1 = index 0
      }
    });

    return positions;
  }, [people]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Rack Shelf with Title */}
      <div className="relative w-full h-22 bg-amber-900 border-2 border-amber-800 rounded-sm shadow-lg px-4 sm:px-6">
        {/* Rack shelf appearance with wood-like texture */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-800 to-amber-900 opacity-50"></div>
        <div className="absolute inset-x-0 top-0 h-1 bg-amber-700 rounded-t-sm"></div>

        {/* Rack Title at the bottom of the shelf */}
        <div className="absolute inset-0 flex items-end justify-center pb-[0.3rem]">
          <div className="flex items-center w-full justify-center">
            <span className="flex-1 h-px bg-amber-600 opacity-70 mr-3" />
            <h2 className="text-sm font-normal text-amber-100 lowercase opacity-90 pointer-events-none z-10 whitespace-nowrap">
              {rack.title}
            </h2>
            <span className="flex-1 h-px bg-amber-600 opacity-70 ml-3" />
          </div>
        </div>

        {/* Boxes positioned on the rack */}
        <div className="absolute inset-x-4 sm:inset-x-6 inset-y-0 flex items-end pb-7">
          {rackPositions.map((person, index) => (
            <div key={index} className="flex-1 flex justify-center">
              {person && (
                <BoxItem
                  person={person}
                  isOpened={openedBoxesSet.has(person.slug)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BoxItemProps {
  person: Person;
  isOpened: boolean;
}

function BoxItem({ person, isOpened }: BoxItemProps) {
  if (isOpened) {
    return (
      <Link
        href={`/${person.slug}`}
        className="flex flex-col items-center group cursor-pointer transition-opacity hover:opacity-90"
      >
        <p className="text-sm text-black lowercase">{person.slug}</p>
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-[0.08rem]">
          <Image
            src="/opened-box.svg"
            alt="opened box"
            fill
            className="object-contain"
          />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${person.slug}`}
      className="flex flex-col items-center group cursor-pointer transition-opacity hover:opacity-90"
    >
      <p className="text-sm text-black lowercase">{person.slug}</p>
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <Image
          src="/closed-box.svg"
          alt="closed box"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
