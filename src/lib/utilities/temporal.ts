/**
 * Format an isostring to a human readable string.
 * @param isoString - The isostring to format.
 * @returns A pretty formatted string, such as 'June 6, 1997'.
 */
export function formatTimestamp(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
        timeZone: "Europe/Amsterdam",
        dateStyle: "long",
    });
}

/**
 * Convert seconds to a MM:SS format.
 * @param seconds The seconds (of type number).
 * @returns A formatted string.
 */
export function formatSeconds(seconds: number): string {
    if (!isFinite(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
