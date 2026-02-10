import Link from "next/link";

export default function NotFoundPage() {
    return (
        <section aria-labelledby="not-found-heading" className="p-8 py-16">
            <div role="presentation" className="w-full max-w-prose m-auto">
                <h1
                    id="not-found-heading"
                    className="font-bold text-4xl text-white mb-4 text-center"
                >
                    404
                </h1>
                <p className="text-center max-w-lg mx-auto mb-8">The page could not be found.</p>
                <div role="presentation" className="flex justify-center">
                    <Link href="/" className="button-primary">
                        Return to homepage.
                    </Link>
                </div>
            </div>
        </section>
    );
}
