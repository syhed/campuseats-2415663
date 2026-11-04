import { useContext } from 'react'
import { CartContext } from '../context/cart-context.js'

export function useCart() {
  const ctx = useContext(CartContext)
  if (ctx === null) {
    throw new Error('useCart must be used inside <CartProvider>. Wrap your routes in it in App.jsx.')
  }
  return ctx
}
