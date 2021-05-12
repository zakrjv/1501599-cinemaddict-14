import FilmCardView from '../view/film-card.js';
import PopupFilmDetailsView from '../view/popup-film-details.js';
import {render, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
};

export default class Film {
  constructor(filmContainer, changeData, changeMode) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._bodyElement = document.body;

    this._filmCardComponent = null;
    this._popupFilmDetailsComponent = null;
    this._mode = Mode.CLOSED;

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

    this._filmCardComponent = new FilmCardView(film);

    render(this._filmContainer, this._filmCardComponent);

    this._filmCardComponent.setClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleButtonFavoriteClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleButtonWatchlistClick);

    if (prevFilmComponent === null) {
      render(this._filmContainer, this._filmCardComponent);
      return;
    }

    if (this._filmContainer.contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._hidePopup();
    }
  }

  _openPopup() {
    this._popupFilmDetailsComponent = new PopupFilmDetailsView(this._film);

    this._bodyElement.appendChild(this._popupFilmDetailsComponent.getElement());
    this._bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.OPEN;

    this._popupFilmDetailsComponent.setClickButtonCloseHandler(this._handleHidePopupClick);
    this._popupFilmDetailsComponent.setFavoriteClickHandler(this._handleButtonFavoriteClick);
    this._popupFilmDetailsComponent.setWatchedClickHandler(this._handleButtonWatchedClick);
    this._popupFilmDetailsComponent.setWatchlistClickHandler(this._handleButtonWatchlistClick);

    render(this._bodyElement, this._popupFilmDetailsComponent);
  }

  _hidePopup() {
    this._bodyElement.removeChild(this._popupFilmDetailsComponent.getElement());
    this._bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
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

  _handleButtonWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
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
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      Object.assign(
        {},
        this._film,
        {
          isFavorites: !this._film.isFavorites,
        },
      ),
    );
  }
}
