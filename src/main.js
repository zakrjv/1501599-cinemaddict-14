import FooterStatisticsView from './view/footer-statistics';
import {render} from './utils/render.js';
import FilmListPresenter from './presenter/film-list.js';
import MenuFiltersPresenter from './presenter/filter.js';
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = 'Basic wW6ty3ar35dg945fGh3';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict/';

const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(api);

// commentsModel.set(comments);

const filterPresenter = new MenuFiltersPresenter(siteMainElement, filmsModel, filterModel);
const filmsPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel, api);

api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    filterPresenter.init();
    render(footerElement, new FooterStatisticsView(filmsModel.get().length));
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
  });

filmsPresenter.init();
