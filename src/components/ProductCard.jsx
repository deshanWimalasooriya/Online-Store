import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { add } = useCart()
  const navigate = useNavigate()
  const isIce = product.theme === 'ice'
  const ring = isIce ? 'ring-ice-400 shadow-glowIce' : 'ring-fire-400 shadow-glowFire'
  const btn = isIce ? 'btn-primary' : 'btn-secondary'

  const onCardClick = () => navigate(`/products/${product.id}`)

  return (
    <div onClick={onCardClick} className={`card ring-1 ${ring} overflow-hidden cursor-pointer`}>
      <div className="relative aspect-video bg-gradient-to-br from-[#0e162b] to-[#151f3a] flex items-center justify-center overflow-hidden">
        <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute left-3 top-3">
          <span className={`pill ${isIce ? 'border-ice-400 text-ice-300' : 'border-fire-400 text-fire-300'}`}>{product.category}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="block text-lg font-display tracking-wide hover:text-ice-400">{product.name}</div>
        <div className="mt-1 text-white/70 text-sm line-clamp-2">{product.description}</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xl font-bold">${product.price.toFixed(2)}</div>
          <div className="flex items-center gap-2 text-yellow-400">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.176 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button className={btn} onClick={(e)=>{ e.stopPropagation(); add(product) }}>Add to Cart</button>
          <Link className="pill text-white/80 hover:text-white" to={`/products/${product.id}`} onClick={e=>e.stopPropagation()}>Details</Link>
        </div>
      </div>
    </div>
  )
}
