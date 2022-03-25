import moment from 'moment';

export const days = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];
const thisYear = moment().year();
const year100Before = moment()
  .subtract(100, 'y')
  .year();
const year = [];
for (let i = year100Before; i < thisYear; i += 1) {
  year.push(i);
}
export const years = year.sort((a, b) => b - a);

const { months } = moment;
export const monthValues = months();

export const buildDate = (day, month, year) => {
  const res = moment(`${day}/${month}/${year}`, 'DD/MMMM/YYYY');
  return res;
};
