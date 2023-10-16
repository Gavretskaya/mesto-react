import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup ] = useState(false)
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
  }

  // function handleDelete() {
    
  // }

  
  return (
    <div className="page__container">

      <Header/>

      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace ={handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />
      
      <Footer />

      <PopupWithForm 
        name='edit-profile' 
        title='Редактировать профиль'
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          id="username"
          type="text"
          name="username"
          className="popup__input popup__input_type_name"
          required=""
          placeholder="Ваше имя"
          maxLength={40}
          minLength={2}
        />
        <span id="error-username" className="error-message" />
        <input
          id="info"
          type="text"
          name="info"
          className="popup__input popup__input_type_info"
          required=""
          placeholder="Расскажите о себе"
          maxLength={200}
          minLength={2}
        />
        <span id="error-info" className="error-message" />
      </PopupWithForm>

      <PopupWithForm 
        name='add-card' 
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          id="cardname"
          type="text"
          className="popup__input popup__input_type_card-name"
          name="cardname"
          required=""
          placeholder="Название"
          maxLength={30}
          minLength={2}
        />
        <span id="error-cardname" className="error-message" />
        <input
          id="link"
          type="url"
          className="popup__input popup__input_type_card-url"
          name="link"
          required=""
          placeholder="Ссылка на картинку"
        />
        <span id="error-link" className="error-message" />
      </PopupWithForm>

      <PopupWithForm 
        name='edit-avatar' 
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
            id="avatar"
            type="url"
            name="avatar"
            className="popup__input popup__input_type_avatar"
            required=""
            placeholder="Ссылка на аватар"
          />
          <span id="error-avatar" className="error-message" />
      </PopupWithForm>

      <PopupWithForm 
        name='delete' 
        title='Вы уверены?'
        titleButton='Да'
      />
      
      <ImagePopup 
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      /> 
    
    </div>

  );
}

export default App;
