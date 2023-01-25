import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='portfolio__container'>
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://psk888.github.io/how-to-learn/'>Статичный сайт</a>
            <div className='portfolio__arrow' />
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://psk888.github.io/russian-travel/'>Адаптивный сайт</a>
            <div className='portfolio__arrow' />
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' href='https://psk888.students.nomoredomains.club/'>Одностраничное приложение</a>
            <div className='portfolio__arrow' />
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Portfolio;