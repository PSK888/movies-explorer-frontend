import { useLocation } from 'react-router-dom';
import './SearchForm.css';
import React, { useEffect, useState } from "react";

function SearchForm({ handleSearch, duration }) {
  const location = useLocation();
  const [value, setValue] = useState(localStorage.getItem('value') || ''); // чистим данные формы при загрузке после выхода и очистки localStorage
  const [checkbox, setCheckbox] = useState(localStorage.getItem('checkbox')); // фильтр фильмов

  useEffect(() => {
    if (location.pathname === '/movies') {
      localStorage.setItem('value', value)
      localStorage.setItem('checkbox', checkbox)
      // handleSearch(value) // поиск сразу же при вводе данных
    }
    // eslint-disable-next-line 
  }, [value, checkbox])

  useEffect(() => {
    if (location.pathname === '/movies') {
      handleSearch(value)
      duration(checkbox)
    }
    if (location.pathname === '/saved-movies') {
      localStorage.setItem('checkbox', checkbox)
      setValue('') // очищаем форму в избранном
      handleSearch('') // показываем все избранные фильмы при переходе в сохраненные 
      duration(checkbox)
    }
    // eslint-disable-next-line 
  }, [location, checkbox])

  function handleSubmit(e) {
    e.preventDefault()
    handleSearch(value)
    duration(checkbox)
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
              value={value} // берем данные формы из локального хранилища
              required // запрет на пустую форму поиска
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
                onClick={() => { setCheckbox(checkbox === 'cb_off' ? 'cb_on' : 'cb_off') }}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;