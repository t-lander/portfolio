import { getAllArticles } from "@/lib/contentful";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getAllArticles();
    const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `https://thijslander.com/articles/${article.slug}`,
        lastModified: new Date(article.sys.publishedAt),
        changeFrequency: "monthly",
        priority: 1,
    }));

    return [
        {
            url: "https://thijslander.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://thijslander.com/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://thijslander.com/articles",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        ...articleEntries,
    ];
}
