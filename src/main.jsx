import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='w-[64rem] m-auto bg-gray-200 px-8 pb-2'>
      <App />
    </div>
  </React.StrictMode>,
)
