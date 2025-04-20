/**
 * Formats a given date string into a human-readable format.
 * The output format will be: "Day Month Year" (e.g., "21 Apr 2025").
 *
 * @param {string} dateString - The date string to format. It should be a valid date string that can be parsed by the JavaScript `Date` object.
 *
 * @returns {string} The formatted date as a string in the format "Day Month Year".
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' })
  const year = date.getFullYear()

  return `${day} ${month} ${year}`
}
