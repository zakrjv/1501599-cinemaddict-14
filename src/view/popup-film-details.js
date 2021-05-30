import dayjs from 'dayjs';
import FilmCommentsView from '../view/film-comments.js';
import SmartView from './smart.js';
import {UserAction} from '../const.js';

const createPopupFilmDetails = (state, commentsAll) => {
  const {
    poster,
    ageRating,
    title,
    originalTitle,
    director,
    releaseDate,
    writers,
    comments,
    cast,
    rating,
    country,
    duration,
    genres,
    description,
    isWatchlist,
    isWatched,
    isFavorite,
    emojiChecked,
    writtenComment,
  } = state;

  const filmComments = commentsAll.filter((comment) => comments.indexOf(comment.id) >= 0);
  const commentsList = filmComments.map((comment) => {
    return new FilmCommentsView(comment).getTemplate();
  });

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${cast}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${dayjs(releaseDate).format('DD MMMM YYYY')}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genres.length > 1 ? 'Genres' : 'Genre'}</td>
              <td class="film-details__cell">
                ${genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join('')}
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? ' checked' : ''}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? ' checked' : ''}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? ' checked' : ''}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${commentsList}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${emojiChecked ? `<img src="images/emoji/${emojiChecked}.png" width="55" height="55" alt="emoji-${emojiChecked}">` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${writtenComment ? writtenComment : ''}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopupFilmDetails extends SmartView {
  constructor(filmCard, filmComments) {
    super();
    this._state = PopupFilmDetails.parseFilmToState(filmCard);
    this._filmComments = filmComments;

    this._watchlistPopupClickHandler = this._watchlistPopupClickHandler.bind(this);
    this._watchedPopupClickHandler = this._watchedPopupClickHandler.bind(this);
    this._favoritePopupClickHandler = this._favoritePopupClickHandler.bind(this);
    this._buttonCloseHandler = this._buttonCloseHandler.bind(this);

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);

    this._buttonDeleteCommentHandler = this._buttonDeleteCommentHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupFilmDetails(this._state, this._filmComments);
  }

  // buttons in film popup
  setWatchlistPopupClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistPopupClickHandler);
  }

  setWatchedPopupClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedPopupClickHandler);
  }

  setFavoritePopupClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoritePopupClickHandler);
  }

  setClickButtonCloseHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._buttonCloseHandler);
  }

  setClickButtonDeleteCommentHandler(callback) {
    this._callback.deleteClick = callback;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setClickButtonCloseHandler(this._callback.click);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('change', this._emojiClickHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
    this.getElement()
      .querySelector('.film-details__comments-list')
      .addEventListener('click', this._buttonDeleteCommentHandler);
  }

  _buttonCloseHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _favoritePopupClickHandler() {
    this._callback.favoriteClick();
  }

  _watchlistPopupClickHandler() {
    this._callback.watchlistClick();
  }

  _watchedPopupClickHandler() {
    this._callback.watchedClick();
  }

  _emojiClickHandler(evt) {
    this.updateState({
      emojiChecked: evt.target.value,
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateState({
      writtenComment: evt.target.value,
    }, true);
  }

  _buttonDeleteCommentHandler(evt) {
    evt.preventDefault();

    const button = this.getElement().querySelector('.film-details__comment-delete');
    if (!button) return;

    const commentIdToDelete = evt.target.dataset.commentId;

    this._state = PopupFilmDetails.parseStateToFilm(this._state, UserAction.DELETE_COMMENT, commentIdToDelete);
    this.updateElement();
  }

  static parseFilmToState(film) {
    return Object.assign({}, film);
  }

  static parseStateToFilm(state, action, comment) {
    state = Object.assign({}, state);

    delete state.emojiChecked;
    delete state.writtenComment;

    if (action === UserAction.DELETE_COMMENT){
      state.comments = [...state.comments].filter((commentItem) => commentItem !== comment);
    }

    return state;
  }
}
