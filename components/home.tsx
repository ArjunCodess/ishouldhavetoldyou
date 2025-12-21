import { getAllPeople, getMyStory } from "@/sanity/queries";
import Markdown from "react-markdown";
import { SealedBoxes } from "./sealed-boxes";

const markdownComponents = {
  p: ({ children }: React.ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4">{children}</p>
  ),
  strong: ({ children }: React.ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: React.ComponentPropsWithoutRef<"em">) => (
    <em className="italic">{children}</em>
  ),
};

export default async function Home() {
  const [people, myStory] = await Promise.all([getAllPeople(), getMyStory()]);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-between py-8 sm:py-16 px-4">
      <div className="w-full max-w-xl flex-1 flex flex-col items-center">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-2xl sm:text-4xl font-normal mb-3 text-black lowercase">
            i should have told you.
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 italic">
            i wrote what i never had the courage to say.
          </p>
        </div>

        <div className="w-full mb-8 sm:mb-12">
          <details className="w-full">
            <summary className="text-base sm:text-lg text-black lowercase cursor-pointer hover:text-neutral-500 transition-colors mb-4">
              why i made this site
            </summary>
            <div className="text-left space-y-5 text-sm sm:text-base text-neutral-800 leading-relaxed mt-6">
              <Markdown components={markdownComponents}>
                {myStory?.content || ""}
              </Markdown>
            </div>
          </details>
        </div>

        <div className="w-full mb-12 sm:mb-24">
          <SealedBoxes people={people} />
        </div>

        <div className="text-center">
          <p className="text-xs text-neutral-400 italic">
            i made this because i felt too much and said too little.
          </p>
        </div>
      </div>
    </main>
  );
}
