import {
  getRandomArrayElement,
  generateDate
} from '../utils/common';

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

export const generateFilmComments = () => {
  return {
    text: getRandomArrayElement(TEXT),
    emotion: getRandomArrayElement(EMOTION),
    author: getRandomArrayElement(AUTORS),
    commentDate: generateDate(),
  };
};
