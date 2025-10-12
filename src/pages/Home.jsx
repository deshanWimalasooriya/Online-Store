import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  const hotDeals = products.filter(p=>p.theme==='fire').slice(0,4)
  const newTech = products.filter(p=>p.theme==='ice').slice(0,4)

  const sliderImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=60', // motherboard closeup
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=60', // duplicate intentionally safe
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=60' // server racks
  ]

  return (
    <div>
      <section className="relative">
        <ImageSlider images={sliderImages} interval={5000} />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center">
            <h1 className="font-display text-4xl md:text-6xl tracking-tight">
              Technology. Ice & Fire.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-white/80">
              Harness cutting‑edge innovation and raw primal power. Build your ultimate rig with precision‑cooled chips and flame‑driven GPUs.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/products" className="btn-primary">Shop New Tech</Link>
              <Link to="/products?q=deal" className="btn-secondary">See Hot Deals</Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ice-500/10 via-transparent to-fire-500/10"></div>
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
