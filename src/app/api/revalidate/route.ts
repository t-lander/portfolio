import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Webhook triggered by Contentful to clear cache and rebuild pages
export async function POST(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const token = requestHeaders.get("Authorization");

    if (token !== process.env.CACHE_REVALIDATION_TOKEN) {
        return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }

    revalidateTag("article", "max");
    revalidateTag("education", "max");
    revalidateTag("experience", "max");

    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 });
}
