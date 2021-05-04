const sortFilmsByRating = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

const sortFilmsByComments = (films) => {
  return films.slice().sort((a, b) => b.comments.length - a.comments.length);
};

export {
  sortFilmsByRating,
  sortFilmsByComments
};
