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

  const boxesPerRow = 3;
  const totalBoxes = people.length;
  const fullRows = Math.floor(totalBoxes / boxesPerRow);
  const remainingBoxes = totalBoxes % boxesPerRow;

  return (
    <>
      <div className="text-center mb-8 sm:mb-12">
        <p className="text-sm sm:text-base text-neutral-600 italic px-4">
          some things were kept safe. some things were meant for you.
        </p>
      </div>

      <div className="w-full">
        {Array.from({ length: fullRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center gap-4 sm:gap-8 mb-6 sm:mb-8"
          >
            {people
              .slice(rowIndex * boxesPerRow, (rowIndex + 1) * boxesPerRow)
              .map((person) => (
                <BoxItem
                  key={person.slug}
                  person={person}
                  isOpened={openedBoxesSet.has(person.slug)}
                />
              ))}
          </div>
        ))}

        {remainingBoxes > 0 && (
          <div className="flex justify-center gap-4 sm:gap-8">
            {people
              .slice(fullRows * boxesPerRow)
              .map((person) => (
                <BoxItem
                  key={person.slug}
                  person={person}
                  isOpened={openedBoxesSet.has(person.slug)}
                />
              ))}
          </div>
        )}
      </div>
    </>
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
        className="flex flex-col items-center group cursor-pointer transition-opacity hover:opacity-80"
      >
        <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-3">
          <Image
            src="/opened-box.png"
            alt="opened box"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-xs sm:text-sm text-black lowercase">{person.slug}</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/${person.slug}`}
      className="flex flex-col items-center group cursor-pointer transition-opacity hover:opacity-80"
    >
      <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-2 sm:mb-3">
        <Image
          src="/closed-box.png"
          alt="closed box"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-xs sm:text-sm text-black lowercase">{person.slug}</p>
    </Link>
  );
}
