import { Link } from 'react-router'
import { useCart } from '../hooks/useCart.js'

function OrdersPage() {
  const { orders } = useCart()

  if (orders.length === 0) {
    return (
      <p className="muted">
        No orders yet. <Link to="/">Browse vendors</Link>
      </p>
    )
  }

  return (
    <section>
      <h2 className="section-title">Your orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="card">
            <div className="row">
              <h3>Order #{String(order.id).slice(-6)}</h3>
              <strong>RM {order.total.toFixed(2)}</strong>
            </div>
            <p className="muted">
              {order.name} · Mahallah {order.mahallah} · pickup {order.pickupTime}
            </p>
            <p className="muted">Placed {new Date(order.placedAt).toLocaleString()}</p>
            <ul>
              {order.items.map((line) => (
                <li key={line.item.id}>{line.qty} × {line.item.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage
