function MenuItemCard() {
  const item = {
    name: 'Nasi Lemak Ayam',
    description: 'Fragrant rice, fried chicken, sambal, egg, and peanuts.',
    price: 7.5,
    available: true
  }

  return (
    <div className="menu-item-card">
      <div className="thumb">{item.name.charAt(0)}</div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </div>
  )
}

export default MenuItemCard