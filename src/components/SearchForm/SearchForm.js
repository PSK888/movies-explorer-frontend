import './SearchForm.css';

function SearchForm() {

  function handleCheckboxClick(evt) {
    evt.preventDefault();
    evt.target.classList.toggle('search__off');
  }

  return (
    <section className='search'>
      <form className='search__form' >
        <div className='search__search'>
          <span className='search__magnifier'></span>
          <div className='search__input-button'>
            <input className='search__input' placeholder='Фильм' required></input>
            <button className='search__button' type='submit'></button>
          </div>
          <label className='search__label'>Короткометражки
            <span className='search__on' onClick={handleCheckboxClick}></span>
          </label>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;