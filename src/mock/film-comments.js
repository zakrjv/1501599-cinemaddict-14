import {
  getRandomArrayElement,
  generateDate, getRandomInteger
} from '../utils/common';
import {nanoid} from 'nanoid';

const TEXT = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];
const EMOTION = [
  'angry.png',
  'puke.png',
  'sleeping.png',
  'smile.png',
];
const AUTORS = [
  'Tim Macoveev',
  'John Doe',
  'Tim Doe',
  'John Macoveev',
];

const generateFilmComment = () => {
  return {
    id: nanoid(),
    text: getRandomArrayElement(TEXT),
    emotion: getRandomArrayElement(EMOTION),
    author: getRandomArrayElement(AUTORS),
    commentDate: generateDate(),
  };
};

export const generateFilmComments = () => {
  return new Array(getRandomInteger(0, 5)).fill(null).map(() => generateFilmComment());
};
