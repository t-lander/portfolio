import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full border-neutral-800 border-t px-4">
            <div
                role="presentation"
                className="w-full max-w-7xl p-4 mx-auto flex flex-nowrap justify-between items-center border-neutral-800 border-x"
            >
                <small className="align-middle">&copy; 2026 Thijs Lander (MIT License)</small>
                <nav aria-label="Social media links" className="flex flex-nowrap gap-2">
                    <a
                        href={"mailto:contact@thijslander.com"}
                        aria-label="Mail"
                        className="button flex flex-nowrap items-center gap-2"
                    >
                        <EnvelopeClosedIcon aria-hidden={true} />
                    </a>
                    <Link
                        href={"https://linkedin.com/in/thijslander/"}
                        aria-label="LinkedIn"
                        className="button flex flex-nowrap items-center gap-2"
                    >
                        <LinkedInLogoIcon aria-hidden={true} />
                    </Link>
                    <Link
                        href={"https://github.com/t-lander"}
                        aria-label="GitHub"
                        className="button flex flex-nowrap items-center gap-2"
                    >
                        <GitHubLogoIcon aria-hidden={true} />
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
