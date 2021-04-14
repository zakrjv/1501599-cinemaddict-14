import SiteMenuFilterView from './view/filters.js';
import SiteMenuSortView from './view/sort.js';
import SiteUserRankView from './view/user-rank.js';
import FilmsTemplateView from './view/films-template.js';
import FilmCardView from './view/film-card.js';
import ButtonShowMoreView from './view/button-show-more';
import FilmCommentView from './view/film-comments.js';
import SiteFooterView from './view/footer.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilmComments} from './mock/film-comments.js';
import {generateFilters} from './mock/filter.js';
import {getRank} from './mock/user-rank.js';
import {render, RenderPosition} from './utils.js';

const FILMS_COUNT = 30;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_COUNT = 2;

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const comments = new Array(films[0].commentsCount).fill(null).map(generateFilmComments);
const filters = generateFilters(films);
const userRank = getRank(films);

// Header
const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, new SiteUserRankView(userRank).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');

// Menu
render(siteMainElement, new SiteMenuFilterView(filters).getElement(), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SiteMenuSortView().getElement(), RenderPosition.BEFOREEND);

// Main
render(siteMainElement, new FilmsTemplateView().getElement(), RenderPosition.BEFOREEND);

const filmsElement = siteMainElement.querySelector('.films');
const filmListAllFilms = filmsElement.querySelector('.films-list--all-films');
const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');

// Films list
const filmListContainerFilms = filmListAllFilms.querySelector('.films-list__container');
for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  const filmCard = new FilmCardView(films[i]);
  render(filmListContainerFilms, filmCard.getElement(), RenderPosition.BEFOREEND);
  filmCard.openPopupEvent();
}

// Show more button
if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedTaskCount = FILMS_COUNT_PER_STEP;

  render(filmListAllFilms, new ButtonShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    films
      .slice(renderedTaskCount, renderedTaskCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => {
        const FilmCardComponent = new FilmCardView(film);
        render(filmListContainerFilms, FilmCardComponent.getElement(), RenderPosition.BEFOREEND);
        FilmCardComponent.openPopupEvent();
      });

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
  const ratedFilmCard = new FilmCardView(ratedFilm[i]);
  render(filmListContainerTopRated, ratedFilmCard.getElement(), RenderPosition.BEFOREEND);
  ratedFilmCard.openPopupEvent();
}

// Most commented
const generateCommentedFilms = () => {
  return films.slice().sort((a, b) => b.commentsCount - a.commentsCount);
};
const commentedFilm = generateCommentedFilms();

const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
for (let i = 0; i < EXTRA_COUNT; i++) {
  const commentedFilmCard = new FilmCardView(commentedFilm[i]);
  render(filmListContainerMostCommented, commentedFilmCard.getElement(), RenderPosition.BEFOREEND);
  commentedFilmCard.openPopupEvent();
}

// Footer
const footerElement = document.querySelector('.footer');
render(footerElement, new SiteFooterView(films.length).getElement(), RenderPosition.BEFOREEND);

// Comments
const commentsElement = document.querySelector('.film-details__comments-list');
for (let i = 0; i < films[0].commentsCount; i++) {
  render(commentsElement, new FilmCommentView(comments[i]).getElement(), RenderPosition.BEFOREEND);
}
