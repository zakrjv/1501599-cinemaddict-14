import AbstractView from '../view/abstract.js';

const createAllFilmsList = () => {
  return `<section class="films">
            <section class="films-list films-list--all-films">
              <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
              <div class="films-list__container"></div>
            </section>
          </section>`;
};

export default class AllFilmsList extends AbstractView {
  getTemplate() {
    return createAllFilmsList();
  }
}
