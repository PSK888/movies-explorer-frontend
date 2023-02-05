import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';

import Header from '../Header/Header';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Error from '../Error/Error';
import Menu from '../Menu/Menu';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);
  const [isEditState, setIsEditState] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [notFound, setNotFound] = useState(false);


  function handleSearch() {
    setIsloading(true);
    const key = new RegExp(localStorage.getItem('movieKey'));

    mainApi.getMovies()
      .then((movies) => {
        localStorage.setItem('savedMovies', JSON.stringify(movies));
        const likedMovies = [];
        movies.forEach((movie) => { likedMovies.push(movie.movieId) })
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
      })
      .catch(err => console.log(err));

    moviesApi.getMovies()
      .then((movies) => {
        let moviesList = movies;
        if (JSON.parse(localStorage.getItem('checkbox'))) {
          moviesList = movies.filter((item) => item.duration < 41)
        } else {
          moviesList = movies.filter((item) => item.duration > 40);
        }
        const filteredMovies = moviesList.filter((item) => key.test(item.nameRU) || key.test(item.nameEN));
        localStorage.setItem('movies', JSON.stringify(filteredMovies))
        if (filteredMovies.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }

  function handleSavedMovies() {
    setIsloading(true);
    const key = new RegExp(localStorage.getItem('movieSavedKey'));

    mainApi.getMovies()
      .then((movies) => {
        let moviesList = movies;
        if (JSON.parse(localStorage.getItem('checkboxSaved'))) {
          moviesList = movies.filter((item) => item.duration <= 40);
        } else {
          moviesList = movies.filter((item) => item.duration > 40);
        }
        const filteredMovies = moviesList.filter((item) => key.test(item.nameRU) || key.test(item.nameEN));
        localStorage.setItem('savedFilteredMovies', JSON.stringify(filteredMovies));
        setSavedFilteredMovies(filteredMovies);
        if (filteredMovies.length === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }

  function handleDeleteMovie(id) {
    JSON.parse(localStorage.getItem('savedMovies')).forEach((movie) => {
      if (movie.movieId === id) {
        mainApi.deleteMovie(movie._id)
          .then(() => {
            const likedMovies = JSON.parse(localStorage.getItem('likedMovies')).filter((item) => !(item === id))
            localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
            const savedFilteredMovies = JSON.parse(localStorage.getItem('savedFilteredMovies')).filter((movie) => !(movie.movieId === id))
            localStorage.setItem('savedFilteredMovies', JSON.stringify(savedFilteredMovies));
            setSavedFilteredMovies(savedFilteredMovies);
          })
          .catch(err => console.log(err));
      }
    })
  }

  function handleEditClick() {
    setIsEditState(true);
  }

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(jwt => {
        localStorage.setItem('jwt', jwt.token);
        setMessage('');
        setLoggedIn(true);
        navigate('/movies');

      })
      .catch((err) => {
        if (err.includes(401)) {
          setMessage("Неверный логин или пароль");
        } else {
          setMessage("Произошла ошибка при авторизации");
        }
      })
  }

  function handleLogout() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    setSavedFilteredMovies([]);
    navigate('/')
  }

  function handleRegister(email, password, name) {
    mainApi.register(email, password, name)
      .then(res => {
        handleLogin(email, password)
        setMessage('');
        setLoggedIn(true);
        setCurrentUser(res)
        navigate('/movies');
      })
      .catch((err) => {
        if (err.includes(409)) {
          setMessage("Пользователь с данным email уже существует");
        } else {
          setMessage("Произошла ошибка при регистрации пользователя");
        }
      })
  }

  function handleUpdateUserInfo(email, name) {
    mainApi.updateUserInfo(email, name)
      .then((user) => {
        setMessage('');
        setCurrentUser(user);
        setIsEditState(false);
      })
      .catch((err) => {
        if (err.includes(409)) {
          setMessage("Пользователь с данным email уже существует");
        } else {
          setMessage("Произошла ошибка при обновлении профиля");
        }
      })
  }

  useEffect(() => {
    setSavedFilteredMovies(JSON.parse(localStorage.getItem('savedFilteredMovies')) ?
      JSON.parse(localStorage.getItem('savedFilteredMovies')) : [])
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.getUserInfo(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location);
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    setIsEditState(false);
    setNotFound(false);
    setMessage('');
  }, [navigate])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} openMenu={openMenu} />
        <Routes >
          <Route exact path='/' element={
            <Main />
          } />
          <Route path="/signin" element={
            <Login handleLogin={handleLogin} message={message} loggedIn={loggedIn} />
          } />
          <Route path="/signup" element={
            <Register handleRegister={handleRegister} message={message} loggedIn={loggedIn} />
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                handleLogout={handleLogout}
                handleUpdateUserInfo={handleUpdateUserInfo}
                handleEditClick={handleEditClick}
                isEditState={isEditState}
                message={message}
              />
            </ProtectedRoute>
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                handleSearch={handleSearch}
                movies={JSON.parse(localStorage.getItem('movies')) ? JSON.parse(localStorage.getItem('movies')) : []}
                mainApi={mainApi}
                handleDelete={handleDeleteMovie}
                isLoading={isLoading}
                nothingFound={notFound}
              />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                handleSearch={handleSavedMovies}
                movies={savedFilteredMovies}
                setSavedFilteredMovies={setSavedFilteredMovies}
                mainApi={mainApi}
                handleDeleteMovie={handleDeleteMovie}
                isLoading={isLoading}
                nothingFound={notFound}
              />
            </ProtectedRoute>
          } />
          <Route path='*' element={
            <Error />
          } />
        </Routes>
        <Menu isOpen={isMenuOpen} closeMenu={closeMenu} />
        {location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ?
          <Footer /> : <></>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;