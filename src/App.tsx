
import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import styled from "styled-components"

import Header from './components/Header'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Signout from './components/Signout'
import Home from './components/Home'
import PageNotFound from './components/PageNotFound'
import useToken from './utils/token'


const Root = styled.div`
  font-family: "Roboto";
`


function App() {

  const { token, setToken } = useToken();

  return (
    <Root>
      <BrowserRouter>
        <Header signedIn={!!token} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={!token ? <Signin setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/signout" element={<Signout setToken={setToken} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Root>
  )
}

export default App
