export const createFilmCard = (filmCard) => {
  const DESC_LENGTH = 140;
  const ACTIVE_CLASS = 'film-card__controls-item--active';

  const {
    poster,
    title,
    rating,
    productionYear,
    duration,
    genres,
    description,
    commentsCount,
  } = filmCard;

  const mainGenre = genres.slice(0, 1);

  const truncatesDescription = (description) => {
    return description.substring(0, DESC_LENGTH - 1) + '…';
  };

  return `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${productionYear}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${mainGenre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length >= DESC_LENGTH ? truncatesDescription(description) : description}</p>
          <a class="film-card__comments">${commentsCount}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};
