import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Auth from './pages/Auth'

import Background from './components/Background'
import { useUser } from './context/UserContext'

export default function App() {
  const { user, isAdmin } = useUser()

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/admin" element={isAdmin() ? <Admin /> : <Navigate to="/" />} />
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/profile" />} />
        </Routes>
      </div>
      <footer className="border-t border-white/10 py-6 text-center text-white/60">© {new Date().getFullYear()} CircuitChic</footer>
    </div>
  )
}
