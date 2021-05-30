// import UserRankView from './view/user-rank.js';
import FooterStatisticsView from './view/footer-statistics';
// import {generateFilmCard} from './mock/film-card.js';
// import {getRank} from './mock/user-rank.js';
import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import MenuFiltersPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import {getComments} from './mock/film-comments';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic wW6ty3ar35dg945fGh3';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');

const comments = getComments();
const api = new Api(END_POINT, AUTHORIZATION);


const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

commentsModel.set(comments);

const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new MenuFiltersPresenter(siteMainElement, filmsModel, filterModel);

api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    render(footerElement, new FooterStatisticsView(filmsModel.get().length));
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
  });

filterPresenter.init();
filmsPresenter.init();
