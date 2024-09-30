import { useState } from 'react'
import './App.css'
import { Routes } from './routes/ROUTES'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  const routesa = createBrowserRouter(Routes);
  return (
    <>
    <RouterProvider router={routesa} />
    </>
  )
}

export default App
