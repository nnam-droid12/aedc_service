import crypto from 'crypto';

import { METER_TYPE } from '../types/meter.js';

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

export const generateRandomNumber = (len: number) => {
  const buffer = crypto.randomBytes(6);
  let randomNumberString = parseInt(buffer.toString('hex'), 16).toString();
  if (randomNumberString.length > len) {
    randomNumberString = randomNumberString.slice(0, 11);
  } else {
    while (randomNumberString.length < len) {
      randomNumberString += Math.floor(Math.random() * 10).toString();
    }
  }

  return randomNumberString;
};

export const getRandomMeterType = () => {
  const values = Object.values(METER_TYPE);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as METER_TYPE;
};
