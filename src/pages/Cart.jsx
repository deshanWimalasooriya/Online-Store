import { useRef } from 'react'
import { useCart } from '../context/CartContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Cart() {
  const { items, inc, dec, remove, total } = useCart()
  const ref = useRef(null)

  const downloadPDF = async () => {
    const el = ref.current
    if (!el) return
    const canvas = await html2canvas(el, { backgroundColor: '#0b0f1a', scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth - 60
    const imgHeight = canvas.height * imgWidth / canvas.width
    let y = 30
    pdf.setTextColor('#ffffff')
    pdf.setFillColor('#0b0f1a')
    pdf.rect(0,0,pageWidth,pageHeight,'F')
    pdf.setFontSize(18)
    pdf.text('Quotation — IceFire Tech', 30, y)
    y += 10
    pdf.addImage(imgData, 'PNG', 30, y, imgWidth, Math.min(imgHeight, pageHeight - y - 30))
    pdf.save('quotation.pdf')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-display text-2xl">Your Cart</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-white/70">Your cart is empty.</p>
      ) : (
        <div>
          <div ref={ref} id="cart-quotation" className="mt-6 card p-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b border-white/10 py-3 last:border-b-0">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-white/60">${item.price.toFixed(2)} each</div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="pill hover:bg-white/10" onClick={()=>dec(item.id)}>-</button>
                  <span className="w-8 text-center">{item.qty}</span>
                  <button className="pill hover:bg-white/10" onClick={()=>inc(item.id)}>+</button>
                  <span className="w-20 text-right">${(item.qty*item.price).toFixed(2)}</span>
                  <button className="pill hover:bg-fire-500/20 text-fire-300" onClick={()=>remove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex items-center justify-end gap-4">
              <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button className="btn-secondary" onClick={downloadPDF}>Download Quotation (PDF)</button>
          </div>
        </div>
      )}
    </div>
  )
}
