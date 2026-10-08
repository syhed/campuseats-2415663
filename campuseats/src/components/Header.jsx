function Header(){
    const cartCount = 0

    return (
        <header className="header">
            <h1 className="logo">CampusEats</h1>
            <nav className="nav">
                <a href="/">Home</a>
                <a href="/menu">Menu</a>
                <a href="/cart">Cart ({cartCount})</a>
            </nav>
        </header>
    )
}

export default Header