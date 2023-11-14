import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from "../utils/api.js"
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
// стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup ] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false)

// стейты для контекста
  const [currentUser, setCurrentUser] =useState({})

// стейты карточки
  const [cards, setCards] = useState([])
  const [deleteCard, setDeleteCard] = useState('')

  const setStateCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopup(false)
    setDeletePopupOpen(false)
  },[])

  const closePopupByEsc = useCallback ((evt) => {
    if (evt.key === 'Escape') {
      setStateCloseAllPopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  },[setStateCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setStateCloseAllPopups()
    document.removeEventListener('keydown', closePopupByEsc)
  },[setStateCloseAllPopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setImagePopup(true)
    setEventListenerForDocument()
  }

  function handleDeletePopup(cardId) {
    setDeleteCard(cardId)
    setDeletePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect (() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([userData, dataCards]) => {
        setCurrentUser(userData)
        setCards(dataCards)
      })
      .catch((error) => console.error(`Возникла ошибка при загрузке начальных данных${error}`))
  }, [])

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.deleteCardConfirm(deleteCard)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCard
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
  }

  function handleUpdateUser(userData, reset) {
    api.setUserInfo(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании профиля ${error}`))
  }

  function handleUpdateAvatar(userData, reset) {
    api.setNewAvatar(userData)
      .then((res )=> {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании автара ${error}`))
  }

  function handleAddPlaceSubmit(userData, reset) {
    api.addCard(userData)
      .then((newCard )=> {
        setCards([newCard, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при добавлении карточки ${error}`))
  }
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page__container">

      <Header/>

      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace ={handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        onDelete = {handleDeletePopup}
        onCardLike={handleCardLike}
        cards = {cards}
      />
      
      <Footer />

      <EditProfilePopup 
        onUpdateUser = {handleUpdateUser}
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      />

      <AddPlacePopup 
        onAddPlace = {handleAddPlaceSubmit}
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      />

      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      />

      <PopupWithForm 
        name='delete' 
        title='Вы уверены?'
        titleButton='Да'
        isOpen = {isDeletePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleCardDelete}
      />
      
      <ImagePopup 
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
      /> 
    
    </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
