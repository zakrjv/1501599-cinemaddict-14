const UserRanks = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie Buff',
};

const getRankName = (filmsCount) => {
  if (filmsCount <= 10 && filmsCount > 0) {
    return UserRanks.NOVICE;
  }
  if (filmsCount > 10 && filmsCount <= 20) {
    return UserRanks.FAN;
  }
  if (filmsCount >= 21) {
    return UserRanks.MOVIE_BUFF;
  } else {
    return '';
  }
};

export const getRank = (films) => {
  const countHistory = films.filter((film) => film.isWatched).length;
  return getRankName(countHistory);
};


