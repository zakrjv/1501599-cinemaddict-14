import AbstractView from '../view/abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();
    const intElemScrollTop = prevElement.scrollTop;

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = intElemScrollTop;

    this.restoreHandlers();
  }

  updateState(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}
