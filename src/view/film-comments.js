import dayjs from 'dayjs';
import AbstractView from '../view/abstract.js';

const createFilmComment = (comment) => {
  const {
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
                <span class="film-details__comment-day">${dayjs(commentDate).format('YYYY/MM/DD h:mm A')}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
};

export default class FilmComment extends AbstractView {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() {
    return createFilmComment(this._comment);
  }
}
