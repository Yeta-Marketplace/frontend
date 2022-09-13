
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Header from './components/Header'
import Login from './components/Login'
import Logout from './components/Logout'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import useToken from './utils/token';


function App() {

  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Header loggedIn={!!token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/logout" element={<Logout setToken={setToken} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
