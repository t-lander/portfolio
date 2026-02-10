import Featured from "@/lib/components/layouts/featured";
import Hero from "@/lib/components/layouts/hero";
import Filler from "@/lib/components/partials/filler";
import { getLatestArticle } from "@/lib/contentful";

export default async function RootPage() {
    const article = await getLatestArticle();

    return (
        <>
            <Hero />
            <Filler className="border-b" />
            <Featured article={article} />
        </>
    );
}
