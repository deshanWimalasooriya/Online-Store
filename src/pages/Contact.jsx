export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">Contact Us</h1>
      <form className="mt-6 card p-4 grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm text-white/70">Name</label>
          <input className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500" />
        </div>
        <div>
          <label className="text-sm text-white/70">Message</label>
          <textarea rows="4" className="mt-1 w-full rounded-md border border-white/10 bg-[#111727] px-3 py-2 outline-none focus:ring-2 focus:ring-ice-500"></textarea>
        </div>
        <div className="flex justify-end"><button className="btn-secondary">Send</button></div>
      </form>
    </div>
  )
}
