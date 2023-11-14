
export default function PopupWithForm({name, title, titleButton, children, isOpen, onClose, onSubmit, isValid=true}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt => evt.stopPropagation())}>
        <button type="button" className="popup__close" onClick={onClose}/>
        <h3 className={`popup__title`}>{title}</h3>
        <form className="popup__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button type="submit" className={`popup__save ${isValid ? '' : 'popup__save_disabled'}`}>
            {titleButton||'Сохранить'}
          </button>
        </form>
      </div>
    </section>
  )
}