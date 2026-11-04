import { useCart } from '../hooks/useCart.js'

function MenuItemCard({ item }) {
  const { addToCart, favourites, toggleFavourite } = useCart()
  const isFavourite = favourites.includes(item.id)

  return (
    <article className="card menu-card">
      <button
        type="button"
        className={isFavourite ? 'fav-btn active' : 'fav-btn'}
        onClick={() => toggleFavourite(item.id)}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
      >
        {isFavourite ? '♥' : '♡'}
      </button>
      <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available} onClick={() => addToCart(item)}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}

export default MenuItemCard
