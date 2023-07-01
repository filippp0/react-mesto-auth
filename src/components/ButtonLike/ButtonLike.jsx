import './ButtonLike.css'

export default function ButtonLike({ myid, card, onCardLike }) {
  const isLike = card.likes.some(element => myid === element._id)

  return (
    <>
      <button type="button" className={`elements__like-icon ${isLike ? 'elements__like-icon_active' : ''}`} onClick={() => onCardLike(card)} />
      <span className="elements__counter" >{card.likes.length}</span>
    </>
  )
}
