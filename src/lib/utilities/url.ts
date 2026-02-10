/**
 * Retrieve a file extension from a URL if it has one
 * @param url The URL to get the file extension from
 * @returns A file extension type (png, mp4, etc) or null
 */
export function getFileExtensionFromUrl(url: string): string | null {
    const pathName = new URL(url).pathname;

    // Get last dot and slash from the URL
    const lastDot = pathName.lastIndexOf(".");
    const lastSlash = pathName.lastIndexOf("/");

    // If there is no dot (and thus no file extension)
    if (lastDot === -1) return null;

    // If the dot comes before the slash
    if (lastDot < lastSlash) return null;

    // If the dot is the final character
    if (lastDot === pathName.length - 1) return null;

    // Return the extension
    return pathName.slice(lastDot + 1);
}
