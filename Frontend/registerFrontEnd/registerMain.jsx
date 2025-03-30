import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './registerApp.jsx'
import './App.css';
import './index.css';
import { CheckoutProvider } from './Pages/Context/checkoutContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CheckoutProvider>
      <App />
    </CheckoutProvider>    
  </React.StrictMode>,
)
