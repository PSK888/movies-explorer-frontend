import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import React, { useEffect, useState } from "react";

function SearchForm({ handleSearch, duration }) {
  const location = useLocation();
  const [value, setValue] = useState(localStorage.getItem('value')); // данные формы
  const [checkbox, setCheckbox] = useState(localStorage.getItem('checkbox')); // фильтр фильмов

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('value', value)
      localStorage.setItem('checkbox', checkbox)
    }
     // eslint-disable-next-line 
  }, [value, checkbox])

  useEffect(() => {
    if (location.pathname === '/movies') {
      handleSearch(localStorage.getItem('value'))
      duration(checkbox)
    }
    if (location.pathname === '/saved-movies') {
     // setCheckbox('cb_off') // отключаем фильтр при переходе в избранное
      handleSearch('')
      duration(checkbox)
    }
    // eslint-disable-next-line 
  }, [location, checkbox])

  const handleSubmit = (e) => {
    e.preventDefault()
    setCheckbox('cb_off') // отключаем фильтр при новом поиске
    handleSearch(value)
  }

  return (
    <section className='search'>
      <form className='search__form' onSubmit={(e) => handleSubmit(e)} >
        <div className='search__search'>
          <span className='search__magnifier'></span>
          <div className='search__input-button'>
            <input
              className='search__input'
              type='text'
              placeholder='Фильм'
              // required // запрет на пустую форму поиска
              onChange={(e) => setValue(e.target.value)}
            />
            <button className='search__button' type='submit' />
          </div>
          <div className='search__checkbox_block'>
            <label className='search__checkbox'>Короткометражки </label>
            <div className='search__checkbox_background'>
              <button
                className={`search__checkbox_button ${checkbox === 'cb_on' ? 'search__checkbox_button_on' : 'search__checkbox_button_off'}`}
                type='button'
                onClick={() => { setCheckbox(checkbox === 'cb_off' ? 'cb_on' : 'cb_off') }} />
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;