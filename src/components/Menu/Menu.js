import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({ isOpen, closeMenu }) {

  return (
    <div className={`menu ${isOpen ? '' : 'menu_hidden'}`}>
      <nav className='menu__container'>
        <button className='menu__button' type='button' onClick={closeMenu} />
        <Link className='menu__link' to='/' onClick={closeMenu}>Главная</Link>
        <Link className='menu__link' to='/movies' onClick={closeMenu}>Фильмы</Link>
        <Link className='menu__link' to='/saved-movies' onClick={closeMenu}>Сохранённые фильмы</Link>
        <Link className='menu__account' to='/profile' onClick={closeMenu}>
          Аккаунт
          <div className='menu__img' />
        </Link>
      </nav>
    </div>
  )
}

export default Menu;