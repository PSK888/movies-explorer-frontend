import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header(props) {
  const location = useLocation();

  return (
    <>
      {(location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile' ||
        location.pathname === '/auth') &&
        <header className='header'>
          <nav className='header__container'>
            <Link to='/auth' className='header__logo' />
            <div className='header__links'>
              <Link className='header__link' to='/movies'>Фильмы</Link>
              <Link className='header__link' to='/saved-movies'>Сохранённые фильмы</Link>
              <Link className='header__account' to='/profile'>
                <span>Аккаунт</span>
                <div className='header__img' />
              </Link>
            </div>
            <button className='header__menu' type='button' onClick={props.openMenu} />
          </nav>
        </header>
      }

      {location.pathname === '/' ?
        <header className='header header_protected'>
          <div className='header__container header__container_protected'>
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