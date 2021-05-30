import AbstractView from '../view/abstract.js';
import {FilterType} from '../const.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {
    type,
    name,
    count,
  } = filter;

  const comparesDataType = () => {
    let dataType = '';
    switch (name) {
      case FilterType.ALL:
        dataType = `${FilterType.ALL}`;
        break;
      case FilterType.WATCHLIST:
        dataType = `${FilterType.WATCHLIST}`;
        break;
      case FilterType.HISTORY:
        dataType = `${FilterType.HISTORY}`;
        break;
      case FilterType.FAVORITE:
        dataType = `${FilterType.FAVORITE}`;
        break;
    }
    return dataType;
  };

  return (
    `<a href="${name}"
        class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
        data-filter-type="${comparesDataType()}">
        ${name}
        ${name === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterMenu = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class MenuFilters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterMenu(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }
}
