import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './pages/Cart/cartContext.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CartProvider>,
)
