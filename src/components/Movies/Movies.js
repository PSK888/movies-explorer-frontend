import React, { useEffect, useState } from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies(props) {
  const [counter, setCounter] = useState(0);

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1280) {
      setCounter(16);
    } else if (display > 1000) {
      setCounter(12);
    } else if (display > 767) {
      setCounter(8);
    } else if (display < 480) {
      setCounter(5);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  function showMore() {
    const display = window.innerWidth;
    if (display > 1280) {
      setCounter(counter + 4);
    } else if (display > 1100) {
      setCounter(counter + 3);
    }
    else if (display < 1100) {
      setCounter(counter + 2);
    }
  }

  return (
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm handleSearch={props.handleSearch} />
        <MoviesCardList
          movies={props.movies}
          counter={counter}
          mainApi={props.mainApi}
          handleDelete={props.handleDelete}
          isLoading={props.isLoading}
          nothingFound={props.nothingFound}
        />
        {counter >= props.movies.length ? <></> :
          <button className='movies__button' type='button' onClick={showMore}>Ещё</button>
        }
      </div>
    </main>
  )
}

export default Movies;