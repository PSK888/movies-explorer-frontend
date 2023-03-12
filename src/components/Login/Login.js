import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Login.css';

function Login({ handleLogin, message, loggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(true); // валидация
  const [errorEmail, setErrorEmail] = useState(''); // ошибки при валидации
  const [errorPass, setErrorPass] = useState('');

  function handleChangeEmail(e) {
    const input = e.target;
    setEmail(input.value);
    const testEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(input.value);
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
    handleLogin(email, password);
  };

  if (loggedIn) {
    return (
      <Navigate to='/' />
    )
  }

  return (
    <section className='login'>
      <div className='login__container'>
        <Link to='/' className='login__logo' />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>

          <label className='login__label'>E-mail</label>
          <input
            className={`login__input ${!valid ? 'login__input_error' : ''}`}
            type='text'
            name='email'
            value={email}
            placeholder="Email"
            onChange={handleChangeEmail}
            required />
          <span className={`login__error`}>{errorEmail}</span>

          <label className='login__label'>Пароль</label>
          <input
            className={`login__input ${!valid ? 'login__input_error' : ''}`}
            type='password'
            name='password'
            value={password}
            placeholder="Пароль"
            onChange={handleChangePassword}
            required />
          <span className={`login__error`}>{errorPass}</span>

          <span className={`login__message`}>{message}</span>
          <button
            className={`login__button ${!valid ? 'login__button_disabled' : ''}`}
            type='submit'
            disabled={!valid}>Войти</button>
          <p className='login__text'>Ещё не зарегистрированы?
            <Link className='login__link' to='/signup'>Регистрация</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login;