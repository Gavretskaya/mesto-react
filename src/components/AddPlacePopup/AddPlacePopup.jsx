import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({cardname: values.cardname, link: values.link}, reset)
  }

  return (
    <PopupWithForm 
        name='add-card' 
        title='Новое место'
        titleButton='Создать'
        isOpen={isOpen}
        onClose = {resetClose}
        isValid={isValid}
        onSubmit={handleSubmit}
    >
        <input
          id="cardname"
          type="text"
          className={`popup__input popup__input_type_card-name ${isInputValid.cardname === undefined || isInputValid.cardname ? '' : 'popup__input_invalid'}`}
          name="cardname"
          required
          placeholder="Название"
          maxLength={30}
          minLength={2}
          value={values.cardname ? values.cardname : ''}
          onChange={handleChange}
        />
        <span id="error-cardname" className="error-message">{errors.cardname}</span>
        <input
          id="link"
          type="url"
          className={`popup__input popup__input_type_card-url ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={values.link ? values.link : ''}
          onChange={handleChange}
        />
        <span id="error-link" className="error-message">{errors.link}</span>
    </PopupWithForm>
  )
}