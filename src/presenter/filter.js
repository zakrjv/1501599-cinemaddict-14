import MenuFiltersView from '../view/menu-filters';
import UserRankView from '../view/user-rank.js';
import {remove, replace, render} from '../utils/render';
import {filter} from '../utils/filter.js';
import {FilterType, UpdateType} from '../const.js';

export default class Filter {
  constructor(filterContainer, filmsModel, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;

    this._filterComponent = null;
    this._ratingComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new MenuFiltersView(filters, this._filterModel.get());
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _renderUserRating(history) {
    const siteHeaderElement = document.querySelector('.header');

    const prevRatingComponent = this._ratingComponent;
    this._ratingComponent = new UserRankView(history);

    if (prevRatingComponent === null) {
      render(siteHeaderElement, this._ratingComponent);
      return;
    }

    replace(this._ratingComponent, prevRatingComponent);
    remove(prevRatingComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.get() === filterType) {
      return;
    }
    this._filterModel.set(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.get();
    this._renderUserRating(filter[FilterType.HISTORY](films).length);

    return [
      {
        type: FilterType.ALL,
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }
}
