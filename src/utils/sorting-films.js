import dayjs from 'dayjs';

const sortFilmsByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

const sortFilmsByComments = (filmA, filmB) => {
  const valueA = filmA.comments.length;
  const valueB = filmB.comments.length;

  return valueB - valueA;
};

export {
  sortFilmsByDate,
  sortFilmsByRating,
  sortFilmsByComments
};
