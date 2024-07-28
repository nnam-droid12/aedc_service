// Commas need to be escaped or converted to underscore not to mess up the CSV file.
// Wrapping the string by "foo, bar" is the easiest way of doing this.
export const formatCsvCell = (str: string) =>
  str
    // In case there is a quotation mark in the string already, it needs to be escaped too.
    // @see https://stackoverflow.com/a/44120055
    .replace(/"/g, '""')
    // Replace all white-space characters (including new line breaks) with a single space.
    // @see https://stackoverflow.com/a/45029224
    .replace(/\s+/g, ' ')
    .trim();

export const stringToBoolean = (str: string) => {
  return str === 'true';
};
