import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies({ movieCards, movieList, deleteMovie, addMoreMovies, handleSearch, duration }) {
  return (
    <main className='saved-movies'>
      <div className='saved-movies__container'>
        <SearchForm
          handleSearch={handleSearch}
          duration={duration}
        />
        <MoviesCardList
          movieCards={movieCards}
          deleteMovie={deleteMovie}
          movieList={movieList} // изначальное количество фильмов на странице
          addMoreMovies={addMoreMovies} // Ещё
        />
        {movieCards.length === 0 ? 'Ничего не найдено' : movieCards.length > movieList && <button onClick={() => addMoreMovies()} className="movies__button">Еще</button>}
      </div>
    </main>
  )
}

export default SavedMovies;