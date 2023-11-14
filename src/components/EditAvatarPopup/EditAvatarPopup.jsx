import { useRef } from "react"
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useFormValidation from "../../utils/useFormValidation";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const input = useRef()
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetClose() {
    onClose()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return (
    <PopupWithForm 
      name='edit-avatar' 
      title='Обновить аватар'
      isOpen={isOpen}
      onClose = {resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
          ref={input}
          id="avatar"
          type="url"
          name="avatar"
          className={`popup__input popup__input_type_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
          required=""
          placeholder="Ссылка на аватар"
          value={values.avatar ? values.avatar : ''}
          onChange={handleChange}
      />
      <span id="error-avatar" className="error-message">{errors.avatar}</span>
    </PopupWithForm>
  )
}