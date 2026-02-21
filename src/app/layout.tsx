import "@/lib/styles/app.css";
import Footer from "@/lib/components/layouts/footer";
import Header from "@/lib/components/layouts/header";
import Filler from "@/lib/components/partials/filler";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { jetbrainsMono } from "@/lib/fonts/jetbrains-mono";
import { inter } from "@/lib/fonts/inter";

export const metadata: Metadata = {
    title: "Thijs Lander",
    description: "Thijs Lander, creative developer",
};

interface Props {
    readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
                <SpeedInsights />
                <Analytics />
                <Header />
                <main id="main-content" tabIndex={-1} className="size-full px-4 focus:outline-none">
                    <div
                        role="presentation"
                        className="relative size-full max-w-7xl mx-auto border-neutral-800 border-x grid grid-rows-[auto_1fr]"
                    >
                        {children}
                        <Filler className="border-t" />
                        <span
                            role="none"
                            className="corner-decoration top-0 left-0 -translate-1.25"
                        />
                        <span
                            role="none"
                            className="corner-decoration top-0 right-0 translate-x-1.25 -translate-y-1.25"
                        />
                        <span
                            role="none"
                            className="corner-decoration bottom-0 left-0 -translate-x-1.25 translate-y-1.25"
                        />
                        <span
                            role="none"
                            className="corner-decoration bottom-0 right-0 translate-1.25"
                        />
                    </div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
