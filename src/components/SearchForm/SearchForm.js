import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm(props) {
  const location = useLocation();
  const [isNone, setIsNone] = useState(false);
  const [movie, setMovie] = useState(location.pathname === '/movies' && localStorage.getItem('movieKey') ? localStorage.getItem('movieKey') : '');
  const [savedMovie, setSavedMovie] = useState(location.pathname === '/saved-movies' && localStorage.getItem('movieSavedKey') ? localStorage.getItem('movieSavedKey') : '');
  const defaultInput = location.pathname === '/movies' ? localStorage.getItem('movieKey') : localStorage.getItem('movieSavedKey');
  const defaultCheckbox = location.pathname === '/movies' ? JSON.parse(localStorage.getItem('checkbox')) : JSON.parse(localStorage.getItem('checkboxSaved'));

  function handleChangeInput(e) {
    const input = e.target;
    if (location.pathname === '/movies') {
      setMovie(input.value);
      setIsNone(false);
    } else if (location.pathname === '/saved-movies') {
      setSavedMovie(input.value);
      setIsNone(false);
    }
  }

  function handleCheckboxChange(e) {
    const input = e.target;
    if (location.pathname === '/movies') {
      localStorage.setItem('checkbox', JSON.stringify(input.checked));
    } else if (location.pathname === '/saved-movies') {
      localStorage.setItem('checkboxSaved', JSON.stringify(input.checked));
    }
    if (localStorage.getItem('movieKey') || localStorage.getItem('movieSavedKey')) {
      props.handleSearch();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (location.pathname === '/movies') {
      localStorage.setItem('movieKey', movie);
    } else if (location.pathname === '/saved-movies') {
      localStorage.setItem('movieSavedKey', savedMovie);
    }
    if (location.pathname === '/movies') {
      if (movie === '') {
        setIsNone(true);
      } else {
        setIsNone(false);
        props.handleSearch();
      }
    } else if (location.pathname === '/saved-movies') {
      if (savedMovie === '') {
        setIsNone(true);
      } else {
        setIsNone(false);
        props.handleSearch();
      }
    }
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit} >
        <div className='search__search'>
          <span className='search__magnifier'></span>
          <div className='search__input-button'>
            <input className='search__input' type='text' placeholder='Фильм' defaultValue={defaultInput} onChange={handleChangeInput} ></input>
            <button className='search__button' type='submit'></button>
            {isNone && <span className='search__error'>Введите данные для поиска</span>}
          </div>
          <label className='search__label'>Короткометражки
            <input
              className='search__checkbox'
              type='checkbox'
              defaultChecked={defaultCheckbox}
              onChange={handleCheckboxChange}
            ></input>
          </label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;