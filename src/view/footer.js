import {createElement} from '../utils.js';

const createFooterStatistics = (filmsCount) => {
  return `<section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>`;
};

export default class SiteFooter {
  constructor(filmsCount) {
    this._element = null;
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
