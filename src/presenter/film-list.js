import AllFilmsListView from '../view/all-films-list.js';
import FilmMostCommentedView from '../view/film-most-commented.js';
import FilmTopRatedView from '../view/film-top-rated.js';
import SiteMenuSortView from '../view/site-menu-sort.js';
import NoFilmsView from '../view/no-films.js';
import ButtonShowMoreView from '../view/button-show-more';
import FilmPresenter from '../presenter/film.js';
import {render, remove} from '../utils/render';
import {sortFilmsByDate, sortFilmsByRating, sortFilmsByComments} from '../utils/sorting-films.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

export default class FilmList {
  constructor(movieListContainer, filmsModel) {
    this._siteElementContainer = movieListContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    this._renderedExtraCount = EXTRA_FILMS_COUNT;
    this._filmsModel = filmsModel;
    this._currentSortType = SortType.DEFAULT;

    this._allFilmsPresenter = {};
    this._topRatedFilmsPresenter = {};
    this._mostCommentedFilmsPresenter = {};

    this._siteMenuSortComponent = null;
    this._buttonShowMoreComponent = null;

    this._filmsBoardComponent = new AllFilmsListView();
    this._filmTopRatedComponent = new FilmTopRatedView();
    this._filmMostCommentedComponent = new FilmMostCommentedView();
    this._noFilmsComponent = new NoFilmsView();

    this._allfilmsList = this._filmsBoardComponent.getElement().querySelector('.films-list--all-films');
    this._allfilmsListContainer = this._allfilmsList.querySelector('.films-list__container');

    this._topRatedFilmsContainer = this._filmTopRatedComponent.getElement().querySelector('.films-list__container');
    this._commentedFilmsContainer = this._filmMostCommentedComponent.getElement().querySelector('.films-list__container');

    this._handleButtonShowMoreClick = this._handleButtonShowMoreClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
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
    if (this._siteMenuSortComponent !== null) {
      this._siteMenuSortComponent = null;
    }
    this._siteMenuSortComponent = new SiteMenuSortView(this._currentSortType);

    this._siteMenuSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._siteElementContainer, this._siteMenuSortComponent);
  }

  _renderFilm(film, container) {
    this._filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleModeChange);
    this._filmPresenter.init(film);
  }

  _renderFilms(films) {
    films
      .forEach((film) => {
        this._renderFilm(film, this._allfilmsListContainer);
        this._allFilmsPresenter[film.id] = this._filmPresenter;
      });
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

  _clearFilmList() {
    Object
      .values(this._allFilmsPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this._buttonShowMoreComponent);
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;
    const presenters = [
      ...Object.values(this._allFilmsPresenter),
      ...Object.values(this._topRatedFilmsPresenter),
      ...Object.values(this._mostCommentedFilmsPresenter),
    ];

    Object
      .values(presenters)
      .forEach((presenter) => presenter.destroy());

    this._allFilmsPresenter = {};
    this._topRatedFilmsPresenter = {};
    this._mostCommentedFilmsPresenter = {};

    remove(this._siteMenuSortComponent);
    remove(this._noFilmsComponent);
    remove(this._buttonShowMoreComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmCount = FILMS_COUNT_PER_STEP;
    } else {
      this._renderedFilmCount = Math.min(filmCount, this._renderedFilmCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderNoFilms() {
    render(this._siteElementContainer, this._noFilmsComponent);
  }

  _renderButtonShowMore() {
    if (this._buttonShowMoreComponent !== null) {
      this._buttonShowMoreComponent = null;
    }

    this._buttonShowMoreComponent = new ButtonShowMoreView();
    this._buttonShowMoreComponent.setClickHandler(this._handleButtonShowMoreClick);

    render(this._allfilmsList, this._buttonShowMoreComponent);
  }

  _renderFilmsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, this._renderedFilmCount));

    this._renderFilms(films, this._allfilmsListContainer);

    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderButtonShowMore();
    }
  }

  _renderFilmsExtra() {
    const topRatedFilms = this._getFilms().slice().sort(sortFilmsByRating);
    const mostCommentedFilms = this._getFilms().slice().sort(sortFilmsByComments);
    render(this._filmsBoardComponent, this._filmTopRatedComponent);
    render(this._filmsBoardComponent, this._filmMostCommentedComponent);

    this._renderTopRatedFilms(topRatedFilms.slice(0, EXTRA_FILMS_COUNT));
    this._renderMostCommentedFilms(mostCommentedFilms.slice(0, EXTRA_FILMS_COUNT));
  }

  _renderBoard() {
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderSort();
    render(this._siteElementContainer, this._filmsBoardComponent);
    this._renderFilmsList();
    this._renderFilmsExtra();
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      // case UserAction.ADD_COMMENT:
      //   this._filmsModel.addComment(updateType, update);
      //   break;
      // case UserAction.DELETE_COMMENT:
      //   this._filmsModel.deleteComment(updateType, update);
      //   break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
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
    const presenters = [
      ...Object.values(this._allFilmsPresenter),
      ...Object.values(this._topRatedFilmsPresenter),
      ...Object.values(this._mostCommentedFilmsPresenter),
    ];
    Object
      .values(presenters)
      .forEach((presenter) => presenter.resetView());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }
}
