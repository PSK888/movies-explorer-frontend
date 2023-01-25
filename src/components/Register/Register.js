import { Link } from 'react-router-dom';
import './Register.css';

function Register(props) {

  return (
    <section className='register'>
      <div className='register__container'>
        <Link to='/' className='register__logo' />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form'>
          <label className='register__label'>Имя</label>
          <input className='register__input' type='text' name='name'
            placeholder="Имя" minLength='2' maxLength='30' required />
          <span className='register__error'>Ошибка</span>
          <label className='register__label'>E-mail</label>
          <input className='register__input' type='email' name='email'
            placeholder="Email" required autoComplete='none' />
          <span className='register__error'>Ошибка</span>
          <label className='register__label'>Пароль</label>
          <input className='register__input' type='password' name='password'
           placeholder="Пароль" required />
          <span className='register__error'>Ошибка</span>
          <button className='register__button' type='submit'>Зарегистрироваться</button>
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