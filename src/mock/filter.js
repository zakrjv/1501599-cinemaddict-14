const filterNames = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'history',
  FAVORITES: 'favorites',
};

const filterTypes = {
  [filterNames.ALL]: {
    link: '#all',
    desc: 'All movies',
  },
  [filterNames.WATCHLIST]: {
    link: '#watchilst',
    desc: 'Watchlist',
  },
  [filterNames.WATCHED]: {
    link: '#history',
    desc: 'History',
  },
  [filterNames.FAVORITES]: {
    link: '#favorites',
    desc: 'Favorites',
  },
};

const filmsToFilterMap = {
  [filterNames.ALL]: (films) => films.length,
  [filterNames.WATCHLIST]: (films) => films.filter((film) => film.isWatchlist).length,
  [filterNames.WATCHED]: (films) => films.filter((film) => film.isWatched).length,
  [filterNames.FAVORITES]: (films) => films.filter((film) => film.isFavorites).length,
};

export const generateFilters = (films) => {
  return Object.entries(filmsToFilterMap).map(([filterName, getCount]) => {
    return {
      desc: filterTypes[filterName].desc,
      link: filterTypes[filterName].link,
      count: getCount(films),
    };
  });
};
