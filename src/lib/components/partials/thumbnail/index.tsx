import Image from "next/image";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    data: {
        url: string;
        description: string;
        width: number | null;
        height: number | null;
    } | null;
}

export default function Thumbnail({ data, className }: Props) {
    return (
        <figure
            aria-label="thumbnail"
            className={`relative bg-stripes w-full aspect-3/2 overflow-hidden rounded border-neutral-800 border ${className}`}
        >
            {data ? (
                <Image
                    fill
                    src={data?.url}
                    alt={data?.description}
                    style={{ objectFit: "cover" }}
                    loading={"eager"}
                    sizes="800px"
                    className="h-32 rounded"
                />
            ) : null}
        </figure>
    );
}
