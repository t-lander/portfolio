"use client";

export default function ErrorPage() {
    return (
        <section aria-labelledby="error-heading" className="p-8 py-16">
            <div role="presentation" className="w-full max-w-prose m-auto">
                <h1 id="error-heading" className="font-bold text-4xl text-white mb-4 text-center">
                    500
                </h1>
                <p className="text-center max-w-lg mx-auto mb-8">
                    Something went wrong. Please try again later.
                </p>
            </div>
        </section>
    );
}
