import { Link } from 'react-router-dom';
import './Profile.css';

function Profile(props) {

  return (
    <main className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, Павел! </h2>
        <form className='profile__info' >
          <div className='profile__name'>
            <p className='profile__label'>Имя</p>
            <input className='profile__input' type='text' name='name' required minLength='2' maxLength='30' />
          </div>
          <div className='profile__email'>
            <p className='profile__label'>E-mail</p>
            <input className='profile__input' type='email' name='email' required />
          </div>
          <div className='profile__links'>
            <button className='profile__edit' type='button' onClick={props.handleEditClick}>Редактировать</button>
            <Link className='profile__logout' to='/' onClick={props.handleLogout}>Выйти из аккаунта</Link>
          </div>

        </form>
      </div>
    </main>
  )
}

export default Profile;