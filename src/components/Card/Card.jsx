export default function Card({card, onCardClick}) {
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
            <button type="button" className="card__favorites" />
            <span className="card__counter" />
          </div>
        </div>
        <button type="button" className="card__delete-button" />
      </article>
  )
}