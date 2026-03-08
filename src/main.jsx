import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Index from "./index"
import './index.css'
import { ProductProvider } from './contextAPI/productProvider'
import { AuthProvider } from './contextAPI/authProvider'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProductProvider>
      <StrictMode>
        <Index />
      </StrictMode>
    </ProductProvider>
  </AuthProvider>
)
