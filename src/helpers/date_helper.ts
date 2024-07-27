const locale = 'en-GB';
const timeZone = 'Africa/Lagos';
export function generateDateString(
  timeZone: string,
  date: Date,
  { monthType = 'short', divider = '_', includeTime = true } = {}
) {
  const options = { hour12: false, timeZone };
  const preResult = [];
  preResult.push(
    date.toLocaleString(locale, { ...options, day: '2-digit' }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    date.toLocaleString(locale, { ...options, month: monthType as any }),
    date.toLocaleString(locale, { ...options, year: 'numeric' })
  );
  if (includeTime) {
    preResult.push(
      date.toLocaleString(locale, { ...options, hour: '2-digit' }),
      date.toLocaleString(locale, { ...options, minute: '2-digit' })
    );
  }

  return preResult.join(divider);
}

// => 29 December 2020 @ 12:35
export function generateShortDateString(date: Date) {
  const options = { hour12: false, timeZone };

  return [
    date.toLocaleString(locale, { ...options, day: '2-digit' }),
    date.toLocaleString(locale, { ...options, month: 'long', year: 'numeric' }),
    '@',
    date.toLocaleString(locale, { hour: '2-digit', minute: '2-digit', hour12: false })
  ].join(' ');
}
