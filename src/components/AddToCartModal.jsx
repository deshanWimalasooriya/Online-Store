import React, { useState } from 'react'

export default function AddToCartModal({ open, onClose, product, onAdd }) {
  const [qty, setQty] = useState(1)
  if (!open || !product) return null

  const inc = () => setQty(q => q + 1)
  const dec = () => setQty(q => Math.max(1, q - 1))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl p-6 bg-[#061221] rounded-xl border border-white/10">
        <button onClick={onClose} className="absolute right-3 top-3 text-white/60">✕</button>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 flex items-center justify-center bg-[#0b0f1a] rounded-md p-2">
            <img src={product.image || (product.images && product.images[0])} alt={product.name} className="max-h-40 object-contain" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl">{product.name}</h3>
            <div className="text-white/70 mt-2">{product.description}</div>

            <div className="mt-4">
              <h4 className="text-sm text-white/70">Features</h4>
              <ul className="mt-2 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs && Object.entries(product.specs).map(([k,v])=> (
                  <li key={k} className="text-white/60"><strong className="capitalize">{k}:</strong> {v}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border border-white/10 rounded-md overflow-hidden">
                <button onClick={dec} className="px-3 py-2">-</button>
                <div className="w-12 text-center">{qty}</div>
                <button onClick={inc} className="px-3 py-2">+</button>
              </div>
              <div className="text-lg font-bold">${(product.price * qty).toFixed(2)}</div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => { onAdd(product, qty); onClose() }} className="btn-primary">Add to Cart</button>
              <button onClick={onClose} className="pill">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
