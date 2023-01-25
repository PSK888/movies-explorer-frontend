import { Link } from 'react-router-dom';
import './Menu.css';

function Menu(props) {

  function handleClick() {
    props.closeMenu();
  }

  return (
    <div className={`menu ${props.isOpen ? '' : 'menu_hidden'}`}>
      <nav className='menu__container'>
        <button className='menu__close' type='button' onClick={handleClick} />
        <Link className='menu__link'  to='/auth' onClick={handleClick}>Главная</Link>
        <Link className='menu__link' to='/movies' onClick={handleClick}>Фильмы</Link>
        <Link className='menu__link' to='/saved-movies' onClick={handleClick}>Сохранённые фильмы</Link>
        <Link className='menu__account' to='/profile' onClick={handleClick}>
          Аккаунт
          <div className='menu__img' />
        </Link>
      </nav>
    </div>
  )
}

export default Menu;