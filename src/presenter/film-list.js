import AllFilmsListView from '../view/all-films-list.js';
import FilmMostCommentedView from '../view/film-most-commented.js';
import FilmTopRatedView from '../view/film-top-rated.js';
import SiteMenuSortView from '../view/site-menu-sort.js';
import NoFilmsView from '../view/no-films.js';
import ButtonShowMoreView from '../view/button-show-more';
import FooterStatisticsView from '../view/footer-statistics.js';
import FilmPresenter from '../presenter/film.js';
import {render, remove} from '../utils/render';
import {sortTopRatedFilms, sortFilmsByComments, sortFilmsByDate, sortFilmsByRating} from '../utils/sorting-films.js';
import {updateItem} from '../utils/common.js';
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

  init(films) {
    this._films = films.slice();
    this._sourcedFilmCards = films.slice();

    this._filmsTopRated = sortTopRatedFilms(films.slice());
    this._filmsMostCommented = sortFilmsByComments(films.slice());

    this._renderBoard();
  }

  _getFilms() {
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

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
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

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._films.sort(sortFilmsByRating);
        break;
      case SortType.DATE:
        this._films.sort(sortFilmsByDate);
        break;
      default:
        this._films = this._sourcedFilmCards.slice();
    }

    this._currentSortType = sortType;
  }

  _renderTopRatedFilms(from, to) {
    this._filmsTopRated
      .slice(from, to)
      .forEach((film) => {
        this._renderFilm(film, this._topRatedFilmsContainer);
        this._topRatedFilmsPresenter[film.id] = this._filmPresenter;
      });
  }

  _renderMostCommentedFilms(from, to) {
    this._filmsMostCommented
      .slice(from, to)
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
    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
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
    const footerElement = document.querySelector('.footer__statistics');
    render(footerElement, new FooterStatisticsView(this._films.length));
  }

  _renderBoard() {
    if (this._films.length === 0) {
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
    this._films = updateItem(this._films, updatedFilm);

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
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      this._buttonShowMoreComponent.getElement().remove();
    }
  }

  _handleModeChange() {
    [
      ... Object.values(this._allFilmsPresenter),
      ... Object.values(this._topRatedFilmsPresenter),
      ... Object.values(this._mostCommentedFilmsPresenter),
    ]
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }
}
