export default function Checkout() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-display text-2xl">Checkout</h1>
      <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 card p-4">
        <div>
          <label className="text-sm text-white/70">Full Name</label>
          <input className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div className="md:col-span-2">
          <label className="text-sm text-white/70">Address</label>
          <input className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">City</label>
          <input className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">Postal Code</label>
          <input className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button className="btn-primary">Place Order</button>
        </div>
      </form>
    </div>
  )
}
