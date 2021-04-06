import {createSiteMenu} from './view/menu.js';
import {createUserRank} from './view/user-rank.js';
import {createFilmsTemplate} from './view/films-template.js';
import {createFilmCard} from './view/film-card.js';
import {createButtonShowMore} from './view/button-show-more';
// import {createPopupFilmDetails} from './view/film-details-popup.js';
import {generateFilmCard} from './mock/film-card.js';

const FILMS_COUNT = 5;
const EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Header
const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createUserRank(), 'beforeend');

// Main
const siteMainElement = document.querySelector('.main');

render(siteMainElement, createSiteMenu(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllFilms = filmsElement.querySelector('.films-list--all-films');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// Films list
const filmListContainerFilms = filmListAllFilms.querySelector('.films-list__container');
for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmListContainerFilms, createFilmCard(films[i]), 'beforeend');
}

// Show more button
render(filmListAllFilms, createButtonShowMore(), 'beforeend');

// Top rated
const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  render(filmListContainerTopRated, createFilmCard(films[i]), 'beforeend');
}

// Most commented
const filmListContainerMostCommented= filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  render(filmListContainerMostCommented, createFilmCard(films[i]), 'beforeend');
}

// Popup
// const bodyElement = document.body;
// render(bodyElement, createPopupFilmDetails(), 'beforeend');
