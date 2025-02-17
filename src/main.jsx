import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './../node_modules/@fortawesome/fontawesome-free/css/all.css'
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './TokenContext.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext.jsx'
import {store} from './Redux/Store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <Provider store={store}>
      <CartContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartContextProvider>
    </Provider>

  </TokenContextProvider>
  ,
)
