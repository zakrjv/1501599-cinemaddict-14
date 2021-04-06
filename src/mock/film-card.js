import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray
} from '../utils.js';

const POSTERS = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-dance-of-life.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];
const FILM_TITLES = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa Claus conquers the Martians',
  'The dance of life',
  'The great flamarion',
  'The man with the golden arm',
];
const FILM_RATING = {
  min: 0,
  max: 10,
};
const FILM_YEAR = {
  min: 1950,
  max: 2020,
};
const Duration = {
  HOURS: {
    min: 0,
    max: 4,
  },
  MINUTES: {
    min: 1,
    max: 59,
  },
};
const GENRES = [
  'Comedy',
  'Musical',
  'Horror',
  'Romance',
  'Drama',
  'Western',
];
const FILM_DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const COMMENTS_COUNT = {
  min: 0,
  max: 5,
};

export const generateFilmCard = () => {
  return {
    poster: getRandomArrayElement(POSTERS),
    title: getRandomArrayElement(FILM_TITLES),
    rating: getRandomInteger(FILM_RATING.min, FILM_RATING.max),
    productionYear: getRandomInteger(FILM_YEAR.min, FILM_YEAR.max),
    duration: `${getRandomInteger(Duration.HOURS.min, Duration.HOURS.max)}h ${getRandomInteger(Duration.MINUTES.min, Duration.MINUTES.max)}m`,
    genres: getRandomArray(GENRES),
    description: getRandomArray(FILM_DESCRIPTION, getRandomInteger(1, 5)).join(' '),
    commentsCount: getRandomInteger(COMMENTS_COUNT.min, COMMENTS_COUNT.max),
  };
};
