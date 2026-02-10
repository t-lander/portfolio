"use client";

import { merge } from "@/lib/utilities/tailwind";
import { motion, useInView } from "motion/react";
import { HTMLAttributes, useId, useRef } from "react";

interface Props extends HTMLAttributes<HTMLUListElement> {
    keywords: string[];
}

export default function Keywords({ keywords, className, ...props }: Props) {
    const id = useId();
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <ul
            ref={ref}
            className={merge("size-full flex flex-wrap gap-2 content-start", className)}
            {...props}
        >
            {keywords.map((keyword, index) => {
                return (
                    <motion.li
                        key={`${id}-${keyword}-${index}`}
                        initial={{
                            opacity: 0,
                            y: 4,
                        }}
                        animate={{
                            opacity: isInView ? 1 : 0,
                            y: isInView ? 0 : 4,
                        }}
                        transition={{ delay: isInView ? 0.1 * index : 0 }}
                        className="size-fit p-2 px-4 border-neutral-800 border rounded-full text-xs uppercase font-semibold"
                    >
                        {keyword}
                    </motion.li>
                );
            })}
        </ul>
    );
}
