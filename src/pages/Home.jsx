import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  const hotDeals = products.filter(p=>p.theme==='fire').slice(0,4)
  const newTech = products.filter(p=>p.theme==='ice').slice(0,4)

  const sliderImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=60', // motherboard closeup
    'https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=1600&q=60', // closeup chip
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=60' // server racks
  ]

  return (
    <div>
      <section className="relative w-full">
        <div className="flex flex-col md:flex-row">
          {/* Left categories - 20% on md+ */}
          <aside className="w-full md:w-1/5 p-4">
            <div className="card p-4 h-full">
              <h3 className="font-display text-lg">Categories</h3>
              <div className="mt-4 grid gap-2">
                {products && Array.from(new Set(products.map(p => p.category))).map(cat => (
                  <button key={cat} className="text-left pill w-full">{cat}</button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right main slider - 80% on md+ */}
          <div className="w-full md:w-4/5 p-4">
            <div className="relative">
              <ImageSlider images={sliderImages} interval={5000} />
              <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-4xl px-4 py-24 text-center">
                  <h1 className="font-display text-3xl md:text-5xl tracking-tight">
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
            </div>
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
