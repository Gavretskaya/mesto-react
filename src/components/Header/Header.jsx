import logo from '../../images/logo.svg'
export default function Header() {
  return(
    <header>
        <div className="header">
          <img className="logo" src={logo} alt="Логотип"/>
        </div>
    </header>
  )
}