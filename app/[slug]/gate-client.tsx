"use client";

import { useState, useRef, useEffect } from "react";
import { Gate } from "@/components/gate";
import { ScrollProgress } from "@/components/scroll-progress";
import { Confetti, type ConfettiRef } from "@/components/confetti";
import Link from "next/link";
import Markdown from "react-markdown";

const markdownComponents = {
  p: ({ ...props }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4" {...props} />
  ),
  strong: ({ ...props }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold" {...props} />
  ),
  em: ({ ...props }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic" {...props} />
  ),
  blockquote: ({ ...props }: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-4 border-neutral-300 pl-4 italic text-neutral-600"
      {...props}
    />
  ),
};

function LetterContent({
  person,
  isReturningUser,
}: {
  person: any;
  isReturningUser: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    if (!isReturningUser) {
      confettiRef.current?.fire({});
    }
  }, [isReturningUser]);

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-0 size-full"
        options={{
          particleCount: 200,
          spread: 270,
          gravity: 0.5,
          decay: 0.94,
          startVelocity: 20,
        }}
        manualstart
      />
      <div
        className="h-screen overflow-auto px-4 py-16 relative z-10"
        ref={containerRef}
      >
        <div className="pointer-events-none fixed left-0 top-0 w-full z-10">
          <div className="absolute left-0 top-0 h-0.5 w-full bg-neutral-200" />
          <ScrollProgress
            className="absolute top-0 h-0.5 bg-[linear-gradient(to_right,rgba(0,0,0,0),#111111_75%,#111111_100%)]"
            containerRef={containerRef}
            springOptions={{
              stiffness: 280,
              damping: 18,
              mass: 0.3,
            }}
          />
        </div>

        <div className="w-full max-w-xl mx-auto flex flex-col">
          <div className="flex justify-start mb-8">
            <Link
              href="/"
              className="text-sm text-neutral-600 hover:text-black transition-colors"
            >
              ← back
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-normal text-black lowercase mb-4">
              {person.slug}
            </h1>
            {person.description && (
              <p className="text-base text-neutral-600 italic mb-8">
                {person.description}
              </p>
            )}
            <div className="w-12 h-px bg-neutral-300 mx-auto mb-8"></div>
          </div>

          <div className="mb-20 text-base text-neutral-700 leading-relaxed space-y-4">
            <Markdown components={markdownComponents}>{person.letter}</Markdown>
          </div>

          <div className="flex-1"></div>

          <div className="text-center space-y-2 pb-8">
            <p className="text-xs text-neutral-500 italic">
              a chapter of my life.
            </p>
            <p className="text-xs text-neutral-500">
              last updated{" "}
              {new Date(person._updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

interface GateClientProps {
  person: any;
}

function generateValidationToken(slug: string, timestamp: number): string {
  const data = `${slug}:${timestamp}:ishouldhavetoldyou`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function isValidationExpired(validatedAt: number): boolean {
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;
  return now - validatedAt > twentyFourHours;
}

export function GateClient({ person }: GateClientProps) {
  const [isValidated, setIsValidated] = useState(false);
  const [isReturningUser, setIsReturningUser] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("access_validation");
    if (stored) {
      try {
        const validation = JSON.parse(stored);
        if (
          validation.slug === person.slug &&
          validation.token ===
            generateValidationToken(person.slug, validation.validatedAt) &&
          !isValidationExpired(validation.validatedAt)
        ) {
          setIsValidated(true);
          setIsReturningUser(true);
        }
      } catch (error) {
        localStorage.removeItem("access_validation");
      }
    }
  }, [person.slug]);

  const handleValidCode = () => {
    const now = Date.now();
    const validationData = {
      slug: person.slug,
      validatedAt: now,
      token: generateValidationToken(person.slug, now),
    };
    localStorage.setItem("access_validation", JSON.stringify(validationData));
    setIsValidated(true);
    setIsReturningUser(false);
  };

  if (!isValidated) {
    return (
      <Gate
        slug={person.slug}
        accessCodeHash={person.accessCodeHash}
        onValidCode={handleValidCode}
      />
    );
  }

  return <LetterContent person={person} isReturningUser={isReturningUser} />;
}
