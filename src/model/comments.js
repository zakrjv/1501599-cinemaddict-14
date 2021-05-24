import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, filmUpdate, commentUpdate) {
    this._comments = [
      ...this._comments,
      commentUpdate,
    ];

    this._notify(updateType, filmUpdate);
  }

  deleteComment(updateType, deletedCommentId, film) {
    this._comments = [...this._comments].filter((comment) => comment !== deletedCommentId);

    this._notify(updateType, film, deletedCommentId);
  }
}
