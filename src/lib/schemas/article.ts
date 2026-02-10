import { array, nullable, number, object, omit, string, unknown, type InferOutput } from "valibot";
import { richTextAssetSchema } from "@/lib/schemas/contentful";

/** A validation schema for Article data. */
export const articleSchema = object({
    title: string(),
    slug: string(),
    thumbnail: nullable(
        object({
            url: string(),
            description: string(),
            width: nullable(number()),
            height: nullable(number()),
        })
    ),
    description: string(),
    body: object({
        json: unknown(),
        links: object({
            assets: object({
                block: array(richTextAssetSchema),
            }),
        }),
    }),
    keywords: array(string()),
    sys: object({
        publishedAt: string(),
    }),
});

/** A validation schema for article with the content omitted. Useful for content previews. */
export const articlePreviewSchema = omit(articleSchema, ["body"]);

/** The inferred type of the article schema. */
export type Article = InferOutput<typeof articleSchema>;

/** The inferred type of the article preview schema. */
export type ArticlePreview = InferOutput<typeof articlePreviewSchema>;
