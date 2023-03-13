import React from "react";
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ movieCards, movieList, likedMovieList, likeMovie, deleteMovie, addMoreMovies, currentUser, handleSearch, duration }) {

  return (
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm
          handleSearch={handleSearch}
          duration={duration}
        />
        <MoviesCardList
          movieCards={movieCards}
          likeMovie={likeMovie}
          likedMovieList={likedMovieList}
          deleteMovie={deleteMovie}
          currentUser={currentUser}
          movieList={movieList} // изначальное количество фильмов на странице
          addMoreMovies={addMoreMovies} // Ещё

        />
        {movieCards.length === 0 ? '' : movieCards.length > movieList && <button onClick={() => addMoreMovies()} className="movies__button">Еще</button>}

      </div>



    </main>
  )
}

export default Movies;