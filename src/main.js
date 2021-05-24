import UserRankView from './view/user-rank.js';
import FooterStatisticsView from './view/footer-statistics';
import {generateFilmCard} from './mock/film-card.js';
import {getRank} from './mock/user-rank.js';
import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import MenuFiltersPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import {getComments} from './mock/film-comments';

const FILMS_COUNT = 20;
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer__statistics');

const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const comments = getComments();
const userRank = getRank(films);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

filmsModel.set(films);
commentsModel.set(comments);

const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new MenuFiltersPresenter(siteMainElement, filmsModel, filterModel);

filterPresenter.init();
filmsPresenter.init();

render(siteHeaderElement, new UserRankView(userRank));
render(footerElement, new FooterStatisticsView(films.length));
