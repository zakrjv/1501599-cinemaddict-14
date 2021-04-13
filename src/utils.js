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

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};


export {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  generateDate,
  renderTemplate,
  renderElement,
  RenderPosition,
  createElement
};
