import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about'>
      <div className='about__container'>
        <h2 className='section__title'>О проекте</h2>
        <div className='about__texts'>
          <h3 className='about__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about__text'>
            Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.
          </p>
          <h3 className='about__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__text'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
        <div className='about__grid'>
          <p className='about__oneweek'>1 неделя</p>
          <p className='about__fourweek'>4 недели</p>
          <p className='about__backend'>Back-end</p>
          <p className='about__frontend'>Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;