import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me' id="about-me">
      <div className='about-me__container'>
        <h2 className='section__title'>Студент</h2>
        <div className='about-me__block'>
          <div className='about-me__info'>
            <div className='about-me__texts'>
              <h3 className='about-me__name'>Павел</h3>
              <p className='about-me__job'>Фронтенд-разработчик, 34 года</p>
              <p className='about-me__text'>
                Я живу в Москве, закончил МФПУ, факультет "Менеджмент Управления" специальность
                "Управление проектом". Я живу в Москве, закончил МФПУ, факультет "Менеджмент Управления" специальность
                "Управление проектом". Я живу в Москве, закончил МФПУ, факультет "Менеджмент Управления" специальность
                "Управление проектом".
              </p>
            </div>
            <a className='about-me__link' href='https://github.com/PSK888'>Github</a>
          </div>
          <div className='about-me__image'> </div>
        </div>
      </div>
    </section>
  )
}

export default AboutMe;