import FilmCardView from '../view/film-card.js';
import PopupFilmDetailsView from '../view/popup-film-details.js';
import {render} from '../utils/render.js';

export default class Film {
  constructor(filmContainer) {
    this._filmContainer = filmContainer;
    this._bodyElement = document.body;

    this._filmCardComponent = null;
    this._popupFilmDetailsComponent = null;

    this._handleOpenPopupClick = this._handleOpenPopupClick.bind(this);
    this._handleHidePopupClick = this._handleHidePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmCardComponent = new FilmCardView(film);
    this._popupFilmDetailsComponent = new PopupFilmDetailsView(film);

    render(this._filmContainer, this._filmCardComponent);

    this._filmCardComponent.setClickHandler(this._handleOpenPopupClick);
    this._popupFilmDetailsComponent.setClickButtonCloseHandler(this._handleHidePopupClick);
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
