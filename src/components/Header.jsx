import { Link, NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function Header() {
  const { count, favourites } = useCart()

  return (
    <header className="header">
      <h1 className="logo"><Link to="/" className="logo-link">CampusEats</Link></h1>
      <nav className="nav">
        {/* end: otherwise "/" would match every URL and always look active */}
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/favourites">Favourites ({favourites.length})</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/cart">Cart <span className="badge">{count}</span></NavLink>
      </nav>
    </header>
  )
}

export default Header
