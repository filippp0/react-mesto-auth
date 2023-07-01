import useFormValidation from "../../utils/useFormValidation.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js"
import { memo, useContext, useEffect } from "react";
import Input from "../Input/Input.jsx";

const EditProfilePopup = memo(({ onUpdateUser, isOpen, onClose }) => {
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if (isOpen) {
      reset({ username: currentUser.name, job: currentUser.about })
    }
  }, [currentUser, isOpen, reset])

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ username: values.username, job: values.job })
  }

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input
        name="username"
        type="text"
        placeholder="Введите имя"
        minLength={2}
        maxLength={40}
        value={values.username}
        onChange={handleChange}
        isInputValid={isInputValid.username}
        error={errors.username}
      />
      <Input
        name="job"
        type="text"
        placeholder="Расскажите о себе"
        minLength={2}
        maxLength={200}
        value={values.job}
        onChange={handleChange}
        isInputValid={isInputValid.job}
        error={errors.job}
      />
    </PopupWithForm>
  )
})

export default EditProfilePopup
