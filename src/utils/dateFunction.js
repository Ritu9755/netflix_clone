export function formatReleaseDate(date) {
    return new Date(date).toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        date: "numeric",
    });
}