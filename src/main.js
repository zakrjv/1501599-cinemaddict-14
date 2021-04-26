import MenuFiltersView from './view/menu-filters.js';
import UserRankView from './view/user-rank.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilters} from './mock/filter.js';
import {getRank} from './mock/user-rank.js';
import {render, RenderPosition} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';

const FILMS_COUNT = 30;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const filters = generateFilters(films);
const userRank = getRank(films);
const filmsPresenter = new FilmListPresenter(siteMainElement);

filmsPresenter.init(films);

render(siteHeaderElement, new UserRankView(userRank));
render(siteMainElement, new MenuFiltersView(filters), RenderPosition.AFTERBEGIN);

// // Render card
// const renderFilmCard = (container, film) => {
//   const bodyElement = document.body;
//   const filmCard = new FilmCardView(film);
//   const popupFilmDetails = new PopupFilmDetailsView(film);
//
//   render(container, filmCard);
//
//   filmCard.setClickHandler(() => {
//     bodyElement.appendChild(popupFilmDetails.getElement());
//     bodyElement.classList.add('hide-overflow');
//
//     const onEscKeyDown = (evt) => {
//       if (evt.key === 'Escape' || evt.key === 'Esc') {
//         evt.preventDefault();
//         hidePopup();
//       }
//     };
//
//     const hidePopup = () => {
//       bodyElement.removeChild(popupFilmDetails.getElement());
//       bodyElement.classList.remove('hide-overflow');
//       document.removeEventListener('keydown', onEscKeyDown);
//     };
//
//     document.addEventListener('keydown', onEscKeyDown);
//
//     popupFilmDetails.setClickButtonCloseHandler(() => {
//       hidePopup();
//     });
//   });
// };
//
// // Header
// const siteHeaderElement = document.querySelector('.header');
// render(siteHeaderElement, new UserRankView(userRank));
//
// const siteMainElement = document.querySelector('.main');
//
// // Menu
// render(siteMainElement, new MenuFiltersView(filters), RenderPosition.AFTERBEGIN);
// render(siteMainElement, new SiteMenuSortView());
//
// // Main
// if (films.length === 0) {
//   render(siteMainElement, new NoFilmsView());
// } else {
//   render(siteMainElement, new FilmsSectionsView());
//
//   const filmsElement = siteMainElement.querySelector('.films');
//   const filmListAllFilms = filmsElement.querySelector('.films-list--all-films');
//   const filmListTopRated = filmsElement.querySelector('.films-list--top-rated');
//   const filmListMostCommented = filmsElement.querySelector('.films-list--most-commented');
//
//   // Films list
//   const filmListContainerFilms = filmListAllFilms.querySelector('.films-list__container');
//   for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
//     renderFilmCard(filmListContainerFilms, films[i]);
//   }
//
//   // Show more button
//   if (films.length > FILMS_COUNT_PER_STEP) {
//     let renderedFilmCount = FILMS_COUNT_PER_STEP;
//
//     const showMoreComponent = new ButtonShowMoreView();
//     render(filmListAllFilms, showMoreComponent);
//
//     showMoreComponent.setClickHandler(() => {
//       films
//         .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
//         .forEach((film) => {
//           renderFilmCard(filmListContainerFilms, film);
//         });
//
//       renderedFilmCount += FILMS_COUNT_PER_STEP;
//
//       if (renderedFilmCount >= films.length) {
//         showMoreComponent.getElement().remove();
//       }
//     });
//   }
//
//   // Top rated
//   const filmListContainerTopRated = filmListTopRated.querySelector('.films-list__container');
//   const ratedFilmsList = films.slice().sort((a, b) => b.rating - a.rating);
//   const ratedFilm = ratedFilmsList.slice(0, 2);
//
//   ratedFilm.forEach((film) => {
//     renderFilmCard(filmListContainerTopRated, film);
//   });
//
//   // Most commented
//   const filmListContainerMostCommented = filmListMostCommented.querySelector('.films-list__container');
//   const commentedFilmsList = films.slice().sort((a, b) => b.comments.length - a.comments.length);
//   const commentedFilm = commentedFilmsList.slice(0, 2);
//
//   commentedFilm.forEach((film) => {
//     renderFilmCard(filmListContainerMostCommented, film);
//   });
// }
//
// // Footer
// const footerElement = document.querySelector('.footer');
// render(footerElement, new SiteFooterView(films.length));
