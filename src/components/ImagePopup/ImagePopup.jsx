import './ImagePopup.css'
import Popup from '../Popup/Popup.jsx'
import { memo } from 'react'

const ImagePopup = memo(({ card, isOpen, onClose }) => {
  // console.log('render Popupimage')
  return (
    <Popup
      name='image'
      isOpen={isOpen}
      onClose={onClose}
    >
      <figure className="popup__figure-container">
        <img src={card.link ? card.link : '#'} alt={card.name ? card.name : '#'} className="popup__image" />
        <figcaption className="popup__image-caption" >{card.name && card.name}</figcaption>
      </figure>
    </Popup>
  )
})

export default ImagePopup
