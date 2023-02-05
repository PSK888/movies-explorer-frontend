import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

function MoviesCardList(props) {
  const [isNone, setIsNone] = useState(true);

  useEffect(() => {
    if (props.movies.length === 0) {
      setIsNone(true);
    } else {
      setIsNone(false);
    }
  }, [props.movies])

  return (
    <>
      {props.isLoading ? <Preloader /> :
        <>
          {isNone ? '' :
            <section className='movies-cards'>
              <ul className="movies-card-list">
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
              </ul>
            </section>
          }
          {props.nothingFound ? <p className='movies-card-list__text'>Ничего не найдено</p> : ''}
        </>
      }
    </>
  )
}

export default MoviesCardList;