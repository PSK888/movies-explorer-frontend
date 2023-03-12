import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile({ handleUpdateUserInfo, message, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [email, setEmail] = useState(currentUser.email);
  const [name, setName] = useState(currentUser.name);
  const [valid, setValid] = useState(true); // валидация
  const [error, setError] = useState(''); // ошибки при валидации
  const [oldValue, setOldValue] = useState(true); // данные не менялись
  const [ok, setOk] = useState('');

  // eslint-disable-next-line
  function handleChangeEmail(e) {
    const input = e.target;
    const testEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(input.value);
    if (input.name === "email") {
      setEmail(input.value);
      setValid(testEmail);
      if (input.value.length < 1) {
        setError("Обязательно к заполнению");
      } else if (!testEmail) {
        setError('Неверный формат почты (test@example.com)')
      } else {
        setError('');
      }
    }
  };
  // eslint-disable-next-line
  function handleChangeName(e) {
    const input = e.target;
    const testName = /^[a-zA-Zа-яА-Я- ]+$/.test(input.value);
    if (input.name === "name") {
      setValid(testName);
      setName(input.value);
      if (input.value.length < 1) {
        setError("Обязательно к заполнению");
      } else if (!testName) {
        setError("Имя должно содержать только латиницу, кириллицу, пробел или дефис.");
      } else if (input.value.length < 2) {
        setError("Имя должно быть не менее 2 знаков");
      } else {
        setError("");
      }
    }
  };
  // Проверка были ли изменены данные
  useEffect(() => {
    if (name !== currentUser.name || email !== currentUser.email) {
      setOldValue(false)
    } else {
      setOldValue(true)
    }
  }, [handleChangeName, handleChangeEmail, name, email, currentUser.name, currentUser.email]);



  function showOkMessage() {
    const clearMessage = () => setOk('');
    setOk('Данные успешно обновлены');
    setTimeout(() => clearMessage(), 4000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUserInfo(email, name);
    showOkMessage();
  };



  return (
    <main className='profile'>
      <div className='profile__container'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className='profile__form' onSubmit={handleSubmit} >

          <div className='profile__name'>
            <p className='profile__label'>Имя</p>
            <input
              className={`profile__input ${!valid ? 'profile__input_error' : ''}`}
              type='text'
              name='name'
              defaultValue={currentUser.name}
              onChange={handleChangeName}
              required
              minLength='2'
              maxLength='30' />
          </div>

          <div className='profile__email'>
            <p className='profile__label'>E-mail</p>
            <input className={`profile__input ${!valid ? 'profile__input_error' : ''}`}
              type='text'
              name='email'
              defaultValue={currentUser.email}
              onChange={handleChangeEmail}
              required />
          </div>

          <div className='profile__message_block'>
            <span className={`profile__message ${(oldValue) ? 'profile__message' : ''}`}>{message || error}</span>
            <span className='profile__message_ok'>{ok}</span>
          </div>

          <button
            className={`profile__button ${(oldValue || (!valid)) ? 'profile__button_disabled' : ''}`}
            type='submit'
            disabled={oldValue}
          >Редактировать</button>

          <Link className='profile__logout' to='/' onClick={handleLogout}>Выйти из аккаунта</Link>
        </form>
      </div>
    </main>
  )
}

export default Profile;