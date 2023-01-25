import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies(props) {

  return (
    <main className='movies'>
      <div className='movies__container'>
        <SearchForm handleSearch={props.handleSearch} />
     *savedMovies*
      </div>
    </main>
  )
}

export default SavedMovies;