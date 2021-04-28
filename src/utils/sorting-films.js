const sortFilmsByRating = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};

const sortFilmsByComments = (films) => {
  return films.slice().sort((a, b) => a.comments.length > b.comments.length);
};

export {
  sortFilmsByRating,
  sortFilmsByComments
};
