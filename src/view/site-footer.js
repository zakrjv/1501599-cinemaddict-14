import AbstractView from '../view/abstract.js';

const createFooterStatistics = (filmsCount) => {
  return `<section class="footer__statistics">
    <p>${filmsCount} movies inside</p>
  </section>`;
};

export default class SiteFooter extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStatistics(this._filmsCount);
  }
}
