import { Education, educationSchema } from "@/lib/schemas";
import { cacheLife, cacheTag } from "next/cache";
import { array, object, parse } from "valibot";
import { fetchContentfulData } from "./fetch";
import GetAllEducations from "./queries/get-all-educations.graphql";

/** A validation schema for the format of a Contentful response. */
const responseSchema = object({
    data: object({
        educationCollection: object({
            items: array(educationSchema),
        }),
    }),
});

/**
 * Get all educations from the Contentful server.
 * @returns An array of formal education data.
 */
export async function getAllEducations(): Promise<Education[]> {
    "use cache";
    cacheTag("education");
    cacheLife("max");

    const data = await fetchContentfulData(GetAllEducations, {});
    const result = parse(responseSchema, data);
    return result.data.educationCollection.items.map((education: Education) => {
        return education;
    });
}
