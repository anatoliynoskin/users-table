import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UsersTableContextProvider } from './contexts/usersTableContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UsersTableContextProvider>
      <App />
    </UsersTableContextProvider>
  </React.StrictMode>,
)
