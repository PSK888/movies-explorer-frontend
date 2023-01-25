import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies(props) {
  const width = window.screen.width;
 
  const [counter, setCounter] = useState(width > 768 ? 16 : 1); // начальное кол-во карточек
 
  function handleClick() {
    setCounter(counter + (width > 768 ? 8 : 1)); // (еще) + 8
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
        <button className='movies__button' type='button' onClick={handleClick}>Ещё</button>
      </div>
    </main>
  )
}

export default Movies;