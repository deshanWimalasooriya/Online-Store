import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home() {
  const hotDeals = products.filter(p=>p.theme==='fire').slice(0,4)
  const newTech = products.filter(p=>p.theme==='ice').slice(0,4)

  return (
    <div>
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-ice-500/10 via-transparent to-fire-500/10 blur-2xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-16 lg:py-24">
          <h1 className="font-display text-4xl md:text-6xl tracking-tight">
            Technology. Ice & Fire.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Harness cutting‑edge innovation and raw primal power. Build your ultimate rig with precision‑cooled chips and flame‑driven GPUs.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Link to="/products" className="btn-primary">Shop New Tech</Link>
            <Link to="/products?q=deal" className="btn-secondary">See Hot Deals</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl">Hot Deals</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotDeals.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="font-display text-2xl">New Tech</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newTech.map(p=> <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}
