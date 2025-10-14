import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import AddToCartModal from '../components/AddToCartModal'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p => p.id === id)
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  if (!product) return <div className="mx-auto max-w-5xl px-4 py-10">Product not found.</div>

  const images = (product.images && product.images.length >= 3) ? product.images : [product.image, product.image, product.image]
  const isIce = product.theme === 'ice'

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className={`card overflow-hidden ring-1 ${isIce ? 'ring-ice-400 shadow-glowIce' : 'ring-fire-400 shadow-glowFire'}`}>
            <div className="aspect-[16/10] bg-[#0b0f1a] flex items-center justify-center">
              <img src={images[index]} alt={`${product.name} ${index+1}`} className="h-full w-full object-cover" />
            </div>
            <div className="p-3 flex items-center gap-3 overflow-auto">
              {images.map((src, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`flex-shrink-0 w-24 h-16 overflow-hidden rounded-md border ${i===index ? 'border-ice-400' : 'border-white/10'}`}>
                  <img src={src} alt={`thumb-${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl">{product.name}</h1>
          <p className="mt-2 text-white/70">{product.description}</p>
          <div className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center border border-white/10 rounded-md overflow-hidden">
              <button className="px-3 py-2 bg-transparent" onClick={() => setQty(q => Math.max(1, q-1))}>-</button>
              <input type="number" className="w-16 text-center bg-transparent px-2 py-2 outline-none" value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} />
              <button className="px-3 py-2 bg-transparent" onClick={() => setQty(q => q + 1)}>+</button>
            </div>

            <button onClick={() => setOpen(true)} className={isIce ? 'btn-primary' : 'btn-secondary'}>Add to Cart</button>
          </div>

          <AddToCartModal open={open} onClose={()=>setOpen(false)} product={product} onAdd={(p,qty)=>add(p,qty)} />

          <div className="mt-8">
            <h3 className="font-display text-xl">Specifications</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {Object.entries(product.specs).map(([k,v])=> (
                <li key={k} className="card p-3 flex items-center justify-between"><span className="text-white/60 capitalize">{k}</span><span>{v}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
