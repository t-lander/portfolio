"use client";

import Bypass from "@/lib/components/partials/bypass";
import { merge } from "@/lib/utilities/tailwind";
import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full px-4 border-neutral-800 border-b">
            <div
                role="presentation"
                className="size-full max-w-7xl p-4 mx-auto border-neutral-800 border-x flex flex-nowrap justify-end items-center"
            >
                <Bypass />
                <nav aria-label="Main navigation">
                    <ul className="flex flex-nowrap gap-4">
                        <li>
                            <NavLink label="Home" href="/" inputKey="1"></NavLink>
                        </li>
                        <li>
                            <NavLink label="About" href="/about" inputKey="2"></NavLink>
                        </li>
                        <li>
                            <NavLink label="Articles" href="/articles" inputKey="3"></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

type ChildProps = {
    label: string;
    href: string;
    inputKey: string;
};

function NavLink({ label, href, inputKey }: ChildProps) {
    return (
        <Link
            href={href}
            className={merge(
                "group text-sm h-full flex flex-nowrap gap-2 items-center",
                "hover:text-neutral-100 transition-colors"
            )}
        >
            <kbd className="kbd inline-flex justify-center items-center">{inputKey}</kbd>
            <span className="pr-1">{label}</span>
        </Link>
    );
}
