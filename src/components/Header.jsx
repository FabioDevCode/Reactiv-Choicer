import './Header.css'
import logo from '../assets/shuffle.svg';

function Header() {
    return (
        <header className="header">
            <img className="logo" src={logo} alt="logo" />
            <h1 className="title">
                REACTIV<br></br>
                CHOICER
            </h1>
        </header>
    )
}

export default Header