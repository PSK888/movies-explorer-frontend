import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './SavedMovies.css';

function SavedMovies({ movies }) {

  return (
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm />
        <MoviesCardList movies={movies} />
      </div>
    </main>
  )
}

export default SavedMovies;