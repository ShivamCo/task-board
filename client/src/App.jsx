import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';


function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={< HomePage />} />
        <Route path='/login' element={< LoginPage />} />
        <Route path='/signup' element={< SignUpPage />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App
