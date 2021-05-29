// import UserRankView from './view/user-rank.js';
// import FooterStatisticsView from './view/footer-statistics';
// import {generateFilmCard} from './mock/film-card.js';
// import {getRank} from './mock/user-rank.js';
// import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import MenuFiltersPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import {getComments} from './mock/film-comments';
import Api from './api.js';
import {UpdateType} from './const.js';

// const FILMS_COUNT = 20;
const AUTHORIZATION = 'Basic wW6ty3ar35dg945fGh3';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const footerElement = document.querySelector('.footer__statistics');

// const films = new Array(FILMS_COUNT).fill(null).map(generateFilmCard);
const comments = getComments();
// const userRank = getRank(films);
const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

commentsModel.set(comments);

const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new MenuFiltersPresenter(siteMainElement, filmsModel, filterModel);

api.getFilms()
  .then((films) => {
    FilmsModel.set(UpdateType.INIT, films);
    filterPresenter.init();
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
  });

filmsPresenter.init();

// render(siteHeaderElement, new UserRankView(userRank));
// render(footerElement, new FooterStatisticsView(films.length));
