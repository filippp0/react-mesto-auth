import './Main.css'
import { memo, useContext } from "react"
import Card from "../Card/Card.jsx"
import Spinner from "../Spinner/Spinner.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import Register from '../Register/Register'
import Login from '../Login/Login'


const Main = memo(({ name, openCard, openProfile, openAvatar, openDelete, onCardClick, onCardLike, cards, isLoading, setIsSend, setLoggedIn, setIsSuccessful, setIsError }) => {
  const currentUser = useContext(CurrentUserContext)
  // console.log('render main')
  return (
    <main className='main'>
      {name === 'main' ?
        <>
          <section className="profile page__profile">
            <div className="profile__container">
              <div>
                <button type="button" className="profile__avatar-overlay" onClick={openAvatar}>
                  <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="аватар профиля" className="profile__avatar" />
                </button>
              </div>
              <div className="profile__info">
                <h1 className="profile__name" >{currentUser.name ? currentUser.name : ''}</h1>
                <button type="button" className="profile__edit" onClick={openProfile} />
                <p className="profile__job">{currentUser.about ? currentUser.about : ''}</p>
              </div>
            </div>
            <button type="button" className="profile__add-button" onClick={openCard} />
          </section>
          <section aria-label="Коллекция картинок" className="elements page__elements">
            <ul className="elements__lists">
              {isLoading ? <Spinner /> : cards.map(data => {
                return (
                  <Card key={data._id} card={data} openDelete={openDelete} onCardClick={onCardClick} onCardLike={onCardLike} />
                )
              })}
            </ul>
          </section>
        </>
        :
        name === 'signup' ?
          <Register setIsSend={setIsSend} setIsSuccessful={setIsSuccessful} setIsError={setIsError}/>
          :
          <Login setIsSend={setIsSend} setLoggedIn={setLoggedIn} setIsSuccessful={setIsSuccessful} setIsError={setIsError}/>
      }
    </main>
  )
})

export default Main
