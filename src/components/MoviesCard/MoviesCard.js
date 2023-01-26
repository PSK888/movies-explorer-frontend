import './MoviesCard.css';
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ card }) {
  const [like, setLike] = useState(false);
  const { pathname } = useLocation();
  const isLiked = pathname === "/saved-movies"

  function handleLikeClick() {
    setLike(!like);
  }

  return (
    <div className='movies-card' >
      <a className='movies-card__link' href={card.trailerLink} target='_blank' rel="noreferrer">
        <img src={card.poster} alt={card.title} className="movies-card__image" />
      </a>
      <div className='movies-card__about'>
        <div className='movies-card__texts'>
          <h2 className='movies-card__title'>{card.title}</h2>
          {isLiked ? (
            <button className='movies-card__delete' type='button' />
          ) : (
            <button className={`movies-card__like movies-card__like${like ? "_active" : ""}`} type='button' onClick={handleLikeClick} />
          )}
        </div>
        <p className='movies-card__duration'>
          {card.duration}
        </p>
      </div>
    </div>
  )
}

export default MoviesCard;