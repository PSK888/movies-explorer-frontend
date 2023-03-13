import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import useLookWindowSize from "../../hooks/useLookWindowSize";
import Preloader from '../Preloader/Preloader';
import {
  SHORT_MOVIE, EMAIL_ERROR, AUTH_ERROR, QUANTITY_MAX,
  QUANTITY_LAPTOP, QUANTITY_TABLET, QUANTITY_MOBILE,
  LIST_MAX, LIST_LAPTOP, LIST_TABLET, LIST_MOBILE,
  SCREEN_MAX, SCREEN_LAPTOP, SCREEN_TABLET, SCREEN_MOBILE,
} from '../../utils/constants';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname; // путь нынешней ссылки
  const jwt = localStorage.getItem('jwt');
  const { width } = useLookWindowSize() // хук ширины экрана

  ////////////////////////////////////////////// useState //////////////////////////////////////////////

  const [loggedIn, setLoggedIn] = useState(false); // проверка авторизации
  const [currentUser, setCurrentUser] = useState({}); // установка данных пользователя
  const [menuOpen, setMenuOpen] = useState(false); // бургер-меню
  const [message, setMessage] = useState(''); // ошибки API
  const [movieList, setMovieList] = useState(0); // изначальное количество фильмов на странице
  const [addMovieQuantity, setAddMovieQuantity] = useState(0); // сколько добавить фильмов
  const [localMovieBase, setLocalMovieBase] = useState([]); // локальное хранилище полученных фильмов
  const [localLikedMovies, setLocalLikedMovies] = useState([]); // локальное хранилище избранных фильмов
  const [movies, setMovies] = useState([]); // фильмы пользователя
  const [likedMovies, setLikedMovies] = useState([]); // избранные фильмы пользователя
  const [isLoading, setIsLoading] = useState(true); // Прелоудер

  ////////////////////////////////////////////// useEffect //////////////////////////////////////////////

  // Получаем токен -> авторизируемся 
  useEffect(() => {
    if (jwt) {
      mainApi.checkToken(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          navigate(path);
        })
        .catch((err) => {
          console.log(`Ошибка авторизации: ${err}`);
          setLoggedIn(false);
        });
    }
    // eslint-disable-next-line 
  }, [jwt]);

  // Получаем фильмы beatfilm и сохраняем в локальное хранилище
  useEffect(() => {
    if (jwt) {
      setIsLoading(true);
      moviesApi.getMovies()
        .then(data => {
          localStorage.setItem('data', JSON.stringify(data));
          const allMovies = JSON.parse(localStorage.getItem('data'));
          setLocalMovieBase(allMovies);
          // console.log(allMovies)
        })
        .catch((err) => {
          console.log(`Не удалось получить список beatfilm : ${err}`);
        })
        .finally(() => setIsLoading(false)); // отключаем прелоудер по завершении
    }
  }, [jwt]);

  // Получаем избранные фильмы из локального хранилища
  useEffect(() => {
    setIsLoading(true);
    if (jwt && currentUser !== null) {
      mainApi.getLikedMovies(jwt)
        .then(data => {
          localStorage.setItem('likedMovieList', JSON.stringify(data.filter((i) => i.owner === currentUser._id)))
          const userMovies = JSON.parse(localStorage.getItem('likedMovieList'));
          setLocalLikedMovies(userMovies);
        })
        .catch((err) => {
          console.log(`Не удалось получить список из локального хранилища : ${err}`);
        })
        .finally(() => setIsLoading(false)); // отключаем прелоудер по завершении
    }
  }, [jwt, currentUser]);

  // Хук колличества карточек на странице + добавление кнопкой "ещё"
  useEffect(() => {
    if (width >= SCREEN_MAX) {
      setAddMovieQuantity(QUANTITY_MAX);
      setMovieList(LIST_MAX);
    } else if (width >= SCREEN_LAPTOP && width < SCREEN_MAX) {
      setAddMovieQuantity(QUANTITY_LAPTOP);
      setMovieList(LIST_LAPTOP);
    } else if (width >= SCREEN_TABLET && width < SCREEN_LAPTOP) {
      setAddMovieQuantity(QUANTITY_TABLET);
      setMovieList(LIST_TABLET);
    } else if (width <= SCREEN_MOBILE && width < SCREEN_TABLET) {
      setAddMovieQuantity(QUANTITY_MOBILE);
      setMovieList(LIST_MOBILE);
    }
  }, [width]);

  //////////////////////////// Регистрация, Авторизация, Изменение данных пользователя, Выход из аккаунта, Бургер-меню ///////////////////////////////

  // Регистрация
  function handleRegistration(email, password, name) {
    mainApi.register(email, password, name)
      .then(data => {
        handleLogin(email, password)
        setLoggedIn(true);
        setCurrentUser(data)
        navigate('/movies');
        setMessage('');
      })
      .catch((err) => {
        if (EMAIL_ERROR) {
          setMessage("Данный email уже зарегистрирован");
        } else {
          setMessage(`Во время регистрации произошла ошибка: ${err}`);
        }
      })
  };
  // Авторизация
  function handleLogin(email, password) {
    mainApi.login(email, password)
      .then(jwt => {
        localStorage.setItem('jwt', jwt.token);
        setCurrentUser({ email, password });
        setLoggedIn(true);
        navigate('/movies');
        setMessage('');
      })
      .catch((err) => {
        if (AUTH_ERROR) {
          setMessage("Неверные логин или пароль");
        } else {
          setMessage(`Во время авторизации произошла ошибка: ${err}`);
        }
      })
  };

  // Изменение данных пользователя
  function handleUpdateUserInfo(email, name) {
    mainApi.updateUserInfo(email, name)
      .then((data) => {
        setCurrentUser(data);
        setMessage('');
      })
      .catch((err) => {
        if (EMAIL_ERROR) {
          setMessage("Данный email уже зарегистрирован");
        } else {
          setMessage(`Во время изменения данных произошла ошибка: ${err}`);
        }
      })
  };

  // Выход из профиля с удалением всех данных
  function handleLogout() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    setLocalMovieBase([]);
    setLocalLikedMovies([]);
    setMovies([]);
    setLikedMovies([]);
    navigate('/')
  };

  // Открытие бургер-меню
  function openMenu() {
    setMenuOpen(true);
  };

  // Закрытие бургер-меню
  function closeMenu() {
    setMenuOpen(false);
  };

  ////////////////////////////////////////////// MOVIES //////////////////////////////////////////////

  // Добавление фильма в избранное
  function handleLikeMovie(movie) {
    const like = localLikedMovies.some((i) =>
      i.movieId === movie.id
    );
    if (!like) {
      mainApi.likeMovie(movie, jwt).then(data => {
        setLocalLikedMovies([...localLikedMovies, data])
      })
    } else {
      const dislike = localLikedMovies.find(i => i.movieId === movie.id)
      handleDeleteMovie(dislike)
    }
  };

  // Удаление фильма
  function handleDeleteMovie(movie) {
    mainApi.deleteLikedMovie(movie, jwt)
      .then(() => {
        setLikedMovies(likedMovies.filter(i => i._id !== movie._id))
        setLocalLikedMovies(localLikedMovies.filter(i => i._id !== movie._id))
      })
  };

  // Добавляем фильмы кнопкой "Ещё" + хук
  function addMoreMovies() {
    setMovieList(movieList + addMovieQuantity);
  };

  ////////////////////////////////////////////// SEARCH & CHECKBOX //////////////////////////////////////////////  

  // Поиск
  function handleSearch(value) {
    const search = localMovieBase.filter((movie) => {
      const nameEN = movie.nameEN;
      const nameRU = movie.nameRU;
      return ((nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
        || (nameRU && nameRU.toLowerCase().includes(value)))
      // поиск верхнем / нижнем регистр
    });
    localStorage.setItem('movie', JSON.stringify(search));
    setMovies(search)
  };

  // Checkbox 
  function movieDuration(checkbox) {
    const movie = JSON.parse(localStorage.getItem('movie'));
    if (movie && checkbox === 'cb_on') {
      const shortMovie = movie.filter((movie) => movie.duration <= SHORT_MOVIE);
      setMovies(shortMovie);
    } else {
      setMovies(movie);
    }
  };

  // Поиск по избранным
  function handleSearchLikedMovies(value) {
    const search = localLikedMovies.filter((movie) => {
      const nameEN = movie.nameEN;
      const nameRU = movie.nameRU;
      return ((nameEN && nameEN.toLowerCase().includes(value.toLowerCase()))
        || (nameRU && nameRU.toLowerCase().includes(value)))
      // поиск верхнем / нижнем регистр
    });
    localStorage.setItem('likedMovie', JSON.stringify(search));
    setLikedMovies(search)
  };

  // Checkbox по избранному
  function likedMovieDuration(checkbox) {
    const likedMovie = JSON.parse(localStorage.getItem('likedMovie'));
    if (likedMovie && checkbox === 'cb_on') {
      const shortMovie = likedMovie.filter((movie) => movie.duration <= 40);
      setLikedMovies(shortMovie);
    } else {
      setLikedMovies(likedMovie);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header loggedIn={loggedIn} openMenu={openMenu} />
        <Routes >
          <Route exact path='/' element={
            <Main />
          } />
          <Route path="/signin" element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Login handleLogin={handleLogin} message={message} />
            </ProtectedRoute>
          } />
          <Route path="/signup" element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Register handleRegistration={handleRegistration} message={message} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                handleLogout={handleLogout}
                handleUpdateUserInfo={handleUpdateUserInfo}
                message={message}
              />
            </ProtectedRoute>
          } />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                movieCards={movies} // отрисовка фильмов
                handleSearch={handleSearch} // поиск
                likeMovie={handleLikeMovie} // добавить в избранное
                deleteMovie={handleDeleteMovie} // удалить из избранного
                movieList={movieList} // изначальное количество фильмов на странице
                addMoreMovies={addMoreMovies} // кнопка ещё
                currentUser={currentUser} // данные пользователя
                likedMovieList={localLikedMovies} // избранное
                duration={movieDuration} // Короткометражки
              />
              <Preloader isLoading={isLoading} />
            </ProtectedRoute>
          } />
          <Route path="/saved-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                movieCards={likedMovies} // отрисовка избранных фильмов
                handleSearch={handleSearchLikedMovies} // поиск по избранным
                deleteMovie={handleDeleteMovie} // удалить из избранного
                movieList={movieList} // изначальное количество фильмов на странице
                addMoreMovies={addMoreMovies} // кнопка ещё
                duration={likedMovieDuration} // Короткометражки
              />
              <Preloader isLoading={isLoading} />
            </ProtectedRoute>
          } />
          <Route path='*' element={
            <Error />
          } />
        </Routes>
        <Menu isOpen={menuOpen} closeMenu={closeMenu} />
        {location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies' ? // убираем подвал на формах аутенфикации
          <Footer /> : <></>}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;