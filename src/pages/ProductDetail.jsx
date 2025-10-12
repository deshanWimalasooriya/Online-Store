import { useParams } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find(p=>p.id===id)
  const { add } = useCart()

  if (!product) return <div className="mx-auto max-w-5xl px-4 py-10">Product not found.</div>

  const isIce = product.theme==='ice'

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className={`card aspect-video flex items-center justify-center ring-1 ${isIce?'ring-ice-400 shadow-glowIce':'ring-fire-400 shadow-glowFire'}`}>
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-3xl">{product.name}</h1>
          <p className="mt-2 text-white/70">{product.description}</p>
          <div className="mt-4 text-2xl font-bold">${product.price.toFixed(2)}</div>
          <div className="mt-6">
            <button onClick={()=>add(product)} className={isIce? 'btn-primary':'btn-secondary'}>Add to Cart</button>
          </div>
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
