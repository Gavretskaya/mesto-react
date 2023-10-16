export default function PopupImage({card, isOpen, onClose}) {
  return(
    <section className={`popup popup_type_img ${isOpen && 'popup_opened'}`}>
      <figure className="popup__img-container">
        <button type="button" className="popup__close" onClick={onClose}/>
        <img className="popup__card-img" name="link" src={card.link} alt={`Изображение ${card.name}`} />
        <figcaption className="popup__title-img">{card.name}</figcaption>
      </figure>
    </section>
  )
}