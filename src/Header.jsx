import logo from './assets/remy.webp'

export default function Header() {
    return (
        <header>
            <div className="header-content">
                <img className="header-logo" src={logo} alt="Chef Remy Logo" />
                <div className="title-container">
                    <h1>Chef Remy</h1>
                    <div className="chat-bubble">Anyone can cook!</div>
                </div>
            </div>
        </header>
    )
}