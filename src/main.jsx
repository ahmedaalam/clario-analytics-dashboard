import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardProvider } from './context/DashboardContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DashboardProvider>
        <App />
      </DashboardProvider>
    </ThemeProvider>
  </StrictMode>,
)
