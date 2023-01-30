import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  function auth() {
    navigate('/auth');
  }
  return (
    <section className='login'>
      <div className='login__container'>
        <Link to='/' className='login__logo' />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' >
          <label className='login__label'>E-mail</label>
          <input className='login__input' type='email' name='email' placeholder="Email" required />
          <label className='login__label'>Пароль</label>
          <input className='login__input' type='password' name='password' placeholder="Пароль" required />
          <button className='login__button' type='submit' onClick={auth} >Войти</button>
          <p className='login__text'>Ещё не зарегистрированы?
            <Link className='login__link' to='/signup'>Регистрация</Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login;