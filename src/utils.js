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


export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray
};
