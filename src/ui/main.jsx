import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import GlobalStyle from './global-style.js'
import store from '../state/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
)
