import dayjs from 'dayjs';

const sortFilmsByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export {
  sortFilmsByDate,
  sortFilmsByRating
};
