import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  generateDate
} from '../utils/common.js';
import {generateFilmComments} from './film-comments.js';
import {nanoid} from 'nanoid';

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
const PRODUCERS = [
  'Joe Meek',
  'George Martin',
  'Quincy Jones',
  'Nile Rodgers',
  'Phil Spector',
  'Quentin Tarantino',
  'Brian Eno',
  'Brian Wilson',
];
const SCREENWRITERS = [
  'Billy Wilder',
  'Ethan Coen and Joel Coen',
  'Robert Towne',
  'Quentin Tarantino',
  'Francis Ford Coppola',
];
const ACTORS = [
  'Quentin Tarantino',
  'Jack Nicholson',
  'Kate Winslet',
  'Robert De Niro',
  'Al Pacino',
  'Daniel Day-Lewis',
  'Helen Mirren',
  'Jodie Foster',
  'Sean Connery',
];
const COUNTRIES = [
  'Austria',
  'Bolivia',
  'China',
  'Estonia',
  'Germany',
  'Poland',
];
const AGE_RATING = [
  '14+',
  '16+',
  '18+',
  '21+',
];

export const generateFilmCard = () => {
  return {
    id: nanoid(),
    poster: getRandomArrayElement(POSTERS),
    title: getRandomArrayElement(FILM_TITLES),
    originalTitle: getRandomArrayElement(FILM_TITLES),
    releaseDate: generateDate(),
    ageRating: getRandomArrayElement(AGE_RATING),
    country: getRandomArrayElement(COUNTRIES),
    director: getRandomArrayElement(PRODUCERS),
    screenwriters: getRandomArrayElement(SCREENWRITERS),
    cast: getRandomArray(ACTORS, getRandomInteger(3, 6)),
    rating: getRandomInteger(FILM_RATING.min, FILM_RATING.max),
    duration: `${getRandomInteger(Duration.HOURS.min, Duration.HOURS.max)}h ${getRandomInteger(Duration.MINUTES.min, Duration.MINUTES.max)}m`,
    genres: getRandomArray(GENRES, getRandomInteger(1, GENRES.length)),
    description: getRandomArray(FILM_DESCRIPTION, getRandomInteger(1, 5)).join(' '),
    comments: new Array(getRandomInteger(0, 5)).fill(null).map(() => generateFilmComments()),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
  };
};
