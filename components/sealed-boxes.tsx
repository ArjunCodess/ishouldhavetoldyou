"use client";

import { useMemo } from "react";
import { Person } from "@/sanity/types";
import { RackSection } from "./rack";

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
    const groups: Record<
      string,
      { rack: NonNullable<Person["rack"]>; people: Person[] }
    > = {};

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
    const result: Array<{
      rack: NonNullable<Person["rack"]>;
      people: Person[];
    }> = [];
    const rackIds = new Set(
      people.filter((p) => p.rack).map((p) => p.rack!._id)
    );

    rackIds.forEach((rackId) => {
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
          <span className="block sm:inline">
            some things were meant for you.
          </span>
        </p>
      </div>

      {/* Rack System with Supporting Pillars */}
      <div className="relative w-full">
        {/* Supporting Pillars - positioned at exact edges of racks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none h-96">
          {/* Left Pillar - at left edge */}
          <div className="relative w-4">
            <div className="h-full bg-amber-900 border border-amber-800 rounded-t-sm shadow-md">
              <div className="absolute inset-0 bg-linear-to-b from-amber-800 to-amber-950 opacity-60"></div>
            </div>
            {/* Pillar base */}
            <div className="w-6 h-3 bg-amber-900 -ml-1 rounded-b-sm absolute -bottom-3 left-0"></div>
          </div>

          {/* Right Pillar - at right edge */}
          <div className="relative w-4">
            <div className="h-full bg-amber-900 border border-amber-800 rounded-t-sm shadow-md">
              <div className="absolute inset-0 bg-linear-to-b from-amber-800 to-amber-950 opacity-60"></div>
            </div>
            {/* Pillar base */}
            <div className="w-6 h-3 bg-amber-900 -mr-1 rounded-b-sm absolute -bottom-3 right-0"></div>
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
