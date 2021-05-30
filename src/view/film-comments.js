import dayjs from 'dayjs';
import AbstractView from '../view/abstract.js';

const createFilmComment = (comments) => {
  const {
    id,
    comment,
    emotion,
    author,
    date,
  } = comments;

  return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${dayjs(date).format('YYYY/MM/DD HH:MM')}</span>
                <button class="film-details__comment-delete" data-comment-id="${id}" type="button">Delete</button>
              </p>
            </div>
          </li>`;
};

export default class FilmComments extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }
}
