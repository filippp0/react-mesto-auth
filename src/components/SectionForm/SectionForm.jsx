import Form from '../Form/Form';
import './SectionForm.css'
import { Link } from 'react-router-dom';


export default function SectionForm({ name, children, isValid, onSubmit }) {

  return (
    <section className="login page__login">
      <h2 className="login__title">{name === 'signup' ? 'Регистрация' : 'Вход'}</h2>
      <Form
        name={name}
        titleButton={name === 'signup' ? 'Регистрация' : 'Войти'}
        children={children}
        isValid={isValid}
        onSubmit={onSubmit}
      />
      {name === 'signup' && <p className="login__subtitle">Уже зарегистрированы? <Link to={'/sign-in'} className='login__subtitle-link'>Войти</Link></p>}
    </section>
  )
}
