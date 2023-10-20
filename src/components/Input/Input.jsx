import { useContext } from 'react'
import SendContext from '../../contexts/SendContext'
import './Input.css'

export default function Input({ name, type, placeholder, minLength, maxLength, isInputValid, value, onChange, error }) {
  const isSend = useContext(SendContext)

  return (
    <>
      {name === 'password' || name === 'email' ?
        <>
          <input
          name={name}
          type={type}
          placeholder={placeholder}
          minLength={minLength ? minLength : ''}
          maxLength={maxLength ? maxLength : ''}
          required
          className={`login__input ${isInputValid === undefined || isInputValid ? '' : 'login__input_invalid'}`}
          value={value ? value : ''}
          onChange={onChange}
          disabled={isSend}
          />
          <span className={'login__error'}>{error}</span>
        </>
        :
        <>
          <input
          name={name}
          type={type}
          placeholder={placeholder}
          minLength={minLength ? minLength : ''}
          maxLength={maxLength ? maxLength : ''}
          required
          className={`popup__input ${isInputValid === undefined || isInputValid ?  '' : 'popup__input_invalid'}`
          }
          value={value ? value : ''}
          onChange={onChange}
          disabled={isSend}
          />
          <span className={'popup__error'}>{error}</span>
        </>

      }
      {/* <input
        name={name}
        type={type}
        placeholder={placeholder}
        minLength={minLength ? minLength : ''}
        maxLength={maxLength ? maxLength : ''}
        required
        className={
          `${name === 'password' || name === 'email' ? 'login__input' : 'popup__input'}
          ${isInputValid === undefined || isInputValid ? '' : name === 'password' || name === 'email' ? 'login__input_invalid' : 'popup__input_invalid'}`
        }
        value={value ? value : ''}
        onChange={onChange}
        disabled={isSend}
      />
      <span className={
        `${name === 'password' || name === 'email' ? 'login__error' : 'popup__error'}`}>{error}</span> */}
    </>
  )
}
