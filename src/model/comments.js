import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }

  add(updateType, filmUpdate, commentUpdate) {
    this._comments = [
      ...this._comments,
      commentUpdate,
    ];

    this._notify(updateType, filmUpdate);
  }

  delete(updateType, deletedCommentId, film) {
    this._comments = [...this._comments].filter((comment) => comment !== deletedCommentId);

    this._notify(updateType, film, deletedCommentId);
  }
}
