import Image from "next/image";
import Link from "next/link";

export function NameList({ names }: { names: Array<{ slug: string }> }) {
  if (names.length === 0) {
    return (
      <p className="text-center text-neutral-400 lowercase">no names found</p>
    );
  }

  return (
    <>
      {names.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="flex items-center text-lg text-black lowercase hover:text-neutral-500 transition-colors duration-200 group"
        >
          <span>{item.slug}</span>
          <hr className="flex-1 ml-4 border-t border-neutral-300 group-hover:border-black transition-colors duration-200" />
          <Image
            src="/arrow-right.svg"
            alt="arrow right"
            className="ml-3 w-5 h-5 group-hover:opacity-100 opacity-30 transition-all duration-200"
            width={20}
            height={20}
          />
        </Link>
      ))}
    </>
  );
}
