import MenuItemCard from './MenuItemCard.jsx'

// No cart props any more: MenuItemCard reads the cart context itself.
function MenuList({ items, emptyText = 'No items on this menu yet.' }) {
  if (items.length === 0) {
    return <p className="muted">{emptyText}</p>
  }
  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default MenuList
