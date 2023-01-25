import './MoviesCard.css';

function MoviesCard(props) {

  function handleLikeClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('movies-card__like_active');
  }

  function durationTime(duration) {
    const min = Math.round(duration / 60);
    const sec = duration % 60;
    return `${min}м ${sec}с`;
  }

  return (
    <div className='movies-card' >
      <a className='movies-card__link' href={props.movie.trailerLink} target='_blank' rel="noreferrer">
        <img src={`https://api.nomoreparties.co/${props.movie.image.url}`} alt={props.movie.nameRU} className='movies-card__image' />
      </a>
      <div className='movies-card__about'>
        <div className='movies-card__texts'>
          <h2 className='movies-card__title'>{props.movie.nameRU}</h2>
          <button className='movies-card__like' type='button' onClick={handleLikeClick} />
        </div>
        <p className='movies-card__duration'>
          {durationTime(props.movie.duration)}
        </p>
      </div>
    </div>
  )
}

export default MoviesCard;