import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="card">
      <h2 className="section-title">404: page not found</h2>
      <p className="muted">There is nothing at this address.</p>
      <Link to="/">Back to vendors</Link>
    </div>
  )
}

export default NotFoundPage
