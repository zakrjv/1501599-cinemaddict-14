import AbstractView from '../view/abstract.js';
import {Rank} from '../const';

const createUserRank = (number) => {

  const numberWatchedFilms = () => {
    return (number <= 10 && number > 0) ? `${Rank.NOVICE}` :
      (number > 10 && number <= 20) ? `${Rank.FAN}` :
        (number >= 21) ? `${Rank.MOVIE_BUFF}` : '';
  };

  return `<section class="header__profile profile">
    <p class="profile__rating">${numberWatchedFilms()}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserRank extends AbstractView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRank(this._rank);
  }
}
