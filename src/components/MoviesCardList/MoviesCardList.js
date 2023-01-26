import React from "react";
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movies, counter }) {
  return (
    <section className='movies-card-list'>
      {movies.slice(0, counter).map((movie) => (
        <MoviesCard key={movie._id} card={movie} counter={counter} />
      ))}
    </section>
  )
}

export default MoviesCardList;