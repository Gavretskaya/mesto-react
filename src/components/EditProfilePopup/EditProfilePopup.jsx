import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  
  const currentUser = useContext(CurrentUserContext)
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation();

  useEffect(() => {
    setValue("username", currentUser.name)
    setValue("info", currentUser.about)
  },[currentUser, setValue])

  function resetClose() {
    onClose()
    reset({username: currentUser.name, info: currentUser.about})
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ username: values.username, info: values.info }, reset)
  }

  return (
  <PopupWithForm
    name='edit-profile' 
    title='Редактировать профиль'
    isOpen = {isOpen}
    onClose = {resetClose}
    isValid={isValid}
    onSubmit={handleSubmit}
  >
    <input
      id="username"
      type="text"
      name="username"
      className={`popup__input popup__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
      required
      placeholder="Ваше имя"
      maxLength={40}
      minLength={2}
      value={values.username ? values.username : ''}
      onChange={handleChange}
    />
    <span id="error-username" className="error-message">{errors.username}</span>
    <input
      id="info"
      type="text"
      name="info"
      className={`popup__input popup__input_type_info ${isInputValid.info === undefined || isInputValid.info ? '' : 'popup__input_invalid'}`}
      required
      placeholder="Расскажите о себе"
      maxLength={200}
      minLength={2}
      value={values.info ? values.info : ''}
      onChange={handleChange}
    />
    <span id="error-info" className="error-message">{errors.info}</span>
  </PopupWithForm>
  )
}