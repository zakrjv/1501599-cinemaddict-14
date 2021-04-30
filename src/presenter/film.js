import FilmCardView from '../view/film-card.js';
import PopupFilmDetailsView from '../view/popup-film-details.js';
import {render, remove, replace} from '../utils/render.js';

export default class Film {
  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._bodyElement = document.body;

    this._filmCardComponent = null;
    this._popupFilmDetailsComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleHidePopupClick = this._handleHidePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);

  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._popupFilmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupFilmDetailsComponent = new PopupFilmDetailsView(film);

    render(this._filmContainer, this._filmCardComponent);

    this._filmCardComponent.setClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleButtonFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._popupFilmDetailsComponent.setClickButtonCloseHandler(this._handleHidePopupClick);

    if (prevFilmComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (this._filmContainer.contains(prevFilmDetailsComponent.getElement())) {
      replace(this._popupFilmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupFilmDetailsComponent);
  }

  _handleButtonWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleButtonWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleButtonFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorites: !this._film.isFavorites,
        },
      ),
    );
  }

  _openPopup() {
    this._bodyElement.appendChild(this._popupFilmDetailsComponent.getElement());
    this._bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _hidePopup() {
    this._bodyElement.removeChild(this._popupFilmDetailsComponent.getElement());
    this._bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._hidePopup();
    }
  }

  _handleOpenPopupClick() {
    this._openPopup();
  }

  _handleHidePopupClick() {
    this._hidePopup();
  }
}
