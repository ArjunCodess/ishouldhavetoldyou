import Link from "next/link";

export function NameList({ names }: { names: Array<{ slug: string }> }) {
  if (names.length === 0) {
    return (
      <p className="text-center text-gray-400 lowercase">no names found</p>
    );
  }

  return (
    <>
      {names.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="block text-lg text-black lowercase hover:text-gray-500 transition-colors duration-200"
        >
          {item.slug}
        </Link>
      ))}
    </>
  );
}
