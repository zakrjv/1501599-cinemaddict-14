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

export const createFilterMenu = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return ` <nav class="main-navigation">
  <div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
