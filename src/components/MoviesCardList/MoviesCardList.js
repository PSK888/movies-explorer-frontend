import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({ movieCards, currentUser, likedMovieList, likeMovie, deleteMovie, movieList }) {

  return (
    <section className='movies-cards'>
      <div className="movies-card-list">
        {movieCards.map((movie, id) => {
          return (
            <div className='movies-card-list__key' key={movie.id ? movie.id : id}>
              <MoviesCard
                movie={movie}
                currentUser={currentUser}
                likedMovieList={likedMovieList}
                likeMovie={likeMovie}
                deleteMovie={deleteMovie}
              />
            </div>
          )
        }).slice(0, movieList)}
      </div>
    </section>
  )
}

export default MoviesCardList;