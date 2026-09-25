
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './socket/socket.js'

createRoot(document.getElementById('root')).render(
    <App />

)
