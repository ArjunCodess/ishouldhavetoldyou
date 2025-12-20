import type { Metadata } from "next";
import Home from "@/components/home";

export const metadata: Metadata = {
  title: "i should have told you",
  description: "a personal archive",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "i should have told you",
    description: "a personal archive",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "i should have told you",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "i should have told you",
    description: "a personal archive",
    images: ["/og.png"],
  },
};

export default function RootPage() {
  return <Home />;
}
