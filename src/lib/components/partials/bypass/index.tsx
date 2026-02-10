"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Bypass() {
    const path = usePathname();

    return (
        <Link
            href={`${path}#main-content`}
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-2 bg-neutral-950"
        >
            Skip to main content.
        </Link>
    );
}
