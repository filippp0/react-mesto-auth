import './PopupWithForm.css'
import Popup from "../Popup/Popup.jsx"
import Form from '../Form/Form'

export default function PopupWithForm({ name, title, titleButton, children, isOpen, onClose, isSend, isValid = true, onSubmit }) {

  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
    >
      <h2 className={`popup__title ${name === 'delete' ? 'popup__title_type_delete' : ''}`}>{title}</h2>
      <Form
        name={name}
        titleButton={titleButton}
        children= {children}
        isSend={isSend}
        isValid={isValid}
        onSubmit={onSubmit}
      />
    </Popup>
  )
}
