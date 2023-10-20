import './Popup.css'

export default function Popup({ name, children, isOpen, onClose }) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClose}>
      <div
        className={`${name === 'image' ? 'popup__image-container' : 'popup__container'} ${name === 'successful' || name === 'error' ? 'popup__registration-container' : ''}`}
        onMouseDown={(evt) => evt.stopPropagation()}>
        <button type="button" className="popup__close-icon" onClick={onClose} />
        {children}
      </div>
    </div>
  )
}
