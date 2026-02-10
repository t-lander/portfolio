import { nullable, number, object, string, type InferOutput } from "valibot";

/** A validation schema for rich text asset objects present when fetching Contentful data. */
export const richTextAssetSchema = object({
    sys: object({ id: string() }),
    contentType: string(),
    url: string(),
    title: string(),
    width: nullable(number()),
    height: nullable(number()),
    description: string(),
});

/** The inferred type of the RichTextAssetSchema. */
export type RichTextAsset = InferOutput<typeof richTextAssetSchema>;
