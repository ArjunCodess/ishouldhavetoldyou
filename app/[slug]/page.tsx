import Link from "next/link";
import Markdown from "react-markdown";
import { getPersonBySlug } from "@/sanity/queries";

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

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const person = await getPersonBySlug(slug);

  if (!person) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center">
          <h1 className="text-2xl text-black lowercase mb-4">
            page not found
          </h1>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            ← back home
          </Link>
        </div>
      </main>
    );
  }

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
            {slug}
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
        <div className="text-center">
          <p className="text-xs text-gray-400 italic">
            a chapter of my life.
          </p>
        </div>
      </div>
    </main>
  );
}
