"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Person } from "@/sanity/types";
import Link from "next/link";

interface SealedBoxesProps {
  people: Person[];
}

export function SealedBoxes({ people }: SealedBoxesProps) {
  const openedBoxesSet = useMemo(
    () => new Set(people.filter((p) => p.opened).map((p) => p.slug)),
    [people]
  );

  // Group people by rack only - no unassigned category
  const groupedPeople = useMemo(() => {
    const groups: Record<string, { rack: NonNullable<Person['rack']>, people: Person[] }> = {};

    people.forEach((person) => {
      if (person.rack) {
        const rackId = person.rack._id;
        if (!groups[rackId]) {
          groups[rackId] = { rack: person.rack, people: [] };
        }
        groups[rackId].people.push(person);
      }
    });

    // Convert to array in the order they appear in people array (already sorted by rack)
    const result: Array<{ rack: NonNullable<Person['rack']>, people: Person[] }> = [];
    const rackIds = new Set(people.filter(p => p.rack).map(p => p.rack!._id));

    rackIds.forEach(rackId => {
      const rackGroup = groups[rackId];
      if (rackGroup && rackGroup.people.length > 0) {
        result.push(rackGroup);
      }
    });

    return result;
  }, [people]);

  return (
    <>
      <div className="text-center mb-20 sm:mb-24">
        <p className="text-sm sm:text-base text-neutral-600 italic px-4">
          <span className="block sm:inline">some things were kept safe.</span>{" "}
          <span className="block sm:inline">some things were meant for you.</span>
        </p>
      </div>

      {/* Rack System with Supporting Pillars */}
      <div className="relative w-full">
        {/* Supporting Pillars - positioned at exact edges of racks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none h-96">
            {/* Left Pillar - at left edge */}
            <div className="relative w-4">
              <div className="h-full bg-amber-800 border border-amber-700 rounded-t-sm shadow-md">
                <div className="absolute inset-0 bg-linear-to-b from-amber-700 to-amber-900 opacity-60"></div>
              </div>
              {/* Pillar base */}
              <div className="w-6 h-3 bg-amber-800 -ml-1 rounded-b-sm absolute -bottom-3 left-0"></div>
            </div>

            {/* Right Pillar - at right edge */}
            <div className="relative w-4">
              <div className="h-full bg-amber-800 border border-amber-700 rounded-t-sm shadow-md">
                <div className="absolute inset-0 bg-linear-to-b from-amber-700 to-amber-900 opacity-60"></div>
              </div>
              {/* Pillar base */}
              <div className="w-6 h-3 bg-amber-800 -mr-1 rounded-b-sm absolute -bottom-3 right-0"></div>
            </div>
          </div>

        {/* Racks positioned over the pillars */}
        <div className="relative space-y-16 sm:space-y-20 z-10">
          {groupedPeople.map((group) => (
            <RackSection
              key={group.rack._id}
              rack={group.rack}
              people={group.people}
              openedBoxesSet={openedBoxesSet}
            />
          ))}
        </div>
      </div>
    </>
  );
}

interface RackSectionProps {
  rack: NonNullable<Person['rack']>;
  people: Person[];
  openedBoxesSet: Set<string>;
}

function RackSection({ rack, people, openedBoxesSet }: RackSectionProps) {
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
        <div className="absolute inset-0 flex items-end justify-center">
          <h2 className="text-base font-normal text-amber-100 lowercase opacity-90 pointer-events-none z-10">
            {rack.title}
          </h2>
        </div>

        {/* Boxes positioned on the rack */}
        <div className="absolute inset-x-4 sm:inset-x-6 inset-y-0 flex items-end pb-6">
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
        <div className="relative w-[5.28rem] h-[5.28rem] sm:w-[6.6rem] sm:h-[6.6rem]">
          <Image
            src="/opened-box.png"
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
      <div className="relative w-[5.28rem] h-[5.28rem] sm:w-[6.6rem] sm:h-[6.6rem]">
        <Image
          src="/closed-box.png"
          alt="closed box"
          fill
          className="object-contain"
        />
      </div>
    </Link>
  );
}
