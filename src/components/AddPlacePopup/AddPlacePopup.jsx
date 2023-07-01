import { memo, useEffect } from "react"
import useFormValidation from "../../utils/useFormValidation.js"
import Input from "../Input/Input.jsx"
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx"

const AddPlacePopup = memo(({ onAddCard, isOpen, onClose }) => {
  const { values, errors, isInputValid, isValid, handleChange, reset } = useFormValidation()

  useEffect(() => {
    if (isOpen) {
      reset()
    }
  }, [isOpen, reset])

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddCard({ title: values.title, link: values.link })
  }

  return (
    <PopupWithForm
      name='add-card'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <Input
        name="title"
        type="text"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={values.title}
        onChange={handleChange}
        isInputValid={isInputValid.title}
        error={errors.title}
      />
      <Input
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={values.link}
        onChange={handleChange}
        isInputValid={isInputValid.link}
        error={errors.link}
      />
    </PopupWithForm>
  )
})

export default AddPlacePopup
