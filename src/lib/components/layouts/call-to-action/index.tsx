import Link from "next/link";
import Title from "@/lib/components/partials/title";

export default function CallToAction() {
    return (
        <section aria-labelledby="cta-heading" className="p-16 py-32">
            <div role="presentation" className="w-full max-w-prose m-auto">
                <Title id="cta-heading" text="Get in touch" className="text-center" />
                <p className="text-center max-w-lg mx-auto mb-8">
                    Whether you want something developed, are looking for someone to join your team,
                    or just want to say hi. I&apos;d love to hear from you.
                </p>
                <div
                    role="presentation"
                    className="flex flex-wrap justify-center items-center gap-2"
                >
                    <a href="mailto:contact@thijslander.com" className="button-secondary">
                        Send me an email
                    </a>
                    <Link href="https://linkedin.com/in/thijslander" className="button-secondary">
                        Reach out on LinkedIn
                    </Link>
                </div>
            </div>
        </section>
    );
}
