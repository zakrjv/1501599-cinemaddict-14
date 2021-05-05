import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArray = (array, length = array.length) => {
  const newSet = new Set();
  while (newSet.size < length) {
    newSet.add(getRandomArrayElement(array));
  }
  return Array.from(newSet);
};

const generateDate = () => {
  const maxGap = 10;
  const Gap = getRandomInteger(-maxGap, maxGap);
  const yearGap = getRandomInteger(1, maxGap);

  return dayjs().add(Gap, 'day').add(Gap, 'hour').add(Gap, 'minute').subtract(yearGap, 'year').toDate();
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  generateDate,
  updateItem
};
