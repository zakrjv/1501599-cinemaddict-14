import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  get() {
    return this._films;
  }

  update(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        id: film.id,
        poster: film['film_info'].poster,
        title: film['film_info'].title,
        originalTitle: film['film_info'].alternative_title,
        releaseDate: film['film_info'].release.date,
        ageRating: film['film_info'].age_rating,
        country: film['film_info'].release.release_country,
        director: film['film_info'].director,
        writers: film['film_info'].writers,
        actors: film['film_info'].actors,
        rating: film['film_info'].total_rating,
        duration: film['film_info'].runtime,
        genres: film['film_info'].genre,
        description: film['film_info'].description,
        comments: film.comments,
        isWatchlist: film['user_details'].watchlist,
        isWatched: film['user_details'].already_watched,
        isFavorite: film['user_details'].favorite,
        watchedDate: film['user_details'].watching_date,
      },
    );
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'id': film.id,
        'comments': film.comments,
        'film_info': {
          'title': film.title,
          'alternative_title': film.originalTitle,
          'total_rating': film.rating,
          'poster': film.poster,
          'age_rating': film.ageRating,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.releaseDate,
            'release_country': film.country,
          },
          'runtime': film.duration,
          'genre': film.genres,
          'description': film.description,
        },
        'user_details': {
          'watchlist': film.isWatchlist,
          'already_watched': film.isWatched,
          'watching_date': film.watchedDate,
          'favorite': film.isFavorite,
        },
      },
    );
    delete adaptedFilm.poster;
    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.duration;
    delete adaptedFilm.country;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.watchedDate;
    delete adaptedFilm.localDescription;
    delete adaptedFilm.isWatchlist;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isFavorite;

    return adaptedFilm;
  }
}
