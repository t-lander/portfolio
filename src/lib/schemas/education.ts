import { InferOutput, object, string } from "valibot";

/** A validation schema for formal education data. */
export const educationSchema = object({
    title: string(),
    institution: string(),
    description: string(),
    startedAt: string(),
    finishedAt: string(),
});

/** The inferred type of the education schema. */
export type Education = InferOutput<typeof educationSchema>;
