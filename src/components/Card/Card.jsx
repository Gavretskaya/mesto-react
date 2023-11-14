import { useContext} from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Card({card, onCardClick, onDelete, onCardLike}) {
  const currentUser = useContext(CurrentUserContext)

  // есть ли у карточки лайк, поставленный текущим пользователем ?
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // переменная, задаем в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
      `card__favorites ${isLiked && 'card__favorites_active'}` 
  );
  
  return (
      <article className="card">
        <img 
          className="card__img" 
          src={card.link} 
          alt={`Картинка ${card.name}`}
          onClick={() => onCardClick({link: card.link, name: card.name})}
        />
        <div className="card__container">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button type="button" className={cardLikeButtonClassName} onClick={() => onCardLike(card)}/>
            <span className="card__counter">{card.likes.length}</span>
          </div>
        </div>
        {currentUser._id === card.owner._id &&  <button type="button" className="card__delete-button" onClick={() => onDelete(card._id)}/>}
      </article>
  )
}