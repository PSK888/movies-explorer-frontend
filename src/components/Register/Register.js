import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register({ handleRegistration, message }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [valid, setValid] = useState(true); // валидация
  const [errorName, setErrorName] = useState(''); // ошибки при валидации
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPass, setErrorPass] = useState('');

  function handleChangeName(e) {
    const input = e.target;
    const testName = /^[a-zA-Zа-яА-Я- ]+$/.test(input.value);
    setName(input.value);
    setValid(testName);
    if (input.value.length < 3) {
      setErrorName("Обязательно к заполнению (минимум 3 знака)");
    } else if (!testName) {
      setErrorName("Имя должно содержать только латиницу, кириллицу, пробел или дефис.");
    } else {
      setErrorName("");
    }
  };

  function handleChangeEmail(e) {
    const input = e.target;
    const testEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(input.value);
    setEmail(input.value);
    setValid(testEmail);
    if (input.value.length < 1) {
      setErrorEmail("Обязательно к заполнению");
    } else if (!testEmail) {
      setErrorEmail('Неверный формат почты (test@example.com)')
    } else {
      setErrorEmail('');
    }
  };

  function handleChangePassword(e) {
    const input = e.target;
    setPassword(input.value);
    setValid(input.validity.valid);
    if (input.value.length < 3) {
      setErrorPass("Обязательно к заполнению (минимум 3 знака)");
    } else {
      setErrorPass('');
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration(email, password, name);
  }

  return (
    <section className='register'>
      <div className='register__container'>
        <Link to='/' className='register__logo' />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__label'>Имя</label>
          <input
            className={`register__input ${!valid ? 'register__input_error' : ''}`}
            type='text'
            name='name'
            value={name} placeholder="Имя"
            onChange={handleChangeName}
            minLength='2'
            maxLength='30'
            required />
          <span className='register__error'>{errorName}</span>

          <label className='register__label'>E-mail</label>
          <input
            className={`register__input ${!valid ? 'register__input_error' : ''}`}
            type='text'
            name='email'
            value={email}
            placeholder="Email"
            onChange={handleChangeEmail}
            required />
          <span className='register__error'>{errorEmail}</span>

          <label className='register__label'>Пароль</label>
          <input
            className={`register__input ${!valid ? 'register__input_error' : ''}`}
            type='password'
            name='password'
            value={password}
            placeholder="Пароль"
            onChange={handleChangePassword}
            minLength='2'
            required />
          <span className='register__error'>{errorPass}</span>

          <span className='register__message'>{message}</span>
          <button className={`register__button ${!(valid) ? 'register__button_disabled' : ''}`} type='submit'>Зарегистрироваться</button>
          <p className='register__text'>
            Уже зарегистрированы?
            <Link className='register__link' to='/signin'>Войти</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Register;