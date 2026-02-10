import { Experience, experienceSchema } from "@/lib/schemas";
import { cacheLife, cacheTag } from "next/cache";
import { array, object, parse } from "valibot";
import { fetchContentfulData } from "./fetch";
import GetAllExperiences from "./queries/get-all-experiences.graphql";

/** A validation schema for the format of a Contentful response. */
const responseSchema = object({
    data: object({
        experienceCollection: object({
            items: array(experienceSchema),
        }),
    }),
});

/**
 * Get all experiences from the Contentful server.
 * @returns An array of work experience data.
 */
export async function getAllExperiences(): Promise<Experience[]> {
    "use cache";
    cacheTag("experience");
    cacheLife("max");

    const data = await fetchContentfulData(GetAllExperiences, {});
    const result = parse(responseSchema, data);
    return result.data.experienceCollection.items.map((experience: Experience) => {
        return experience;
    });
}
