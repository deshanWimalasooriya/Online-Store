import React, { useState, useEffect } from 'react'

export default function AddToCartModal({ open, onClose, product, onAdd }) {
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  // Reset state when modal opens or product changes
  useEffect(() => {
    if (open) {
      setQty(1)
      // Default selects: pick first size/color if available
      setSelectedSize(product.sizes ? product.sizes[0] : '')
      setSelectedColor(product.colors ? product.colors[0] : '')
    }
  }, [open, product])

  if (!open || !product) return null

  const inc = () => setQty(q => q + 1)
  const dec = () => setQty(q => Math.max(1, q - 1))

  const price = typeof product.price === 'number'
    ? product.price
    : parseFloat(product.price) || 0

  const handleAddClick = () => {
    // Pass updated selections back (quantity, size, color)
    onAdd(product, qty, selectedSize, selectedColor)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl p-6 bg-[#061221] rounded-xl border border-white/10">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-white/60"
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 flex items-center justify-center bg-[#0b0f1a] rounded-md p-2">
            <img
              src={product.image || (product.images && product.images[0])}
              alt={product.name}
              className="max-h-40 object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-xl">{product.name}</h3>
            <div className="text-white/70 mt-2">{product.description}</div>

            {/* <div className="mt-4">
              <h4 className="text-sm text-white/70">Features</h4>
              <ul className="mt-2 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs &&
                  Object.entries(product.specs).map(([k, v]) => (
                    <li key={k} className="text-white/60">
                      <strong className="capitalize">{k}:</strong> {v}
                    </li>
                  ))}
              </ul>
            </div> */}

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border border-white/10 rounded-md overflow-hidden">
                <button onClick={dec} className="px-3 py-2">-</button>
                <div className="w-12 text-center">{qty}</div>
                <button onClick={inc} className="px-3 py-2">+</button>
              </div>
              <div className="text-lg font-bold">${(price * qty).toFixed(2)}</div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <label htmlFor="size-select" className="text-sm text-white/70">Size</label>
                <select
                  id="size-select"
                  className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 text-white"
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <label htmlFor="color-select" className="text-sm text-white/70">Color</label>
                <select
                  id="color-select"
                  className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 text-white"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                >
                  {product.colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button onClick={handleAddClick} className="btn-primary">Add to Cart</button>
              <button onClick={onClose} className="pill">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
