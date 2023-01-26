import React, { useState } from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movies }) {
  const width = window.screen.width;
  const [counter, setCounter] = useState(width > 1279 ? 12 : 1 && width > 767 ? 8 : 1 && width > 319 ? 4 : 1);
  function handleClick() {
    setCounter(counter + (width > 319 ? 4 : 1));
  }
  return (
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm />
        <MoviesCardList movies={movies} counter={counter} />
        <button className='movies__button' type='button' onClick={handleClick}>Ещё</button>
      </div>
    </main>
  )
}

export default Movies;