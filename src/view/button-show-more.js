import AbstractView from '../view/abstract.js';

const createButtonShowMore = () => {
  return `<button class="films-list__show-more">
  Show more
  </button>`;
};

export default class ButtonShowMore extends AbstractView {
  getTemplate() {
    return createButtonShowMore();
  }
}
