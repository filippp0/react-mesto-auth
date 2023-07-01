import './Header.css'
import logo from '../../image/logo-white.svg';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';

function Header({ name, dataUser }) {
  const [count, setCount] = useState(0)

  const closeBurgerForResize = useCallback(() => {
    if (document.documentElement.clientWidth > '767') {
      setCount(0)
      window.removeEventListener('resize', closeBurgerForResize)
    }
  }, [])

  function handelClick() {
    if (count === 0) {
      setCount(1)
      window.addEventListener('resize', closeBurgerForResize)
    } else {
      setCount(0)
      window.removeEventListener('resize', closeBurgerForResize)
    }
  }

  function onSignOut() {
    setCount(0);
    localStorage.removeItem('jwt')
  }

  return (
    <header className={`header page__header ${count !== 0 ? 'page__header_opened' : ''}`}>
      <img
        src={logo}
        alt="логотип место"
        className="header__logo"
      />
      {name === 'signup' || name === 'signin' ?
        <Link to={name === 'signup' ? '/sign-in' : '/sign-up'} className="header__link">
          {name !== 'signup' ? 'Регистрация' : 'Войти'}
        </Link> :
        <>
          <div className={`header__email-container ${count !== 0 ? 'header__email-container_opened' : ''}`}>
            <p className='header__email'>{dataUser}</p>
            <Link to={`/sign-in`} className='header__unlogin' onClick={onSignOut}>Выйти</Link>
          </div>
          <button className={`header__button ${count !== 0 ? 'header__button_active' : ''}`} onClick={handelClick}></button>
        </>
      }
    </header>
  )
}

export default Header;
