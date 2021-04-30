import FilmsSectionsView from '../view/films-sections.js';
import SiteMenuSortView from '../view/site-menu-sort.js';
import NoFilmsView from '../view/no-films.js';
import ButtonShowMoreView from '../view/button-show-more';
import FooterStatisticsView from '../view/footer-statistics.js';
import FilmPresenter from '../presenter/film.js';
import {render, remove} from '../utils/render';
import {sortFilmsByRating, sortFilmsByComments} from '../utils/sorting-films.js';
import {updateItem} from '../utils/common.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

export default class FilmList {
  constructor(movieListContainer) {
    this._siteElementContainer = movieListContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderedExtraCount = EXTRA_FILMS_COUNT;
    this._filmPresenter = {};

    this._filmsSectionsComponent = new FilmsSectionsView();
    this._siteMenuSortComponent = new SiteMenuSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();

    this._allFilmsElement = this._filmsSectionsComponent.getElement().querySelector('.films-list--all-films');
    this._allFilmListContainer = this._allFilmsElement.querySelector('.films-list__container');

    this._topRatedFilmsElement = this._filmsSectionsComponent.getElement().querySelector('.films-list--top-rated');
    this._topRatedFilmsContainer = this._topRatedFilmsElement.querySelector('.films-list__container');

    this._commentedFilmsElement = this._filmsSectionsComponent.getElement().querySelector('.films-list--most-commented');
    this._commentedFilmsContainer = this._commentedFilmsElement.querySelector('.films-list__container');

    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();

    this._filmsTopRated = sortFilmsByRating(films.slice());
    this._filmsMostCommented = sortFilmsByComments(films.slice());

    this._renderBoard();
  }

  _renderSort() {
    render(this._siteElementContainer, this._siteMenuSortComponent);
  }

  _renderFilm(film, container) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(film, this._allFilmListContainer);
      });
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._buttonShowMoreComponent);
  }

  _renderTopRatedFilms(from, to) {
    this._filmsTopRated
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(film, this._topRatedFilmsContainer);
      });
  }

  _renderMostCommentedFilms(from, to) {
    this._filmsMostCommented
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(film, this._commentedFilmsContainer);
      });
  }

  _renderNoFilms() {
    render(this._siteElementContainer, this._noFilmsComponent);
  }

  _renderButtonShowMore() {
    render(this._allFilmsElement, this._buttonShowMoreComponent);

    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderTopRatedFilmsList() {
    this._renderTopRatedFilms(0, this._renderedExtraCount);
  }

  _renderMostCommentedFilmsList() {
    this._renderMostCommentedFilms(0, this._renderedExtraCount);
  }

  _renderSiteFooter() {
    const footerElement = document.querySelector('.footer__statistics');
    render(footerElement, new FooterStatisticsView(this._films.length));
  }

  _renderBoard() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    } else {
      this._renderSort();
      render(this._siteElementContainer, this._filmsSectionsComponent);
      this._renderFilmsList();
      this._renderTopRatedFilmsList();
      this._renderMostCommentedFilmsList();
      this._renderSiteFooter();
    }
  }

  _handleFilmChange(updatedFilm) {
    // console.log(this._films.find((prevFilm) => prevFilm.id === updatedFilm.id));
    this._films = updateItem(this._films, updatedFilm);
    // console.log(updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleButtonShowMoreClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      this._buttonShowMoreComponent.getElement().remove();
    }
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
