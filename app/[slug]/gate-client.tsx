'use client';

import { useState } from 'react';
import { Gate } from '@/components/gate';
import Link from 'next/link';
import Markdown from 'react-markdown';

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
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
      {...props}
    />
  ),
};

function LetterContent({ person }: { person: any }) {
  return (
    <main className="min-h-screen bg-white flex flex-col py-16 px-4">
      <div className="w-full max-w-xl mx-auto flex flex-col">
        <div className="flex justify-start mb-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition-colors"
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
            <p className="text-base text-gray-600 italic mb-8">
              {person.description}
            </p>
          )}
          <div className="w-12 h-px bg-gray-300 mx-auto mb-8"></div>
        </div>

        <div className="mb-20 text-base text-gray-700 leading-relaxed space-y-4">
          <Markdown components={markdownComponents}>{person.letter}</Markdown>
        </div>

        <div className="flex-1"></div>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-400 italic">a chapter of my life.</p>
          <p className="text-xs text-gray-400">
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
    </main>
  );
}

interface GateClientProps {
  person: any;
}

export function GateClient({ person }: GateClientProps) {
  const [isValidated, setIsValidated] = useState(false);

  if (!isValidated) {
    return (
      <Gate
        slug={person.slug}
        accessCodeHash={person.accessCodeHash}
        onValidCode={() => setIsValidated(true)}
      />
    );
  }

  return <LetterContent person={person} />;
}
