import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Cart() {
  const { items, inc, dec, remove, total } = useCart()
  const ref = useRef(null)
  const navigate = useNavigate()
  
  const downloadPDF = async () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    let y = 60

    // Background fill color
    doc.setFillColor(6, 18, 33) // #061221
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Draw border with some padding
    const padding = 20
    doc.setDrawColor(255, 255, 255) // White border
    doc.setLineWidth(2)
    doc.rect(padding, padding, pageWidth - 2 * padding, pageHeight - 2 * padding)

    // Add Logo - load SVG data and convert it to image (You need base64 or use external lib to convert SVG URL to PNG base64)
    // For demonstration, let's assume logo base64 data is available as `logoBase64`

    // Example placeholder: replace with actual base64 logo image of your SVG or PNG
    const logoBase64 = ''; // You must supply base64 string here

    // Place the logo on top-left
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', padding + 10, padding + 10, 60, 60)
    }

    // Website name text next to logo
    doc.setFontSize(20)
    doc.setTextColor(255, 255, 255)
    doc.text('CircuitChic Website', padding + 80, padding + 45)

    // Title: Quotation
    doc.setFontSize(26)
    doc.setTextColor(255, 215, 0) // Gold color
    doc.text('Quotation', pageWidth / 2, y, { align: 'center' })

    y += 40

    // Table Headers
    doc.setFontSize(14)
    doc.setTextColor(200, 200, 200)
    doc.text('Product', padding + 10, y)
    doc.text('Qty', pageWidth - 180, y, null, null, 'right')
    doc.text('Price', pageWidth - 110, y, null, null, 'right')
    doc.text('Total', pageWidth - 40, y, null, null, 'right')

    y += 15
    doc.setDrawColor(255, 215, 0)
    doc.setLineWidth(1)
    doc.line(padding + 10, y, pageWidth - padding - 10, y) // underline headers

    y += 25

    // Loop through your cart items and add rows
    items.forEach(item => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
      const total = price * item.qty

      if (y > pageHeight - 80) {
        doc.addPage()
        y = 60
      }
      doc.setFontSize(12)
      doc.setTextColor(255, 255, 255)
      doc.text(item.name, padding + 10, y)
      doc.text(String(item.qty), pageWidth - 180, y, null, null, 'right')
      doc.text(`$${price.toFixed(2)}`, pageWidth - 110, y, null, null, 'right')
      doc.text(`$${total.toFixed(2)}`, pageWidth - 40, y, null, null, 'right')

      y += 20
    })

    y += 20

    // Total line
    doc.setDrawColor(255, 215, 0)
    doc.line(pageWidth - 180, y, pageWidth - 40, y) // line before total

    y += 25
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255)
    doc.text(`Total: $${total.toFixed(2)}`, pageWidth - 40, y, null, null, 'right')

    // Save PDF
    doc.save('quotation.pdf')
  }



  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl">Your Cart</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-white/70">Your cart is empty.</p>
      ) : (
        <div>
          <div ref={ref} id="cart-quotation" className="mt-6 card p-4">
            {items.map(item => {
              const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0
              const itemTotal = price * item.qty
              return (
                <div key={item.id} className="flex items-center justify-between border-b border-white/10 py-3 last:border-b-0">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-white/60">${price.toFixed(2)} each</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="pill hover:bg-white/10" onClick={() => dec(item.id)}>-</button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button className="pill hover:bg-white/10" onClick={() => inc(item.id)}>+</button>
                    <span className="w-20 text-right">${itemTotal.toFixed(2)}</span>
                    <button className="pill hover:bg-fire-500/20 text-fire-300" onClick={() => remove(item.id)}>Remove</button>
                  </div>
                </div>
              )
            })}
            <div className="mt-4 flex items-center justify-end gap-4">
              {/* Total should also handle being non-numeric if necessary */}
              <div className="text-lg font-bold">Total: ${typeof total === 'number' ? total.toFixed(2) : '0.00'}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="btn-secondary" onClick={downloadPDF}>Download Quotation (PDF)</button>
            <button className="btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
