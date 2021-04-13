import SiteMenuFilterView from './view/filters.js';
import SiteMenuSortView from './view/sort.js';
import SiteUserRankView from './view/user-rank.js';
import FilmsTemplateView from './view/films-template.js';
import FilmCardView from './view/film-card.js';
import ButtonShowMoreView from './view/button-show-more';
import PopupFilmDetailsView from './view/film-details-popup.js';
import {generateFilmCard} from './mock/film-card.js';
import FilmCommentView from './view/film-comments.js';
import {generateFilmComments} from './mock/film-comments.js';
import {generateFilters} from './mock/filter.js';
import {getRank} from './mock/user-rank.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';
import SiteFooterView from './view/footer.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const comments = new Array(films[0].commentsCount).fill(null).map(generateFilmComments);
const filters = generateFilters(films);
const userRank = getRank(films);

// Header
const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new SiteUserRankView(userRank).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');

// Menu
renderElement(siteMainElement, new SiteMenuFilterView(filters).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteMenuSortView().getElement(), RenderPosition.BEFOREEND);

// Main
renderElement(siteMainElement, new FilmsTemplateView().getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllFilms = filmsElement.querySelector('.films-list--all-films');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// Films list
const filmListContainerFilms = filmListAllFilms.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderElement(filmListContainerFilms, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

// Show more button
if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedTaskCount = FILMS_COUNT_PER_STEP;

  renderElement(filmListAllFilms, new ButtonShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedTaskCount, renderedTaskCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmListContainerFilms, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

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
  renderElement(filmListContainerTopRated, new FilmCardView(ratedFilm[i]).getElement(), RenderPosition.BEFOREEND);
}

// Most commented
const generateCommentedFilms = () => {
  return films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
};
const commentedFilm = generateCommentedFilms();

const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  renderElement(filmListContainerMostCommented, new FilmCardView(commentedFilm[i]).getElement(), RenderPosition.BEFOREEND);
}

// Footer
const footerElement = document.querySelector('.footer');
renderElement(footerElement, new SiteFooterView(films.length).getElement(), RenderPosition.BEFOREEND);

// Popup
const bodyElement = document.body;
renderElement(bodyElement, new PopupFilmDetailsView(films[0]).getElement(), RenderPosition.BEFOREEND);

// Comments
const commentsElement = document.querySelector('.film-details__comments-list');
for (let i = 0; i < films[0].commentsCount; i++) {
  renderElement(commentsElement, new FilmCommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
}
