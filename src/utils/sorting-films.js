import dayjs from 'dayjs';

const sortTopRatedFilms = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

const sortFilmsByComments = (films) => {
  return films.slice().sort((a, b) => b.comments.length - a.comments.length);
};

const sortFilmsByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};

const sortFilmsByDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export {
  sortTopRatedFilms,
  sortFilmsByComments,
  sortFilmsByDate,
  sortFilmsByRating
};
