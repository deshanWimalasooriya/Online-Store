import { useState } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const hotDeals = products.filter(p=>p.theme==='fire').slice(0,4)
  const newTech = products.filter(p=>p.theme==='ice').slice(0,4)

  const sliderImages = [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=60', // motherboard closeup
    'https://images.unsplash.com/photo-1555949963-aa79dcee981d?auto=format&fit=crop&w=1600&q=60', // closeup chip
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=60' // server racks
  ]

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory)

  // Feature filters state
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(2000)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [vramFilter, setVramFilter] = useState('Any')
  const [coresFilter, setCoresFilter] = useState('Any')

  // derive available brands for the selected category
  const availableBrands = Array.from(new Set(filteredProducts.map(p=>p.brand).filter(Boolean)))
  const availableVram = Array.from(new Set(filteredProducts.map(p=>{
    if (!p.specs?.vram) return null
    const m = p.specs.vram.match(/(\d+)GB/)
    return m ? `${m[1]}GB` : null
  }).filter(Boolean))).sort((a,b)=> parseInt(b)-parseInt(a))
  const availableCores = Array.from(new Set(filteredProducts.map(p=>{
    if (!p.specs?.cores) return null
    const m = p.specs.cores.match(/(\d+)/)
    return m ? `${m[1]} cores` : null
  }).filter(Boolean)))

  const toggleBrand = (b) => {
    setSelectedBrands(s => s.includes(b) ? s.filter(x=>x!==b) : [...s, b])
  }

  const applyFeatureFilters = (items) => {
    return items.filter(p => {
      if (p.price < priceMin || p.price > priceMax) return false
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false
      if (vramFilter !== 'Any' && p.specs?.vram) {
        const m = p.specs.vram.match(/(\d+)GB/)
        if (!m) return false
        if (`${m[1]}GB` !== vramFilter) return false
      }
      if (coresFilter !== 'Any' && p.specs?.cores) {
        const m = p.specs.cores.match(/(\d+)/)
        if (!m) return false
        if (`${m[1]} cores` !== coresFilter) return false
      }
      return true
    })
  }

  const visibleProducts = applyFeatureFilters(filteredProducts)

  return (
    <div>
      <section className="relative w-full">
        <div className="flex flex-col md:flex-row">
          {/* Left categories - 20% on md+ (sticky, doesn't scroll with main content) */}
          <aside className="w-full md:w-1/5 p-4 md:sticky md:top-[64px] md:h-[calc(100vh-64px)] md:self-start md:overflow-auto">
            <div className="card p-4 h-full">
              <h3 className="font-display text-lg">Categories</h3>
              <div className="mt-4 grid gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left pill w-full ${selectedCategory === cat ? 'bg-ice-500/20 text-ice-300' : 'text-white/80'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right main slider + product lists - 80% on md+ */}
          <div className="w-full md:w-4/5 p-4">
            {/* If a specific category is selected (not All), show only that category's products */}
            {selectedCategory === 'All' ? (
              <>
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

                {/* Product sections placed inside the right column so they scroll together */}
                <div className="mt-8">
                  <section>
                    <h2 className="font-display text-2xl">Hot Deals</h2>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hotDeals.map(p=> <ProductCard key={p.id} product={p} />)}
                    </div>
                  </section>

                  <section className="mt-10">
                    <h2 className="font-display text-2xl">New Tech</h2>
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {newTech.map(p=> <ProductCard key={p.id} product={p} />)}
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <div>
                <h2 className="font-display text-2xl">{selectedCategory}</h2>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
