import './Promo.css';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__texts'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <div className='promo__links'>
          <a className='promo__link' href="#about">О проекте</a>
          <a className='promo__link' href="#techs">Технологии</a>
          <a className='promo__link' href="#about-me">Студент</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Promo;