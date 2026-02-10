import Title from "@/lib/components/partials/title";
import { merge } from "@/lib/utilities/tailwind";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    isTitleHidden?: boolean;
}

export default function Section({
    title,
    isTitleHidden = false,
    children,
    className,
    ...props
}: Props) {
    return (
        <section className={merge("border-neutral-800 p-8 py-16", className)} {...props}>
            <div
                role="presentation"
                className="w-full max-w-prose prose-neutral prose-invert mx-auto"
            >
                <Title text={title} className={merge("mb-4", { "sr-only": isTitleHidden })} />
                {children}
            </div>
        </section>
    );
}
