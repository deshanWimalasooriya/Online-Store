import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()

  // Category state - initialized to URL param or 'All'
  const [selectedCategory, setSelectedCategory] = useState(params.get('cat') || 'All')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories')
        const data = await response.json()
        setCategories(['All', ...data.map(c => c.category)])
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }
    fetchAllProducts()
  }, [])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesQ =
        !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      const matchesC = selectedCategory === 'All' || p.category === selectedCategory
      return matchesQ && matchesC
    })
  }, [q, selectedCategory, products])

  const setCat = c => {
    setSelectedCategory(c)
    const next = new URLSearchParams(params)
    if (c === 'All') next.delete('cat')
    else next.set('cat', c)
    setParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-1/5 p-4 md:sticky md:top-[64px] md:h-[calc(100vh-64px)] md:self-start md:overflow-auto">
          <div className="card p-4 h-full">
            <h3 className="font-display text-lg">Categories</h3>
            <div className="mt-4 grid gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCat(cat)}
                  className={`text-left pill w-full ${
                    selectedCategory === cat ? 'bg-ice-500/20 text-ice-300' : 'text-white/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-2xl">Products</h1>
            <Link to="/cart" className="pill">
              Go to Cart
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
