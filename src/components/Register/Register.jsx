import { useNavigate } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { auth } from "../../utils/auth";

export default function Register({ setIsSend, setIsSuccessful, setIsError }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()

  function onRegister(evt) {
    evt.preventDefault()
    setIsSend(true)
    auth(values.password, values.email)
      .then(res => {
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsError(true)
        console.error(`Ошибкак при регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  return (
    <RegistrationForm name='signup' onSubmit={onRegister} isValid={isValid}>
      <Input
        name='email'
        type='email'
        placeholder={'Email'}
        value={values.email}
        onChange={handleChange}
        isInputValid={isInputValid.email}
        error={errors.email}
      />
      <Input
        name='password'
        type='password'
        placeholder={'Пароль'}
        minLength={3}
        value={values.password}
        onChange={handleChange}
        isInputValid={isInputValid.password}
        error={errors.password}
      />
    </RegistrationForm>
  )
}
