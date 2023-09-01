import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles.css";
import App from './App.jsx'
import { RoutesApp } from './routes/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <RoutesApp />
  </React.StrictMode>,
)
