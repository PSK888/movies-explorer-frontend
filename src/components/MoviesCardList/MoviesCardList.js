import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList(props) {

  return (
    <section className='movies-card-list'>
      {props.movies.slice(0, props.counter).map((movie) => {
        return (
          <MoviesCard
            counter={props.counter}
            mainApi={props.mainApi}
            likedMovies={props.likedMovies}
            movie={movie}
            handleDelete={props.handleDelete}
            key={movie.nameRU}
            setSavedFilteredMovies={props.setSavedFilteredMovies}
            savedFilteredMovies={props.savedFilteredMovies}
            handleDeleteMovie={props.handleDeleteMovie}
          />
        )
      })}
    </section>
  )
}

export default MoviesCardList;