import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

// B4 (matric digit 3): favourites live in the cart context; this page shows them all.
function FavouritePage() {
  const { vendors, loading, error, reload } = useVendors()
  const { favourites } = useCart()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const groups = vendors
    .map((vendor) => ({ vendor, items: vendor.menu.filter((i) => favourites.includes(i.id)) }))
    .filter((g) => g.items.length > 0)

  return (
    <section>
      <h2 className="section-title">Your favourites</h2>
      {groups.length === 0 ? (
        <p className="muted">
          No favourites yet. Tap the heart on a dish in a <Link to="/">vendor’s menu</Link>.
        </p>
      ) : (
        groups.map(({ vendor, items }) => (
          <div key={vendor.id}>
            <h3><Link to={`/vendor/${vendor.id}`}>{vendor.name}</Link></h3>
            <MenuList items={items} />
          </div>
        ))
      )}
    </section>
  )
}

export default FavouritePage
