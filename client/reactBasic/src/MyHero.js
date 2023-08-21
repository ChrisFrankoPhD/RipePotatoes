export default function Hero({text, backdropURL}) {
    return (
        <header className="bg-dark text-white p-5 img-container backdrop-container">
            <h1 className="hero-text">{text}</h1>
            <div className="backdrop-img" style={{backgroundImage: `url(${backdropURL})`}}> 
            </div>
        </header>
    )
}