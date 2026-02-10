import { type DocumentNode, print } from "graphql/language";
import "server-only";

/** An object containing the GraphQL variables you want to include in a GraphQL query. */
export type GraphQLVariables = Record<string, unknown>;

/**
 * A helper function to easily fetch Contentful data.
 * @param query - The GraphQL query to send to the Contentful server.
 * @param variables - Which GraphQL variables to include in the body.
 * @param cacheTags - Which Next.js cachetags are used for the fetch.
 * @returns Data from Contentful.
 */
export async function fetchContentfulData(query: DocumentNode, variables: GraphQLVariables) {
    const uri = "https://graphql.contentful.com/content/v1/spaces/";

    return fetch(`${uri}${process.env.CONTENTFUL_SPACE_ID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
                process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
                    : process.env.CONTENTFUL_ACCESS_TOKEN
            }`,
        },
        body: JSON.stringify({
            query: print(query),
            variables: variables,
        }),
    }).then((response) => response.json());
}
