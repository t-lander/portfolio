"use client";

import Thumbnail from "@/lib/components/partials/thumbnail";
import { Article } from "@/lib/schemas";
import Link from "next/link";
import { useId } from "react";
import Keywords from "@/lib/components/partials/keywords";
import Title from "@/lib/components/partials/title";

interface Props {
    article: Article;
}

export default function Featured({ article }: Props) {
    const id = useId();

    return (
        <section aria-labelledby={`featured-heading-${id}`} className="w-full px-8 mb-4">
            <div role="presentation" className="py-16 w-full max-w-4xl mx-auto">
                <Title id={`featured-heading-${id}`} text="Latest article" className="mb-8"></Title>
                <div role="presentation" className="flex flex-nowrap flex-col md:flex-row gap-8">
                    <Thumbnail data={article.thumbnail} className="md:max-w-2/3" />
                    <div
                        id={`metadata-panel-${id}`}
                        className="flex flex-col flex-nowrap justify-between"
                    >
                        <div role="presentation">
                            <h2 className="font-bold text-white text-2xl mb-4">{article.title}</h2>
                            <Keywords keywords={article.keywords} className="mb-8" />
                        </div>
                        <Link href={`/articles/${article.slug}`} className="button-secondary">
                            Read now
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
