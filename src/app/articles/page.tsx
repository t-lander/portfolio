import Keywords from "@/lib/components/partials/keywords";
import Thumbnail from "@/lib/components/partials/thumbnail";
import Title from "@/lib/components/partials/title";
import { getAllArticles } from "@/lib/contentful";
import { formatTimestamp } from "@/lib/utilities/temporal";
import { ArrowRightIcon, CalendarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default async function ArticlesPage() {
    const articles = await getAllArticles();

    return (
        <>
            <header className="border-neutral-800 border-b border-dashed p-8 py-16">
                <div role="presentation" className="w-full max-w-prose mx-auto">
                    <Title id="articles-heading" text="Articles" />
                    <p>A collection of projects, learnings and thoughts.</p>
                </div>
            </header>
            <ul className="p-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
                {articles.map((article) => {
                    return (
                        <li key={article.slug} className="contents">
                            <Link
                                href={`/articles/${article.slug}`}
                                className="group grid grid-rows-subgrid gap-0 row-span-5 border-neutral-800 border rounded p-4"
                            >
                                <Thumbnail data={article.thumbnail} className="mb-8" />
                                <div className="flex flex-nowrap items-center gap-2 text-sm px-2 mb-2">
                                    <CalendarIcon aria-hidden={true} />
                                    <time dateTime={article.sys.publishedAt}>
                                        {formatTimestamp(article.sys.publishedAt)}
                                    </time>
                                </div>
                                <h1 className="text-white font-bold text-xl px-2 mb-4">
                                    {article.title}
                                </h1>
                                <Keywords keywords={article.keywords} />
                                <div
                                    role="presentation"
                                    className="flex flex-nowrap justify-end items-center"
                                >
                                    <figure
                                        aria-label="Read more"
                                        className="center rounded-full group-hover:border-white border-neutral-800 border size-8"
                                    >
                                        <ArrowRightIcon
                                            aria-hidden={true}
                                            className="group-hover:text-white"
                                        />
                                    </figure>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
