import UserRankView from './view/user-rank.js';
import FooterStatisticsView from './view/footer-statistics';
import {generateFilmCard} from './mock/film-card.js';
import {getRank} from './mock/user-rank.js';
import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import MenuFiltersPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

const FILMS_COUNT = 20;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer__statistics');

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const userRank = getRank(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel);
const filterPresenter = new MenuFiltersPresenter(siteMainElement, filterModel, filmsModel);

filterPresenter.init();
filmsPresenter.init();

render(siteHeaderElement, new UserRankView(userRank));
render(footerElement, new FooterStatisticsView(films.length));
