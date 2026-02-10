import Keywords from "@/lib/components/partials/keywords";
import Thumbnail from "@/lib/components/partials/thumbnail";
import Title from "@/lib/components/partials/title";
import { getAllArticles, getArticleBySlug, getRichTextOptions } from "@/lib/contentful";
import type { ArticlePreview } from "@/lib/schemas";
import { formatTimestamp } from "@/lib/utilities/temporal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document as RichTextDocument } from "@contentful/rich-text-types";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const articles = await getAllArticles();
    return articles.map((article: ArticlePreview) => {
        return { slug: article.slug };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);
    if (!article) notFound();
    return {
        title: `Thijs Lander - ${article.title}`,
        description: article.description,
        authors: [{ url: "https://thijslander.com", name: "Thijs Lander" }],
        keywords: article.keywords,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;

    // Redirect to 404 page if something goes wrong with fetching
    const article = await getArticleBySlug(slug);
    if (!article) notFound();

    const richText = documentToReactComponents(
        article.body.json as RichTextDocument,
        getRichTextOptions(article.body.links)
    );

    return (
        <div role="presentation" className="relative">
            <article>
                <header className="p-8 border-neutral-800 border-b border-dashed">
                    <div role="presentation" className="w-full max-w-prose mx-auto">
                        <div id="metadata" className="flex gap-4 mb-4">
                            <span className="flex flex-nowrap items-center gap-2 text-sm">
                                <PersonIcon aria-hidden={true} />
                                <span>Thijs Lander</span>
                            </span>
                            <span className="flex flex-nowrap items-center gap-2 text-sm">
                                <CalendarIcon aria-hidden={true} />
                                <time dateTime={article.sys.publishedAt}>
                                    {formatTimestamp(article.sys.publishedAt)}
                                </time>
                            </span>
                        </div>
                        <Title text={article.title} className="mb-8!" />
                        <Keywords keywords={article.keywords} className="mb-8" />
                        <Thumbnail data={article.thumbnail} />
                    </div>
                </header>
                <div role="presentation" className="p-8 pb-16 mx-auto">
                    <div role="presentation" className="prose prose-neutral prose-invert mx-auto">
                        {richText}
                    </div>
                </div>
            </article>
        </div>
    );
}
