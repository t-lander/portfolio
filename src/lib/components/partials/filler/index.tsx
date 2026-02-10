import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Filler({ className, ...props }: Props) {
    return (
        <div
            role="presentation"
            className={`size-full min-w-16 min-h-16 border-neutral-800 bg-stripes ${className}`}
            {...props}
        />
    );
}
