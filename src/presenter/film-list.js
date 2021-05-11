import AllFilmsListView from '../view/all-films-list.js';
import FilmMostCommentedView from '../view/film-most-commented.js';
import FilmTopRatedView from '../view/film-top-rated.js';
import SiteMenuSortView from '../view/site-menu-sort.js';
import NoFilmsView from '../view/no-films.js';
import ButtonShowMoreView from '../view/button-show-more';
import FooterStatisticsView from '../view/footer-statistics.js';
import FilmPresenter from '../presenter/film.js';
import {render, remove} from '../utils/render';
import {sortFilmsByDate, sortFilmsByRating} from '../utils/sorting-films.js';
import {SortType} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

export default class FilmList {
  constructor(movieListContainer, filmsModel) {
    this._siteElementContainer = movieListContainer;
    this._filmsModel = filmsModel;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderedExtraCount = EXTRA_FILMS_COUNT;
    this._currentSortType = SortType.DEFAULT;

    this._allFilmsPresenter = {};
    this._topRatedFilmsPresenter = {};
    this._mostCommentedFilmsPresenter = {};

    this._filmsBoardComponent = new AllFilmsListView();
    this._filmTopRatedComponent = new FilmTopRatedView();
    this._filmMostCommentedComponent = new FilmMostCommentedView();
    this._siteMenuSortComponent = new SiteMenuSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._buttonShowMoreComponent = new ButtonShowMoreView();

    this._allfilmsList = this._filmsBoardComponent.getElement().querySelector('.films-list--all-films');
    this._allfilmsListContainer = this._allfilmsList.querySelector('.films-list__container');

    this._topRatedFilmsContainer = this._filmTopRatedComponent.getElement().querySelector('.films-list__container');
    this._commentedFilmsContainer = this._filmMostCommentedComponent.getElement().querySelector('.films-list__container');

    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    // this._films = films.slice();
    //
    // this._filmsTopRated = sortTopRatedFilms(films.slice());
    // this._filmsMostCommented = sortFilmsByComments(films.slice());

    this._renderBoard();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByRating);
      case SortType.DATE:
        return this._filmsModel.getFilms().slice().sort(sortFilmsByDate);
    }

    return this._filmsModel.getFilms();
  }

  _renderSort() {
    render(this._siteElementContainer, this._siteMenuSortComponent);
    this._siteMenuSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container) {
    this._filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleModeChange);
    this._filmPresenter.init(film);
  }

  _renderFilms(films) {
    films
      .forEach((film) => {
        this._renderFilm(film, this._allfilmsListContainer);
        this._allFilmsPresenter[film.id] = this._filmPresenter;
      });
  }

  _clearFilmList() {
    Object
      .values(this._allFilmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._allFilmsPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._buttonShowMoreComponent);
  }

  _renderTopRatedFilms(filmsTopRated) {
    filmsTopRated
      .forEach((film) => {
        this._renderFilm(film, this._topRatedFilmsContainer);
        this._topRatedFilmsPresenter[film.id] = this._filmPresenter;
      });
  }

  _renderMostCommentedFilms(filmsMostCommented) {
    filmsMostCommented
      .forEach((film) => {
        this._renderFilm(film, this._commentedFilmsContainer);
        this._mostCommentedFilmsPresenter[film.id] = this._filmPresenter;
      });
  }

  _renderNoFilms() {
    render(this._siteElementContainer, this._noFilmsComponent);
  }

  _renderButtonShowMore() {
    render(this._allfilmsList, this._buttonShowMoreComponent);

    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);
  }

  _renderFilmsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_COUNT_PER_STEP));

    this._renderFilms(films);

    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderTopRatedFilmsList() {
    render(this._filmsBoardComponent, this._filmTopRatedComponent);
    this._renderTopRatedFilms(0, this._renderedExtraCount);
  }

  _renderMostCommentedFilmsList() {
    render(this._filmsBoardComponent, this._filmMostCommentedComponent);
    this._renderMostCommentedFilms(0, this._renderedExtraCount);
  }

  _renderSiteFooter() {
    const filmCount = this._getFilms().length;
    const footerElement = document.querySelector('.footer__statistics');
    render(footerElement, new FooterStatisticsView(filmCount));
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    } else {
      this._renderSort();
      render(this._siteElementContainer, this._filmsBoardComponent);
      this._renderFilmsList();
      this._renderTopRatedFilmsList();
      this._renderMostCommentedFilmsList();
      this._renderSiteFooter();
    }
  }

  _handleFilmChange(updatedFilm) {
    if (updatedFilm.id in this._allFilmsPresenter) {
      this._allFilmsPresenter[updatedFilm.id].init(updatedFilm);
    }

    if (updatedFilm.id in this._topRatedFilmsPresenter) {
      this._topRatedFilmsPresenter[updatedFilm.id].init(updatedFilm);
    }

    if (updatedFilm.id in this._mostCommentedFilmsPresenter) {
      this._mostCommentedFilmsPresenter[updatedFilm.id].init(updatedFilm);
    }
  }

  _handleButtonShowMoreClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      this._buttonShowMoreComponent.getElement().remove();
    }
  }

  _handleModeChange() {
    [
      ...Object.values(this._allFilmsPresenter),
      ...Object.values(this._topRatedFilmsPresenter),
      ...Object.values(this._mostCommentedFilmsPresenter),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmsList();
  }
}
