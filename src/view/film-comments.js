import dayjs from 'dayjs';
import AbstractView from '../view/abstract.js';

const createFilmComment = (comment) => {
  const {
    id,
    text,
    emotion,
    author,
    commentDate,
  } = comment;

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dayjs(commentDate).format('YYYY/MM/DD HH:MM')}</span>
                <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
              </p>
            </div>
          </li>`;
};

export default class FilmComments extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._buttonDeleteHandler = this._buttonDeleteHandler.bind(this);
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }

  setClickButtonDeleteHandler(callback) {
    this._callback.deleteComment  = callback;
    this.getElement().querySelector('.film-details__comment-delete').addEventListener('click', this._buttonDeleteHandler);
  }

  _buttonDeleteHandler(evt) {
    evt.preventDefault();
    this._callback.deleteComment(evt.target.dataset.commentId);
  }
}
