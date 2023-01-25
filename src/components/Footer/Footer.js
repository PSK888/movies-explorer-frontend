import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__block'>
          <p className='footer__year'>&copy; 2023</p>
          <ul className='footer__links'>
            <li className='footer__item'>
              <a className='footer__link' href='https://practicum.yandex.ru'>Яндекс.Практикум</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href='https://github.com/psk888'>Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;