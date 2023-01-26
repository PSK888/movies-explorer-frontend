import { Route, Routes, useNavigate } from 'react-router-dom';
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
import moviesData from '../../utils/cards';

function App() {
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setSavedMovies(
      moviesData.filter((movie) => {
        return movie.saved;
      })
    );
  }, []);

  function registration() {
    navigate('/signin');
  }

  function authorization() {
    navigate('/movies');
  }

  function signOut() {
    navigate('/');
  }

  function openMenu() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className='page'>
        <Header openMenu={openMenu} />
        <Routes >
          <Route exact path='/' element={<Main />} />
          <Route exact path='/auth' element={<Main />} />
          <Route exact path='/signup' element={<Register registration={registration} />} />
          <Route exact path='/signin' element={<Login authorization={authorization} />} />
          <Route exact path='/profile' element={<Profile signOut={signOut} />} />
          <Route path="/movies" element={
            <Movies movies={moviesData} />
          } />
          <Route path="/saved-movies" element={
            <SavedMovies movies={savedMovies} />
          } />
          <Route exact path='/404' element={<Error />} />
        </Routes>
        <Menu isOpen={isMenuOpen} closeMenu={closeMenu} />

        <Footer />
      </div>
    </>
  );
}

export default App;