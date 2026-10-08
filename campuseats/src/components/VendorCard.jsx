function VendorCard() {
  const vendor = {
    name: 'Kafe Mahallah Ali',
    location: 'Mahallah Ali, Block C',
    openHours: '8:00 AM - 10:00 PM',
    isOpen: true
  }

  return (
    <div className="vendor-card">
      <div className="thumb">{vendor.name.charAt(0)}</div>
      <div className="vendor-info">
        <h3>{vendor.name}</h3>
        <p>{vendor.location}</p>
        <p>{vendor.openHours}</p>
        <span className={`status ${vendor.isOpen ? 'open' : 'closed'}`}>
          {vendor.isOpen ? 'Open now' : 'Closed'}
        </span>
      </div>
    </div>
  )
}

export default VendorCard