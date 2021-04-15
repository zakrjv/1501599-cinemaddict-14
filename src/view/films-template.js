import {createElement} from '../utils.js';

const createFilmsTemplate = () => {
  return `<section class="films">
  <section class="films-list films-list--all-films">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
  </section>

  <section class="films-list films-list--extra  films-list--top-rated">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>

  <section class="films-list films-list--extra  films-list--most-commented">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>
</section>`;
};

export default class FilmsTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsTemplate();
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
