import Puzzle from "@/lib/components/partials/puzzle";
import Title from "@/lib/components/partials/title";
import { merge } from "@/lib/utilities/tailwind";
import Link from "next/link";
import Intro from "@/content/intro.md";
import { parseMarkdown } from "@/lib/markdown";
import Markdown from "react-markdown";

export default function Hero() {
    const intro = parseMarkdown(Intro);

    return (
        <section
            aria-labelledby="hero-heading"
            className={merge(
                "hero-section",
                "flex flex-col border-neutral-800 border-b",
                "lg:flex-row-reverse"
            )}
        >
            <div className="info-panel flex-1 px-8 py-16 lg:px-16 lg:min-h-64 flex flex-col justify-between">
                <div role="presentation">
                    <Title id="hero-heading" text="Thijs Lander" />
                    <div role="presentation" className="max-w-prose mb-32">
                        <Markdown>{intro.content}</Markdown>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href="/about" className="button-primary">
                        More about me
                    </Link>
                    <Link href="/articles" className="button-secondary">
                        Read my articles
                    </Link>
                </div>
            </div>
            <div
                className={merge(
                    "puzzle-panel",
                    "flex-1 p-16 flex justify-center items-center",
                    "border-neutral-800 border-t lg:border-t-0 lg:border-r bg-dots"
                )}
            >
                <Puzzle />
            </div>
        </section>
    );
}
