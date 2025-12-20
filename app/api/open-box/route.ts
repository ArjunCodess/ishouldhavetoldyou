import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { validateAccessCode } from "@/lib/hash";
import { revalidatePath } from "next/cache";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

export async function POST(request: NextRequest) {
  try {
    const { slug, accessCode } = await request.json();

    if (!slug || !accessCode) {
      return NextResponse.json(
        { error: "slug and accessCode are required" },
        { status: 400 }
      );
    }

    const person = await writeClient.fetch(
      `*[_type == "person" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        accessCodeHash,
        opened
      }`,
      { slug }
    );

    if (!person) {
      return NextResponse.json({ error: "person not found" }, { status: 404 });
    }

    if (person.opened) {
      return NextResponse.json({ success: true, opened: true });
    }

    if (!validateAccessCode(accessCode, person.accessCodeHash)) {
      return NextResponse.json(
        { error: "invalid access code" },
        { status: 403 }
      );
    }

    await writeClient.patch(person._id).set({ opened: true }).commit();

    revalidatePath("/");

    return NextResponse.json({ success: true, opened: true });
  } catch (error) {
    console.error("Error opening box:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
