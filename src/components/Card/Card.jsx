import './Card.css'
import { memo, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import ButtonLike from "../ButtonLike/ButtonLike.jsx";

const Card = memo(({ card, openDelete, onCardClick, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext)
  return (
    <li className="elements__list">
      <article className="elements__element">
        {currentUser._id === card.owner._id && <button type="button" className="elements__trash" onClick={() => { openDelete(card._id) }} />}
        <img src={card.link} alt={`Изображение ${card.name}`} className="elements__image" onClick={() => onCardClick({ link: card.link, name: card.name })} />
        <div className="elements__rectangle">
          <h2 className="elements__subtitle" >{card.name}</h2>
          <ButtonLike myid={currentUser._id} card={card} onCardLike={onCardLike} />
        </div>
      </article>
    </li>
  )
})

export default Card
