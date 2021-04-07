import {createFilterMenu} from './view/filters.js';
import {createSortMenu} from './view/sort.js';
import {createUserRank} from './view/user-rank.js';
import {createFooterStatistics} from './view/footer.js';
import {createFilmsTemplate} from './view/films-template.js';
import {createFilmCard} from './view/film-card.js';
import {createButtonShowMore} from './view/button-show-more';
// import {createPopupFilmDetails} from './view/film-details-popup.js';
import {generateFilmCard} from './mock/film-card.js';
// import {createFilmComment} from './view/film-comments.js';
// import {generateFilmComments} from './mock/film-comments.js';
import {generateFilters} from './mock/filter.js';
import {getRank} from './mock/user-rank.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
// const comments = new Array(films[0].commentsCount).fill(null).map(generateFilmComments);
const filters = generateFilters(films);
const userRank = getRank(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createUserRank(userRank), 'beforeend');

const siteMainElement = document.querySelector('.main');

// Menu
render(siteMainElement, createFilterMenu(filters), 'beforeend');
render(siteMainElement, createSortMenu(), 'beforeend');

// Main
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllFilms = filmsElement.querySelector('.films-list--all-films');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// Films list
const filmListContainerFilms = filmListAllFilms.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmListContainerFilms, createFilmCard(films[i]), 'beforeend');
}

// Show more button
if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedTaskCount = FILMS_COUNT_PER_STEP;

  render(filmListAllFilms, createButtonShowMore(), 'beforeend');

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedTaskCount, renderedTaskCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainerFilms, createFilmCard(film), 'beforeend'));

    renderedTaskCount += FILMS_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

// Top rated
const generateRatedFilms = () => {
  return films.slice().sort((a, b) => b.rating - a.rating);
};
const ratedFilm = generateRatedFilms();

const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  render(filmListContainerTopRated, createFilmCard(ratedFilm[i]), 'beforeend');
}

// Most commented
const generateCommentedFilms = () => {
  return films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
};
const commentedFilm = generateCommentedFilms();

const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  render(filmListContainerMostCommented, createFilmCard(commentedFilm[i]), 'beforeend');
}

// Footer
const footerElement = document.querySelector('.footer');
render(footerElement, createFooterStatistics(films.length), 'beforeend');

// // Popup
// const bodyElement = document.body;
// render(bodyElement, createPopupFilmDetails(films[0]), 'beforeend');
//
// // Comments
// const commentsElement = document.querySelector('.film-details__comments-list');
// for (let i = 0; i < films[0].commentsCount; i++) {
//   render(commentsElement, createFilmComment(comments[i]), 'beforeend');
// }
