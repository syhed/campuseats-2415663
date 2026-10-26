import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import Footer from './components/Footer.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  // ---- Fetched data: three pieces of state describe one request ----
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // bump it to run the fetch again
  const [selectedVendorId, setSelectedVendorId] = useState(null)

  // ---- App-wide state, lifted here so siblings can share it ----
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [cart, setCart] = useState([]) // lines of { item, qty }
  const [lastOrder, setLastOrder] = useState(null)
  const [favourites, setFavourites] = useState([]) // array of item ids
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        setSelectedVendorId(data[0].id) // select the first vendor once data arrives
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort() // cleanup: cancel the request if we leave early
  }, [reloadKey]) // run on first render, and again whenever reloadKey changes

  function handleRetry() {
    setError(null)
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  // ---- Cart ----
  function handleAddToCart(item) {
    setCart((prevCart) => {
      const exists = prevCart.some((line) => line.item.id === item.id)
      if (exists) {
        // same item again: a NEW array where only that line's qty goes up
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) => (line.item.id === itemId ? { ...line, qty: line.qty + delta } : line))
        .filter((line) => line.qty > 0) // qty 0 means the line disappears
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // ---- Favourites (personal feature, matric digit 3) ----
  function handleToggleFavourite(itemId) {
    setFavourites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  // ---- Derived values: computed every render, never stored ----
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  let content
  if (view === 'cart') {
    content = (
      <CartPage cart={cart} onChangeQty={handleChangeQty}
        onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2 className="section-title">Order placed 🎉</h2>
        <p>Thank you, {lastOrder.name}!</p>
        <p>Pickup at <strong>{lastOrder.pickupTime}</strong> at Mahallah {lastOrder.mahallah}.</p>
        <p className="cart-total">Total: RM {lastOrder.total.toFixed(2)}</p>
        <button type="button" className="btn btn-small" onClick={() => setView('menu')}>
          Back to vendors
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={handleRetry} />
  } else {
    const visibleItems = showFavouritesOnly
      ? selectedVendor.menu.filter((item) => favourites.includes(item.id))
      : selectedVendor.menu

    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Menu: {selectedVendor.name}</h2>
          <label className="fav-toggle">
            <input
              type="checkbox"
              checked={showFavouritesOnly}
              onChange={(e) => setShowFavouritesOnly(e.target.checked)}
            />
            Favourites only ({favourites.length})
          </label>
          <MenuList
            items={visibleItems}
            onAdd={handleAddToCart}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            emptyText={showFavouritesOnly
              ? 'No favourites yet. Tap the heart on a dish to add one.'
              : 'No items on this menu yet.'}
          />
        </section>
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
