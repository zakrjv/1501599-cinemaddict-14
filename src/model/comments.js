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

  deleteComment(updateType, commentUpdate) {
    const commentIndex = this._comments.findIndex((comment) => comment.id === commentUpdate.id);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, commentIndex),
      ...this._comments.slice(commentIndex + 1),
    ];
  }
}
