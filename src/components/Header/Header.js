import { Link } from 'react-router-dom';
import './Header.css';

function Header({ loggedIn, openMenu }) {
  return (
    <>
      { loggedIn ?
        <header className='header'>
          <nav className='header__container'>
            <Link to='/' className='header__logo' />
            <div className='header__links'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
              <Link className='header__account' to='/profile'>
                <span>Аккаунт</span>
                <div className='header__img' />
              </Link>
            </div>
            <button className='header__menu' type='button' onClick={openMenu} />
          </nav>
        </header> : <></>
      }

      { !loggedIn ?
        <header className='header'>
          <div className='header__container'>
            <Link to='/' className='header__logo' />
            <div className='header__auth'>
              <Link className='header__signup' to='/signup'>Регистрация</Link>
              <Link className='header__signin' to='/signin'>Войти</Link>
            </div>
          </div>
        </header> : <></>
      }
    </>
  )
}

export default Header;