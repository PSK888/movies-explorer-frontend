import './NavTab.css';

function NavTab() {
    return (
        <section className='nav__links'>
            <a className='nav__link' href="#about">О проекте</a>
            <a className='nav__link' href="#techs">Технологии</a>
            <a className='nav__link' href="#about-me">Студент</a>
        </section>
    )
}

export default NavTab;