import RegistrationForm from '../RegistrationForm/RegistrationForm'
import useFormValidation from '../../utils/useFormValidation'
import Input from "../Input/Input";


export default function Login({ handleLogin }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  function onLogin(evt) {
    evt.preventDefault()
    handleLogin(values.password, values.email)
  }

  return (
    <RegistrationForm name='signin' onSubmit={onLogin} isValid={isValid}>
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
