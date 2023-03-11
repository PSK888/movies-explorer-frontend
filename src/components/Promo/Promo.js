import './Promo.css';
import NavTab from '../NavTab/NavTab';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__texts'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <NavTab />
        </div>
      </div>
    </section>
  )
}

export default Promo;