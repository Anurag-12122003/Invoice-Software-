import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProviderContext } from './theme/ThemeContext.jsx'
import AppThemeProvider from './theme/AppThemeProvider.jsx'
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProviderContext>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </ThemeProviderContext>
  </StrictMode>,
)
