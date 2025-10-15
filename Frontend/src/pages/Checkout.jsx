import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { useNotifications } from '../context/NotificationContext'
import jsPDF from 'jspdf'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const { user } = useUser()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()

  const [delivery, setDelivery] = useState({ name: '', email: '', address: '', city: '', postal: '' })
  const [billingSame, setBillingSame] = useState(true)
  const [billing, setBilling] = useState({ name: '', email: '', address: '', city: '', postal: '' })
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })
  const [orderPlaced, setOrderPlaced] = useState(null)

  useEffect(() => {
    if (user) {
      setDelivery(d => ({ ...d, name: user.name || '', email: user.email || '' }))
      if (billingSame) setBilling(b => ({ ...b, name: user.name || '', email: user.email || '' }))
    }
  }, [user, billingSame])

  useEffect(() => {
    if (billingSame) setBilling(delivery)
  }, [delivery, billingSame])

  const placeOrder = (e) => {
    e.preventDefault()
    if (items.length === 0) {
      alert('Your cart is empty.')
      return
    }
    if (!delivery.address || !delivery.city || !delivery.postal) {
      alert('Please provide a delivery address.')
      return
    }
    if (paymentMethod === 'card' && (!card.number || !card.expiry || !card.cvv)) {
      alert('Please provide card details.')
      return
    }

    const order = {
      id: `ORD-${Date.now()}`,
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        price: typeof i.price === 'number' ? i.price : parseFloat(i.price) || 0
      })),
      total,
      delivery,
      billing: billingSame ? delivery : billing,
      paymentMethod,
      created: new Date().toISOString()
    }

    addNotification({ title: 'Order completed successfully!', message: `Order ${order.id} has been placed.`, type: 'success' })
    setOrderPlaced(order)
    clear()
  }

  const downloadBill = () => {
    if (!orderPlaced) return
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' })
    pdf.setFontSize(16)
    pdf.text('Invoice — CircuitChic', 40, 50)
    pdf.setFontSize(12)
    pdf.text(`Order ID: ${orderPlaced.id}`, 40, 80)
    pdf.text(`Date: ${new Date(orderPlaced.created).toLocaleString()}`, 40, 100)

    let y = 140
    pdf.setFontSize(12)
    pdf.text('Items:', 40, y)
    y += 20
    orderPlaced.items.forEach(it => {
      const price = typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0
      pdf.text(`${it.qty} x ${it.name} — $${price.toFixed(2)}`, 60, y)
      y += 18
    })

    y += 10
    pdf.setFontSize(14)
    pdf.text(`Total: $${orderPlaced.total.toFixed(2)}`, 40, y)
    pdf.save(`invoice-${orderPlaced.id}.pdf`)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl">Checkout</h1>

      {orderPlaced && (
        <div className="mt-4 p-3 bg-green-800/10 border border-green-500 rounded flex items-center justify-between">
          <div>
            <div className="font-medium">Order completed successfully!</div>
            <div className="text-sm text-white/70">Your order {orderPlaced.id} has been placed.</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={downloadBill} className="btn-primary">Download Bill</button>
            <button onClick={() => { setOrderPlaced(null); navigate('/') }} className="pill">Done</button>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={placeOrder} className="lg:col-span-2 card p-4">
          <h2 className="font-display text-lg">Delivery Address</h2>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-white/70">Full Name</label>
              <input
                value={delivery.name}
                onChange={e => setDelivery(d => ({ ...d, name: e.target.value }))}
                className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Email</label>
              <input
                value={delivery.email}
                onChange={e => setDelivery(d => ({ ...d, email: e.target.value }))}
                type="email"
                className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-white/70">Address</label>
              <input
                value={delivery.address}
                onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))}
                className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">City</label>
              <input
                value={delivery.city}
                onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))}
                className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Postal Code</label>
              <input
                value={delivery.postal}
                onChange={e => setDelivery(d => ({ ...d, postal: e.target.value }))}
                className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} />
              <span className="text-sm text-white/70">Billing address same as delivery</span>
            </label>
          </div>

          {!billingSame && (
            <div className="mt-4">
              <h2 className="font-display text-lg">Billing Address</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/70">Full Name</label>
                  <input
                    value={billing.name}
                    onChange={e => setBilling(b => ({ ...b, name: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <input
                    value={billing.email}
                    onChange={e => setBilling(b => ({ ...b, email: e.target.value }))}
                    type="email"
                    className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm text-white/70">Address</label>
                  <input
                    value={billing.address}
                    onChange={e => setBilling(b => ({ ...b, address: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">City</label>
                  <input
                    value={billing.city}
                    onChange={e => setBilling(b => ({ ...b, city: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Postal Code</label>
                  <input
                    value={billing.postal}
                    onChange={e => setBilling(b => ({ ...b, postal: e.target.value }))}
                    className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h2 className="font-display text-lg">Payment</h2>
            <div className="mt-3 grid gap-3">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="pm" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} />
                <span className="text-sm text-white/80">Credit / Debit Card</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="pm" value="paypal" checked={paymentMethod === 'paypal'} onChange={e => setPaymentMethod(e.target.value)} />
                <span className="text-sm text-white/80">PayPal</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="pm" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)} />
                <span className="text-sm text-white/80">Cash on Delivery</span>
              </label>

              {paymentMethod === 'card' && (
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    placeholder="Card number"
                    value={card.number}
                    onChange={e => setCard(c => ({ ...c, number: e.target.value }))}
                    className="md:col-span-3 rounded-md border border-white/10 bg-[#111727] px-3 py-2"
                  />
                  <input
                    placeholder="MM/YY"
                    value={card.expiry}
                    onChange={e => setCard(c => ({ ...c, expiry: e.target.value }))}
                    className="rounded-md border border-white/10 bg-[#111727] px-3 py-2"
                  />
                  <input
                    placeholder="CVV"
                    value={card.cvv}
                    onChange={e => setCard(c => ({ ...c, cvv: e.target.value }))}
                    className="rounded-md border border-white/10 bg-[#111727] px-3 py-2"
                  />
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="mt-2">
                  <input placeholder="PayPal email" className="w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="mt-2 text-sm text-white/70">Pay with cash upon delivery.</div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="btn-primary">Place Order</button>
          </div>
        </form>

        <aside className="card p-4">
          <h2 className="font-display text-lg">Order Summary</h2>
          <div className="mt-4 divide-y divide-white/5">
            {items.map(it => {
              const price = typeof it.price === 'number' ? it.price : parseFloat(it.price) || 0
              const itemTotal = price * it.qty
              return (
                <div key={it.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-white/60">{it.qty} × ${price.toFixed(2)}</div>
                  </div>
                  <div className="font-semibold">${itemTotal.toFixed(2)}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-lg font-bold">
            Total: <span>${typeof total === 'number' ? total.toFixed(2) : '0.00'}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
