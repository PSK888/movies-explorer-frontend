import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__li'>
            <a className='portfolio__link' href='https://psk888.github.io/how-to-learn/' target='_blank' rel='noreferrer'>
              <span className='portfolio__text'>Статичный сайт</span>
              <div className='portfolio__button' />
            </a>
          </li>
          <li className='portfolio__li'>
            <a className='portfolio__link' href='https://psk888.github.io/russian-travel/' target='_blank' rel='noreferrer'>
              <span className='portfolio__text'>Адаптивный сайт</span>
              <div className='portfolio__button' />
            </a>
          </li>
          <li className='portfolio__li'>
            <a className='portfolio__link' href='https://psk888.github.io/mesto/' target='_blank' rel='noreferrer'>
              <span className='portfolio__text'>Одностраничное приложение</span>
              <div className='portfolio__button' />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;