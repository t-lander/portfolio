import About from "@/content/about.md";
import CallToAction from "@/lib/components/layouts/call-to-action";
import Section from "@/lib/components/layouts/section";
import Collapsible from "@/lib/components/partials/collapsible";
import Filler from "@/lib/components/partials/filler";
import { getAllEducations, getAllExperiences } from "@/lib/contentful";
import { parseMarkdown } from "@/lib/markdown";
import Markdown from "react-markdown";

export default async function AboutPage() {
    const about = parseMarkdown(About);
    const experiences = await getAllExperiences();
    const educations = await getAllEducations();

    function sortByStartDate<T extends { startedAt: string }>(list: T[]): T[] {
        return list.sort(
            (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
        );
    }

    function sortByEndDate<T extends { finishedAt: string }>(list: T[]): T[] {
        return list.sort(
            (a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
        );
    }

    function getRangeString(startIso: string, endIso: string): string {
        const startDate = new Date(startIso);
        const endDate = new Date(endIso);

        return `${startDate.getFullYear().toString()}-${endDate.getFullYear().toString()}`;
    }

    return (
        <>
            <Section title={about.frontmatter?.title as string} className="border-b">
                <div
                    role="presentation"
                    className="prose prose-neutral prose-invert max-w-prose mb-8"
                >
                    <Markdown>{about.content}</Markdown>
                </div>
            </Section>
            <Filler />
            <Section title="Work experience" className="border-t">
                <p className="prose prose-neutral prose-invert w-full max-w-prose mb-16">
                    Here you&apos;ll find the organisations I&apos;ve worked at over the years.
                </p>
                {sortByStartDate(experiences).map((experience, index) => {
                    return (
                        <Collapsible
                            key={`${index}-${experience.title}-${experience.organization}`}
                            title={experience.title}
                            subtitle={`${experience.organization}, ${getRangeString(experience.startedAt, experience.finishedAt)}`}
                        >
                            <Markdown>{experience.description}</Markdown>
                        </Collapsible>
                    );
                })}
            </Section>
            <Section title="Formal education" className="border-t border-dashed pb-8">
                <p className="prose prose-neutral prose-invert w-full max-w-prose mb-16">
                    My formal education. All degrees acquired.
                </p>
                {sortByEndDate(educations).map((education, index) => {
                    return (
                        <Collapsible
                            key={`${index}-${education.title}-${education.institution}`}
                            title={education.title}
                            subtitle={`${education.institution}, ${getRangeString(education.startedAt, education.finishedAt)}`}
                        >
                            <Markdown>{education.description}</Markdown>
                        </Collapsible>
                    );
                })}
            </Section>
            <Filler className="border-y" />
            <CallToAction />
        </>
    );
}
