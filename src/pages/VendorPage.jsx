import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams() // /vendor/:id
  const { vendors, loading, error, reload } = useVendors()
  const { favourites } = useCart()
  const [favouritesOnly, setFavouritesOnly] = useState(false)

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)
  if (!vendor) {
    return (
      <div className="card">
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">There is no vendor with the id “{id}”.</p>
        <Link to="/">Back to vendors</Link>
      </div>
    )
  }

  const visibleItems = favouritesOnly
    ? vendor.menu.filter((item) => favourites.includes(item.id))
    : vendor.menu

  return (
    <section>
      <p><Link to="/">← All vendors</Link></p>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">{vendor.location} · {vendor.openHours}</p>
      <label className="fav-toggle">
        <input
          type="checkbox"
          checked={favouritesOnly}
          onChange={(e) => setFavouritesOnly(e.target.checked)}
        />
        Favourites only ({vendor.menu.filter((i) => favourites.includes(i.id)).length})
      </label>
      <MenuList
        items={visibleItems}
        emptyText={favouritesOnly
          ? 'No favourites here yet. Tap the heart on a dish to add one.'
          : 'No items on this menu yet.'}
      />
    </section>
  )
}

export default VendorPage
