import dayjs from 'dayjs';
import AbstractView from '../view/abstract.js';

const createFilmCard = (filmCard) => {
  const DESC_LENGTH = 140;

  const {
    poster,
    title,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = filmCard;

  const mainGenre = genres.slice(0, 1);

  const truncatesDescription = (description) => {
    return description.substring(0, DESC_LENGTH - 1) + '…';
  };

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(releaseDate).format('YYYY')}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${mainGenre}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length >= DESC_LENGTH ? truncatesDescription(description) : description}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;

    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._filmCard);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    const filmImage = this._element.querySelector('.film-card__poster');
    const filmComments = this._element.querySelector('.film-card__comments');
    const filmTitle = this._element.querySelector('.film-card__title');

    [filmImage, filmComments, filmTitle].forEach((element) => {
      element.addEventListener('click', this._clickHandler);
    });
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }
}
