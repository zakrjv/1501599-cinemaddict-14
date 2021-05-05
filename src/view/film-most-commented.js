import AbstractView from '../view/abstract.js';

const createFilmMostCommented = () => {
  return `<section class="films-list films-list--extra  films-list--most-commented">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>
</section>`;
};

export default class FilmMostCommented extends AbstractView {
  getTemplate() {
    return createFilmMostCommented();
  }
}
