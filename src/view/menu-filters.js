import AbstractView from '../view/abstract.js';

const createFilterItemTemplate = (filter) => {
  const {
    desc,
    link,
    count,
  } = filter;

  return (
    `<a href="${link}" class="main-navigation__item ${desc === 'All movies' ? 'main-navigation__item--active' : ''}">${desc}
${desc === 'All movies' ? '' : `<span class="main-navigation__item-count">${count}</span>`}</a>`
  );
};

const createFilterMenu = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
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
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterMenu(this._filters);
  }
}
