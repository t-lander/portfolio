import {
    type Article,
    type ArticlePreview,
    articlePreviewSchema,
    articleSchema,
} from "@/lib/schemas";
import { cacheLife, cacheTag } from "next/cache";
import { array, object, parse, union } from "valibot";
import { fetchContentfulData } from "./fetch";
import GetAllArticlesQuery from "./queries/get-all-articles.graphql";
import GetArticleBySlugQuery from "./queries/get-article-by-slug.graphql";
import GetLatestArticleQuery from "./queries/get-latest-article.graphql";

/** A validation schema for the format of a Contentful response. */
const responseSchema = object({
    data: object({
        articleCollection: object({
            items: array(union([articleSchema, articlePreviewSchema])),
        }),
    }),
});

/**
 * Get all articles from the Contentful server.
 * @returns An array of article data (stripped of data not needed for previews).
 */
export async function getAllArticles(): Promise<ArticlePreview[]> {
    "use cache";
    cacheTag("article");
    cacheLife("max");

    const data = await fetchContentfulData(GetAllArticlesQuery, {});
    const result = parse(responseSchema, data);
    return result.data.articleCollection.items.map((article: ArticlePreview) => {
        return article;
    });
}

/**
 * Get a specific article by slug from the Contentful server.
 * @param slug - The slug of the article.
 * @returns An object containing article data.
 */
export async function getArticleBySlug(slug: string): Promise<Article> {
    "use cache";
    cacheTag("article");
    cacheLife("max");

    const data = await fetchContentfulData(GetArticleBySlugQuery, { slug });
    const result = parse(responseSchema, data);
    return result.data.articleCollection.items[0] as Article;
}

/**
 * Get the latest article from the Contentful server.
 * @returns An object containing article data.
 */
export async function getLatestArticle(): Promise<Article> {
    "use cache";
    cacheTag("article");
    cacheLife("max");

    const data = await fetchContentfulData(GetLatestArticleQuery, {});
    const result = parse(responseSchema, data);
    return result.data.articleCollection.items[0] as Article;
}
