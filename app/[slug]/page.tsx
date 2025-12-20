import type { Metadata } from "next";
import Link from "next/link";
import Markdown from "react-markdown";
import { getPersonBySlug } from "@/sanity/queries";
import { GateClient } from "./gate-client";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);

  const title = person ? slug : "page not found";
  const description = person?.description || "a personal archive";

  return {
    title,
    description,
    icons: {
      icon: "/logo.png",
    },
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

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
          <h1 className="text-2xl text-black lowercase mb-4">page not found</h1>
          <Link
            href="/"
            className="text-sm text-neutral-500 hover:text-black transition-colors"
          >
            ← back home
          </Link>
        </div>
      </main>
    );
  }

  return <GateClient person={person} />;
}
