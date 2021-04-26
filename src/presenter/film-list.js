import FilmsSectionsView from '../view/films-sections.js';
import SiteMenuSortView from '../view/site-menu-sort.js';
import NoFilmsView from '../view/no-films.js';
import ButtonShowMoreView from '../view/button-show-more';
import FilmCardView from '../view/film-card.js';
import SiteFooterView from '../view/footer-statistics.js';
import PopupFilmDetailsView from '../view/popup-film-details.js';
import {render} from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;

    this._filmsSectionsComponent = new FilmsSectionsView();
    this._siteMenuSortComponent = new SiteMenuSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();

    this._allFilmsContainer = this._filmsSectionsComponent.getElement().querySelector('.films-list--all-films');
    this._filmListContainer = this._filmsSectionsComponent.getElement().querySelector('.films-list__container');
  }

  init(films) {
    this._films = films.slice();
    this._renderBoard();
  }

  _renderSort() {
    render(this._movieListContainer, this._siteMenuSortComponent);
  }

  _renderFilm(container, film) {
    const bodyElement = document.body;
    const filmCard = new FilmCardView(film);
    const popupFilmDetails = new PopupFilmDetailsView(film);

    render(container, filmCard);

    filmCard.setClickHandler(() => {
      bodyElement.appendChild(popupFilmDetails.getElement());
      bodyElement.classList.add('hide-overflow');

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          hidePopup();
        }
      };

      const hidePopup = () => {
        bodyElement.removeChild(popupFilmDetails.getElement());
        bodyElement.classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      };

      document.addEventListener('keydown', onEscKeyDown);

      popupFilmDetails.setClickButtonCloseHandler(() => {
        hidePopup();
      });
    });
  }

  _renderFilms(from, to) {
    render(this._movieListContainer, this._filmsSectionsComponent);
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(this._filmListContainer, film);
      });
  }

  _renderNoFilms() {
    render(this._movieListContainer, this._noFilmsComponent);
  }

  _renderButtonShowMore() {
    let renderedFilmCount = FILMS_COUNT_PER_STEP;
    render(this._allFilmsContainer, this._buttonShowMoreComponent);

    this._buttonShowMoreComponent.setClickHandler(() => {
      this._films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => {
          this._renderFilm(this._filmListContainer, film);
        });

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= this._films.length) {
        this._buttonShowMoreComponent.getElement().remove();
      }
    });
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderSiteFooter() {
    const footerElement = document.querySelector('.footer__statistics');
    render(footerElement, new SiteFooterView(this._films.length));
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    } else {
      this._renderSort();
      this._renderFilmList();
      this._renderSiteFooter();
    }
  }
}
