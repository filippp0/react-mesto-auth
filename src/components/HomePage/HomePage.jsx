import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"
import './HomePage.css'

export default function HomePage({openCard, openProfile, openAvatar, openDelete, onCardClick, onCardLike, cards, isLoading}) {
  const currentUser = useContext(CurrentUserContext)

  return (
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
  )
}
