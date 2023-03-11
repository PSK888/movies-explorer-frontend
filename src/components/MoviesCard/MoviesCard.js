import './MoviesCard.css';
import React from "react";
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, likeMovie, deleteMovie, likedMovieList }) {
  const location = useLocation();

  return (
    <section className='movies-card'>
      <>
        <a className='movies-card__link' href={movie.trailerLink} target='_blank' rel="noreferrer">
          <img
            className='movies-card__image'
            src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
            alt={movie.nameEN}
          />
        </a>
        <div className='movies-card__about'>
          <div className='movies-card__texts'>
            <h2 className='movies-card__title'>{movie.nameRU}  ( {movie.nameEN} )</h2>
            <button className={`movies-card__like ${location.pathname === "/movies" ?
              (movie.id && likedMovieList.some((i) => i.movieId === movie.id) ? "movies-card__like_active" : "movies-card__like") : "movies-card__delete"}`}
              onClick={() => {
                if (location.pathname === "/movies") {
                  likeMovie(movie)
                }
                if (location.pathname === "/saved-movies") {
                  deleteMovie(movie)
                }
              }}
            />
          </div>
          <p className='movies-card__duration'>
            {`${Math.trunc(movie.duration / 60) > 0 ? `${Math.trunc(movie.duration / 60)}ч` : ''} ${movie.duration % 60}м`}
          </p>
        </div>
      </>
    </section>
  )
}

export default MoviesCard;