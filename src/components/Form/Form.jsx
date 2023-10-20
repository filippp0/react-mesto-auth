import { useContext } from 'react'
import './Form.css'
import SendContext from '../../contexts/SendContext'

export default function Form({ name, titleButton, children, isValid, onSubmit }) {
  const isSend = useContext(SendContext)

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}

      {/* {{login:
        <button className={`login__button ${isSend ? 'login__button_loading' : ''} ${isValid ? '' : 'login__button_disable'}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>,
        popup:
        <button className={`popup__submit ${isSend ? 'popup__submit_loading' : ''} ${isValid ? '' : 'popup__submit_disable'}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>}[`${name === 'signin' || name === 'signup' ? 'login' : 'popup'}`]} */}

      {name === 'signin' || name === 'signup' ?
        <button className={`login__button ${isSend ? 'login__button_loading' : ''} ${isValid ? '' : 'login__button_disable'}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>
        :
        <button className={`popup__submit ${isSend ? 'popup__submit_loading' : ''} ${isValid ? '' : 'popup__submit_disable'}`}>
          {isSend ? '' : titleButton || 'Сохранить'}
        </button>}
    </form>
  )
}
