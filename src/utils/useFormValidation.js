import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [isInputValid, setIsInputValid] = useState({})

  function handleChange(evt) {
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const valid = evt.target.validity.valid
    const form = evt.target.form
    setIsInputValid((oldValid) => {
      return { ...oldValid, [name]: valid }
    })
    setValues((oldValues) => {
      return { ...oldValues, [name]: value }
    })
    setErrors(oldErrors => {
      return { ...oldErrors, [name]: validationMessage }
    })
    setIsValid(form.checkValidity())
  }

  const reset = useCallback((data = {}) => {
    setValues(data)
    setErrors({})
    setIsValid(false)
    setIsInputValid({})
  }, [])

  return { values, errors, isValid, isInputValid, handleChange, reset }
}
