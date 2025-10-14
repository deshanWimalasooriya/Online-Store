import React, { useEffect, useMemo, useState } from 'react'
import { products as seedProducts } from '../data/products'
import { useUser } from '../context/UserContext'
import { useNotifications } from '../context/NotificationContext'

function slugify(s){
  return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

export default function Admin() {
  const { orders: userOrders = [] } = useUser()

  const [tab, setTab] = useState('overview')

  // Products state (client-only). Seed from data/products and persist to localStorage
  const [products, setProducts] = useState(()=>{
    try {
      const raw = localStorage.getItem('admin_products')
      if (raw) return JSON.parse(raw)
    } catch(e){}
    return seedProducts.map(p => ({ ...p, stock: p.stock ?? 10, images: p.images || (p.image ? [p.image] : []) }))
  })

  useEffect(()=>{ localStorage.setItem('admin_products', JSON.stringify(products)) },[products])

  // Categories (persisted in localStorage). Start from products if none saved.
  const [categories, setCategories] = useState(()=>{
    try { const raw = localStorage.getItem('admin_categories'); if (raw) return JSON.parse(raw) } catch(e){}
    return Array.from(new Set(products.map(p=>p.category).filter(Boolean)))
  })
  useEffect(()=>{ localStorage.setItem('admin_categories', JSON.stringify(categories)) },[categories])

  // Orders state (client-only). Seed from user context orders
  const [orders, setOrders] = useState(()=>{
    try {
      const raw = localStorage.getItem('admin_orders')
      if (raw) return JSON.parse(raw)
    } catch(e){}
    // normalize userOrders into a simple shape if present
    return userOrders.map(o => ({ id: o.id, date: o.date, total: o.total, items: Array.isArray(o.items) ? o.items : [], status: 'pending' }))
  })
  useEffect(()=>{ localStorage.setItem('admin_orders', JSON.stringify(orders)) },[orders])

  // Users state (client-only)
  const [users, setUsers] = useState(()=>{
    try { const raw = localStorage.getItem('admin_users'); if (raw) return JSON.parse(raw) } catch(e){}
    return []
  })
  useEffect(()=>{ localStorage.setItem('admin_users', JSON.stringify(users)) },[users])

  // Product form (for add/edit)
  const emptyForm = { id: '', name: '', brand: '', price: 0, category: '', imagesText: '', description: '', specs: '', stock: 0 }
  const [form, setForm] = useState(emptyForm)
  const [imageList, setImageList] = useState([]) // array of image URLs or dataURLs
  const [editingId, setEditingId] = useState(null)

  const startAdd = () => { setForm(emptyForm); setEditingId(null); setImageList([]); setTab('products') }
  const startEdit = (p) => {
    setForm({ id: p.id, name: p.name, brand: p.brand||'', price: p.price||0, category: p.category||'', imagesText: (p.images || p.image ? (p.images || [p.image]).join(',') : ''), description: p.description||'', specs: JSON.stringify(p.specs||{}), stock: p.stock||0 })
    setImageList(p.images ? [...p.images] : (p.image ? [p.image] : []))
    setEditingId(p.id)
    setTab('products')
  }

  const handleFiles = async (files) => {
    const arr = Array.from(files || [])
    const readers = arr.map(file => new Promise((res)=>{
      const fr = new FileReader()
      fr.onload = () => res(fr.result)
      fr.readAsDataURL(file)
    }))
    const results = await Promise.all(readers)
    setImageList(prev => [...prev, ...results])
  }

  const removeImageAt = (idx) => setImageList(prev => prev.filter((_,i)=>i!==idx))

  const { addNotification } = useNotifications()

  const saveProduct = (e) => {
    e.preventDefault()
    const parsedSpecs = (() => {
      try { return JSON.parse(form.specs) } catch(e){ return {} }
    })()

    // combine images from text input and uploaded images, prefer uploaded images first
    const textImgs = (form.imagesText || '').split(',').map(s=>s.trim()).filter(Boolean)
    const imgs = [...imageList, ...textImgs]

    if (editingId) {
      setProducts(ps => ps.map(p => p.id === editingId ? { ...p, name: form.name, brand: form.brand, price: Number(form.price)||0, category: form.category, images: imgs, image: imgs[0]||p.image, description: form.description, specs: parsedSpecs, stock: Number(form.stock)||0 } : p))
      // notify update
      addNotification({ title: 'Product updated', message: form.name, url: `/products/${editingId}`, type: 'product' })
    } else {
      const id = form.id ? slugify(form.id) : slugify(form.name || `prod-${Date.now()}`)
      const exists = products.find(p=>p.id===id)
      const newProduct = { id: exists ? `${id}-${Date.now()}` : id, name: form.name, brand: form.brand, price: Number(form.price)||0, category: form.category, images: imgs, image: imgs[0]||'', description: form.description, specs: parsedSpecs, stock: Number(form.stock)||0, rating: 0, theme: 'ice' }
      setProducts(ps => [newProduct, ...ps])
      // notify add
      addNotification({ title: 'New product added', message: newProduct.name, url: `/products/${newProduct.id}`, type: 'product' })
    }

    setForm(emptyForm)
    setImageList([])
    setEditingId(null)
  }

  const deleteProduct = (id) => {
    if (!confirm('Delete product?')) return
    setProducts(ps => ps.filter(p=>p.id!==id))
  }

  // Orders management
  const updateOrderStatus = (id, status) => {
    setOrders(os => os.map(o=> o.id===id ? { ...o, status } : o))
  }

  const deleteOrder = (id) => {
    if (!confirm('Delete order?')) return
    setOrders(os => os.filter(o=>o.id!==id))
  }

  // Users management
  const addUser = (u) => setUsers(us => [u, ...us])
  const deleteUser = (id) => {
    if (!confirm('Delete user?')) return
    setUsers(us => us.filter(u=>u.id!==id))
  }

  // Analytics
  const metrics = useMemo(()=>{
    const revenue = orders.reduce((s,o)=>s+(Number(o.total)||0),0)
    const totalOrders = orders.length
    const totalProducts = products.length
    const profitEstimate = revenue * 0.2
    const byMonth = {}
    orders.forEach(o=>{
      const key = o.date ? o.date.slice(0,7) : new Date().toISOString().slice(0,7)
      byMonth[key] = (byMonth[key]||0) + (Number(o.total)||0)
    })
    const series = Object.entries(byMonth).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>({ month:k, value:v }))
    return { revenue, totalOrders, totalProducts, profitEstimate, series }
  },[orders, products])

  // UI state for product/category and order filters
  const [productFilter, setProductFilter] = useState('All')
  const [newCategory, setNewCategory] = useState('')
  const [orderTimeframe, setOrderTimeframe] = useState('monthly')
  const [orderCategory, setOrderCategory] = useState('All')

  const displayedProducts = products.filter(p => productFilter==='All' || p.category===productFilter)

  const ordersByPeriod = useMemo(()=>{
    const res = {}
    const keyFor = (dateStr)=>{
      const d = new Date(dateStr)
      if (orderTimeframe==='daily') return d.toISOString().slice(0,10)
      if (orderTimeframe==='monthly') return d.toISOString().slice(0,7)
      return d.getFullYear().toString()
    }
    orders.forEach(o=>{
      const k = keyFor(o.date || o.created || new Date().toISOString())
      res[k] = res[k] || { count:0, total:0 }
      res[k].count += 1
      res[k].total += Number(o.total||0)
    })
    return res
  },[orders, orderTimeframe])

  const categoryBreakdown = useMemo(()=>{
    const map = {}
    orders.forEach(o=>{
      const itemsArr = Array.isArray(o?.items) ? o.items : (o?.items ? [o.items] : [])
      itemsArr.forEach(it=>{
        const prod = products.find(p=>p.id===it.id)
        const cat = prod ? prod.category : 'Unknown'
        if (orderCategory!=='All' && cat!==orderCategory) return
        map[cat] = map[cat] || { qty:0, total:0 }
        map[cat].qty += Number(it.qty||0)
        map[cat].total += Number(it.price||0) * Number(it.qty||0)
      })
    })
    return map
  },[orders, products, orderCategory])

  const addCategory = ()=>{
    const c = (newCategory||'').trim()
    if (!c) return
    if (!categories.includes(c)) setCategories(cs=>[...cs, c])
    setNewCategory('')
  }

  const removeCategory = (c)=>{
    if (!confirm(`Delete category "${c}"? This will not delete products.`)) return
    setCategories(cs=>cs.filter(x=>x!==c))
  }

  // Helper to ensure order.items is always an array
  const normalizeOrderItems = (o) => {
    const it = o && o.items
    if (Array.isArray(it)) return it
    if (it) return [it]
    return []
  }

  // Visitors & active users (frontend-only estimates persisted in localStorage)
  const totalVisitors = useMemo(()=>{
    try {
      const raw = localStorage.getItem('admin_visitors')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (typeof parsed === 'number') return parsed
        if (parsed && typeof parsed.total === 'number') return parsed.total
      }
    } catch(e){}
    const est = orders.length * 50 + products.length * 20 + users.length * 10
    try { localStorage.setItem('admin_visitors', JSON.stringify({ total: est })) } catch(e){}
    return est
  },[orders, products, users])

  const activeUsers = useMemo(()=>{
    try {
      const raw = localStorage.getItem('admin_active_users')
      if (raw) { const v = JSON.parse(raw); if (typeof v === 'number') return v }
    } catch(e){}
    const val = Math.max(users.length, Math.round(totalVisitors * 0.03))
    try { localStorage.setItem('admin_active_users', JSON.stringify(val)) } catch(e){}
    return val
  },[users, totalVisitors])

  const topCategories = useMemo(()=>{
    const palette = ['#ff6a14','#1aa7ff','#f59e0b','#34d399','#a78bfa']
    return Object.entries(categoryBreakdown).map(([category, data], i)=>({ category, qty: data.qty||0, total: data.total||0, color: palette[i % palette.length] })).sort((a,b)=>b.total - a.total)
  },[categoryBreakdown])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="card p-4 lg:col-span-1">
        <h2 className="font-display text-xl">Admin</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/80">
          <li><button onClick={()=>setTab('overview')} className={`pill w-full text-left ${tab==='overview'?'bg-ice-500/20 text-ice-300':''}`}>Overview</button></li>
          <li><button onClick={()=>setTab('orders')} className={`pill w-full text-left ${tab==='orders'?'bg-ice-500/20 text-ice-300':''}`}>Orders</button></li>
          <li><button onClick={()=>setTab('products')} className={`pill w-full text-left ${tab==='products'?'bg-ice-500/20 text-ice-300':''}`}>Products</button></li>
          <li><button onClick={()=>setTab('users')} className={`pill w-full text-left ${tab==='users'?'bg-ice-500/20 text-ice-300':''}`}>Users</button></li>
        </ul>
        <div className="mt-4">
          <button className="btn-primary w-full" onClick={startAdd}>Add Product</button>
        </div>
      </aside>

      <main className="lg:col-span-3 space-y-6">
        {tab==='overview' && (
          <section className="card p-4">
            {/* Top KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4">
                <div className="text-sm text-white/70">Total Sales</div>
                <div className="text-2xl font-bold">${metrics.revenue.toFixed(2)}</div>
                <div className="text-sm text-white/60 mt-1">Estimated profit ${metrics.profitEstimate.toFixed(2)}</div>
              </div>

              <div className="p-4">
                <div className="text-sm text-white/70">Total Orders</div>
                <div className="text-2xl font-bold">{metrics.totalOrders}</div>
                <div className="text-sm text-white/60 mt-1">Products: {metrics.totalProducts}</div>
              </div>

              <div className="p-4">
                <div className="text-sm text-white/70">Total Visitors</div>
                <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
                <div className="text-sm text-white/60 mt-1">Visitors (est)</div>
              </div>

              <div className="p-4">
                <div className="text-sm text-white/70">Active Users</div>
                <div className="text-2xl font-bold">{activeUsers}</div>
                <div className="text-sm text-white/60 mt-1">Users active this month</div>
              </div>
            </div>

            {/* Main overview grid: Revenue, Orders breakdown, Sales chart */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4">
                <div className="text-sm text-white/70">Revenue</div>
                <div className="text-2xl font-bold">${metrics.revenue.toFixed(2)}</div>
                <div className="text-sm text-white/60 mt-1">Estimated profit ${metrics.profitEstimate.toFixed(2)}</div>
                <div className="mt-3">
                  <MiniBarChart series={metrics.series} />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/70">Orders</div>
                    <div className="text-2xl font-bold">{metrics.totalOrders}</div>
                    <div className="text-sm text-white/60 mt-1">Products sold: {Object.values(categoryBreakdown).reduce((s,c)=>s+(c.qty||0),0)}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm text-white/70 mb-2">Top Categories</h4>
                  <div className="space-y-2">
                    {topCategories.slice(0,5).map(tc=> (
                      <div key={tc.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: tc.color }} />
                          <div className="text-sm">{tc.category}</div>
                        </div>
                        <div className="text-sm text-white/60">{tc.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="text-sm text-white/70">Sales (by month)</div>
                <div className="mt-2">
                  <MiniBarChart series={metrics.series} />
                </div>

                <div className="mt-4">
                  <h4 className="text-sm text-white/70">Active users by country</h4>
                  <div className="mt-2 text-sm text-white/60">United States: {Math.round(activeUsers*0.42)} users</div>
                  <div className="text-sm text-white/60">United Kingdom: {Math.round(activeUsers*0.24)} users</div>
                  <div className="text-sm text-white/60">Indonesia: {Math.round(activeUsers*0.175)} users</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab==='orders' && (
          <section className="card p-4">
            <h3 className="font-display text-lg">Order Management</h3>
            <p className="text-white/70 mt-1">View, update, and fulfill orders.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm text-white/70">Timeframe</label>
                <select value={orderTimeframe} onChange={e=>setOrderTimeframe(e.target.value)} className="rounded-md bg-[#111727] border border-white/10 px-2 py-1">
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <label className="text-sm text-white/70 ml-4">Category</label>
                <select value={orderCategory} onChange={e=>setOrderCategory(e.target.value)} className="rounded-md bg-[#111727] border border-white/10 px-2 py-1">
                  <option value="All">All</option>
                  {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="ml-auto text-sm text-white/70">Periods: {Object.keys(ordersByPeriod).length}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(ordersByPeriod).slice(0,6).map(([k,v])=> (
                  <div key={k} className="p-3 border rounded-md">
                    <div className="text-sm text-white/60">{k}</div>
                    <div className="font-medium">{v.count} orders</div>
                    <div className="text-sm text-white/60">${v.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              {orders.length===0 ? <div className="text-white/70">No orders yet.</div> : orders.map(o=> (
                <div key={o.id} className="p-3 border rounded-md flex items-start justify-between">
                  <div>
                    <div className="font-medium">{o.id} <span className="text-sm text-white/60">{o.date}</span></div>
                    <div className="text-sm text-white/60">Total: ${Number(o.total||0).toFixed(2)}</div>
                    <div className="mt-2 text-sm">
                      {normalizeOrderItems(o).length>0 ? normalizeOrderItems(o).map(it=> <div key={it.id}>{it.qty}× {it.name} — ${it.price}</div>) : <div className="text-white/60">No item details</div>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <select value={o.status||'pending'} onChange={e=>updateOrderStatus(o.id, e.target.value)} className="rounded-md bg-[#111727] border border-white/10 px-2 py-1">
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="text-sm text-white/60">Status: <strong className="capitalize">{o.status||'pending'}</strong></div>
                    <div className="flex gap-2 mt-2">
                      <button className="pill" onClick={()=>navigator.clipboard?.writeText(JSON.stringify(o))}>Copy JSON</button>
                      <button className="pill text-fire-300 hover:bg-fire-500/20" onClick={()=>deleteOrder(o.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab==='products' && (
          <section className="card p-4">
            <h3 className="font-display text-lg">Product Inventory</h3>
            <p className="text-white/70 mt-1">Manage stock levels, pricing, and details.</p>

            <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-white/70">Filter</label>
                    <select value={productFilter} onChange={e=>setProductFilter(e.target.value)} className="rounded-md bg-[#111727] border border-white/10 px-2 py-1">
                      <option value="All">All</option>
                      {categories.map(c=> <option key={c} value={c}>{c}</option>)}
                    </select>
                    <button className="pill" onClick={()=>{ setTab('products'); setForm(emptyForm); setEditingId(null); setImageList([]) }}>Add Product</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input placeholder="New category" value={newCategory} onChange={e=>setNewCategory(e.target.value)} className="rounded-md border border-white/10 bg-[#111727] px-2 py-1 text-sm" />
                    <button type="button" onClick={addCategory} className="pill">Add Category</button>
                  </div>
                </div>
                <div className="overflow-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="text-white/70">
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedProducts.map(p=> (
                        <tr key={p.id} className="border-t border-white/5">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image|| (p.images && p.images[0])} alt={p.name} className="w-12 h-8 object-cover rounded" />
                              <div>
                                <div className="font-medium">{p.name}</div>
                                <div className="text-white/60 text-xs">{p.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td>${Number(p.price||0).toFixed(2)}</td>
                          <td>{p.stock ?? 0}</td>
                          <td>{p.category}</td>
                          <td className="text-right">
                            <button className="pill mr-2" onClick={()=>startEdit(p)}>Edit</button>
                            <button className="pill text-fire-300 hover:bg-fire-500/20" onClick={()=>deleteProduct(p.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <form onSubmit={saveProduct} className="space-y-3">
                  <h4 className="font-medium">{editingId ? 'Edit Product' : 'Add Product'}</h4>
                  <div>
                    <label className="text-sm text-white/70">Name</label>
                    <input required value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Brand</label>
                    <input value={form.brand} onChange={e=>setForm(f=>({...f, brand: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Price</label>
                    <input type="number" value={form.price} onChange={e=>setForm(f=>({...f, price: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Category</label>
                    <select value={form.category} onChange={e=>setForm(f=>({...f, category: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2">
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Upload Images (or provide URLs below)</label>
                    <input type="file" multiple accept="image/*" onChange={e=>handleFiles(e.target.files)} className="mt-1 w-full text-sm text-white/80" />
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Image URLs (comma separated)</label>
                    <input value={form.imagesText} onChange={e=>setForm(f=>({...f, imagesText: e.target.value}))} placeholder="https://... , https://..." className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                    <div className="mt-2 flex gap-2 overflow-auto">
                      {(imageList.length === 0 && (!form.imagesText || form.imagesText.trim()==='')) ? (
                        <div className="text-white/60 text-sm">No images selected</div>
                      ) : (
                        // render previews from combined list
                        [...imageList, ...((form.imagesText||'').split(',').map(s=>s.trim()).filter(Boolean))].map((src,i)=> (
                          <div key={i} className="relative w-20 h-14 bg-[#061223] rounded overflow-hidden border border-white/5">
                            <img src={src} alt={`img-${i}`} className="w-full h-full object-cover" />
                            <button type="button" onClick={()=>{
                              // remove from uploaded images if index within imageList, else remove from text urls
                              if (i < imageList.length) removeImageAt(i)
                              else {
                                const t = (form.imagesText||'').split(',').map(s=>s.trim()).filter(Boolean)
                                t.splice(i - imageList.length, 1)
                                setForm(f=>({...f, imagesText: t.join(',')}))
                              }
                            }} className="absolute -top-2 -right-2 w-6 h-6 bg-fire-500 text-white rounded-full text-xs">×</button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-white/70">Stock</label>
                    <input type="number" value={form.stock} onChange={e=>setForm(f=>({...f, stock: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Specs (JSON)</label>
                    <textarea value={form.specs} onChange={e=>setForm(f=>({...f, specs: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" rows={4} />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="btn-primary">Save</button>
                    <button type="button" className="pill" onClick={()=>{ setForm(emptyForm); setEditingId(null); setImageList([]) }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {tab==='users' && (
          <section className="card p-4">
            <h3 className="font-display text-lg">User Management</h3>
            <p className="text-white/70 mt-1">Handle customer roles and permissions.</p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Users</h4>
                <div className="mt-3 space-y-3">
                  {users.length===0 ? <div className="text-white/70">No users added.</div> : users.map(u=> (
                    <div key={u.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <div className="font-medium">{u.name}</div>
                        <div className="text-sm text-white/60">{u.email}</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="pill" onClick={()=>navigator.clipboard?.writeText(JSON.stringify(u))}>Copy</button>
                        <button className="pill text-fire-300 hover:bg-fire-500/20" onClick={()=>deleteUser(u.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium">Add User</h4>
                <AddUserForm onAdd={addUser} />
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function MiniBarChart({ series=[] }){
  if (!series || series.length===0) return <div className="text-white/60">No data</div>
  const max = Math.max(...series.map(s=>s.value), 1)
  return (
    <svg viewBox="0 0 100 30" className="w-full h-8">
      {series.map((s,i)=>{
        const x = (i/series.length)*100
        const w = 100/series.length - 2
        const h = (s.value/max)*28
        return <rect key={s.month} x={x} y={30-h} width={w} height={h} rx={1} fill="#5eead4" />
      })}
    </svg>
  )
}

function AddUserForm({ onAdd }){
  const empty = { id:'', name:'', email:'' }
  const [u, setU] = useState(empty)
  const submit = (e) => {
    e.preventDefault()
    if (!u.name || !u.email) return alert('Name and email required')
    const id = slugify(u.email || u.name) || `usr-${Date.now()}`
    onAdd({ ...u, id })
    setU(empty)
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="text-sm text-white/70">Full name</label>
        <input value={u.name} onChange={e=>setU(x=>({...x, name: e.target.value}))} className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
      </div>
      <div>
        <label className="text-sm text-white/70">Email</label>
        <input value={u.email} onChange={e=>setU(x=>({...x, email: e.target.value}))} type="email" className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <button className="btn-primary">Add User</button>
        <button type="button" className="pill" onClick={()=>setU(empty)}>Clear</button>
      </div>
    </form>
  )
}
