import MenuFiltersView from './view/menu-filters.js';
import UserRankView from './view/user-rank.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilters} from './mock/filter.js';
import {getRank} from './mock/user-rank.js';
import {render, RenderPosition} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import FooterStatisticsView from './view/footer-statistics';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

const FILMS_COUNT = 20;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer__statistics');

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const filters = generateFilters(films);
const userRank = getRank(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();
const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel);

filmsPresenter.init();

render(siteHeaderElement, new UserRankView(userRank));
render(siteMainElement, new MenuFiltersView(filters), RenderPosition.AFTERBEGIN);
render(footerElement, new FooterStatisticsView(films.length));
