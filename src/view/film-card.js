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
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length >= DESC_LENGTH ? truncatesDescription(description) : description}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._filmCard);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
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
}
