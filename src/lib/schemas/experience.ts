import { InferOutput, object, string } from "valibot";

/** A validation schema for work experience data. */
export const experienceSchema = object({
    title: string(),
    organization: string(),
    description: string(),
    startedAt: string(),
    finishedAt: string(),
});

/** The inferred type of the experience schema. */
export type Experience = InferOutput<typeof experienceSchema>;
