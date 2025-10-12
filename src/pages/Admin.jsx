export default function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="card p-4 lg:col-span-1">
        <h2 className="font-display text-xl">Admin</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/80">
          <li className="pill">Overview</li>
          <li className="pill">Orders</li>
          <li className="pill">Products</li>
          <li className="pill">Users</li>
        </ul>
      </aside>
      <main className="lg:col-span-3 grid gap-6">
        <section className="card p-4">
          <h3 className="font-display text-lg">Order Management</h3>
          <p className="text-white/70 mt-1">View, update, and fulfill orders.</p>
        </section>
        <section className="card p-4">
          <h3 className="font-display text-lg">Product Inventory</h3>
          <p className="text-white/70 mt-1">Manage stock levels, pricing, and details.</p>
        </section>
        <section className="card p-4">
          <h3 className="font-display text-lg">User Management</h3>
          <p className="text-white/70 mt-1">Handle customer roles and permissions.</p>
        </section>
      </main>
    </div>
  )
}
