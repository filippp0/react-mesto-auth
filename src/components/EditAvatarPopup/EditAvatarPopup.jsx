// import { useRef } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"
import useFormValidation from "../../utils/useFormValidation.js"
import Input from "../Input/Input.jsx"
import { memo, useEffect } from "react"

const EditAvatarPopup = memo(({ onUpdateAvatar, isOpen, onClose }) => {
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: values.avatar })
  }

  return (
    <PopupWithForm
      name='edit-avater'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input
        name="avatar"
        type="url"
        placeholder="Ссылка на картинку"
        value={values.avatar}
        onChange={handleChange}
        isInputValid={isInputValid.avatar}
        error={errors.avatar}
      />
    </PopupWithForm>
  )
})

export default EditAvatarPopup
