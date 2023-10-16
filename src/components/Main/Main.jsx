import { useEffect, useState} from "react"
import api from "../../utils/api.js"
import Card from "../Card/Card.jsx"

export default function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getInitialCards()])
      .then(([userData, dataCards]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        dataCards.forEach(data => data.myid = userData._id)
        setCards(dataCards)
      })
  }, [])

  return(
    <main>
      <section className="profile">
          <div className="profile__card">
            <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
              <img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
            </button>
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <button type="button" className="profile__edit-button" onClick={onEditProfile}/>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button"onClick={onAddPlace}/>
      </section>
      <section id="elements" className="elements">
          {cards.map(data => {
            return (
              <div key = {data._id}>
                <Card card={data} onCardClick={onCardClick}/>
              </div>
            )
          })}
      </section>
    </main>
  )
}