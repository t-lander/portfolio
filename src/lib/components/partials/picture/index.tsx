import Image from "next/image";

type Props = {
    src: string;
    title: string;
    description: string;
    width: number;
    height: number;
};

export default function Picture({ src, title, description, width, height }: Props) {
    return (
        <figure className="relative not-prose py-8">
            <div role="presentation" className="overflow-hidden rounded flex aspect-auto">
                <Image src={src} alt={description} width={width} height={height} />
            </div>
            <figcaption className="font-code text-sm text-neutral-400 mt-2">{title}</figcaption>
        </figure>
    );
}
