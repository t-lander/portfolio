"use client";

import { merge } from "@/lib/utilities/tailwind";
import { motion, useInView } from "motion/react";
import { HTMLAttributes, useRef } from "react";

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    text: string;
}

export default function Title({ text, className }: Props) {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <motion.h1
            ref={ref}
            className={merge("text-white font-bold text-4xl mb-4 overflow-hidden", className)}
            initial={{
                x: 4,
                opacity: 0,
                color: "#fb923c",
            }}
            animate={{
                x: isInView ? 0 : 4,
                opacity: isInView ? 1 : 0,
                color: isInView ? "#ffffff" : "#fb923c",
            }}
            transition={{
                ease: "easeOut",
                duration: 0.3,
            }}
        >
            {text}
        </motion.h1>
    );
}
