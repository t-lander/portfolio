import Audio from "@/lib/components/partials/audio";
import Picture from "@/lib/components/partials/picture";
import Video from "@/lib/components/partials/video";
import { type RichTextAsset, richTextAssetSchema } from "@/lib/schemas";
import { BLOCKS, type Node as RichTextNode } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { parse } from "valibot";

/** An object present when fetching Contentful data with assets. */
type Links = {
    assets: {
        block: RichTextAsset[];
    };
};

/**
 * Get a rich text configuration that determines how rich text is rendered.
 * @param links - The object present in Contentful data (when fetching data with assets).
 * @returns A rich text options object.
 */
export function getRichTextOptions(links: Links) {
    const assetMap = new Map();
    for (const asset of links.assets.block) {
        assetMap.set(asset.sys.id, asset);
    }

    return {
        renderText: (text: string) => {
            const lines = text.split("\n");
            const result: ReactNode[] = [];

            lines.forEach((line, index) => {
                if (index > 0) {
                    result.push(<br key={`${index}-${line}`} />);
                }

                result.push(line);
            });

            return result;
        },
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: RichTextNode) => {
                const asset = parse(richTextAssetSchema, assetMap.get(node.data.target.sys.id));

                if (asset.contentType.includes("image")) {
                    if (!asset.width || !asset.height) {
                        throw new Error("Received image without dimensions.");
                    }
                    return (
                        <Picture
                            src={asset.url}
                            title={asset.title}
                            description={asset.description}
                            width={asset.width}
                            height={asset.height}
                        />
                    );
                }

                if (asset.contentType.includes("video")) {
                    return <Video src={asset.url} description={asset.description} />;
                }

                if (asset.contentType.includes("audio")) {
                    return <Audio src={asset.url} description={asset.description} />;
                }

                // Unsupported media
                return null;
            },
        },
    };
}
