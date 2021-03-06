import {
  getRandomArrayElement,
  generateDate
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

const comments = [];

export const generateFilmComment = () => {

  const comment = {
    id: nanoid(),
    text: getRandomArrayElement(TEXT),
    emotion: getRandomArrayElement(EMOTION),
    author: getRandomArrayElement(AUTORS),
    commentDate: generateDate(),
  };
  comments.push(comment);
  return comment.id;
};

export const getComments = () => {
  return comments;
};
