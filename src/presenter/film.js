import FilmCardView from '../view/film-card.js';
import PopupFilmDetailsView from '../view/popup-film-details.js';
import {render, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPEN: 'OPEN',
};

export default class Film {
  constructor(filmContainer, changeData, changeMode, commentsModel, api) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsModel = commentsModel;
    this._bodyElement = document.body;
    this._api = api;

    this._filmCardComponent = null;
    this._popupFilmDetailsComponent = null;
    this._mode = Mode.CLOSED;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleHidePopupClick = this._handleHidePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleButtonWatchlistClick = this._handleButtonWatchlistClick.bind(this);
    this._handleButtonWatchedClick = this._handleButtonWatchedClick.bind(this);
    this._handleButtonFavoriteClick = this._handleButtonFavoriteClick.bind(this);
    this._handleButtonDeleteClick = this._handleButtonDeleteClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardView(film);

    render(this._filmContainer, this._filmCardComponent);

    this._filmCardComponent.setClickHandler(this._handleOpenPopupClick);
    this._filmCardComponent.setWatchlistClickHandler(this._handleButtonWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleButtonWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleButtonFavoriteClick);

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
    this._api.getComments(this._film.id).then((comments) => {
      this._commentsModel.set(comments);
      this._popupFilmDetailsComponent = new PopupFilmDetailsView(this._film, this._commentsModel.get());


      this._changeMode();
      this._mode = Mode.OPEN;

      this._bodyElement.appendChild(this._popupFilmDetailsComponent.getElement());
      this._bodyElement.classList.add('hide-overflow');
      document.addEventListener('keydown', this._escKeyDownHandler);

      this._popupFilmDetailsComponent.setClickButtonCloseHandler(this._handleHidePopupClick);
      this._popupFilmDetailsComponent.setFavoritePopupClickHandler(this._handleButtonFavoriteClick);
      this._popupFilmDetailsComponent.setWatchedPopupClickHandler(this._handleButtonWatchedClick);
      this._popupFilmDetailsComponent.setWatchlistPopupClickHandler(this._handleButtonWatchlistClick);

      this._popupFilmDetailsComponent.setClickButtonDeleteCommentHandler(this._handleButtonDeleteClick);

      render(this._bodyElement, this._popupFilmDetailsComponent);
    });
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
      {...this._film, isWatchlist: !this._film.isWatchlist},
    );
  }

  _handleButtonWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this._film, isWatched: !this._film.isWatched},
    );
  }

  _handleButtonFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this._film, isFavorites: !this._film.isFavorites},
    );
  }

  _handleButtonDeleteClick(commentId, film) {

    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this._film, comments: film.comments},
    );

    this._commentsModel.deleteComment(UpdateType.MINOR, commentId, film);
  }
}
