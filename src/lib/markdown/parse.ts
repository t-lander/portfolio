/** Unknown frontmatter metadata extracted from a Markdown file. */
type Frontmatter = Record<string, unknown>;

/** Markdown with separated frontmatter and content. */
export type Markdown = {
    frontmatter: Frontmatter | null;
    content: string;
};

/**
 * Parses a Markdown file's content, extracting frontmatter and body content.
 * @param {string} fileContent - Raw Markdown file content as a string.
 * @returns {Markdown} A Markdown object containing the parsed frontmatter and content.
 */
export function parseMarkdown(fileContent: string): Markdown {
    // Extract frontmatter from the content using regex
    const regex = /---\s*([\s\S]*?)\s*---/;
    const match = regex.exec(fileContent);

    // Put frontmatter and content into separate variables
    if (!match) return { frontmatter: null, content: fileContent };
    const frontmatter = match[1];
    const content = fileContent.replace(regex, "").trim();

    // Read frontmatter and put values into a metadata object
    const lines = frontmatter.trim().split("\n");
    const metadata: Frontmatter = {};
    lines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        let value = valueArr.join(": ").trim();
        value = value.replace(/^['"](.*)['"]$/, "$1");
        metadata[key.trim() as keyof Frontmatter] = value;
    });

    return { frontmatter: metadata as Frontmatter, content };
}
